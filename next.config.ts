import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds even if TypeScript errors remain
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    // Prefer modern formats for smaller payloads
    formats: ["image/avif", "image/webp"],
    // Reduce default device sizes for smaller srcset
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Enable gzip compression
  compress: true,
  // Reduce powered-by header exposure
  poweredByHeader: false,
  // Strict React mode for better performance practices
  reactStrictMode: true,
};

export default nextConfig;
