
import {
  PrimaryKey,
  Property,
  Entity,
  OneToMany,
  Collection,
  BeforeCreate,
} from '@mikro-orm/core';
import { Asset } from 'src/assets/assets.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  email: string;

  @Property()
  name: string;

  @Property()
  surname: string;

  @Property()
  password: string;

  @Property({ nullable: true, columnType: 'varchar(5000)' })
  userPicture: string;

  @OneToMany(() => Asset, (asset) => asset.user)
  assets = new Collection<Asset>(this);

  async comparePassword(password: string) {
    const passwordEquals = await bcrypt.compare(password, this.password);
    return passwordEquals;
  }

  @BeforeCreate()
  async hashPassword() {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
}

