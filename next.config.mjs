/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.2.2:3000', 'localhost:3000', '127.0.0.1:3000'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: '**.fakestoreapi.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
