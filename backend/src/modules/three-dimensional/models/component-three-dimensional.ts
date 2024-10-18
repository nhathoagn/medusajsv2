import { model } from "@medusajs/framework/utils";
import { Component } from "./component";
import { ThreeDimensional } from "./three-dimensional";

export const ComponentThreeDimensional = model.define(
  "component-three-dimensional",
  {
    id: model
      .id({
        prefix: "c_t_",
      })
      .primaryKey(),
    component_id: model
      .belongsTo(() => Component, {
        mappedBy: "component_three_dimensional",
      })
      .nullable(),
    three_dimensional_id: model
      .belongsTo(() => ThreeDimensional, {
        mappedBy: "component_three_dimensional",
      })
      .nullable(),
    slug: model.text(),
  }
);
