import { DecimalType } from "@mikro-orm/core";
import { IsDecimal, IsNumber, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";


const typeRegex = new RegExp(/^(dividends|interest|income)$/)

export class CreateEarningDto {
    @IsString()
    @Matches(typeRegex)
    earning_type: 'dividends' | 'interest' | 'income';

    @IsString()
    earning_date: Date;

    @IsDecimal()
    earning_value: DecimalType;
}