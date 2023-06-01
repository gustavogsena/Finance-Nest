import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        MikroOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15m' },
        }),
    ],
    providers: [AuthService, UserService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }