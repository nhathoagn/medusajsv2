import { MedusaContainer } from "@medusajs/framework";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import {
  CreateThreeDimensionalInput,
  createThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/create-three-dimensional";
import { deleteThreeDimensionalWorkflow } from "src/workflows/three-dimensional/delete-three-dimensional";
import {
  updateThreeDimensionalInput,
  updateThreeDimensionalWorkflow,
} from "src/workflows/three-dimensional/update-three-dimensinal";

export const PATCH = async (
  req: MedusaRequest<updateThreeDimensionalInput>,
  res: MedusaResponse
) => {
  const { id } = req.params;
  const data = {
    id,
    ...req.body,
  };
  const { result } = await updateThreeDimensionalWorkflow(req.scope).run({
    input: data,
  });
  res.json({ three_dimensional: result });
};
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const three_dimensional_query = remoteQueryObjectFromString({
    entryPoint: "three_dimensional",
    fields: ["*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const three_dimensional = await remoteQuery(three_dimensional_query).then(
    (res) => res[0]
  );
  const data = {
    id: req.params.id,
    product_id: three_dimensional.product_id,
  };

  const { result } = await deleteThreeDimensionalWorkflow(req.scope).run({
    input: data,
  });
  res.json({ three_dimensional: result });
};
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const three_dimensional_query = remoteQueryObjectFromString({
    entryPoint: "three_dimensional",
    fields: ["*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const result = await remoteQuery(three_dimensional_query).then(
    (res) => res[0]
  );
  res.json({ three_dimensional: result });
};
