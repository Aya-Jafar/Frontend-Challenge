
/**
 * Transforms raw Banner data into BannerDTOs with default fallbacks.
 * Ensures safe access to nested properties.
 *
 * @param banners - Array of raw Banner objects.
 * @returns Array of BannerDTO objects ready for UI consumption.
 */
export const BannerDTOBuilder = (banners: Banner[]): BannerDTO[] => {
  return banners?.map((banner) => ({
    id: banner.id || "",
    imageURL: banner.image || "",
    title: banner.title || "",
    actionId: banner.action?.id || "",
    actionTarget: banner.action?.target || "",
  }));
};


/**
 * Converts raw BannerGridProperties to a DTO with camelCase keys and defaults.
 *
 * @param properties - Raw BannerGridProperties object.
 * @returns BannerGridPropertiesDTO with normalized properties.
 */
export const BannersPropertiesDTOBuilder = (
  properties: BannerGridProperties
): BannerGridPropertiesDTO => {
  return {
    cols: properties?.cols || "1",
    rows: properties?.rows || "1",
    ratio: properties?.ratio || "1",
    direction: properties?.direction || "vertical",

    hasShadow: properties?.has_shadow ?? false,

    lineSpacing: properties?.line_spacing || "0",
    interitemSpacing: properties?.interitem_spacing || "0",
    leftRightMargins: properties?.left_right_margins || "0",
    topBottomMargins: properties?.top_bottom_margins || "0",

    outerLeftRightMargins: properties?.outer_left_right_margins || "16",
    outerTopBottomMargins: properties?.outer_top_bottom_margins || "8",
    
    innerLeftRightSpacing: properties?.inner_left_right_spacing || "16",
    innerTopBottomSpacing: properties?.inner_top_bottom_spacing || "8",
  };
};
