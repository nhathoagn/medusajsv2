import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { CreateOrUpdateMaterialValueInput } from "../../create-material-value";

export const createMaterialValueStep = createStep(
  "create-material-value-step",
  async (input: CreateOrUpdateMaterialValueInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    if (input.material_id && input.material_id.length > 0) {
      const { material_id, ...data } = input;
      const create_material_value = await Promise.all(
        material_id.map(async (material_id) => {
          return await threeDimensionModuleService.createMaterialValues({
            ...data,
            material_id: material_id,
          });
        })
      );

      return new StepResponse(create_material_value);
    } else {
      const material = await threeDimensionModuleService.createMaterialValues(
        input
      );
      return new StepResponse(material, material.id);
    }
  }
);
