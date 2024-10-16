import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import {
  CreateThreeDimensionalWithModelNodesInput,
  ModelNode,
} from "../../create-three-dimensional-with-model-nodes";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { Component } from "src/modules/three-dimensional/types/mutations";
import { MedusaContainer } from "@medusajs/medusa";
import { ComponentType } from "src/modules/three-dimensional/types/common";
import { title } from "process";

export const createThreeDimensionalWithModuleNodeStep = createStep(
  "create-three-dimensional-with-module-node-step",
  async (input: { model_nodes?: ModelNode[] }, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    // logger.log("createThreeDimensionalStep", input);
    console.log("createThreeDimensionalStep", input);
    logger.error("Linked brand to products");
    handleModelNodes(input.model_nodes, container, threeDimensionModuleService);
    // const three_dimension =
    //   await threeDimensionModuleService.createThreeDimensionals(input);

    return new StepResponse("");
  }
);

const handleModelNodes = async (
  model_nodes: ModelNode[],
  container: MedusaContainer,
  threeDimensionModuleService: ThreeDimensionalModuleService
) => {
  const result: Component[] = [];
  const product_id = model_nodes[0].product_id;
  const remoteQuery = container.resolve("remoteQuery");
  const three_dimensionalQuery = remoteQueryObjectFromString({
    entryPoint: "three_dimensional",
    fields: ["*", "component.*"],
    variables: {
      filters: {
        product_id: product_id,
      },
    },
  });
  const existingProductComponents = await remoteQuery(
    three_dimensionalQuery
  ).then((res) => res);

  console.log("existingProductComponents", existingProductComponents);
  const existingComponentInProductMap = new Map(
    existingProductComponents.flatMap((pc) =>
      pc.component.map((comp) => [comp.name, pc])
    )
  );

  console.log("existingComponentMap", existingComponentInProductMap);
  const componentQuery = remoteQueryObjectFromString({
    entryPoint: "component",
    fields: ["*"],
  });
  const components = await remoteQuery(componentQuery).then((res) => res);
  const componentMap = new Map(components.map((c) => [c.name, c]));
  console.log("componentMap", componentMap);
  const processedComponents = new Set();
  const parentComponents = new Set();
  for (const { name, type } of model_nodes) {
    await processModelNode(
      name,
      type,
      product_id,
      existingComponentInProductMap,
      componentMap,
      result,
      processedComponents,
      parentComponents,
      container
    );
  }
  await cleanupUnusedComponents(
    existingComponentInProductMap,
    processedComponents,
    parentComponents
  );

  return new StepResponse({
    status: 200,
    data: result,
    message: "Successfully created components",
  });
};

const processModelNode = async (
  name: string,
  url: string,
  type: ComponentType,
  product_id: string,
  existingComponentInProductMap: Map<unknown, unknown>,
  componentMap: Map<unknown, any>,
  result: Component[],
  processedComponents: Set<string | unknown>,
  parentComponents: Set<string | unknown>,
  container: MedusaContainer
) => {
  const threeDimensionModuleService: ThreeDimensionalModuleService =
    container.resolve(THREE_DIMENSION_MODULE);
  if (!existingComponentInProductMap.has(name)) {
    let component = componentMap.get(name);
    if (!component) {
      component = await threeDimensionModuleService.createComponents({
        name,
      });

      result.push(component);
      componentMap.set(name, component);
    }
    const new_three_dimensional =
      await threeDimensionModuleService.createThreeDimensionals({
        product_id,
        component_id: component.id,
        title: name,
        url: url,
      });
  }
  processedComponents.add(name);
  await processParentComponent(
    name,
    product_id,
    existingComponentInProductMap,
    componentMap,
    parentComponents
  );
};
const processParentComponent = async (
  name: string,
  product_id: string,
  existingComponentInProductMap: Map<unknown, unknown>,
  componentMap: Map<unknown, unknown>,
  parentComponents: Set<string | unknown>
) => {
  const parts = name.split("_");
  const parentName = parts.slice(0, 2).join("_");
  if (parentName !== name) {
  }
};
