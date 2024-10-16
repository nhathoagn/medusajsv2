import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { Component } from "src/modules/three-dimensional/types/mutations";
import { createThreeDimensionalStep } from "../step/create-three-dimensional";
import { ModelNode } from "../create-three-dimensional-with-model-nodes";
import { createThreeDimensionalWithModuleNodeStep } from "../step/create-three-dimensional-with-model-nodes";

export type CreateThreeDimensionalInput = {
  url?: string;
  title: string;
  product_id?: string;
  component?: Component[];
  ui: string;
  isSelfSufficient: boolean;
  isExtraModel: boolean;
  default_value?: Record<string, any>;
  metadata?: Record<string, any>;
  model_nodes?: ModelNode[];
};
export const createThreeDimensionalWorkflow = createWorkflow(
  "create-three-dimensional",
  (input: CreateThreeDimensionalInput) => {
    // let three_dimensional;
    // // TODO
    // if (input.model_nodes && input.model_nodes.length > 0) {
    //   three_dimensional = createThreeDimensionalWithModuleNodeStep({
    //     model_nodes: input.model_nodes,
    //   });
    // } else {
    //   let  three_dimensional = createThreeDimensionalStep(input);
    // }
    let three_dimensional = createThreeDimensionalWithModuleNodeStep(input);
    return new WorkflowResponse(three_dimensional);
  }
);
