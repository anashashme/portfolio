/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  trailingSlash: true, // Add trailing slashes for GitHub Pages compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export
  },
  // Base path if you're not using a custom domain
  // basePath: '/portfolio',
};

export default nextConfig;
