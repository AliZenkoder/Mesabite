/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [{
        hostname:  'https://firebasestorage.googleapis.com'
    }]
 },
 reactStrictMode: false,
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
