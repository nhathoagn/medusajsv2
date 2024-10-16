import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";

export type unLinkProductToThreeDimensionalStepInput = {
  productId: string;
  three_dimensional_id: string;
};

export const unlinkProductToThreeDimensionalStep = createStep(
  "unlink-product-to-three-dimensional-step",
  async (
    {
      productId,
      three_dimensional_id,
    }: unLinkProductToThreeDimensionalStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [THREE_DIMENSION_MODULE]: {
        three_dimensional_id: three_dimensional_id,
      },
    });
  }
);
