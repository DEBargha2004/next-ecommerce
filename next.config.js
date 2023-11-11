/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn-icons-png.flaticon.com'
      },
      {
        hostname: 'fakestoreapi.com'
      }
    ]
  }
}

module.exports = nextConfig
