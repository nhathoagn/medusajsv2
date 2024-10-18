import { model } from "@medusajs/framework/utils";
import { Component } from "./component";
import { ComponentThreeDimensional } from "./component-three-dimensional";

export const ThreeDimensional = model
  .define("three-dimensional", {
    id: model
      .id({
        prefix: "3d_",
      })
      .primaryKey(),
    url: model.text().nullable(),
    title: model.text(),
    product_id: model.text().searchable().nullable(),
    component_three_dimensional: model.hasMany(
      () => ComponentThreeDimensional,
      {
        mappedBy: "three_dimensional_id",
      }
    ),
    isFlip: model.boolean().default(false),
    isBranding: model.boolean().default(false),
    isPhysical: model.boolean().default(false),
    metadata: model.json().nullable(),
  })
  .cascades({ delete: ["component_three_dimensional"] });
