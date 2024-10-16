import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { Component } from "src/modules/three-dimensional/types/mutations";
import {
  createThreeDimensionalStep,
  ModelNode,
} from "../step/create-three-dimensional";
import { link } from "fs";
import { linkProductToThreeDimensionalStep } from "../step/link-product-to-three-dimensional";
import { Modules } from "@medusajs/framework/utils";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows";

export type CreateThreeDimensionalInput = {
  url?: string;
  title: string;
  product_id?: string;
  component_id?: string[];
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
    // TODO

    const three_dimensional = createThreeDimensionalStep(input);
    linkProductToThreeDimensionalStep({
      productId: input.product_id,
      three_dimensional: three_dimensional,
    });

    return new WorkflowResponse(three_dimensional);

    // let three_dimensional = createThreeDimensionalWithModuleNodeStep(input);
  }
);
