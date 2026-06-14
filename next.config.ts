import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-e03c3dc1-8f03-478f-8dbc-89d65c166144.space-z.ai",
    ".space-z.ai",
  ],
};

export default nextConfig;
