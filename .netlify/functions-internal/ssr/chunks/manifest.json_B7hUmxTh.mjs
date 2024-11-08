import { a as getImage } from './_astro_assets_DiISuSVx.mjs';
import { b as baseData, f as faviconPngSrc } from './siteData_Ctw1-7FX.mjs';

const prerender = false;
const faviconPngSizes = [192, 512];
const GET = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: faviconPngSrc,
        width: size,
        height: size,
        format: "png"
      });
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`
      };
    })
  );
  const manifest = {
    name: baseData.title,
    description: baseData.description,
    start_url: "/",
    display: "standalone",
    id: "ecomisto-id",
    icons
  };
  return new Response(JSON.stringify(manifest));
};

export { GET, prerender };
