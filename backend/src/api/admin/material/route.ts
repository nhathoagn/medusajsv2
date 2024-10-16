import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  CreateOrUpdateMaterialInput,
  createMaterialWorkflow,
} from "src/workflows/materials/create-material";

export const POST = async (
  req: MedusaRequest<CreateOrUpdateMaterialInput>,
  res: MedusaResponse
) => {
  const { result } = await createMaterialWorkflow(req.scope).run({
    input: req.body,
  });
  res.json({ three_dimensional: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const {
    data: [materials],
  } = await query.graph({
    entity: "component",
    fields: ["materials.*"],
    filters: {
      name: req.query.name,
    },
  });

  res.json({ materials: materials });
};
