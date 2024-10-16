import { Migration } from '@mikro-orm/migrations';

export class Migration20241016145917 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "material-value" alter column "material_id" type text using ("material_id"::text);');
    this.addSql('alter table if exists "material-value" alter column "material_id" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "material-value" alter column "material_id" type text using ("material_id"::text);');
    this.addSql('alter table if exists "material-value" alter column "material_id" set not null;');
  }

}
