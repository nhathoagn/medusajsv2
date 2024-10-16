import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const {
    data: [product],
  } = await query.graph({
    entity: "product",
    fields: ["three_dimensional.component.*"],
    filters: {
      id: req.params.id,
    },
  });

  res.json({ product_component: product });
};
