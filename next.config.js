const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
  basePath: '/',
  reactStrictMode: true, 
  swcMinify: true, 
  output: 'export',
  images: { unoptimized: true },
  skipTrailingSlashRedirect: true,
  trailingSlash: true
}

module.exports = withContentlayer(nextConfig)