import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import ThreeDimensionalModule from "../modules/three-dimensional";
export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  ThreeDimensionalModule.linkable.threeDimensional
);
