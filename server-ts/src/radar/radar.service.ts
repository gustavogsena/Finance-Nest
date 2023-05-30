import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';;
import { EntityRepository } from '@mikro-orm/mysql';
import { Radar } from './radar.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { BolsaService } from 'src/bolsa/bolsa.service';
import { DecimalType, wrap } from '@mikro-orm/core';

@Injectable()
export class RadarService {
    constructor(
        @InjectRepository(Radar) private readonly radarRepository: EntityRepository<Radar>,
        private readonly userService: UserService,
        private readonly bolsaService: BolsaService,


    ) { }

    async findAll(userId: number) {
        const radarItens = await this.radarRepository.find({ user: userId })
        return radarItens
    }

    async create(code: string, userId: number) {
        const user = await this.userService.findById(userId)
        try {
            const [currentRadarInfo] = await this.bolsaService.retornaAtivoProcurado(code)
            const radar = new Radar
            radar.user = user
            radar.asset_code = code
            radar.current_value = currentRadarInfo.regularMarketPrice as unknown as DecimalType
            radar.previous_close_value = currentRadarInfo.regularMarketPreviousClose as unknown as DecimalType
            radar.logo_url = currentRadarInfo.logourl
            await this.radarRepository.persistAndFlush(radar)

            delete radar.user.password
            return radar
        } catch (error) {
            throw new Error('Erro ao buscar ativo')
        }
    }

    async delete(radarId: number, userId: number) {
        try {
            const radarItem = await this.radarRepository.findOneOrFail({ radar_id: radarId, user: userId })
            this.radarRepository.remove(radarItem)
            await this.radarRepository.flush()
            return radarItem
        } catch (e) {
            return {
                sucess: false,
                error: 'Item não encontrado ou usuário não autorizado'
            }
        }
    }

    async update(radarId: number) {
        const updatedRadarItem = await this.radarRepository.findOneOrFail({ radar_id: radarId })
        const [updatedAssetValues] = await this.bolsaService.retornaAtivoProcurado(updatedRadarItem.asset_code)
        const updatedValues = {
            current_value: updatedAssetValues.regularMarketPrice as unknown as DecimalType,
            previous_close_value: updatedAssetValues.regularMarketPreviousClose as unknown as DecimalType
        }
        wrap(updatedRadarItem).assign(updatedValues)
        this.radarRepository.flush()
        return updatedRadarItem
    }

    async updateRadarItems(userId: number) {
        const allRadarItems = await this.findAll(userId)
        const newValues = await Promise.all(allRadarItems.map(async (item) => {
            return await this.update(item.radar_id)
        }))
        return newValues
    }
}
