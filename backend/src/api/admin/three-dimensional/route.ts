import { MedusaContainer } from "@medusajs/framework";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { remoteQueryObjectFromString } from "@medusajs/framework/utils";
import {
  CreateThreeDimensionalInput,
  createThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/create-three-dimensional";

export const POST = async (
  req: MedusaRequest<CreateThreeDimensionalInput>,
  res: MedusaResponse
) => {
  const { result } = await createThreeDimensionalWorkflow(req.scope).run({
    input: req.body,
  });
  res.json({ three_dimensional: result });
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
    entryPoint: "three_dimensional",
    fields: ["*"],
    variables: {
      filters: filters,
      skip: skip,
      take: take,
    },
  });
  const { rows } = await remoteQuery(material_value_query).then((res) => res);
  res.json({ three_dimensional: rows });
};
