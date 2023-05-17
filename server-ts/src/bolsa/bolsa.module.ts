import { Module } from "@nestjs/common";
import { BolsaService } from "./bolsa.service";
import { BolsaController } from "./bolsa.controller";

@Module({
    imports: [],
    controllers: [BolsaController],
    providers: [BolsaService],
})
export class BolsaModule { }