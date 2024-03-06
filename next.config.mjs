/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [{
        hostname:  'https://firebasestorage.googleapis.com'
    }]
 },
 headers: () => [
    {
        source: '/:path*',
        headers: [
            {
                key: 'Cache-Control',
                value: 'no-store',
            }
        ]
    }
 ]
};

export default nextConfig;
