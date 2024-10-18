import { model } from "@medusajs/framework/utils";
import { Component } from "./component";
import { Material } from "./materials";

export const ComponentMaterial = model.define("component-material", {
  id: model
    .id({
      prefix: "c_m_",
    })
    .primaryKey(),
  component_id: model.belongsTo(() => Component, {
    mappedBy: "component_material",
  }),
  material_id: model.belongsTo(() => Material, {
    mappedBy: "component_material",
  }),
});
