import { Type } from "class-transformer"
import { Contains, IsNumber, IsOptional, IsString, Matches, MaxLength } from "class-validator"


const typeRegex = new RegExp(/^(realestate|stockshare)$/)

export class EarningQueryDto {

    @IsOptional()
    @IsString()
    orderBy?: string

    @IsOptional()
    @IsString()
    direction?: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    search?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    offset?: number

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @Matches(typeRegex , {message: 'Type should be realestate or stockshare'})
    type?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    assetId?: number
}
