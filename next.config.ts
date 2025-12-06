import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // When you call /api/...
        // The browser thinks it's local, but Next.js sends it here:
        destination: 'https://citeconnect-backend-api-897523647765.us-central1.run.app/api/v1/:path*', 
      },
    ];
  },
};

export default nextConfig;
