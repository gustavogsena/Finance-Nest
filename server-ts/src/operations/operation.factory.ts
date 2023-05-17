import { Factory, Faker } from '@mikro-orm/seeder';
import { Operation } from './operation.entity';
import { DecimalType } from '@mikro-orm/core';

export class OperationFactory extends Factory<Operation> {
    model = Operation;

    definition(faker: Faker): Partial<Operation> {
        const randomNumber = Math.round(Math.random() * 2)
        const type = randomNumber === 0 ? "bought" : "bought"
        const quantity = (randomNumber + 1) * 100
        const newDate = faker.date.past()

        return {
            quantity: quantity,
            operation_price: (faker.random.numeric(2)) as unknown as DecimalType,
            operation_type: type,
            operation_date: newDate,
            created_at: faker.date.recent()
        };
    }
}