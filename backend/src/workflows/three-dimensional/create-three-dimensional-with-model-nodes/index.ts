import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { ComponentType } from "src/modules/three-dimensional/types/common";
import { createThreeDimensionalWithModuleNodeStep } from "../step/create-three-dimensional-with-model-nodes";

export type ModelNode = {
  name?: string;
  type?: ComponentType;
  product_id?: string;
};

export type CreateThreeDimensionalWithModelNodesInput = {
  model_nodes?: ModelNode[];
};
export const createThreeDimensionalWithModelNodesWorkflow = createWorkflow(
  "create-three-dimensional-with-model-nodes",
  (input: CreateThreeDimensionalWithModelNodesInput) => {
    // TODO
    const three_dimensional = createThreeDimensionalWithModuleNodeStep(input);
    return new WorkflowResponse(three_dimensional);
  }
);
