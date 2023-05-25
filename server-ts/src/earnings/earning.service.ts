import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';;
import { EntityRepository } from '@mikro-orm/mysql';
import { Earning } from './earning.entity';
import { CreateEarningDto } from './dto/createEarning.dto';
import { Asset } from 'src/assets/assets.entity';
import { wrap } from '@mikro-orm/core';
import { CreateEarningBodyDto } from './earning.controller';
import { UpdateEarningDto } from './dto/updateEarning.dto';

@Injectable()
export class EarningService {
    constructor(
        @InjectRepository(Earning) private readonly earningRepository: EntityRepository<Earning>,
        @InjectRepository(Asset) private readonly assetRepository: EntityRepository<Asset>
    ) { }


    async findEarnings({
        direction = 'desc',
        orderBy = 'created_at',
        search = '',
        limit = 5,
        offset = 0,
        type = '',
        assetId = 0
    }, userId: number) {
        const orderByFilter = orderBy !== 'earning_date' || 'created_at' ? 'earning_date': orderBy
        const typeQuery = type ? { asset_type: type } : {}
        const assetIdQuery = assetId ? { user: userId, asset_id: assetId } : { user: userId }

        const qb = this.earningRepository.createQueryBuilder('e')
        const query = qb
            .select([
                '*',
                'a.asset_code'
            ])
            .join('e.asset', 'a')
            .where({
                asset: {
                    ...typeQuery,
                    ...assetIdQuery,
                },
                $or: [
                    {
                        'a.asset_code': {
                            $like: `%${search}%`
                        }
                    },
                    {
                        'a.asset_name': {
                            $like: `%${search}%`
                        }
                    },
                    {
                        'e.earning_type': {
                            $like: `%${search}%`
                        }
                    }
                ]
            })
            .orderBy({ [orderByFilter]: direction })

        const countQuery = query.clone()
        const [count] = await countQuery.count().execute()

        const earnings = await query.limit(limit).offset(offset).execute()
        return {
            earnings,
            ...count
        }
    }
    async findEarningById(earningId: number) {
        const [earning] = await this.earningRepository.find({ earning_id: earningId }, { populate: ['asset'] })
        return earning
    }

    async findEarningPerMonth({ offset = 0, limit = 12 }, userId: number) {
        const qb = this.earningRepository.createQueryBuilder('e')
        const query = qb
            .select([
                'month',
                'year',
                'SUM(e.earning_value) as total_earning'
            ])
            .where({ asset: { user: userId } })
            .groupBy(['e.month', 'e.year'])
            .orderBy({ month: 'asc', year: 'asc' })
            .limit(limit)
            .offset(offset)

        const result = await query.execute()

        return result
    }

    async findEarningByAssetId(assetId: number) {
        const qb = this.earningRepository.createQueryBuilder('e')
        const query = qb
            .select([
                '*'
            ])
            .join('e.asset', 'a')
            .where({ asset: { asset_id: assetId } })

        const result = await query.execute()
        return result
    }

    async create(body: CreateEarningBodyDto) {

        let asset = await this.assetRepository.findOneOrFail({ asset_id: body.asset_id })
        const date = new Date(body.earning.earning_date)
        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()

        if (asset) {
            const newEarning = new Earning
            newEarning.asset = asset
            newEarning.day = day
            newEarning.month = month
            newEarning.year = year
            wrap(newEarning).assign(body.earning)
            await this.earningRepository.persistAndFlush(newEarning)

            return newEarning
        }

        throw new Error("Erro ao criar novo provento")
    }

    async updateEarning(earning: UpdateEarningDto, earningId: number) {
        const editedEarning = await this.earningRepository.findOneOrFail({ earning_id: earningId })
        wrap(editedEarning).assign(earning)
        this.earningRepository.flush()
        return editedEarning
    }

    async deleteEarning(earningId: number) {
        const earning = await this.earningRepository.findOneOrFail({ earning_id: earningId })
        this.earningRepository.remove(earning)
        await this.earningRepository.flush()
        return earning
    }

}
