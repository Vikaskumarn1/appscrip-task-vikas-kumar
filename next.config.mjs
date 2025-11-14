/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.2.2:3000', 'localhost:3000', '127.0.0.1:3000'],
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://fakestoreapi.com',
  },
}

export default nextConfig
