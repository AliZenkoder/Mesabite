/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [{
        hostname:  'https://firebasestorage.googleapis.com'
    }]
 }
};

export default nextConfig;
