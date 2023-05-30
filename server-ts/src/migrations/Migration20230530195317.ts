import { Migration } from '@mikro-orm/migrations';

export class Migration20230530195317 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `radar` (`radar_id` int unsigned not null auto_increment primary key, `current_value` varchar(255) not null, `asset_code` varchar(255) not null, `created_at` datetime not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `radar` add index `radar_user_id_index`(`user_id`);');

    this.addSql('alter table `radar` add constraint `radar_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `radar`;');
  }

}
