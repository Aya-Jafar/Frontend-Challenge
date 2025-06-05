import { BannerDTOBuilder, BannersPropertiesDTOBuilder } from "./DTO/banners";
import type { Banner, BannerGridProperties } from "~/utils/types";

/**
 * Transforms an array of raw Banner objects into BannerDTOs
 * suitable for UI or further processing.
 *
 */

const useBannersStore = () => {
  const prepareBanners = (banner: Banner[]) => {
    return BannerDTOBuilder(banner);
  };

  const prepareBannersProperties = (properties: BannerGridProperties) => {
    return BannersPropertiesDTOBuilder(properties);
  };

  return {
    prepareBanners,
    prepareBannersProperties,
  };
};

export default useBannersStore;
