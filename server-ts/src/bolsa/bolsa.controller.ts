import { Controller, Get, Param } from "@nestjs/common";
import { BolsaService } from "./bolsa.service";
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
    @Get(':id')
    async getStockById(@Param('id') id: string) {
        const response = await this.bolsaService.retornaAtivoProcurado(id)
        return response

    }
}
