/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost:3002"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        protocol: "http", // Make sure the protocol matches what you use locally (http for local development usually)
        hostname: "localhost",
        port: "3002", // Specify the port if your local development server uses a specific port
        pathname: "**", // This will match any path
      },
    ],
  },
};

export default nextConfig;
