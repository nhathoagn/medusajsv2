import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { container } from "@medusajs/framework";
import { SUPPLIER_MODULE } from "src/modules/supplier";
type LinkProductToSupplierInput = {
  supplierId: string;
  productId: string;
};

export const linkProductToSupplierStep = createStep(
  "link-product-to-supplier",
  async (
    { productId, supplierId }: LinkProductToSupplierInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    remoteLink.create({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [SUPPLIER_MODULE]: {
        supplier_id: supplierId,
      },
    });
    return new StepResponse(undefined, {
      productId,
      supplierId,
    });
  },
  async ({ productId, supplierId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [SUPPLIER_MODULE]: {
        supplier_id: supplierId,
      },
    });
  }
);
