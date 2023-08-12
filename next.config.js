const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true, 
  swcMinify: true, 
  output: 'export',
  images: { unoptimized: true },
  skipTrailingSlashRedirect: true,
}

module.exports = withContentlayer(nextConfig)