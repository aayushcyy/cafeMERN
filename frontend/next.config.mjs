/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.shutterstock.com"],
  },
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
