import { Migration } from '@mikro-orm/migrations';

export class Migration20230508213954 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `earning` add `day` int not null, add `month` int not null, add `year` int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `earning` drop `day`;');
    this.addSql('alter table `earning` drop `month`;');
    this.addSql('alter table `earning` drop `year`;');
  }

}
