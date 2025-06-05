export type Type = "products" | "grid";

export type RawSection =
  | {
      type: "products";
      content: Product[];
      properties: ProductProperties;
    }
  | {
      type: "grid";
      content: Banner[];
      properties: BannerGridProperties;
    };

export interface ApiResponse {
  content: RawSection[];
}

export type Section =
  | {
      type: "products";
      content: ProductDTO[];
      properties: ProductPropertiesDTO;
    }
  | {
      type: "grid";
      content: BannerDTO[];
      properties: BannerGridPropertiesDTO;
    };

export interface ProductProperties {
  image_ratio: string;
  title_lines: string;
  has_cart_btn: boolean;
  has_favourite_btn: boolean;
  should_show_title: boolean;
  should_show_rating: boolean;
  should_show_variations: boolean;
}

export interface ProductPropertiesDTO {
  imageRatio: string;
  titleLines: string;
  hasCartBtn: boolean;
  hasFavouriteBtn: boolean;
  shouldShowTitle: boolean;
  shouldShowRating: boolean;
  shouldShowVariations: boolean;
}

export interface Product {
  type: Type;
  id: string;
  url: string;
  brand: string;
  image: string;
  price: {
    value: string;
    currency: string;
    original_value: string;
  };
  title: string;
  action: {
    id: string;
    target: string;
  };
  colors: string[];
  rating: string;
  end_tag: Tag | null;
  category: string;
  start_tag: Tag | null;
  brand_alias: string;
  rating_count: string;
  merchant: {
    title: string;
    bg_color: string;
    icon: string;
  };
  properties: ProductProperties;
}

export interface Tag {
  color: string;
  title: string;
  bg_color: string;
}

export interface ContentWrapper {
  content: Product[];
}

export interface ProductDTO {
  title: string;
  id: string;
  imageURL: string;
  brand: string;
  price: string;
  currency: string;
  colors: string[];
  rating: string;
  ratingCount: string;
  category: string;
  priceBeforeDiscount: string;
  topTag: string | null;
  topTagColor: string | null;
  topTagBgColor: string | null;
  bottomTag: string | null;
  bottomTagColor: string | null;
  bottomTagBgColor: string | null;
  merchant: string;
  merchantIcon: string;
  merchantBgColor: string;
  topTagIcon?: string;
  bottomTagIcon?: string;

  type: Type;
}

export type Banner = {
  id: string;
  image: string;
  title: string;
  action: {
    id: string;
    target: string;
  };
};
export interface BannerDTO {
  id: string;
  imageURL: string;
  title: string;
  actionId: string;
  actionTarget: string;
}

export type BannerGridProperties = {
  cols: string;
  rows: string;
  ratio: string;
  direction: string;
  has_shadow: boolean;
  line_spacing: string;
  interitem_spacing: string;
  left_right_margins: string;
  top_bottom_margins: string;
};

export interface BannerGridPropertiesDTO {
  cols: string;
  rows: string;
  ratio: string;
  direction: string;
  hasShadow: boolean;
  lineSpacing: string;
  interitemSpacing: string;
  leftRightMargins: string;
  topBottomMargins: string;
}
