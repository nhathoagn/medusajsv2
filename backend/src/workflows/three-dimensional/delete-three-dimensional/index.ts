import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { unlinkProductToThreeDimensionalStep } from "../step/unlink-product-to-three-dimensional";
import { deleteThreeDimensionalStep } from "../step/delete-three-dimensional";

export const deleteThreeDimensionalWorkflow = createWorkflow(
  "delete-three-dimensional",
  (input: { id: string; product_id: string }) => {
    // TODO
    unlinkProductToThreeDimensionalStep({
      productId: input.product_id,
      three_dimensional_id: input.id,
    });

    const material = deleteThreeDimensionalStep({ id: input.id });
    return new WorkflowResponse(material);
  }
);
