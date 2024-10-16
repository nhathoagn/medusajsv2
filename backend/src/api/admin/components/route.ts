import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  CreateComponentInput,
  createComponentWorkflow,
} from "../../../workflows/component/create-component";
import { remoteQueryObjectFromString } from "@medusajs/framework/utils";

export const POST = async (
  req: MedusaRequest<CreateComponentInput>,
  res: MedusaResponse
) => {
  const { result } = await createComponentWorkflow(req.scope).run({
    input: req.body,
  });

  res.json({ component: result });
};
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const filters = {} as Record<string, any>;
  let take = parseInt(req.query.take as string) || null;
  let skip = parseInt(req.query.skip as string) || 0;
  for (const key in req.query) {
    if (["take", "skip"].includes(key)) continue;

    filters[key] = req.query[key];
  }
  const component_query = remoteQueryObjectFromString({
    entryPoint: "component",
    fields: ["*"],
    variables: {
      filters: filters,
      skip: skip,
      take: take,
    },
  });
  const { rows } = await remoteQuery(component_query).then((res) => res);
  res.json({ component: rows });
};
