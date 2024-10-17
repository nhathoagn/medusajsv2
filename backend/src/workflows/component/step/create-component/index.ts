import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateComponentInput } from "../../create-component";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { Component } from "src/modules/three-dimensional/types/mutations";

export const createComponentStep = createStep(
  "create-component-step",
  async (input: CreateComponentInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);

    if (input.three_dimensional_id && input.three_dimensional_id.length > 0) {
      const { three_dimensional_id, ...data } = input;
      const create_component = await Promise.all(
        three_dimensional_id.map(async (three_dimensional_id) => {
          return await threeDimensionModuleService.createComponents({
            ...data,
            three_dimensional_id: three_dimensional_id,
          });
        })
      );
      return new StepResponse(create_component);
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
