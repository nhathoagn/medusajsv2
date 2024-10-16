import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { remoteQueryObjectFromString } from "@medusajs/framework/utils";
import { CreateOrUpdateMaterialValueInput } from "src/workflows/material-value/create-material-value";
import { deleteMaterialValueWorkflow } from "src/workflows/material-value/delete-material-value";
import { updateMaterialValueWorkflow } from "src/workflows/material-value/update-material-value";
import { updateMaterialWorkflow } from "src/workflows/materials/update-material";

export const PATCH = async (
  req: MedusaRequest<CreateOrUpdateMaterialValueInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    ...req.body,
    id: id,
  };
  const { result } = await updateMaterialValueWorkflow(req.scope).run({
    input: data,
  });
  res.json({ material_value: result });
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { result } = await deleteMaterialValueWorkflow(req.scope).run({
    input: { id: req.params.id },
  });
  res.json({ material_value: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const material_value_query = remoteQueryObjectFromString({
    entryPoint: "material_value",
    fields: ["*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const result = await remoteQuery(material_value_query).then((res) => res[0]);
  console.log("result", result);
  res.json({ material_value: result });
};
