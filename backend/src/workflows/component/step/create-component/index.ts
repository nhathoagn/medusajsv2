import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateComponentInput } from "../../create-component";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { Component } from "src/modules/three-dimensional/types/mutations";
import { ThreeDimensional } from "../../../../modules/three-dimensional/types/mutations";

export const createComponentStep = createStep(
  "create-component-step",
  async (input: CreateComponentInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);

    if (input.material_id && input.material_id.length > 0) {
      const { material_id, ...data } = input;
      const component = await threeDimensionModuleService.createComponents({
        ...data,
      });
      await Promise.all(
        material_id.map(async (material_id) => {
          await threeDimensionModuleService.createComponentMaterials({
            component_id: component.id,
            material_id: material_id,
          });
        })
      );
      return new StepResponse(component);
    } else {
      const three_dimensional =
        await threeDimensionModuleService.createComponents(input);
      return new StepResponse(three_dimensional, three_dimensional.id);
    }
  },
  async (id: string, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    await threeDimensionModuleService.deleteComponents(id);
  }
);
