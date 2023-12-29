/** @type {import('next').NextConfig} */
const { API_HOST = 'http://localhost:3003' } = process.env || {};

const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
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
