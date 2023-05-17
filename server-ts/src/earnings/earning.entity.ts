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
export class Earning {

    @PrimaryKey()
    earning_id: number;

    @Property()
    earning_type: string;

    @Property()
    earning_value: DecimalType;

    @Property({ type: DateTimeType })
    earning_date: Date;

    @Property()
    day: number;

    @Property()
    month: number;

    @Property()
    year: number;

    @Property({ type: DateTimeType })
    created_at = new Date();

    @ManyToOne(() => Asset, {
        onDelete: 'cascade',
    })
    asset: Asset;
}