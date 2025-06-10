import {
  ProductsDTOBuilder,
  ProductsPropertiesDTOBuilder,
} from "./DTO/products";

/**
 * Provides functions to prepare and transform raw product data and properties
 * into DTOs with consistent camelCase keys and default values.
 */
const useProductsStore = () => {
  /**
   * Transforms an array of raw Product objects into ProductDTOs
   * suitable for UI or further processing.
   *
   * @param productsWrapper - Raw products array to transform.
   * @returns Array of ProductDTO.
   */
  const preparePrdoucts = (productsWarpper: Product[]): ProductDTO[] => {
    return ProductsDTOBuilder(productsWarpper);
  };

  /**
   * Transforms raw product properties into ProductPropertiesDTO format.
   *
   * @param properties - Raw product properties.
   * @returns Transformed product properties DTO.
   */
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
