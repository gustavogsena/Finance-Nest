import { Migration } from '@mikro-orm/migrations';

export class Migration20230530202224 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `radar` add `previous_close_value` varchar(255) not null, add `logo_url` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `radar` drop `previous_close_value`;');
    this.addSql('alter table `radar` drop `logo_url`;');
  }

}
