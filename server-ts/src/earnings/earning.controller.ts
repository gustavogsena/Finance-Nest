import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { EarningService } from "./earning.service";
import { CreateEarningDto } from "./dto/createEarning.dto";
import { IsNumber, Min, NotEquals, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EarningQueryDto } from "./dto/earningQuery.dto";
import { UpdateEarningDto } from "./dto/updateEarning.dto";



export class CreateEarningBodyDto {

    @ValidateNested()
    @Type(() => CreateEarningDto)
    earning: CreateEarningDto

    @IsNumber()
    @Min(1, { message: "Você deve escolher um ativo da lista" })
    asset_id: number
}

@Controller('/earning')
export class EarningsController {
    constructor(private readonly earningService: EarningService) { }

    @Get()
    async getEarnings(@Query() query: EarningQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.earningService.findEarnings(query, userId);
        return response
    }


    @Get('/:earningId')
    async getEarningById(@Param('earningId') earningId: string, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.earningService.findEarningById(+earningId);
        return response
    }

    @Post()
    async createEarning(@Body() body: CreateEarningBodyDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const newAsset = await this.earningService.create(body)
        return newAsset
    }

    @Put('/:earningId')
    async updateEarning(@Body() body: UpdateEarningDto, @Param('earningId') earningId: number, @Req() req: Request) {
        const userId: number = req['user'].id
        const newAsset = await this.earningService.updateEarning(body, earningId)
        return newAsset
    }

    @Delete('/:earningId')
    async deleteEarning(@Param('earningId') earningId: string, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.earningService.deleteEarning(+earningId)
        return response
    }


    @Get('/consolidated/')
    async getEarningPerMonth(@Query() query: EarningQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.earningService.findEarningPerMonth(query, userId);
        return response
    }

    /* 
    @Get('/asset/:assetId')
    async getEarningByAssetId(@Param('assetId') assetId: string) {
        const response = await this.earningService.findEarningByAssetId(+assetId);
        return response
    } */


}
