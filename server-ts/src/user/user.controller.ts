import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get()
    async user(@Req() request: Request) {
        const payload = request['user'];
        console.log(`token ${JSON.stringify(payload)}`)
        const user = await this.userService.findById(payload.id);
        return user;
    }
}
