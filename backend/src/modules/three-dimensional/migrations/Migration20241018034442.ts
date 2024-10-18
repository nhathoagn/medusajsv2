import { Migration } from '@mikro-orm/migrations';

export class Migration20241018034442 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "component-material" ("id" text not null, "component_id_id" text not null, "material_id_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "component-material_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component-material_component_id_id" ON "component-material" (component_id_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component-material_material_id_id" ON "component-material" (material_id_id) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "component-three-dimensional" ("id" text not null, "component_id_id" text null, "three_dimensional_id_id" text null, "slug" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "component-three-dimensional_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component-three-dimensional_component_id_id" ON "component-three-dimensional" (component_id_id) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component-three-dimensional_three_dimensional_id_id" ON "component-three-dimensional" (three_dimensional_id_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "component-material" add constraint "component-material_component_id_id_foreign" foreign key ("component_id_id") references "component" ("id") on update cascade;');
    this.addSql('alter table if exists "component-material" add constraint "component-material_material_id_id_foreign" foreign key ("material_id_id") references "material" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "component-three-dimensional" add constraint "component-three-dimensional_component_id_id_foreign" foreign key ("component_id_id") references "component" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "component-three-dimensional" add constraint "component-three-dimensional_three_dimensional_id_id_foreign" foreign key ("three_dimensional_id_id") references "three-dimensional" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "component" drop constraint if exists "component_three_dimensional_id_foreign";');

    this.addSql('alter table if exists "material" drop constraint if exists "material_component_id_foreign";');

    this.addSql('alter table if exists "material-value" drop constraint if exists "material-value_material_id_foreign";');

    this.addSql('drop index if exists "IDX_component_three_dimensional_id";');
    this.addSql('alter table if exists "component" drop column if exists "three_dimensional_id";');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_component_name_unique" ON "component" (name) WHERE deleted_at IS NULL;');

    this.addSql('drop index if exists "IDX_material_component_id";');
    this.addSql('alter table if exists "material" drop column if exists "component_id";');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_material_handle_unique" ON "material" (handle) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "material-value" add constraint "material-value_material_id_foreign" foreign key ("material_id") references "material" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "component-material" cascade;');

    this.addSql('drop table if exists "component-three-dimensional" cascade;');

    this.addSql('alter table if exists "material-value" drop constraint if exists "material-value_material_id_foreign";');

    this.addSql('alter table if exists "component" add column if not exists "three_dimensional_id" text null;');
    this.addSql('drop index if exists "IDX_component_name_unique";');
    this.addSql('alter table if exists "component" add constraint "component_three_dimensional_id_foreign" foreign key ("three_dimensional_id") references "three-dimensional" ("id") on update cascade on delete cascade;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component_three_dimensional_id" ON "component" (three_dimensional_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "material" add column if not exists "component_id" text null;');
    this.addSql('drop index if exists "IDX_material_handle_unique";');
    this.addSql('alter table if exists "material" add constraint "material_component_id_foreign" foreign key ("component_id") references "component" ("id") on update cascade on delete cascade;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_material_component_id" ON "material" (component_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "material-value" add constraint "material-value_material_id_foreign" foreign key ("material_id") references "material" ("id") on update cascade on delete cascade;');
  }

}
