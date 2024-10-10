import { model } from "@medusajs/utils";

export const Supplier = model.define("supplier", {
  id: model.id({ prefix: "supp" }).primaryKey(),
  contact_name: model.text(),
  contact_email: model.text(),
  contact_phone: model.text().nullable(),
  title: model.text(),
  metadata: model.json().nullable(),
  created_by: model.text().nullable(),
  company: model.text().nullable(),
  addresses: model.text().nullable(),
  supplier_review: model.text().nullable(),
  tiers: model.text().nullable(),
});
