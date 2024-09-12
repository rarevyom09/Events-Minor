/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "plus.unsplash.com", // Add this hostname
      //   port: "",
      //   pathname: "/**",
      // },
    ],
  },
};

module.exports = nextConfig;
