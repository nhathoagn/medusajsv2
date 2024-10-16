import { model } from "@medusajs/framework/utils";
import { MaterialValueStatus } from "../types/common";
import { Material } from "./materials";
import ProductModule from "@medusajs/medusa/product";

export const MaterialValue = model.define("material-value", {
  id: model
    .id({
      prefix: "m_v_",
    })
    .primaryKey(),
  value: model.text().nullable(),
  name: model.text().nullable(),
  image: model.text().nullable(),
  description: model.text().nullable(),
  metadata: model.json().nullable(),
  rank: model.number().default(0),
  price: model.number().default(0),
  cost: model.number().default(0),
  status: model.enum(MaterialValueStatus),
  material: model
    .belongsTo(() => Material, {
      mappedBy: "material_value",
    })
    .nullable(),
});
