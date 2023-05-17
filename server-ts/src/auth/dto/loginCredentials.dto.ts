import { IsEmail, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}