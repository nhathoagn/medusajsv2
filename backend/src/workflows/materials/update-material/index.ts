import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createMaterialStep } from "../step/create-material";
import { CreateOrUpdateMaterialInput } from "../create-material";
import { updateMaterialStep } from "../step/update-material";

export const updateMaterialWorkflow = createWorkflow(
  "update-material",
  (input: CreateOrUpdateMaterialInput) => {
    // TODO
    const material = updateMaterialStep(input);
    return new WorkflowResponse(material);
  }
);
