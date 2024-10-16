import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";

// export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
//   const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
//   console.log("req.params.id", req.params.id);
//   const {
//     data: [product],
//   } = await query.graph({
//     entity: "product",
//     fields: ["three_dimensional.*"],
//     filters: {
//       id: req.params.id,
//     },
//   });

//   res.json({ three_dimensional: product });
// };
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery");
  const material_query = remoteQueryObjectFromString({
    entryPoint: "product",
    fields: ["three_dimensional.*"],
    variables: {
      filters: {
        id: req.params.id,
      },
    },
  });
  const result = await remoteQuery(material_query).then((res) => res[0]);
  console.log("result", result);
  res.json({ product: result });
};
