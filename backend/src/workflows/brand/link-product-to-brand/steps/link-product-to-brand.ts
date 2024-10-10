import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "../../../../modules/brand";

type LinkProductToBrandStepInput = {
  productId: string;
  brandId: string;
};

export const linkProductToBrandStep = createStep(
  "link-product-to-brand",
  async (
    { productId, brandId }: LinkProductToBrandStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.create({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });

    return new StepResponse(undefined, {
      productId,

      brandId,
    });
  },
  async ({ productId, brandId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });
  }
);
