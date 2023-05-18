import { Migration } from '@mikro-orm/migrations';

export class Migration20230518125910 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `user_picture` varchar(5000) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `user_picture`;');
  }

}
