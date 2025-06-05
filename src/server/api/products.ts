import { ContentWrapper, Product } from "./../../utils/types";
import { APIService } from "./../../services/ApiService";
import { ENDPOINTS } from "../../utils/endpoints";
import { defineEventHandler } from "h3";

/**
 * API endpoint handler to fetch data from a mock API containing the JSON file.
 * This simulates an API call with a delay.
 *
 * @returns {Promise<Object>} The parsed JSON data from the file.
 */
export default defineEventHandler(
  async (): Promise<Product[] | { error: string }> => {
    try {
      const data = await APIService.request<ContentWrapper>({
        endpoint: ENDPOINTS.PRODUCTS,
        method: "GET",
      });
      return data?.content;
    } catch (error) {
      return { error: "Something went wrong fetching the API data 💥" };
    }
  }
);
