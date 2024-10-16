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

    const three_dimension =
      await threeDimensionModuleService.updateThreeDimensionals(input);
    console.log("three_dimension", three_dimension);
    return new StepResponse(three_dimension);
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.deleteThreeDimensionals(id);
  }
);
