/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.shutterstock.com"],
  },
  output: "export", // Ensures static export is properly handled
  trailingSlash: true,
};

export default nextConfig;
