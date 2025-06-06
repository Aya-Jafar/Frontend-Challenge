import { BannerDTOBuilder, BannersPropertiesDTOBuilder } from "./DTO/banners";
import type {
  Banner,
  BannerDTO,
  BannerGridProperties,
  BannerGridPropertiesDTO,
} from "~/utils/types";

const useBannersStore = () => {
  /**
   * Converts an array of raw Banner objects into BannerDTO format
   * for UI rendering or further processing.
   *
   * @param banner - Array of raw Banner objects.
   * @returns Array of transformed BannerDTO objects.
   */
  const prepareBanners = (banner: Banner[]): BannerDTO[] => {
    return BannerDTOBuilder(banner);
  };

  /**
   * Converts BannerGridProperties into BannerGridPropertiesDTO
   * for consistent handling of banner grid settings.
   *
   * @param properties - Raw banner grid properties.
   * @returns Transformed BannerGridPropertiesDTO.
   */
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
