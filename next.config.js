/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RZP_KEY: process.env.RZP_KEY,
    RZP_SECRET: process.env.RZP_SECRET,
  },
};

module.exports = nextConfig;
