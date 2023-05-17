import { Factory, Faker } from '@mikro-orm/seeder';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

const rounds = 10;

export class UserFactory extends Factory<User> {
    model = User;
    definition(faker: Faker): Partial<User> {
        return {
            email: faker.internet.email(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: '12345678'
        };
    }
}