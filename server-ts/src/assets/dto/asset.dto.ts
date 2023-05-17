import { IsNumber, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";


const typeRegex = new RegExp(/^(realestate|stockshare)$/)

export class CreateAssetDto {

    @IsString()
    @MinLength(5)
    @MaxLength(10)
    asset_code: string;

    @IsString()
    @MinLength(6)
    @MaxLength(60)
    asset_name: string;

    @IsString()
    @Matches(typeRegex)
    asset_type: 'realestate' | 'stockshare';

}