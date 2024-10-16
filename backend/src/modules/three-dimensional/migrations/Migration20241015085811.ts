import { Migration } from '@mikro-orm/migrations';

export class Migration20241015085811 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "three-dimensional" ("id" text not null, "url" text not null, "title" text not null, "product_id" text not null, "isFlip" boolean not null default false, "isBranding" boolean not null default false, "isPhysical" boolean not null default false, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "three-dimensional_pkey" primary key ("id"));');

    this.addSql('create table if not exists "component" ("id" text not null, "name" text not null, "image" text null, "norm" integer not null default 0, "ui" text null, "isSelfSufficient" boolean not null default false, "isExtraModel" jsonb null, "default_value" jsonb null, "metadata" jsonb null, "three_dimensional_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "component_pkey" primary key ("id"));');
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_component_name_unique" ON "component" (name) WHERE deleted_at IS NULL;');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_component_three_dimensional_id" ON "component" (three_dimensional_id) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "material" ("id" text not null, "handle" text null, "name" text null, "description" text null, "rank" integer not null default 0, "metadata" jsonb null, "component_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "material_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_material_component_id" ON "material" (component_id) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "material-value" ("id" text not null, "value" text null, "name" text null, "image" text null, "description" text null, "metadata" jsonb null, "rank" integer not null default 0, "price" integer not null default 0, "cost" integer not null default 0, "status" text check ("status" in (\'in_stock\', \'out_of_stock_indefinitely\', \'out_of_stock_util_tomorrow\')) not null, "material_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "material-value_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_material-value_material_id" ON "material-value" (material_id) WHERE deleted_at IS NULL;');

    this.addSql('alter table if exists "component" add constraint "component_three_dimensional_id_foreign" foreign key ("three_dimensional_id") references "three-dimensional" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "material" add constraint "material_component_id_foreign" foreign key ("component_id") references "component" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "material-value" add constraint "material-value_material_id_foreign" foreign key ("material_id") references "material" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "component" drop constraint if exists "component_three_dimensional_id_foreign";');

    this.addSql('alter table if exists "material" drop constraint if exists "material_component_id_foreign";');

    this.addSql('alter table if exists "material-value" drop constraint if exists "material-value_material_id_foreign";');

    this.addSql('drop table if exists "three-dimensional" cascade;');

    this.addSql('drop table if exists "component" cascade;');

    this.addSql('drop table if exists "material" cascade;');

    this.addSql('drop table if exists "material-value" cascade;');
  }

}
