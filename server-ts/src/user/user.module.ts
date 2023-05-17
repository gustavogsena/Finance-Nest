import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { User } from "src/user/user.entity";
import { Asset } from "src/assets/assets.entity";
import { Operation } from "src/operations/operation.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [MikroOrmModule.forFeature([Asset, User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }