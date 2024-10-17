import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { removeDuplicates } from "src/ultil/remove-duplicates";
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
  const material_value_query = remoteQueryObjectFromString({
    entryPoint: "material",
    fields: ["*"],
    variables: {
      filters: filters,
      skip: skip,
      take: take,
    },
  });
  const { rows } = await remoteQuery(material_value_query).then((res) => res);
  const uniqueRows = removeDuplicates(rows, rows.handle);

  res.json({ materials: uniqueRows });
};
