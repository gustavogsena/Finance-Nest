import { Migration } from '@mikro-orm/migrations';

export class Migration20230421152310 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `username` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `asset` (`asset_id` int unsigned not null auto_increment primary key, `asset_code` varchar(255) not null, `asset_name` varchar(255) not null, `asset_type` varchar(255) not null, `created_at` datetime not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `asset` add index `asset_user_id_index`(`user_id`);');

    this.addSql('create table `operation` (`operation_id` int unsigned not null auto_increment primary key, `quantity` int not null, `operation_price` int not null, `operation_type` varchar(255) not null, `operation_date` datetime not null, `created_at` datetime not null, `asset_asset_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `operation` add index `operation_asset_asset_id_index`(`asset_asset_id`);');

    this.addSql('alter table `asset` add constraint `asset_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `operation` add constraint `operation_asset_asset_id_foreign` foreign key (`asset_asset_id`) references `asset` (`asset_id`) on update cascade on delete cascade;');
  }

}
