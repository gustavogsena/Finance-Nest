import { Controller, Get, Param, Query } from "@nestjs/common";
import { BolsaService, SingleStockQuery } from "./bolsa.service";
import { Public } from "../auth/auth.guard";

@Controller('/bolsa')
export class BolsaController {
    constructor(private readonly bolsaService: BolsaService) { }
    
    @Public()
    @Get('/acoes')
    async getStocks() {
        const response = await this.bolsaService.retornaTodasAcoes();
        return this.bolsaService.getAcoesSemFracionados(response)
    }

    @Public()
    @Get('/fiis')
    async getRealState() {
        const response = await this.bolsaService.retornaTodasAcoes();
        return this.bolsaService.filterFundosImobiliarios(response)
    }

    @Public()
    @Get(':code')
    async getStockByCode(@Param('code') code: string, @Query() query: SingleStockQuery) {
        const response = await this.bolsaService.retornaAtivoProcurado(code, query)
        return response

    }
}
