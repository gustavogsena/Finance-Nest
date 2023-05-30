import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/user/user.entity";
import { Radar } from "./radar.entity";
import { RadarController } from "./radar.controller";
import { RadarService } from "./radar.service";
import { BolsaService } from "src/bolsa/bolsa.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [MikroOrmModule.forFeature([User, Radar])],
    controllers: [RadarController],
    providers: [RadarService, BolsaService, UserService]
})
export class RadarModule { }