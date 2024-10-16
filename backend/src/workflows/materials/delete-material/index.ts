import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteMaterialStep } from "../step/delete-material";

export const deleteMaterialWorkflow = createWorkflow(
  "delete-material",
  (input: { id: string }) => {
    // TODO
    const material = deleteMaterialStep(input);
    return new WorkflowResponse(material);
  }
);
