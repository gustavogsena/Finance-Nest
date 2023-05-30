import { Factory, Faker } from '@mikro-orm/seeder';
import { DecimalType } from '@mikro-orm/core';
import { Radar } from './radar.entity';

export class RadarFactory extends Factory<Radar> {
    model = Radar;

    definition(faker: Faker): Partial<Radar> {
        return new Radar()
    };
}
