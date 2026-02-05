import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },

   experimental: {
    cacheLife: {
      page: {
        stale: 60,        // seconds before revalidation can happen
        revalidate: 300,  // background revalidation
        expire: 3600,     // hard expiration
      },
    },
  },

}

export default nextConfig;
