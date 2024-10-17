import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateComponentInput } from "../../create-component";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { UpdateComponentInput } from "../../update-component";

export const updateComponentStep = createStep(
  "update-component-step",
  async (input: UpdateComponentInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);

    const component = await threeDimensionModuleService.updateComponents(input);

    return new StepResponse(component, component.id);
  }
);
