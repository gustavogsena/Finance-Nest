import { DecimalType, FloatType } from '@mikro-orm/core';
import { IsDate, IsDecimal, IsNumber, IsPositive, IsString, Matches, Min, NotEquals } from 'class-validator';


const typeRegex = new RegExp(/^(bought|sold)$/)

export class CreateOperationDto {

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsDecimal()
    @NotEquals('0')
    operation_price: DecimalType;

    @IsString()
    @Matches(typeRegex)
    operation_type: string;

    @IsString()
    operation_date: Date;

}
