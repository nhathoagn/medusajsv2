import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {
  UpdateComponentInput,
  updateComponentWorkflow,
} from "src/workflows/component/update-component";

export const PATCH = async (
  req: MedusaRequest<UpdateComponentInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    ...req.body,
    id,
  };
  const { result } = await updateComponentWorkflow(req.scope).run({
    input: data,
  });

  res.json({ component: result });
};
