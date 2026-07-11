/** @type {import('next').NextConfig} */
const nextConfig = {
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
