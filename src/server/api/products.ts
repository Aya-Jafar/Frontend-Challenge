import {
  ContentWrapper,
  Product,
  RawSection,
  ApiResponse,
} from "./../../utils/types";
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
  async (): Promise<ApiResponse[] | { error: string }> => {
    try {
      const data = await APIService.request<{ content: ApiResponse[] }>({
        endpoint: ENDPOINTS.PRODUCTS,
        method: "GET",
      });

      // console.log("Fetched data:", data);
      return data?.content || [];
    } catch (error) {
      return { error: "Something went wrong fetching the API data 💥" };
    }
  }
);
