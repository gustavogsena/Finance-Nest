import * as dotenv from 'dotenv'
dotenv.config()
import { User } from './user/user.entity';
import { Asset } from './assets/assets.entity';
import { Operation } from './operations/operation.entity';
import { Earning } from './earnings/earning.entity';
import { Radar } from './radar/radar.entity';

export default {
  entities: [User, Operation, Asset, Earning, Radar],
  port: process.env.MYSQL_PORT,
  dbName: process.env.MYSQL_DB_NAME,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  type: 'mysql',
};

