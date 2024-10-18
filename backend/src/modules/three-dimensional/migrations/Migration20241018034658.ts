import { Migration } from '@mikro-orm/migrations';

export class Migration20241018034658 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "three-dimensional" alter column "url" type text using ("url"::text);');
    this.addSql('alter table if exists "three-dimensional" alter column "url" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "three-dimensional" alter column "url" type text using ("url"::text);');
    this.addSql('alter table if exists "three-dimensional" alter column "url" drop not null;');
  }

}
