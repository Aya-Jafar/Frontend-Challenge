// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import path from "path";

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
      // Usefull for SEO
      title: "Frontend challenge", // This will create the <title> tag

      meta: [
        {
          name: "description",
          content: "A fun frontend challenge to sharpen your skills.",
        },
      ],

      link: [
        {
          rel: "preconnect",
          href: "/fonts/Teshrin AR+LT Regular.woff2",
          as: "font",
        },
        {
          rel: "preconnect",
          href: "https://d3uk5qlby53t3w.cloudfront.net",
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
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },

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
});
