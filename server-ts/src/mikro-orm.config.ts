import { User } from './user/user.entity';
import { Asset } from './assets/assets.entity';
import { Operation } from './operations/operation.entity';
import { Earning } from './earnings/earning.entity';

export default {
  entities: [User, Operation, Asset, Earning],
  port: 3306,
  dbName: 'assets_manager',
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  type: 'mysql',
};