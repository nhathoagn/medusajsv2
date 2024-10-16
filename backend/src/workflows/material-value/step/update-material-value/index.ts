import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { CreateOrUpdateMaterialValueInput } from "../../create-material-value";

export const updateMaterialValueStep = createStep(
  "update-material-value-step",
  async (input: CreateOrUpdateMaterialValueInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    const material_value =
      await threeDimensionModuleService.updateMaterialValues(input);

    return new StepResponse(material_value, material_value.id);
  }
);
