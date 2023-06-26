/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.spotifycdn.com',
            },
            {
                protocol: 'https',
                hostname: '**.scdn.co',
            },
        ],
        // domains: ['i.scdn.co', 'charts-images.scdn.co', 'mosaic.scdn.co', '**.scdn.co', 'seed-mix-image.spotifycdn.com', '**.spotifycdn.com']
    }
}

module.exports = nextConfig
