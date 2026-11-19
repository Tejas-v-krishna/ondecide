/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output directory is overridable so the app can be built/served from a
  // fresh folder when clearing a large stale .next cache is restricted.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS image domains (Finnhub logos)
      },
    ],
  },
  // Disable compression to prevent SSE buffering issues
  compress: false,
};

export default nextConfig;
