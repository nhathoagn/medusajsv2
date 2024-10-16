import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { CreateOrUpdateMaterialInput } from "../../create-material";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const createMaterialStep = createStep(
  "create-material-step",
  async (input: CreateOrUpdateMaterialInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    if (input.component_id && input.component_id.length > 0) {
      const { component_id, ...data } = input;
      const createdMaterials = await Promise.all(
        component_id.map(async (id) => {
          return await threeDimensionModuleService.createMaterials({
            ...data,
            component_id: id,
          });
        })
      );

      // Returning an array of created materials
      return new StepResponse(createdMaterials);
    } else {
      const material = await threeDimensionModuleService.createMaterials(input);

      // Returning the created material and its ID as compensation input
      return new StepResponse(material, material.id);
    }
  }
);
