/** @type {import('next').NextConfig} */
const { API_HOST = 'http://localhost:3003' } = process.env || {};

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_HOST}/:path*`,
        locale: false,
      },
    ];
  },
};

module.exports = nextConfig;
