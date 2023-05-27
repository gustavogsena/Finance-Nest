import { DecimalType } from "@mikro-orm/core";
import { IsDecimal, IsNumber, IsString, Matches, MaxLength, MinLength, NotEquals, ValidateNested } from "class-validator";


const typeRegex = new RegExp(/^(dividends|interest|income)$/)

export class CreateEarningDto {
    @IsString()
    @Matches(typeRegex)
    earning_type: 'dividends' | 'interest' | 'income';

    @IsString({message: 'Data inválida'})
    earning_date: Date;

    @IsDecimal({locale: 'pt-BR'})
    @NotEquals('0')
    earning_value: DecimalType;
}