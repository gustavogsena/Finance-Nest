import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { OperationService } from "./operation.service";
import { OperationController } from "./operation.controller";
import { Operation } from "./operation.entity";
import { Asset } from "../assets/assets.entity";
import { User } from "../user/user.entity";
import { AssetsService } from "src/assets/assets.service";
import { BolsaService } from "src/bolsa/bolsa.service";


@Module({
    imports: [MikroOrmModule.forFeature([Operation, Asset, User])],
    controllers: [OperationController],
    providers: [OperationService, AssetsService, BolsaService]
})
export class OperationModule { }