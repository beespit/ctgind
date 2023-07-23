/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'ctgind.com' }],
      destination: 'https://www.ctgind.com/:path*',
      permanent: true
    }
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      }
    ],
  },
};

module.exports = nextConfig;
