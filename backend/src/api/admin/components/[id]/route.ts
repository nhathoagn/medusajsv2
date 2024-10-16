import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { deleteComponentWorkflow } from "src/workflows/component/delete-component";
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

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { result } = await deleteComponentWorkflow(req.scope).run({
    input: { id: req.params.id },
  });
  res.json({ component: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const component_query = remoteQueryObjectFromString({
    entryPoint: "component",
    fields: ["*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const result = await remoteQuery(component_query).then((res) => res[0]);
  console.log("result", result);
  res.json({ component: result });
};
