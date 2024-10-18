import { MedusaService } from "@medusajs/framework/utils";
import {
  Component,
  ComponentMaterial,
  ComponentThreeDimensional,
  Material,
  MaterialValue,
  ThreeDimensional,
} from "./models";

class ThreeDimensionalModuleService extends MedusaService({
  ThreeDimensional,
  Component,
  Material,
  MaterialValue,
  ComponentMaterial,
  ComponentThreeDimensional,
}) {}
export default ThreeDimensionalModuleService;
