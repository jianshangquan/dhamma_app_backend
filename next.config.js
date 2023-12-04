/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    headers: async () => {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }
                ]
            }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['mongoose', '@ffprobe-installer/ffprobe'],
    },
    images: {
        domains: ['localhost']
    }
}

module.exports = nextConfig
