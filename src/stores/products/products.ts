import type {
  Product,
  ProductDTO,
  ProductProperties,
  ProductPropertiesDTO,
} from "~/utils/types";
import {
  ProductsDTOBuilder,
  ProductsPropertiesDTOBuilder,
} from "./DTO/products";

/**
 * These functions prepare and transform raw product properties data into a DTO
 * with camelCase keys and default values.
 *
 */
const useProductsStore = () => {
  const preparePrdoucts = (productsWarpper: Product[]): ProductDTO[] => {
    return ProductsDTOBuilder(productsWarpper);
  };

  const preparePrdouctsProperties = (
    properties: ProductProperties
  ): ProductPropertiesDTO => {
    return ProductsPropertiesDTOBuilder(properties);
  };

  return {
    preparePrdoucts,
    preparePrdouctsProperties,
  };
};
export default useProductsStore;
