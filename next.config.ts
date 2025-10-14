import type { NextConfig } from "next";
import { redirects as redirectsList } from "./lib/redirects";

const nextConfig: NextConfig = {
  /* config options here */

  // 301 Redirects Configuration
  // Edit redirects in lib/redirects.ts
  async redirects() {
    return redirectsList;
  },
};

export default nextConfig;
