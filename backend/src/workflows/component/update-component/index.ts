import { container } from "@medusajs/framework";
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { Component } from "react";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { Material } from "src/modules/three-dimensional/types/mutations";
import { createComponentStep } from "../step/create-component";
import { updateComponentStep } from "../step/update-component";

export type UpdateComponentInput = {
  materials?: Material[];
  image: string;
  norm: number;
  ui: string;
  isSelfSufficient: boolean;
  isExtraModel: boolean;
  default_value?: Record<string, any>;
  metadata?: Record<string, any>;
};

export const updateComponentWorkflow = createWorkflow(
  "update-component",
  (input: UpdateComponentInput) => {
    // TODO
    const component = updateComponentStep(input);

    return new WorkflowResponse(component);
  }
);
