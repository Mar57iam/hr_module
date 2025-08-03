// next.config.mjs

import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['yourdomain.com'],
  },

  
};


export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
