import { Body, Controller, Delete, Get, Param, Post, Query, Req } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { Asset } from "./assets.entity";
import { CreateAssetDto } from "./dto/asset.dto";
import { AssetQueryDto } from "./dto/assetQuery.dto";
import { Public } from "src/auth/auth.guard";

@Controller('/assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) { }

    @Get()
    async getAssets(@Query() query: AssetQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.assetsService.findAssets(query, userId);
        return response
    }
    
    @Get('/consolidated')
    async getConsolidated(@Query() query: AssetQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const assets = await this.assetsService.findAssets(query, userId);
        const response = await this.assetsService.consolidateAssets(assets)
        return response
    }

    @Get('/development')
    async getDevelopmentData(@Query() query: AssetQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.assetsService.findInvestmentDevelopmentData(userId)
        return response
    }

    @Get('/:assetId')
    async getAssetById(@Param('assetId') assetId: string, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.assetsService.findAssetById(+assetId, userId);
        return response
    }

    @Post()
    async createAsset(@Body() asset: CreateAssetDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const newAsset = await this.assetsService.create(asset, userId)
        return newAsset
    }

    @Delete('/:assetId')
    async deleteAsset(@Param('assetId') assetId: string, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.assetsService.deleteAsset(+assetId, userId)
        return response
    }

}
