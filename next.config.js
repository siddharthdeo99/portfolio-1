module.exports = {
  reactStrictMode: true,  // Enables React strict mode
  trailingSlash: true,    // Adds trailing slash to URLs
  pageExtensions: ['page.js', 'api.js'],  // Custom page and API file extensions

  // Custom Webpack configuration
  webpack(config, { isServer }) {

    // Run custom scripts only on the server
    if (isServer) {
      require('./scripts/generate-sitemap');
      require('./scripts/draco');
    }

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },  // Prevents loading SVGs as URLs
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos, models, HDRs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,  // Regex to match file types
      type: 'asset/resource',
    });

    // Force URL import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },

  // Image optimization configuration (without experimental)
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1600],  // Example for responsive images
    imageSizes: [16, 32, 48, 64, 96],  // Add custom sizes for static images
  },
};