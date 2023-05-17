import { DecimalType, FloatType } from '@mikro-orm/core';
import { PartialType } from '@nestjs/mapped-types';
import { IsDecimal, IsNumber, IsOptional, IsPositive, IsString, Matches, Min, NotEquals } from 'class-validator';
import { CreateOperationDto } from './createOperation.dto';
import { Type } from 'class-transformer';

const typeRegex = new RegExp(/^(bought|sold)$/)

export class EditOperationDto extends PartialType(CreateOperationDto) {
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsOptional()
    @IsDecimal()
    @NotEquals('0')
    operation_price: DecimalType;

    @IsOptional()
    @IsString()
    @Matches(typeRegex)
    operation_type: string;

    @IsOptional()
    @IsString()
    operation_date: Date;

}
