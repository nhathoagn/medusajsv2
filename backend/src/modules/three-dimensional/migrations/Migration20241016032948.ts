import { Migration } from '@mikro-orm/migrations';

export class Migration20241016032948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "material" alter column "component_id" type text using ("component_id"::text);');
    this.addSql('alter table if exists "material" alter column "component_id" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "material" alter column "component_id" type text using ("component_id"::text);');
    this.addSql('alter table if exists "material" alter column "component_id" set not null;');
  }

}
