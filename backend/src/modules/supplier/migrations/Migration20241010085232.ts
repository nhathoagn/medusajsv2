import { Migration } from '@mikro-orm/migrations';

export class Migration20241010085232 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "supplier" ("id" text not null, "contact_name" text not null, "contact_email" text not null, "contact_phone" text null, "title" text not null, "metadata" jsonb null, "created_by" text null, "company" text null, "addresses" text null, "supplier_review" text null, "tiers" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "supplier_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "supplier" cascade;');
  }

}
