import { MedusaContainer } from "@medusajs/framework";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  CreateThreeDimensionalInput,
  createThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/create-three-dimensional";
import {
  unlinkThreeDimensionalInput,
  unlinkThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/unlink-product-to-three-dimensional";
import {
  updateThreeDimensionalInput,
  updateThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/update-three-dimensinal";

export const POST = async (
  req: MedusaRequest<unlinkThreeDimensionalInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    id,
    ...req.body,
  };
  const { result } = await unlinkThreeDimensionalWorkflow(req.scope).run({
    input: data,
  });
  res.json({ three_dimensional: result });
};
