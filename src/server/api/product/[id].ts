import { defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const response = await fetch(
      `https://683d6aa6199a0039e9e5600b.mockapi.io/api/flat-products/${id}`
    );

    // Simulate latency
    await new Promise((r) => setTimeout(r, 800));

    console.log("Reposne",response);
    
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    // throw createError({
    //   statusCode: error.response?.status || 500,
    //   statusMessage: error.message || "Failed to fetch product data",
    // });
  }
});
