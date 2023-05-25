import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Asset } from './assets.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CreateAssetDto } from './dto/asset.dto';
import { BolsaService } from '../bolsa/bolsa.service';
import { AssetQueryDto } from './dto/assetQuery.dto';

export interface AssetConsolidated extends Asset {
    total_price: number,
    total_quantity: number,
    earnings_received: number
}

export interface AssetAvaragePrice extends AssetConsolidated {
    discounted_price: number,
    discounted_average_price: string,
    average_price: string
}

export interface AssetCurrentPrice extends AssetAvaragePrice {
    current_price: number,
    current_total: number,
    balance: number
    balance_with_earnings: number,
    logourl: string
}

export interface AssetWithEarnings extends Asset {
    earnings_received: number
}

@Injectable()
export class AssetsService {
    constructor(
        @InjectRepository(Asset) private readonly assetRepository: EntityRepository<Asset>,
        private readonly bolsaService: BolsaService
    ) { }

    async findAssets({ type = '' }: AssetQueryDto, userId: number): Promise<AssetCurrentPrice[]> {
        const where = type ? { user: userId, asset_type: type } : { user: userId }

        /* First query builder to group by asset_id based on operation table */
        const qb = this.assetRepository.createQueryBuilder('a')
        const operationsQuery = qb
            .select([
                '*',
                "SUM(case when o.operation_type = 'bought' then o.operation_price * o.quantity ELSE o.operation_price * -o.quantity END) as total_price",
                "SUM(case when o.operation_type = 'bought' then o.quantity ELSE -o.quantity END) AS total_quantity",
            ], true)
            .join('a.operations', 'o')
            .where(where)
            .groupBy('asset_id')


        /* Second query builder to group by asset_id based on a left join with earnings, because some assets don't have any earning*/
        const qb2 = this.assetRepository.createQueryBuilder('a')
        const earningsQuery = qb2.select(['*', 'SUM(e.earning_value) as earnings_received']).leftJoin('a.earnings', 'e').where(where).groupBy('asset_id')

        /* Execute both querys */
        const totalResult: AssetConsolidated[] = await operationsQuery.execute()
        const earningsResult: AssetWithEarnings[] = await earningsQuery.execute()


        /* Get the array result from 1st query and map it to add the 'sum(earnings_received)' from 2nd query in only one array*/
        const resultWithEarnings = totalResult.map((item) => {
            const [asset] = earningsResult.filter((earningAsset) => earningAsset.asset_id === item.asset_id)
            return {
                ...item,
                total_quantity: Number(item.total_quantity),
                earnings_received: asset.earnings_received
            }
        })

        /* Calculate avarage and discounted prices and return a new array with this new entries  */
        const assetsWithAvaragePrice: AssetAvaragePrice[] = resultWithEarnings.map((asset) => {
            const average_price = (asset.total_price / asset.total_quantity).toFixed(2)
            const discounted_price = asset.total_price - +asset.earnings_received
            const discounted_average_price = (discounted_price / asset.total_quantity).toFixed(2)
            const earnings_received = asset.earnings_received === null ? 0 : asset.earnings_received
            return { ...asset, earnings_received, average_price, discounted_average_price, discounted_price }
        })

        /* Get current price of each asset and calculate its total balance  */
        const assetsWithCurrentPrice: AssetCurrentPrice[] = await this.findAssetsCurrentPrice(assetsWithAvaragePrice)

        return assetsWithCurrentPrice
    }


    async findAssetsCurrentPrice(assetArray: AssetAvaragePrice[]): Promise<AssetCurrentPrice[]> {
        const assets = await Promise.all(assetArray.map(async (asset: AssetAvaragePrice) => {

            /* Make a request to api to get the current price of the asset */
            const [currentStock] = await this.bolsaService.retornaAtivoProcurado(asset.asset_code)

            const current_price = currentStock.regularMarketPrice
            const current_total = currentStock.regularMarketPrice * asset.total_quantity
            const balance = Number((current_total - asset.total_price).toFixed(2))
            const balance_with_earnings = Number((balance + +asset.earnings_received).toFixed(2))
            const logourl = currentStock.logourl
            return { ...asset, current_price, current_total: Number(current_total.toFixed(2)), balance, balance_with_earnings, logourl }
        }))

        return assets
    }

    async consolidateAssets(assets: AssetCurrentPrice[]) {

        /* Separate the assets by total_quantity */
        const notSoldAssets = assets.filter((asset) => asset.total_quantity > 0)

        /* If total_quantity is equal 0, it means that it's a fully sold asset */
        const soldAssets = assets.filter((asset) => asset.total_quantity === 0)

        /* Reduce the not fully sold assets to get the consolidated amount of each information */
        const consolidated = notSoldAssets.reduce((acc, asset) => {
            return acc = {
                ...acc,
                [asset.asset_type]: {
                    current: acc[asset.asset_type].current + +asset.current_total,
                    price: acc[asset.asset_type].price + +asset.total_price,
                    discounted_price: acc[asset.asset_type].discounted_price + +asset.discounted_price,
                    earnings: acc[asset.asset_type].earnings + +asset.earnings_received,
                    balance: Number((acc[asset.asset_type].balance + asset.balance).toFixed(2)),
                    discounted_balance: Number((acc[asset.asset_type].discounted_balance + asset.balance_with_earnings).toFixed(2)),
                    sold_balance: 0,
                    total_sold_balance: Number((acc[asset.asset_type].discounted_balance + asset.balance_with_earnings).toFixed(2))
                },
                total: {
                    current: acc.total.current + +asset.current_total,
                    price: acc.total.price + +asset.total_price,
                    discounted_price: acc.total.discounted_price + +asset.discounted_price,
                    earnings: acc.total.earnings + +asset.earnings_received,
                    balance: Number((acc.total.balance + asset.balance).toFixed(2)),
                    discounted_balance: Number((acc.total.discounted_balance + asset.balance_with_earnings).toFixed(2)),
                    sold_balance: 0,
                    total_sold_balance: Number((acc.total.discounted_balance + asset.balance_with_earnings).toFixed(2))
                }
            }
        }, {
            realestate: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0, sold_balance: 0, total_sold_balance: 0 },
            stockshare: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0, sold_balance: 0, total_sold_balance: 0 },
            total: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0, sold_balance: 0, total_sold_balance: 0 }
        })

        /* Reduce the fully sold assets, starting with the previous calculated consolidated, to get the consolidated with the fully sold values  */
        const consolidatedWithSoldAssets = soldAssets.reduce((acc, asset) => {
            return acc = {
                ...acc,
                [asset.asset_type]: {
                    ...acc[asset.asset_type],
                    earnings: acc[asset.asset_type].earnings + asset.earnings_received,
                    discounted_balance: Number((acc[asset.asset_type].discounted_balance + asset.earnings_received).toFixed(2)),
                    sold_balance: Number((acc[asset.asset_type].sold_balance + asset.balance).toFixed(2)),
                    total_sold_balance: Number((acc[asset.asset_type].total_sold_balance + asset.balance_with_earnings).toFixed(2))
                },
                total: {
                    ...acc.total,
                    earnings: acc.total.earnings + asset.earnings_received,
                    discounted_balance: Number((acc.total.discounted_balance + asset.earnings_received).toFixed(2)),
                    sold_balance: Number((acc.total.sold_balance + asset.balance).toFixed(2)),
                    total_sold_balance: Number((acc.total.total_sold_balance + asset.balance_with_earnings).toFixed(2))
                }
            }
        }, consolidated)

        return consolidatedWithSoldAssets
    }

    async findAssetById(assetId: number, userId: number) {
        const [asset] = await this.assetRepository.find({ asset_id: assetId, user: userId }, { populate: ['operations', 'earnings'] })
        return asset
    }

    async create(asset: CreateAssetDto, userId: number) {
        const createAsset = this.assetRepository.create({ ...asset, user: userId })
        await this.assetRepository.flush()
        return createAsset
    }

    async deleteAsset(assetId: number, userId: number) {
        const asset = await this.assetRepository.findOneOrFail({ asset_id: assetId, user: userId })
        this.assetRepository.remove(asset)
        await this.assetRepository.flush()
        return asset
    }

    async findInvestmentDevelopmentData(userId: number) {
        const qb = this.assetRepository.createQueryBuilder('a')
        const operationsQuery = qb
            .select([
                '*',
                "SUM(case when o.operation_type = 'bought' then o.operation_price * o.quantity ELSE o.operation_price * -o.quantity END) as total_price",
                "SUM(case when o.operation_type = 'bought' then o.quantity ELSE -o.quantity END) AS total_quantity",
                "year(o.operation_date) as year",
                "month(o.operation_date) as month",
                'count(o.operation_id) as count'
            ], true)
            .join('a.operations', 'o')
            .where({ user: userId })
            .groupBy(['asset_id', 'year(o.operation_date)', 'month(o.operation_date)'])

        const result: any[] = await operationsQuery.execute()

        const consolidatedByMonthAndYear = result.reduce((acc, current, index, array) => {
            const dataBasedOnMonth = array.filter((item) => item.month === current.month && item.year === current.year)
            const newAcc = dataBasedOnMonth.reduce((a, i) => {
                const value = i.total_price + a.value
                const month = i.month
                const year = i.year
                const count = dataBasedOnMonth.length
                return {
                    value,
                    month,
                    year,
                    count
                }
            }, { value: 0, month: 0, year: 0 })

            acc = [...acc, newAcc]
            return acc
        }, [])

        const consolidatedWithoutDuplicates = consolidatedByMonthAndYear.reduce((acc, current) => {
            if (!acc.find(item => current.month === item.month && current.year === item.year)) {
                acc.push(current)
            }
            return acc
        }, [])

        const sortedConsolidatedData = consolidatedWithoutDuplicates.sort((a, b) => a.month - b.month).sort((a, b) => a.year - b.year)
        const continuousConsolidatedData = sortedConsolidatedData.reduce((acc, current, idx) => {

            const totalValue = acc.length > 0 ? acc[idx - 1].value + current.value : current.value
        
            const date = new Date(current.year, current.month - 1)
            const newData = {
                date,
                value: totalValue
            }

            acc.push(newData)
            return acc

        }, [])


        return continuousConsolidatedData
    }
}
