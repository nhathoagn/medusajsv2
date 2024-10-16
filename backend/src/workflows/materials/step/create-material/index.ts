import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { CreateOrUpdateMaterialInput } from "../../create-material";

export const createMaterialStep = createStep(
  "create-material-step",
  async (input: CreateOrUpdateMaterialInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    console.log("createThreeDimensionalStep", input);
    logger.error("Linked brand to products");

    const material = await threeDimensionModuleService.createMaterials(input);

    return new StepResponse(material, material.id);
  }
);
