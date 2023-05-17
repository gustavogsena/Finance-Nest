import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { OperationService } from "./operation.service";
import { Operation } from "./operation.entity";
import { CreateOperationDto } from "./dto/createOperation.dto";
import { EditOperationDto } from "./dto/editOperation.dto";
import { CreateAssetDto } from "src/assets/dto/asset.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OperationQueryDto } from "./dto/operationQuery.dto";
import { Public } from "src/auth/auth.guard";

export class CreateTransactionBodyDto {

    @ValidateNested()
    @Type(() => CreateOperationDto)
    operation: CreateOperationDto

    @ValidateNested()
    @Type(() => CreateAssetDto)
    asset: CreateAssetDto
}

@Controller('/operation')
export class OperationController {
    constructor(private readonly operationsService: OperationService) { }

    @Get()
    async getOperations(@Query() query: OperationQueryDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.operationsService.getOperations(query, userId);
        return response
    }

    @Get('/:operationId')
    async getOperationById(@Param('operationId') operationId: string, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.operationsService.getOperationById(+operationId, userId);
        return response
    }

    @Post()
    async createOperation(@Body() body: CreateTransactionBodyDto, @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.operationsService.createOperation(body, userId);
        return response
    }

    @Put('/:operationId')
    async editOperation(@Body() operation: EditOperationDto, @Param('operationId') operationId: string,  @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.operationsService.editOperation(operation, +operationId, userId);
        return response
    }

    @Delete('/:operationId')
    async deleteOperation(@Param('operationId') operationId: string,  @Req() req: Request) {
        const userId: number = req['user'].id
        const response = await this.operationsService.deleteOperation(+operationId, userId);
        return response
    }

}
