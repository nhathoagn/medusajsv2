import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  CreateBrandInput,
  createBrandWorkflow,
} from "../../../workflows/brand/create-brand";
import BrandModuleService from "../../../modules/brand/service";
import { BRAND_MODULE } from "../../../modules/brand";

export const POST = async (
  req: MedusaRequest<CreateBrandInput>,
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.body,
  });

  res.json({ brand: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const brandModuleService: BrandModuleService =
    req.scope.resolve(BRAND_MODULE);

  const limit = req.query.limit || 15;
  const offset = req.query.offset || 0;

  const [brands, count] = await brandModuleService.listAndCountBrands(
    {},
    {
      skip: offset as number,
      take: limit as number,
    }
  );

  res.json({
    brands,
    count,
    limit,
    offset,
  });
};
