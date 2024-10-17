import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";

export const deleteComponentStep = createStep(
  "delete-component-step",
  async (input: { id: string }, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    await threeDimensionModuleService.deleteComponents(input.id);

    return new StepResponse("delete component success");
  },
  (deletedComponent: string, { container }) => {
    const service: ThreeDimensionalModuleService = container.resolve(
      THREE_DIMENSION_MODULE
    );

    return service.restoreComponents(deletedComponent);
  }
);
