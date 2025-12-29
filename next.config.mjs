/** @type {import('next').NextConfig} */
const nextConfig = {
    // Next.js 14 optimizations
    reactStrictMode: true,
    swcMinify: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            }
        ],
    },

    // Cache optimization notes:
    // On Windows, if you encounter "incorrect header check" errors,
    // run 'npm run clean' to reset the build cache.
};

export default nextConfig;
