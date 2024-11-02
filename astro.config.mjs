import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://github.com/codiume/orbit/tree/main/packages/astro-purgecss
// If using SSR, purgecss should be tested and configured
import purgecss from "astro-purgecss";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ecomisto-test.netlify.app",
  integrations: [
    react(),
    mdx(),
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
  ],
  devToolbar: {
    enabled: false,
  },
  output: "hybrid",
  adapter: netlify(),
  // vite: {
  //   ssr: {
  //     // ssr instead of rollupOptions
  //     external: ["@resvg/resvg-js"],
  //   },
  //   build: {
  //     rollupOptions: {
  //       external: ["@resvg/resvg-js"],
  //     },
  //   },
  //   optimizeDeps: {
  //     exclude: ["@resvg/resvg-js"],
  //   },
  // },
});
