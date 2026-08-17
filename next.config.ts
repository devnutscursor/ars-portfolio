import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static site — no server, no database. `next build` emits ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
