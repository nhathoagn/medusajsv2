import { MedusaContainer } from "@medusajs/framework";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  CreateThreeDimensionalInput,
  createThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/create-three-dimensional";

export const POST = async (
  req: MedusaRequest<CreateThreeDimensionalInput>,
  res: MedusaResponse
) => {
  const { result } = await createThreeDimensionalWorkflow(req.scope).run({
    input: req.body,
  });
  res.json({ three_dimensional: result });
};
