import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateThreeDimensionalInput } from "../../create-three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const createThreeDimensionalStep = createStep(
  "create-three-dimensional-step",
  async (input: CreateThreeDimensionalInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    // logger.log("createThreeDimensionalStep", input);
    console.log("createThreeDimensionalStep", input);
    logger.error("Linked brand to products");

    const three_dimension =
      await threeDimensionModuleService.createThreeDimensionals(input);

    return new StepResponse(three_dimension, three_dimension.id);
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.deleteThreeDimensionals(id);
  }
);
