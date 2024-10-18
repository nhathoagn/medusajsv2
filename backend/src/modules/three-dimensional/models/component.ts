import { model } from "@medusajs/framework/utils";
import { ComponentType } from "../types/common";
import { Material } from "./materials";
import { ThreeDimensional } from "./three-dimensional";
import { ComponentMaterial } from "./component-material";
import { ComponentThreeDimensional } from "./component-three-dimensional";

export const Component = model
  .define("component", {
    id: model
      .id({
        prefix: "comp_",
      })
      .primaryKey(),
    name: model.text().searchable().unique(),
    component_material: model.hasMany(() => ComponentMaterial, {
      mappedBy: "component_id",
    }),
    image: model.text().nullable(),
    norm: model.number().default(0),
    ui: model.text().nullable(),
    isSelfSufficient: model.boolean().default(false),
    isExtraModel: model.json().nullable(),
    default_value: model.json().nullable(),
    metadata: model.json().nullable(),
    component_three_dimensional: model.hasMany(
      () => ComponentThreeDimensional,
      {
        mappedBy: "component_id",
      }
    ),
  })
  .cascades({ delete: ["component_material"] })
  .cascades({ delete: ["component_three_dimensional"] });
