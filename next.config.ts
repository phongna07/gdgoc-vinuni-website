import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves the static assets generated in out/.
  output: "export",
  images: {
    // Static hosting has no Next.js image optimization server.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
