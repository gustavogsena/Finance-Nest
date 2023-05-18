import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BolsaModule } from './bolsa/bolsa.module';
import { AssetsModule } from './assets/assets.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OperationModule } from './operations/operations.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EarningModule } from './earnings/earning.module';
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
    BolsaModule, AssetsModule,
    OperationModule,
    UserModule,
    AuthModule,
    EarningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
