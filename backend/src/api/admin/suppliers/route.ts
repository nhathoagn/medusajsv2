import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { SUPPLIER_MODULE } from "src/modules/supplier";
import SupplierModuleService from "src/modules/supplier/services";
import {
  CreateSupplierInput,
  createSupplierWorkflow,
} from "src/workflows/supplier/create-supplier";

export const POST = async (
  req: MedusaRequest<CreateSupplierInput>,
  res: MedusaResponse
) => {
  const { result } = await createSupplierWorkflow(req.scope).run({
    input: req.body,
  });
  res.json({
    supplier: result,
  });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const supplierModuleService: SupplierModuleService =
    req.scope.resolve(SUPPLIER_MODULE);

  const limit = req.query.limit || 15;
  const offset = req.query.offset || 0;

  const [brands, count] = await supplierModuleService.listAndCountSuppliers(
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
