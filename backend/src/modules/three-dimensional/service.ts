import { MedusaService } from "@medusajs/framework/utils";
import { Component, Material, MaterialValue, ThreeDimensional } from "./models";

class ThreeDimensionalModuleService extends MedusaService({
  ThreeDimensional,
  Component,
  Material,
  MaterialValue,
}) {}
export default ThreeDimensionalModuleService;
