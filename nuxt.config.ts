// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  srcDir: "src/",
  components: true,
  css: ["~/assets/css/app.css"],
  
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    "/images/**": { isr: false },
  },
  nitro: {
    static: true, // You already have this
    // Optional: Explicit public assets config
    publicAssets: [
      {
        dir: "../public", // Points to root public/
        baseURL: "/",
      },
    ],
  },
});
