import {
    PrimaryKey,
    Property,
    Entity,
    OneToMany,
    Collection,
    DateTimeType,
    ManyToOne,
} from '@mikro-orm/core';
import { Earning } from 'src/earnings/earning.entity';
import { Operation } from 'src/operations/operation.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Asset {

    @PrimaryKey()
    asset_id: number;

    @Property()
    asset_code: string;

    @Property()
    asset_name: string;

    @Property()
    asset_type: string;

    @Property({ type: DateTimeType })
    created_at = new Date();

    @ManyToOne(() => User, {
        onDelete: 'cascade',
    })
    user: User;

    @OneToMany(() => Operation, (operation) => operation.asset)
    operations = new Collection<Operation>(this);

    @OneToMany(() => Earning, (earning) => earning.asset)
    earnings = new Collection<Earning>(this);
}