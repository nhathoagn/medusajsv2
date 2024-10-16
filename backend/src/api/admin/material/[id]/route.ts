import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { CreateOrUpdateMaterialInput } from "src/workflows/materials/create-material";
import { updateMaterialWorkflow } from "src/workflows/materials/update-material";

export const PATCH = async (
  req: MedusaRequest<CreateOrUpdateMaterialInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    ...req.body,
    id: id,
  };
  const { result } = await updateMaterialWorkflow(req.scope).run({
    input: data,
  });
  res.json({ three_dimensional: result });
};
