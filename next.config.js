/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Enable production mode optimizations
    config.mode = 'production';
    
    // Aggressive code splitting and optimization
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: true,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Separate chunk for Radix UI components
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 40,
          },
          // Separate chunk for other large libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 30,
          },
        },
      },
    };

    return config;
  },
  // Enable webpack build worker for better performance
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Transpile specific modules
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig
