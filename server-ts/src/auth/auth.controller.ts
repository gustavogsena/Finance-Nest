import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginCredentialsDto } from "./dto/loginCredentials.dto";
import { AuthGuard, Public } from "./auth.guard";
import { CreateUserDto } from "src/user/dto/createUser.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginCredentialsDto: LoginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }

    @Public()
    @Post('create')
    create(@Body() newUser: CreateUserDto) {
        return this.authService.createAccount(newUser)
    }

}