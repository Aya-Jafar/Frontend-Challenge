import { BannerDTOBuilder, BannersPropertiesDTOBuilder } from "./DTO/banners";
import type { Banner, BannerGridProperties } from "~/utils/types";

export const prepareBanners = (banner: Banner[]) => {
  return BannerDTOBuilder(banner);
};

export const prepareBannersProperties = (properties: BannerGridProperties) => {
  return BannersPropertiesDTOBuilder(properties);
};
