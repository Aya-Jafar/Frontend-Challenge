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
});
