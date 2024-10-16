import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  CreateComponentInput,
  createComponentWorkflow,
} from "../../../workflows/component/create-component";

export const POST = async (
  req: MedusaRequest<CreateComponentInput>,
  res: MedusaResponse
) => {
  const { result } = await createComponentWorkflow(req.scope).run({
    input: req.body,
  });

  res.json({ component: result });
};
