import type {
  Banner,
  ContentWrapper,
  Product,
  ProductProperties,
} from "~/utils/types";
import {
  ProductsDTOBuilder,
  ProductsPropertiesDTOBuilder,
} from "./DTO/products";

export const preparePrdoucts = (productsWarpper: ContentWrapper) => {
  return ProductsDTOBuilder(productsWarpper);
};

export const preparePrdouctsProperties = (properties: ProductProperties) => {
  return ProductsPropertiesDTOBuilder(properties);
};

