import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  trailingSlash: false,   

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
        stale: 60,
        revalidate: 300,
        expire: 3600,
      },
    },
  },

//   async rewrites() {
//   return [
//     {
//       source: "/api/auth/:path*",
//       destination: "https://mentorhub-r0u7.onrender.com/api/auth/:path*"
//     }
//   ];
// }
async rewrites() {
  return [];
}

};

export default nextConfig;