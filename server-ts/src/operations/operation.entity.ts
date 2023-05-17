import {
    PrimaryKey,
    Property,
    Entity,
    DateTimeType,
    ManyToOne,
    DecimalType,
} from '@mikro-orm/core';
import { Asset } from 'src/assets/assets.entity';

@Entity()
export class Operation {
    @PrimaryKey()
    operation_id: number;

    @Property()
    quantity: number;

    @Property()
    operation_price: DecimalType;

    @Property()
    operation_type: string;

    @Property({ type: DateTimeType })
    operation_date: Date;

    @Property({ type: DateTimeType })
    created_at = new Date();

    @ManyToOne(() => Asset, {
        onDelete: 'cascade',
    })
    asset: Asset;
}
