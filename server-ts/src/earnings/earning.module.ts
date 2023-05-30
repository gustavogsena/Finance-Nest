import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { EarningsController } from "./earning.controller";
import { EarningService } from "./earning.service";
import { Earning } from "./earning.entity";
import { Asset } from "src/assets/assets.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Asset, Earning])],
    controllers: [EarningsController],
    providers: [EarningService]
})
export class EarningModule { }