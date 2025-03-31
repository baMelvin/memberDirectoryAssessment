/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/memberDirectoryAssessment/' : '',
  images: {
    unoptimized: true,
    domains: ['randomuser.me'],
  },
}

module.exports = nextConfig