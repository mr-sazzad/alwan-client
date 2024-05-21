/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "swiperjs.com",
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: "i.ibb.co",
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: "fabrilife.com",
            port: '',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
