import { model } from "@medusajs/framework/utils";
import { Component } from "./component";

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
    component: model.hasMany(() => Component),
    isFlip: model.boolean().default(false),
    isBranding: model.boolean().default(false),
    isPhysical: model.boolean().default(false),
    metadata: model.json().nullable(),
  })
  .cascades({ delete: ["component"] });
