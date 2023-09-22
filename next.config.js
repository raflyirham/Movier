/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    AUTH_KEY: process.env.AUTH_KEY,
  },
};

module.exports = nextConfig;
