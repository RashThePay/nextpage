/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'royaserver.chbk.run',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3j730xi5ph1dq.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
