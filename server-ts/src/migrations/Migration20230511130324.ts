import { Migration } from '@mikro-orm/migrations';

export class Migration20230511130324 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` drop `username`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` add `username` varchar(255) not null;');
  }

}
