import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createMaterialStep } from "../step/create-material";

export type CreateOrUpdateMaterialInput = {
  handle: string;
  name: string;
  description?: string;
  rank?: number;
  metadata?: Record<string, any>;
  component_id?: string;
};
export const createMaterialWorkflow = createWorkflow(
  "create-material",
  (input: CreateOrUpdateMaterialInput) => {
    // TODO
    const material = createMaterialStep(input);
    return new WorkflowResponse(material);
  }
);
