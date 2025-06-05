import { BannerDTOBuilder, BannersPropertiesDTOBuilder } from "./DTO/banners";
import type {
  Banner,
  BannerDTO,
  BannerGridProperties,
  BannerGridPropertiesDTO,
} from "~/utils/types";

const useBannersStore = () => {
  /**
   * Transforms an array of raw Banner objects into BannerDTOs
   * suitable for UI or further processing.
   *
   */
  const prepareBanners = (banner: Banner[]): BannerDTO[] => {
    return BannerDTOBuilder(banner);
  };

  const prepareBannersProperties = (
    properties: BannerGridProperties
  ): BannerGridPropertiesDTO => {
    return BannersPropertiesDTOBuilder(properties);
  };

  return {
    prepareBanners,
    prepareBannersProperties,
  };
};

export default useBannersStore;
