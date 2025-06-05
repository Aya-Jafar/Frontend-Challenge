// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  srcDir: "src/",

  components: {
    global: true,
    dirs: ["~/components"],
  },
  imports: {
    autoImport: true,
  },
  
  css: ["~/assets/css/app.css"],
  pages: true,
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    "/images/**": { isr: false },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  nitro: {
    static: true,
    publicAssets: [
      {
        dir: "./public",
        baseURL: "/",
      },
    ],
  },
});
