import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateSupplierInput } from "..";
import SupplierModuleService from "src/modules/supplier/services";
import { SUPPLIER_MODULE } from "src/modules/supplier";
export const createSupplierStep = createStep(
  "create-supplier-step",
  async (input: CreateSupplierInput, { container }) => {
    const supplierModuleService: SupplierModuleService =
      container.resolve(SUPPLIER_MODULE);
    const supplier = await supplierModuleService.createSuppliers({
      ...input,
      title: input.title ? input.title : input.contact_name,
    });
    return new StepResponse(supplier, supplier.id);
  },
  async (id: string, { container }) => {
    const supplierModuleService: SupplierModuleService =
      container.resolve(SUPPLIER_MODULE);
    await supplierModuleService.deleteSuppliers(id);
  }
);
