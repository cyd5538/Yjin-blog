const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true, 
  swcMinify : false,
  output: 'export',
  images: { unoptimized: true },
  skipTrailingSlashRedirect: true,
  trailingSlash: true
}

module.exports = withContentlayer(nextConfig)