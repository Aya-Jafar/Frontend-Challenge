import { useSnackbarStore } from "@/stores/snackbar";
// @ts-ignore
import { useRuntimeConfig } from "#imports";
import type { SnackbarType } from "@/stores/snackbar";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type SetterFunction<T> = (data: T) => void;
type LoadingFunction = (isLoading: boolean) => void;
type ErrorFunction = (errorMessage: string) => void;

interface APIServiceOptions<T = any> {
  endpoint: string;
  method?: HTTPMethod;
  body?: Record<string, any> | string;
  pathParams?: string;
  setterFunction?: SetterFunction<T> | null;
  setLoading?: LoadingFunction | null;
  setError?: ErrorFunction | null;
  showSnackbar?: (message: string, type?: SnackbarType) => void;
}

/**
 * A service for making API requests.
 *
 * @class APIService
 */
export class APIService {
  /**
   * Makes an API request to the specified endpoint with the given options.
   *
   * @async
   * @param {APIServiceOptions<T>} options - The options for the API request.
   * @returns {Promise<T>} The response data from the API.
   * @throws {Error} If the request fails or the response is not successful.
   *
   * @example
   * const data = await APIService.request({
   *   endpoint: "/auth/user",
   *   method: "GET",
   *   setterFunction: (data) => { console.log(data); },
   *   setLoading: (loading) => { this.isLoading = loading; }
   * });
   */
  static async request<T = any>({
    endpoint,
    method = "GET",
    body = "",
    pathParams = "",
    setterFunction = null,
    setLoading = null,
    setError = null,
    showSnackbar,
  }: APIServiceOptions<T>): Promise<T> {
    if (setLoading) setLoading(true);

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;
    const url = `${API_BASE_URL}/${endpoint}${pathParams}`;


    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        if (method !== "GET" && showSnackbar) {
          showSnackbar(`Error: ${String(errorMessage)}`, "error");
        }
      }

      const data: T = await response.json();

      if (method !== "GET" && showSnackbar) {
        showSnackbar("Request successful!", "success");
      }
      if (setterFunction) {
        setterFunction(data);
      }
      return data;
    } catch (error) {
      if (method !== "GET" && showSnackbar) {
        showSnackbar(`Error: ${String(error)}`, "error");
      }

      throw error;
    } finally {
      if (setLoading) setLoading(false);
    }
  }
}
