/** @type {import('next').NextConfig} */
const {
    API_HOST = 'https://localhost:3003',
} = process.env || {};

const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/eapi/:path*",
                destination: `${API_HOST}/:path*`,
            },
        ]
    },
}