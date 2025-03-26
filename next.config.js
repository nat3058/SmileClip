/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Enable production mode optimizations
    config.mode = 'production';
    
    // Enable tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
    };

    return config;
  },
  // Disable unnecessary features for static export
  experimental: {
    webpackBuildWorker: true,
  },
}

module.exports = nextConfig
