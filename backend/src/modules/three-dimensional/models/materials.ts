import { model } from "@medusajs/framework/utils";
import { MaterialTypeEnum } from "../types/common";
import { MaterialValue } from "./material-value";
import { Component } from "./component";

export const Material = model
  .define("material", {
    id: model
      .id({
        prefix: "m_t_",
      })
      .primaryKey(),
    handle: model.text().nullable(),
    name: model.text().nullable(),
    description: model.text().nullable(),
    material_value: model.hasMany(() => MaterialValue),
    rank: model.number().default(0),
    metadata: model.json().nullable(),
    component: model
      .belongsTo(() => Component, {
        mappedBy: "materials",
      })
      .nullable(),
  })
  .cascades({ delete: ["material_value"] });
