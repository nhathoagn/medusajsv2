import { Migration } from '@mikro-orm/migrations';

export class Migration20241015094414 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "three-dimensional" alter column "product_id" type text using ("product_id"::text);');
    this.addSql('alter table if exists "three-dimensional" alter column "product_id" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "three-dimensional" alter column "product_id" type text using ("product_id"::text);');
    this.addSql('alter table if exists "three-dimensional" alter column "product_id" set not null;');
  }

}
