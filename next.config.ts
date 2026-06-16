import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder (multiple lockfiles exist higher up,
  // so Turbopack would otherwise guess the wrong root).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
