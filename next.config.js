const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
  basePath: '/https://cyd5538.github.io',
  reactStrictMode: true, 
  swcMinify: true,
  output: "export",
  images: { unoptimized: true } 
}

module.exports = withContentlayer(nextConfig)