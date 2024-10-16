import { defineMiddlewares } from "@medusajs/medusa";
import supplier from "src/modules/supplier";
import { z } from "zod";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/products",
      method: ["POST"],
      // additionalDataValidator: {
      //   brand_id: z.string().optional(),
      //   supplier_id: z.string().optional(),
      // },
    },
  ],
});
