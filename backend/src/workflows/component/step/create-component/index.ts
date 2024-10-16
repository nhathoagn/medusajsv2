import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateComponentInput } from "../../create-component";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";

export const createComponentStep = createStep(
  "create-component-step",
  async (input: CreateComponentInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);

    const component = await threeDimensionModuleService.createComponents(input);

    return new StepResponse(component, component.id);
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.deleteComponents(id);
  }
);
