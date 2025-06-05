import type {
  Banner,
  BannerDTO,
  BannerGridProperties,
  BannerGridPropertiesDTO,
} from "~/utils/types";

/**
 * Data Transfer Object to safely extract the necessary banners data
 *
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
  };
};
