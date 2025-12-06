/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    const apiUrl = process.env.API_BASE_URL || 'https://citeconnect-backend-api-897523647765.us-central1.run.app/api/v1';

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/:path*`, 
      },
    ];
  },
};

export default nextConfig;