import type { ContentWrapper, Product, ProductDTO } from "~/utils/types";

/**
 * Data Transfer Object to safely extract the neccessay product data to show in modal
 *
 */
export const SingleProductDTOBuilder = (
  product: ProductDTO
): Partial<ProductDTO> | null => {
  if (!product) {
    return null;
  }
  return product;
};
