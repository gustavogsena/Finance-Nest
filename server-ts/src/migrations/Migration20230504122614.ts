import { Migration } from '@mikro-orm/migrations';

export class Migration20230504122614 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `email` varchar(255) not null, add `password` varchar(255) not null, add `name` varchar(255) not null, add `surname` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop `email`;');
    this.addSql('alter table `user` drop `password`;');
    this.addSql('alter table `user` drop `name`;');
    this.addSql('alter table `user` drop `surname`;');
  }

}
