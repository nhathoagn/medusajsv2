import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";

export const deleteMaterialValueStep = createStep(
  "delete-material-value-step",
  async (input: { id: string }, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    await threeDimensionModuleService.deleteMaterialValues(input.id);

    return new StepResponse("delete material value success");
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.restoreMaterialValues(id);
  }
);
