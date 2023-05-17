import { Module } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { AssetsController } from "./assets.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Asset } from "./assets.entity";
import { User } from "src/user/user.entity";
import { BolsaService } from "src/bolsa/bolsa.service";

@Module({
    imports: [MikroOrmModule.forFeature([Asset, User])],
    controllers: [AssetsController],
    providers: [AssetsService, BolsaService]
})
export class AssetsModule { }