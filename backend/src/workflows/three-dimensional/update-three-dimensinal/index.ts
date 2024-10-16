import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { Component } from "src/modules/three-dimensional/types/mutations";
import { updateThreeDimensionalStep } from "../step/update-three-dimensional";
import { linkProductToThreeDimensionalStep } from "../step/link-product-to-three-dimensional";
import { container } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export type updateThreeDimensionalInput = {
  id: string;
  url?: string;
  title?: string;
  product_id?: string;
  component?: Component[];
  ui?: string;
  isSelfSufficient?: boolean;
  isExtraModel?: boolean;
  default_value?: Record<string, any>;
  metadata?: Record<string, any>;
};
// export type WorkflowInput = {
//   data: updateThreeDimensionalInput;
// };
export const updateThreeDimensionalWorkflow = createWorkflow(
  "update-three-dimensional",
  (input: WorkflowData<updateThreeDimensionalInput>) => {
    console.log("input", input);
    // TODO
    const three_dimensional = updateThreeDimensionalStep(input);
    if (input.product_id) {
      linkProductToThreeDimensionalStep({
        productId: input.product_id,
        three_dimensional: three_dimensional,
      });
    }

    return new WorkflowResponse(three_dimensional);
  }
);
