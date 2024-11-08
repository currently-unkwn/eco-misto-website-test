// Server rendered
export const prerender = false;

import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import favicon from "../assets/favicon.png";
import { baseData } from "@/data/siteData";

const faviconPngSizes = [192, 512];

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: "png",
      });
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`,
      };
    })
  );

  const manifest = {
    name: baseData.title,
    description: baseData.description,
    start_url: "/",
    display: "standalone",
    id: "ecomisto-id",
    icons,
  };

  return new Response(JSON.stringify(manifest));
};
