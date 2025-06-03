import { ContentWrapper, Product } from "../../../utils/types";
import { APIService } from ".././../../services/ApiService";
import { ENDPOINTS } from "../../../utils/endpoints";
import { defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const data = await APIService.request<Product>({
      endpoint: ENDPOINTS.FLAT_PRODUCTS,
      method: "GET",
      pathParams: `${id}`,
    });
    return data;
  } catch (error) {
    return { error: "Something went wrong fetching the API data 💥" };
  }
});
