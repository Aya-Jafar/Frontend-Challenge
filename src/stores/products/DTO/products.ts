import type {
  ContentWrapper,
  Product,
  ProductDTO,
  ProductProperties,
  ProductPropertiesDTO,
} from "~/utils/types";

/**
 * `Data Transfer Object` to safely extract product data from ContentWrapper
 * @params {ContentWrapper} wrapper - The content wrapper containing product data
 * @returns {ProductDTO[]} - An array of ProductDTO objects with the desired keys
 */

export const ProductsDTOBuilder = (wrapper: ContentWrapper): ProductDTO[] => {
  if (!wrapper || !Array.isArray(wrapper)) {
    return [];
  }
  console.log("data in DTO", wrapper);

  /**
   * What we input is in this structure :
   * [
   *  {type:"products", content:[...] },
   *  .....
   * ]
   * each content array is of type Product
   *
   * What we need is in new structure :
   * flat array of prodcuts
   *  [ .... ]
   *
   * But now each object inside content is of type ProductDTO
   */

  return wrapper.map(
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
      topTag: product?.start_tag?.title || null,
      topTagColor: product?.start_tag?.color || null,
      topTagBgColor: product?.start_tag?.bg_color || null,
      bottomTag: product?.end_tag?.title || null,
      bottomTagColor: product?.end_tag?.color || null,
      bottomTagBgColor: product?.end_tag?.bg_color || null,
      merchant: product?.merchant?.title || "Unknown Merchant",
      merchantIcon: product?.merchant?.icon || "",
      merchantBgColor: product?.merchant?.bg_color || "",

      titleLines: product?.properties?.title_lines || "",
    })
  );
};

/**
 * Data Transfer Object to safely extract the necessary product properties data
 *
 */
export const ProductsPropertiesDTOBuilder = (
  properties: ProductProperties
): ProductPropertiesDTO => {
  return {
    imageRatio: properties?.image_ratio || "",
    titleLines: properties?.title_lines || "",
    hasCartBtn: properties?.has_cart_btn ?? false,
    hasFavouriteBtn: properties?.has_favourite_btn ?? false,
    shouldShowTitle: properties?.should_show_title ?? false,
    shouldShowRating: properties?.should_show_rating ?? false,
    shouldShowVariations: properties?.should_show_variations ?? false,
  };
};
