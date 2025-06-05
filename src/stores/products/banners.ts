import { BannerDTOBuilder, BannersPropertiesDTOBuilder } from "./DTO/banners";
import type { Banner, BannerGridProperties } from "~/utils/types";

/**
 * Transforms an array of raw Banner objects into BannerDTOs
 * suitable for UI or further processing.
 *
 */

export const prepareBanners = (banner: Banner[]) => {
  return BannerDTOBuilder(banner);
};


/**
 * Transforms raw BannerGridProperties into a DTO with camelCase keys
 * and default values applied.
 *
 */
export const prepareBannersProperties = (properties: BannerGridProperties) => {
  return BannersPropertiesDTOBuilder(properties);
};
