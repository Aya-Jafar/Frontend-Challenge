// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/image"],

  srcDir: "src/",

  components: {
    global: true,
    dirs: ["~/components"],
  },

  imports: {
    autoImport: true,
  },

  experimental: {
    componentIslands: true,
  },

  routeRules: {
    "/": { swr: 60 }, // cache homepage
    "/images/**": { isr: false },
  },

  app: {
    keepalive: true,

    head: {
      title: "Frontend challenge",
      meta: [{ name: "Frontend challenge" }],
      link: [
        {
          rel: "preconnect",
          href: "/fonts/Teshrin AR+LT Regular.woff2",
          as: "font",
        },
        {
          rel: "preconnect",
          href: "https://db.onlinewebfonts.com",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "https://db.onlinewebfonts.com/t/510d36c34e39deee4abbd9264a159c79.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preconnect",
          href: "~/src/assets/css/app.css",
          as: "style",
        },
        {
          rel: "preload",
          as: "image",
          href: "/images/logo.png",
          fetchpriority: "high",
        },
      ],
    },
  },

  css: ["~/assets/css/app.css"],
  pages: true,

  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: true,
        mangle: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  nitro: {
    compressPublicAssets: true,
    serveStatic: true, // Explicitly enable static file serving
    prerender: {
      crawlLinks: true,
    },
    // Compression settings should be handled externally or via middleware
    publicAssets: [
      {
        dir: path.join(__dirname, "public"), // Use absolute path
        baseURL: "/",
      },
    ],
  },

  image: {
    provider: "ipx", // built-in image processor
    presets: {
      default: {
        format: "webp",
        quality: 80,
      },
    },
  },
});
