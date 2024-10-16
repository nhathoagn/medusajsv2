import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteComponentStep } from "../step/delete-component";

export const deleteComponentWorkflow = createWorkflow(
  "delete-component",
  (input: { id: string }) => {
    // TODO
    const material = deleteComponentStep(input);
    return new WorkflowResponse(material);
  }
);
