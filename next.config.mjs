/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'fabrilife.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bitcommerz.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  webpack: (config, options) => {
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'source-map'
    }
    return config
  },
  transpilePackages: ["geist"],
};

export default nextConfig;

