import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { remoteQueryObjectFromString } from "@medusajs/framework/utils";
import { deleteMaterialValueWorkflow } from "src/workflows/material-value/delete-material-value";
import { CreateOrUpdateMaterialInput } from "src/workflows/materials/create-material";
import { deleteMaterialWorkflow } from "src/workflows/materials/delete-material";
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
  res.json({ material: result });
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { result } = await deleteMaterialWorkflow(req.scope).run({
    input: { id: req.params.id },
  });
  res.json({ material: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const material_query = remoteQueryObjectFromString({
    entryPoint: "material",
    fields: ["*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const result = await remoteQuery(material_query).then((res) => res[0]);
  console.log("result", result);
  res.json({ material: result });
};
