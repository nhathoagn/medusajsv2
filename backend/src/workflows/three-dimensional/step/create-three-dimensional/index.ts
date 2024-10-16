import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateThreeDimensionalInput } from "../../create-three-dimensional";
import ThreeDimensionalModuleService from "src/modules/three-dimensional/service";
import { THREE_DIMENSION_MODULE } from "src/modules/three-dimensional";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { MedusaContainer } from "@medusajs/medusa";
import {
  Component,
  ThreeDimensional,
} from "src/modules/three-dimensional/types/mutations";
import { linkProductToThreeDimensionalStep } from "../link-product-to-three-dimensional";
export type ModelNode = {
  name?: string;
  url?: string;
  product_id?: string;
};
export const createThreeDimensionalStep = createStep(
  "create-three-dimensional-step",
  async (input: CreateThreeDimensionalInput, { container }) => {
    const threeDimensionModuleService: ThreeDimensionalModuleService =
      container.resolve(THREE_DIMENSION_MODULE);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const remoteQuery = container.resolve("remoteQuery");

    // logger.log("createThreeDimensionalStep", input);

    if (input.model_nodes && input.model_nodes.length > 0) {
      const threeDimensionals = await handleModelNodes(
        input.model_nodes,
        container,
        threeDimensionModuleService
      );
      return new StepResponse(threeDimensionals);
    } else if (!input.component_id && input.product_id) {
      const three_dimension =
        await threeDimensionModuleService.createThreeDimensionals(input);
      return new StepResponse(three_dimension, three_dimension.id);
    } else {
      const three_dimension =
        await threeDimensionModuleService.createThreeDimensionals(input);

      input.component_id.map(async (component_id) => {
        const componentQuery = remoteQueryObjectFromString({
          entryPoint: "component",
          fields: ["*"],
          variables: {
            filters: {
              id: component_id,
            },
          },
        });
        const components = await remoteQuery(componentQuery).then(
          (res) => res[0]
        );
        if (!components.three_dimensional_id) {
          await threeDimensionModuleService.updateComponents(component_id, {
            three_dimensional_id: three_dimension.id,
          });
        } else {
          await threeDimensionModuleService.createComponents({
            name: components.name,
            image: components.image,
            norm: components.norm,
            ui: components.ui,
            isSelfSufficient: components.isSelfSufficient,
            isExtraModel: components.isExtraModel,
            default_value: components.default_value,
            metadata: components.metadata,
            three_dimensional_id: three_dimension.id,
          });
        }
      });

      return new StepResponse(three_dimension, three_dimension.id);
    }
  }
);

const handleModelNodes = async (
  model_nodes: ModelNode[],
  container: MedusaContainer,
  threeDimensionModuleService: ThreeDimensionalModuleService
) => {
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
  const existingThreeDimensional = await remoteQuery(
    three_dimensionalQuery
  ).then((res) => res);

  const existingComponentInProductMap: Map<string, ThreeDimensional> = new Map(
    existingThreeDimensional.flatMap((pc) =>
      pc.component.map((comp) => [comp.name, pc])
    )
  );

  const componentQuery = remoteQueryObjectFromString({
    entryPoint: "component",
    fields: ["*"],
  });
  const components = await remoteQuery(componentQuery).then((res) => res);
  const componentMap: Map<string, ThreeDimensional> = new Map(
    components.map((c) => [c.name, c])
  );
  const processedComponents = new Set();
  const parentComponents: Set<string> = new Set();
  const createdThreeDimensionals: ThreeDimensional[] = [];
  for (const { name, url } of model_nodes) {
    const result = await processModelNode(
      name,
      url,
      product_id,
      existingComponentInProductMap,
      componentMap,
      parentComponents,
      container
    );
    console.log("result", result);
    createdThreeDimensionals.push(...result);
  }
  await cleanupUnusedComponents(
    existingComponentInProductMap,
    processedComponents,
    parentComponents,
    container
  );
  return createdThreeDimensionals;
};

const processModelNode = async (
  name: string,
  url: string,
  product_id: string,
  existingComponentInProductMap: Map<string, ThreeDimensional>,
  componentMap: Map<string, ThreeDimensional>,
  parentComponents: Set<string>,
  container: MedusaContainer
): Promise<ThreeDimensional[]> => {
  let result: ThreeDimensional[] = [];
  const threeDimensionModuleService: ThreeDimensionalModuleService =
    container.resolve(THREE_DIMENSION_MODULE);

  if (!existingComponentInProductMap.has(name)) {
    const three_dimensional =
      await threeDimensionModuleService.createThreeDimensionals({
        product_id,
        title: name,
        url: url,
      });

    const component = await threeDimensionModuleService.createComponents({
      name,
      three_dimensional_id: three_dimensional.id,
    });

    result.push(three_dimensional);
    componentMap.set(name, component);
    existingComponentInProductMap.set(name, three_dimensional);
  } else {
    result.push(existingComponentInProductMap.get(name));
  }

  const parentThreeDimensional = await processParentComponent(
    name,
    product_id,
    existingComponentInProductMap,
    componentMap,
    parentComponents,
    container
  );

  if (parentThreeDimensional) {
    result.push(parentThreeDimensional);
  }

  console.log("Processed ModelNode result", result);
  return result;
};
const processParentComponent = async (
  name: string,
  product_id: string,
  existingComponentInProductMap: Map<string, ThreeDimensional>,
  componentMap: Map<string, any>,
  parentComponents: Set<string>,
  container: MedusaContainer
): Promise<ThreeDimensional | null> => {
  const parts = name.split("_");
  const parentName = parts.slice(0, 2).join("_");
  const threeDimensionModuleService: ThreeDimensionalModuleService =
    container.resolve(THREE_DIMENSION_MODULE);

  if (parentName !== name) {
    parentComponents.add(parentName);
    if (!existingComponentInProductMap.has(parentName)) {
      const parent_p_c =
        await threeDimensionModuleService.createThreeDimensionals({
          product_id,
          title: parentName,
        });

      const newParentComponent =
        await threeDimensionModuleService.createComponents({
          name: parentName,
          three_dimensional_id: parent_p_c.id,
        });

      existingComponentInProductMap.set(parentName, parent_p_c);
      componentMap.set(parentName, newParentComponent);

      console.log("Created parent ThreeDimensional", parent_p_c);
      return parent_p_c;
    } else {
      console.log("Existing parent ThreeDimensional", parentName);

      return null;
    }
  }
  return null;
};
const cleanupUnusedComponents = async (
  existingComponentInProductMap: Map<unknown, any>,
  processedComponents: Set<string | unknown>,
  parentComponents: Set<string | unknown>,
  container: MedusaContainer
) => {
  const threeDimensionModuleService: ThreeDimensionalModuleService =
    container.resolve(THREE_DIMENSION_MODULE);
  for (const [name, productComponent] of existingComponentInProductMap) {
    if (!processedComponents.has(name) && !parentComponents.has(name)) {
      await threeDimensionModuleService.deleteThreeDimensionals(
        productComponent
      );
    }
  }
};
