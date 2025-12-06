/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    const apiUrl = process.env.API_BASE_URL;

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/:path*`, 
      },
    ];
  },
};

export default nextConfig;