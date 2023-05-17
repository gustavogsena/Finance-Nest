import { Migration } from '@mikro-orm/migrations';

export class Migration20230507133500 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `earning` add `earning_value` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `earning` drop `earning_value`;');
  }

}
