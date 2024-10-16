import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { updateThreeDimensionalInput } from "../../update-three-dimensinal";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const updateThreeDimensionalStep = createStep(
  "update-three-dimensional-step",
  async (input: updateThreeDimensionalInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    console.log("updateThreeDimensionalStep", input);
    logger.error("updateThreeDimensionalStep");
    const three_dimension =
      await threeDimensionModuleService.updateThreeDimensionals(input);

    return new StepResponse(three_dimension[0]);
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.deleteThreeDimensionals(id);
  }
);
