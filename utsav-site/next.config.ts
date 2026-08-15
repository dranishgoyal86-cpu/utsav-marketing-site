import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages — this site has no API routes or
  // server actions, so a static build is the simplest, most robust fit.
  output: "export",
  images: {
    // Cloudflare Pages doesn't run Next's Image Optimization API by
    // default; serve the already-optimized brand PNGs as-is.
    unoptimized: true,
  },
};

export default nextConfig;
