/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx.com',
      'firebasestorage.googleapis.com',
      'z-p3-scontent.flos1-2.fna.fbcdn.net',
    ],
  },
};

module.exports = nextConfig;
