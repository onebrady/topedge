import type { NextConfig } from "next";
import { redirects as redirectsList } from "./lib/redirects";

const nextConfig: NextConfig = {
  /* config options here */

  // Image optimization configuration
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // 301 Redirects Configuration
  // Edit redirects in lib/redirects.ts
  async redirects() {
    return redirectsList;
  },
};

export default nextConfig;
