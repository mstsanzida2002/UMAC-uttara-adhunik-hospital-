import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Disable optimizer cache TTL so replaced images show immediately
    minimumCacheTTL: 0,
  },
  outputFileTracingIncludes: {
    "/*": ["./prisma/dev.db"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
