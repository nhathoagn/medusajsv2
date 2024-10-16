import { model } from "@medusajs/framework/utils";
import { ComponentType } from "../types/common";
import { Material } from "./materials";
import { ThreeDimensional } from "./three-dimensional";

export const Component = model
  .define("component", {
    id: model
      .id({
        prefix: "comp_",
      })
      .primaryKey(),
    name: model.text().searchable(),
    materials: model.hasMany(() => Material),
    image: model.text().nullable(),
    norm: model.number().default(0),
    ui: model.text().nullable(),
    isSelfSufficient: model.boolean().default(false),
    isExtraModel: model.json().nullable(),
    default_value: model.json().nullable(),
    metadata: model.json().nullable(),
    three_dimensional: model
      .belongsTo(() => ThreeDimensional, {
        mappedBy: "component",
      })
      .nullable(),
  })
  .cascades({ delete: ["materials"] });
