import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { CreateOrUpdateMaterialValueInput } from "../create-material-value";
import { updateMaterialStep } from "src/workflows/materials/step/update-material";
import { updateMaterialValueStep } from "../step/update-material-value";

export const updateMaterialValueWorkflow = createWorkflow(
  "update-material-value",
  (input: CreateOrUpdateMaterialValueInput) => {
    // TODO
    const material = updateMaterialValueStep(input);
    return new WorkflowResponse(material);
  }
);
