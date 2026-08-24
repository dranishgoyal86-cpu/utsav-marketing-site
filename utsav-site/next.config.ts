import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dynamic rendering via @opennextjs/cloudflare (Cloudflare Worker with
  // static assets) — output: "export" removed so per-request routes
  // (invite pages, wishing wall, vendor profiles) can render individually
  // instead of everything being fixed at deploy time.
  images: {
    // None of the current next/image uses (Nav logo, page.tsx logo x2,
    // MomentsGallery) need on-the-fly resizing yet — keeping this true
    // avoids depending on Cloudflare's image-resizing binding for now.
    // Revisit if a future feature needs real per-request image transforms.
    unoptimized: true,
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
