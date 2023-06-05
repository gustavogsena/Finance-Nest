import type { DecimalType, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from '../user/user.factory';
import { AssetFactory } from '../assets/assets.factory';
import { OperationFactory } from '../operations/operation.factory';
import { EarningFactory } from 'src/earnings/earning.factory';
import { BolsaService } from 'src/bolsa/bolsa.service';
import { RadarFactory } from 'src/radar/radar.factory';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const Users = await new UserFactory(em)
      .each(async (user) => {
        user.radar.set(new RadarFactory(em).make(5, { user }))
        user.assets.set(new AssetFactory(em)
          .each(async (asset) => {
            asset.operations.set(new OperationFactory(em).make(10))
            asset.earnings.set(new EarningFactory(em).make(20))
          })
          .make(20, { user }))
      })
      .create(1)
  }
}

/* const getPrice = async (code: string): Promise<DecimalType> => {
  const randomValue = Math.random()
  const [asset] = await (new BolsaService).retornaAtivoProcurado(code)
  let price = asset.regularMarketPrice
  if (randomValue > 0.25 && randomValue < 0.75) {
    price = price - (randomValue * 2)
  } else {
    price = price + (randomValue * 2)
  }
  console.log(price)
  return price
} */