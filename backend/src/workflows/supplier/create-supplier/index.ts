import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createSupplierStep } from "./steps/create-supplier";

export type CreateSupplierInput = {
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  title?: string;
  company?: string;
  addresses?: string;
  supplier_review?: string;
  tiers?: string;
  metadata?: Record<string, unknown>;
  created_by?: string;
};

export const createSupplierWorkflow = createWorkflow(
  "create-supplier",
  (input: CreateSupplierInput) => {
    // TODO
    const supplier = createSupplierStep(input);
    return new WorkflowResponse(supplier);
  }
);
