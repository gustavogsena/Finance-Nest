import { Migration } from '@mikro-orm/migrations';

export class Migration20230424132627 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `operation` modify `operation_price` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `operation` modify `operation_price` int not null;');
  }

}
