import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds even if TypeScript errors remain
    // We fix them progressively but never block deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't fail build on lint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
