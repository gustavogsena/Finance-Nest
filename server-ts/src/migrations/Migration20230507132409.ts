import { Migration } from '@mikro-orm/migrations';

export class Migration20230507132409 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `earning` (`earning_id` int unsigned not null auto_increment primary key, `earning_type` varchar(255) not null, `earning_data` datetime not null, `created_at` datetime not null, `asset_asset_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `earning` add index `earning_asset_asset_id_index`(`asset_asset_id`);');

    this.addSql('alter table `earning` add constraint `earning_asset_asset_id_foreign` foreign key (`asset_asset_id`) references `asset` (`asset_id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `earning`;');
  }

}
