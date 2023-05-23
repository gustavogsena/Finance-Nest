import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from '../user/user.entity';
import { PopulateHint, wrap } from '@mikro-orm/core';
import { Asset } from '../assets/assets.entity';
import { Operation } from './operation.entity';
import { CreateTransactionBodyDto } from './operation.controller';
import { CreateOperationDto } from './dto/createOperation.dto';
import { EditOperationDto } from './dto/editOperation.dto';
import { AssetsService } from 'src/assets/assets.service';
import { OperationQueryDto } from './dto/operationQuery.dto';

@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(Operation) private readonly operationRepository: EntityRepository<Operation>,
        @InjectRepository(Asset) private readonly assetRepository: EntityRepository<Asset>,
        private readonly assetService: AssetsService
    ) { }

    async getOperations(
        {
            direction = 'desc',
            orderBy = 'created_at',
            search = '',
            limit = 5,
            offset = 0,
            type = '',
            assetId = 0
        }: OperationQueryDto, userId: number) {
        const qb = this.operationRepository.createQueryBuilder('o')
        const typeQuery = type ? { 'a.asset_type': type } : {}
        const assetIdQuery = assetId ? { 'o.asset': assetId } : {}
        const query = qb
            .select([
                '*',
                'a.asset_code',
                'a.asset_type',
                "(o.operation_price * o.quantity) as volume",
            ])
            .join('asset', 'a')
            .where({
                'a.user': userId,
                ...assetIdQuery,
                ...typeQuery,
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
                        'a.asset_type': {
                            $like: `%${search}%`
                        }
                    },
                    {
                        'o.operation_type': {
                            $like: `%${search}%`
                        }
                    }
                ]
            })
            .orderBy({ [orderBy]: direction })



        const countQuery = query.clone()
        const [count] = await countQuery.count().execute()
        const operations = await query.limit(limit).offset(offset).execute()
        return {
            operations,
            ...count
        }
    }

    async getOperationById(operationId: number, userId: number) {
        const [operation] = await this.operationRepository.find({ operation_id: operationId, asset: {user: userId} }, { populate: ['asset', 'asset.user'], fields: ['*','asset.*','asset.user.id'] })
        return operation
    }

    async createOperation(body: CreateTransactionBodyDto, userId: number) {
        let asset = await this.assetRepository.findOne({ asset_code: body.asset.asset_code, user: userId })

        if (!asset) {
            asset = await this.assetService.create(body.asset, userId)
        }

        if (asset) {
            const newOperation = new Operation
            newOperation.asset = asset
            wrap(newOperation).assign(body.operation)
            await this.operationRepository.persistAndFlush(newOperation)

            return newOperation
        }

        throw new Error("Erro ao criar nova operação")
    }


    async editOperation(operation: EditOperationDto, operationId: number, userId: number) {
        const editedOperation = await this.operationRepository.findOneOrFail({ operation_id: operationId, asset: { user: userId }})
        wrap(editedOperation).assign(operation)
        this.operationRepository.flush()
        return editedOperation
    }

    async deleteOperation(operationId: number, userId: number) {
        const operation: Operation = await this.operationRepository.findOneOrFail({ operation_id: operationId, asset: { user: userId } })
        this.operationRepository.remove(operation)
        await this.operationRepository.flush()
        const asset: Asset = await this.assetRepository.findOneOrFail({ asset_id: operation.asset.asset_id, user: userId }, { populate: ['operations'] })
        if (asset.operations.length === 0) {
            this.assetRepository.remove(asset)
            await this.assetRepository.flush()
        }
        return operation
    }
}
