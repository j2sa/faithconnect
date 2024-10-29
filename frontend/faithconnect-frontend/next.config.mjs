/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.giphy.com',
        pathname: '/YOZ2qMCwb9qec0Pkpj.webp'
      }
    ]
  }
};

export default nextConfig;
