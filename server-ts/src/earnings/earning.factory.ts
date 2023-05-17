import { Factory, Faker } from '@mikro-orm/seeder';
import { Earning } from './earning.entity';
import { DecimalType } from '@mikro-orm/core';

export class EarningFactory extends Factory<Earning> {
    model = Earning;

    definition(faker: Faker): Partial<Earning> {
        const randomNumber = Math.round(Math.random() * 2)
        const type = randomNumber === 0 ? "dividends" : randomNumber === 1 ? "interest" : "income"
        const newDate = faker.date.past()
        const separetedDate = getDateObject(newDate)
        return {
            earning_type: type,
            earning_value: (faker.random.numeric(2)) as unknown as DecimalType,
            earning_date: newDate,
            ...separetedDate,
            created_at: faker.date.recent()
        };
    }
}

const getDateObject = (date: Date) => {
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    return {
        day,
        month,
        year
    }
}