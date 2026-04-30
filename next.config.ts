import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-b2ad5628805a4d8b869f60f52b7bdb01.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;