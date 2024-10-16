import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { MaterialValueStatus } from "src/modules/three-dimensional/types/common";
import { createMaterialValueStep } from "../step/create-material-value";

export type CreateOrUpdateMaterialValueInput = {
  value: string;
  name: string;
  description?: string;
  image?: number;
  metadata?: Record<string, any>;
  rank?: number;
  price?: number;
  cost?: number;
  status?: MaterialValueStatus;
  material_id?: string[];
};
export const createMaterialValueWorkflow = createWorkflow(
  "create-material-value",
  (input: CreateOrUpdateMaterialValueInput) => {
    // TODO
    const materials_value = createMaterialValueStep(input);
    return new WorkflowResponse(materials_value);
  }
);
