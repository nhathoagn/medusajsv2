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
import { unlinkProductToThreeDimensionalStep } from "../step/unlink-product-to-three-dimensional";

export type unlinkThreeDimensionalInput = {
  id: string;
  product_id: string;
};
// export type WorkflowInput = {
//   data: updateThreeDimensionalInput;
// };
export const unlinkThreeDimensionalWorkflow = createWorkflow(
  "unlink-three-dimensional",
  (input: WorkflowData<unlinkThreeDimensionalInput>) => {
    // TODO
    const three_dimensional = updateThreeDimensionalStep({
      id: input.id,
      product_id: null,
    });
    unlinkProductToThreeDimensionalStep({
      productId: input.product_id,
      three_dimensional_id: input.id,
    });

    return new WorkflowResponse(three_dimensional);
  }
);
