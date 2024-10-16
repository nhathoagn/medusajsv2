import { Migration } from '@mikro-orm/migrations';

export class Migration20241016094126 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index if exists "IDX_component_name_unique";');
  }

  async down(): Promise<void> {
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_component_name_unique" ON "component" (name) WHERE deleted_at IS NULL;');
  }

}
