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

    async findAssets(
        {
            type = ''
        }: AssetQueryDto,
        userId: number) {
        const where = type ? { user: userId, asset_type: type } : { user: userId }
        const qb = this.assetRepository.createQueryBuilder('a')
        const query = qb
            .select([
                '*',
                "SUM(case when o.operation_type = 'bought' then o.operation_price * o.quantity ELSE o.operation_price * -o.quantity END) as total_price",
                "SUM(case when o.operation_type = 'bought' then o.quantity ELSE -o.quantity END) AS total_quantity",
            ], true)
            .join('a.operations', 'o')
            .where(where)
            .groupBy('asset_id')


        const qb2 = this.assetRepository.createQueryBuilder('a')
        const earnings = qb2.select(['*', 'SUM(e.earning_value) as earnings_received']).leftJoin('a.earnings', 'e').where(where).groupBy('asset_id')

        const earningsResult: AssetWithEarnings[] = await earnings.execute()
        const result: AssetConsolidated[] = await query.execute()

        const resultWithEarnings = result.map((item) => {
            const [asset] = earningsResult.filter((earningAsset) => earningAsset.asset_id === item.asset_id)
            return {
                ...item,
                earnings_received: asset.earnings_received
            }
        })

        const queryWithAvaragePrice: AssetAvaragePrice[] = resultWithEarnings.map((asset) => {
            const average_price = (asset.total_price / asset.total_quantity).toFixed(2)
            const discounted_price = asset.total_price - +asset.earnings_received
            const discounted_average_price = (discounted_price / asset.total_quantity).toFixed(2)
            const earnings_received = asset.earnings_received === null ? 0 : asset.earnings_received
            return { ...asset, earnings_received, average_price, discounted_average_price, discounted_price }
        })

        const assetsWithCurrentPrice: AssetCurrentPrice[] = await this.findAssetsCurrentPrice(queryWithAvaragePrice)

        return assetsWithCurrentPrice
    }


    async findAssetsCurrentPrice(assetArray: AssetAvaragePrice[]): Promise<AssetCurrentPrice[]> {
        const assets = await Promise.all(assetArray.map(async (asset: AssetAvaragePrice) => {
            const [currentStock] = await this.bolsaService.retornaAtivoProcurado(asset.asset_code)
            const current_price = currentStock.regularMarketPrice
            const current_total = currentStock.regularMarketPrice * asset.total_quantity
            const balance = Number((current_total - asset.total_price).toFixed(2))
            const balance_with_earnings = Number((balance + +asset.earnings_received).toFixed(2))
            return { ...asset, current_price, current_total: Number(current_total.toFixed(2)), balance, balance_with_earnings }
        }))
        return assets
    }

    async consolidateAssets(assets: AssetCurrentPrice[]) {
        const consolidated = assets.reduce((acc, asset) => {
            return acc = {
                ...acc,
                [asset.asset_type]: {
                    current: acc[asset.asset_type].current + +asset.current_total,
                    price: acc[asset.asset_type].price + +asset.total_price,
                    discounted_price: acc[asset.asset_type].discounted_price + +asset.discounted_price,
                    earnings: acc[asset.asset_type].earnings + +asset.earnings_received,
                    balance: Number((acc[asset.asset_type].balance + +asset.current_total - asset.total_price).toFixed(2)),
                    discounted_balance: Number((acc[asset.asset_type].discounted_balance + +asset.current_total - +asset.discounted_price).toFixed(2))
                },
                total: {
                    current: acc.total.current + +asset.current_total,
                    price: acc.total.price + +asset.total_price,
                    discounted_price: acc.total.discounted_price + +asset.discounted_price,
                    earnings: acc.total.earnings + +asset.earnings_received,
                    balance: Number((acc.total.balance + +asset.current_total - asset.total_price).toFixed(2)),
                    discounted_balance: Number((acc.total.discounted_balance + +asset.current_total - +asset.discounted_price).toFixed(2))
                }
            }
        }, {
            realestate: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0 },
            stockshare: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0 },
            total: { current: 0, price: 0, discounted_price: 0, earnings: 0, balance: 0, discounted_balance: 0 }
        })
        return consolidated
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

}
