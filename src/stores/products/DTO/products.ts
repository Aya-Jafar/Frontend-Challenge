import type {
  ContentWrapper,
  Product,
  ProductDTO,
  ProductProperties,
  ProductPropertiesDTO,
} from "~/utils/types";

/**
 * `Data Transfer Object` to safely extract product data from ContentWrapper
 * @param {Product[]} wrapper - Array of raw product objects from the backend.
 * @returns {ProductDTO[]} A cleaned array of product data with transformed keys and fallbacks.
 */

export const ProductsDTOBuilder = (wrapper: Product[]): ProductDTO[] => {
  if (!wrapper || !Array.isArray(wrapper)) {
    return [];
  }
  /**
   *  What we input is in this structure :
   *  [{},{},...]
   *
   * each object in array is of @type Product
   *
   *  What we need is in new structure :
   *  flat array of prodcuts
   *  [ {},{},...]
   *
   * But now each object inside content is of @type ProductDTO
   */

  return wrapper?.map(
    (product: Product): ProductDTO => ({
      type: product?.type,

      id: product?.id || "",
      title: product?.title || "No Title",
      imageURL: product?.image || "",
      brand: product?.brand || "Unknown Brand",
      price: Number(product?.price?.value)?.toLocaleString() || "0",
      currency: product?.price?.currency || "N/A",
      colors: product?.colors || [],
      rating: product?.rating || "0",
      ratingCount: product?.rating_count || "0",
      category: product?.category || "Uncategorized",
      priceBeforeDiscount:
        Number(product?.price?.original_value)?.toLocaleString() || "0",

      topTag:
        `-${Number(product?.start_tag?.title?.match(/\d+/)?.[0])}%` || null, // Extract only number from disscount 

      topTagColor: product?.start_tag?.color || null,
      topTagBgColor: product?.start_tag?.bg_color || null,
      bottomTag: product?.end_tag?.title || null,
      bottomTagColor: product?.end_tag?.color || null,
      bottomTagBgColor: product?.end_tag?.bg_color || null,
      merchant: product?.merchant?.title || "Unknown Merchant",
      merchantIcon: product?.merchant?.icon || "",
      merchantBgColor: product?.merchant?.bg_color || "",
    })
  );
};

/**
 * Converts raw product UI display properties from backend format (`ProductProperties`)
 * to the frontend-friendly `ProductPropertiesDTO` format.
 *
 * @param {ProductProperties} properties - Raw product layout settings from backend.
 * @returns {ProductPropertiesDTO} A cleaned and camelCased object with safe defaults for rendering.
 */
export const ProductsPropertiesDTOBuilder = (
  properties: ProductProperties
): ProductPropertiesDTO => {
  return {
    imageRatio: properties?.image_ratio || "1",
    titleLines: properties?.title_lines || "",
    hasCartBtn: properties?.has_cart_btn ?? true,
    hasFavouriteBtn: properties?.has_favourite_btn ?? true,
    shouldShowTitle: properties?.should_show_title ?? true,
    shouldShowRating: properties?.should_show_rating ?? true,
    shouldShowVariations: properties?.should_show_variations ?? true,
  };
};
