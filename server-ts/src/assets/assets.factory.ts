import { Factory, Faker } from '@mikro-orm/seeder';
import { Asset } from './assets.entity';
import { BolsaService } from 'src/bolsa/bolsa.service';
import * as fs from 'fs'

type CodeAndName = {
    asset_code: string,
    asset_name: string
}

export class AssetFactory extends Factory<Asset> {
    model = Asset;

    definition(faker: Faker): Partial<Asset> {
        const randomNumber = Math.round(Math.random())
        const type = randomNumber === 1 ? `stockshare` : 'realestate'
        const codeAndName = getRandomCode(type)
        return {
            ...codeAndName,
            asset_type: type,
            created_at: faker.date.recent()
        }
    }
}

const getRandomCode = (type: string): CodeAndName => {

    if (type === 'realestate') {
        const fiis = JSON.parse(fs.readFileSync('src/bolsa/fiis.json').toString())
        
        const randomNumber = Math.floor((Math.random() * fiis.length) + 1)
        return {
            asset_code: fiis[randomNumber].stock,
            asset_name: fiis[randomNumber].name
        }
    }

    if (type === 'stockshare') {
        const stockshare =JSON.parse(fs.readFileSync('src/bolsa/acoes.json').toString())
        const randomNumber = Math.floor((Math.random() * stockshare.length) + 1)
        return {
            asset_code: stockshare[randomNumber].stock,
            asset_name: stockshare[randomNumber].name
        }
    }

}