import type {
  Banner,
  ContentWrapper,
  Product,
  ProductProperties,
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
  const preparePrdoucts = (productsWarpper: Product[]) => {
    return ProductsDTOBuilder(productsWarpper);
  };

  const preparePrdouctsProperties = (properties: ProductProperties) => {
    return ProductsPropertiesDTOBuilder(properties);
  };

  return {
    preparePrdoucts,
    preparePrdouctsProperties,
  };
};
export default useProductsStore;

// export const preparePrdoucts = (productsWarpper: Product[]) => {
//   return ProductsDTOBuilder(productsWarpper);
// };

// export const preparePrdouctsProperties = (properties: ProductProperties) => {
//   return ProductsPropertiesDTOBuilder(properties);
// };
