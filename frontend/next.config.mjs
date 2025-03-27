/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.shutterstock.com"],
  },
  reactStrictMode: true,
  //changed the beolow to false
  trailingSlash: false,
  experimental: {},
};

export default nextConfig;
