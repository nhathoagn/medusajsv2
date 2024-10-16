import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ThreeDimensional } from "src/modules/three-dimensional/types/mutations";

export type LinkProductToThreeDimensionalStepInput = {
  productId: string;
  three_dimensional: ThreeDimensional | ThreeDimensional[];
};

export const linkProductToThreeDimensionalStep = createStep(
  "link-product-to-three-dimensional-step",
  async (
    { productId, three_dimensional }: LinkProductToThreeDimensionalStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const linkThreeDimensional = async (threeDim: ThreeDimensional) => {
      console.log("threeDim", threeDim);
      try {
        await remoteLink.create({
          [Modules.PRODUCT]: {
            product_id: productId ?? threeDim.product_id,
          },
          [THREE_DIMENSION_MODULE]: {
            three_dimensional_id: threeDim.id,
          },
        });
        logger.info(
          `Linked product ${
            productId ?? threeDim.product_id
          } to three_dimensional ${threeDim.id}`
        );
      } catch (error) {
        logger.error(
          `Error linking product ${
            productId ?? threeDim.product_id
          } to three_dimensional ${threeDim.id}: ${error.message}`
        );
      }
    };
    console.log("three_dimensional-is", three_dimensional);
    console.log("three_dimensional-boolean", Array.isArray(three_dimensional));
    if (Array.isArray(three_dimensional)) {
      await Promise.all(three_dimensional.map((v) => linkThreeDimensional(v)));
    } else {
      await linkThreeDimensional(three_dimensional);
    }

    return new StepResponse(undefined, {
      productId,
      three_dimensional: three_dimensional,
    });
  },
  async ({ productId, three_dimensional }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const unlinkThreeDimensional = async (threeDim: ThreeDimensional) => {
      await remoteLink.dismiss({
        [Modules.PRODUCT]: {
          product_id: productId,
        },
        [THREE_DIMENSION_MODULE]: {
          three_dimensional_id: threeDim.id,
        },
      });
      logger.info(
        `Unlinked product ${productId} from three_dimensional ${threeDim.id}`
      );
    };

    if (Array.isArray(three_dimensional)) {
      await Promise.all(three_dimensional.map(unlinkThreeDimensional));
    } else {
      await unlinkThreeDimensional(three_dimensional);
    }
  }
);
