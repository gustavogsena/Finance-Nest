import {
    PrimaryKey,
    Property,
    Entity,
    DateTimeType,
    ManyToOne,
    DecimalType,
} from '@mikro-orm/core';
import { User } from 'src/user/user.entity';

@Entity()
export class Radar {
    @PrimaryKey()
    radar_id: number;

    @Property()
    current_value: DecimalType;

    @Property()
    previous_close_value: DecimalType;

    @Property()
    asset_code: string;

    @Property()
    logo_url: string;

    @Property({ type: DateTimeType })
    created_at = new Date();

    @ManyToOne(() => User, {
        onDelete: 'cascade',
    })
    user: User;
}