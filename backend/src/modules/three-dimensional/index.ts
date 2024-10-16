import Service from "./service";
import { Module } from "@medusajs/utils";

export const THREE_DIMENSION_MODULE = "threeDimensionalModuleService";
export default Module(THREE_DIMENSION_MODULE, {
  service: Service,
});
