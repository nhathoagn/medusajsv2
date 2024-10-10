import { Module } from "@medusajs/framework/utils";
import SupplierModuleService from "./services";
export const SUPPLIER_MODULE = "supplierModuleService";
export default Module(SUPPLIER_MODULE, {
  service: SupplierModuleService,
});
