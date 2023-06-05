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
            await user.radar.init()
            const itensRadar = user.radar.getItems()
            if (itensRadar.length === 10) {
                return {
                    sucess: false,
                    error: 'Você já atingiu o limite de itens adicionados no radar'
                }
            }
            if (itensRadar.some((item) => item.asset_code === code)) {
                return {
                    sucess: false,
                    error: 'Item já adicionado ao radar'
                }
            }
            const [currentRadarInfo] = await this.bolsaService.retornaAtivoProcurado(code)

            const radar = new Radar
            radar.user = user
            radar.asset_code = code
            radar.current_value = currentRadarInfo.regularMarketPrice as unknown as DecimalType
            radar.previous_close_value = currentRadarInfo.regularMarketPreviousClose as unknown as DecimalType
            radar.logo_url = currentRadarInfo.logourl
            await this.radarRepository.persistAndFlush(radar)

            delete radar.user.password
            return {
                sucess: true,
                data: radar
            }
        } catch (error) {
            return {
                sucess: false,
                error: 'Erro ao buscar ativo'
            }
        }
    }

    async delete(radarId: number, userId: number) {
        try {
            const radarItem = await this.radarRepository.findOneOrFail({ radar_id: radarId, user: userId })
            this.radarRepository.remove(radarItem)
            await this.radarRepository.flush()
            return {
                sucess: true,
                data: radarItem
            }
        } catch (e) {
            return {
                sucess: false,
                error: 'Item não encontrado ou usuário não autorizado'
            }
        }
    }

    async update(radarId: number) {
        const updatedRadarItem = await this.radarRepository.findOneOrFail({ radar_id: radarId }, {
            failHandler: () => {
                throw new Error('Item de Radar não encontrado')
            }
        })
        try {
            const [updatedAssetValues] = await this.bolsaService.retornaAtivoProcurado(updatedRadarItem.asset_code, { fundamental: true })
            const updatedValues = {
                current_value: updatedAssetValues.regularMarketPrice as unknown as DecimalType,
                previous_close_value: updatedAssetValues.regularMarketPreviousClose as unknown as DecimalType,
                logo_url: updatedAssetValues.logourl
            }
            wrap(updatedRadarItem).assign(updatedValues)
            this.radarRepository.flush()
            return {
                sucess: true,
                data: updatedRadarItem
            }
        } catch {
            return {
                sucess: false,
                error: 'Falha ao atualizar item do radar'
            }
        }

    }

    async updateRadarItems(userId: number): Promise<Radar[]> {
        const allRadarItems = (await this.radarRepository.find({ user: userId })).slice(
        )
        const newValues = await Promise.all(allRadarItems.map(async (item) => {
            return (await this.update(item.radar_id)).data
        }))
        return newValues
    }
}
