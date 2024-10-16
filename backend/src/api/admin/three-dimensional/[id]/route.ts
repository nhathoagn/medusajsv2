import { MedusaContainer } from "@medusajs/framework";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  CreateThreeDimensionalInput,
  createThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/create-three-dimensional";
import {
  updateThreeDimensionalInput,
  updateThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/update-three-dimensinal";

export const PATCH = async (
  req: MedusaRequest<updateThreeDimensionalInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    id,
    ...req.body,
  };
  const { result } = await updateThreeDimensionalWorkflow(req.scope).run({
    input: data,
  });
  res.json({ three_dimensional: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const {
    data: [three_dimensional],
  } = await query.graph({
    entity: "three_dimensional",
    fields: ["*", "component.*"],
    filters: {
      id: req.params.id,
    },
  });

  res.json({ three_dimensional: three_dimensional });
};
