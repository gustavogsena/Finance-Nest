import { Migration } from '@mikro-orm/migrations';

export class Migration20230512030359 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `earning` modify `earning_value` varchar(255) not null;');
    this.addSql('alter table `earning` change `earning_data` `earning_date` datetime not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `earning` modify `earning_value` int not null;');
    this.addSql('alter table `earning` change `earning_date` `earning_data` datetime not null;');
  }

}
