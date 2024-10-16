import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteMaterialValueStep } from "../step/delete-material-value";

export const deleteMaterialValueWorkflow = createWorkflow(
  "delete-material-value",
  (input: { id: string }) => {
    // TODO
    const material = deleteMaterialValueStep(input);
    return new WorkflowResponse(material);
  }
);
