import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 980, 1120, 1180, 1260, 1320, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 360, 480, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
