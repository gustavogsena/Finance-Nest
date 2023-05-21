import type { DecimalType, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from '../user/user.factory';
import { AssetFactory } from '../assets/assets.factory';
import { OperationFactory } from '../operations/operation.factory';
import { EarningFactory } from 'src/earnings/earning.factory';
import { BolsaService } from 'src/bolsa/bolsa.service';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const Users = await new UserFactory(em)
      .each(async (user) => {
        user.assets.set(new AssetFactory(em)
          .each(async (asset) => {
            asset.operations.set(new OperationFactory(em).make(5))
            asset.earnings.set(new EarningFactory(em).make(20))
          })
          .make(3, { user }))
      })
      .create(5)
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