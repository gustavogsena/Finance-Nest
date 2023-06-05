import { Factory, Faker } from '@mikro-orm/seeder';
import { DecimalType } from '@mikro-orm/core';
import { Radar } from './radar.entity';
import { getRandomCode } from 'src/assets/assets.factory';

export class RadarFactory extends Factory<Radar> {
    model = Radar;

    definition(faker: Faker): Partial<Radar> {
        const randomNumber = Math.round(Math.random())
        const type = randomNumber === 1 ? `stockshare` : 'realestate'
        const {asset_code} = getRandomCode(type)
        return {
            asset_code,
            logo_url: '',
            current_value: 0 as unknown as DecimalType,
            previous_close_value: 0 as unknown as DecimalType,
            created_at: faker.date.recent()
        }
    };
}
