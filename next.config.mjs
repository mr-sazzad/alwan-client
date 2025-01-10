/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary images
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      // Nike static assets
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '**',
      },
      // Swiper JS assets
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        port: '',
        pathname: '**',
      },
      // i.ibb.co images
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
      },
      // Fabrilife assets
      {
        protocol: 'https',
        hostname: 'fabrilife.com',
        port: '',
        pathname: '**',
      },
      // CDN for BitCommerz
      {
        protocol: 'https',
        hostname: 'cdn.bitcommerz.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  typescript:{
    ignoreBuildErrors: true
  },
  webpack: (config, options) => {
    // Enable source maps in development
    if (options.dev) {
      config.devtool = 'source-map';
    } else {
      config.devtool = false; // Disable source maps in production
    }
    return config;
  },
  experimental: {
    serverActions: true,
  },
    eslint: {
        ignoreDuringBuilds: true,
    },
  transpilePackages: ["geist"], // Add more packages if necessary
};

export default nextConfig;
