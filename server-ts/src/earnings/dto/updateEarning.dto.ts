import { DecimalType } from "@mikro-orm/core";
import { IsDecimal, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";


const typeRegex = new RegExp(/^(dividends|interest|income)$/)

export class UpdateEarningDto {

    @IsOptional()
    @IsString()
    @Matches(typeRegex)
    earning_type: 'dividends' | 'interest' | 'income';

    @IsOptional()
    @IsString()
    earning_date: Date;

    @IsOptional()
    @IsDecimal()
    earning_value: DecimalType;
}