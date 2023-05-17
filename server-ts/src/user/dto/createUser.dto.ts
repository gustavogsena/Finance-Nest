import { IsEmail, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @MinLength(2, { message: 'O nome precisa ter pelo menos 2 letras.' })
    @MaxLength(16, { message: 'O nome precisa ter até 16 caracteres.' })
    name: string;

    @MinLength(2, { message: 'O sobrenome precisa ter pelo menos 2 letras.' })
    @MaxLength(24, { message: 'O sobrenome precisa ter até 24 caracteres.' })
    surname: string;

    @IsEmail(undefined, { message: 'O email digitado é invalido.' })
    email: string;

    @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres.' })
    @MaxLength(24, { message: 'A senha precisa ter até 24 caracteres.' })
    password: string
}