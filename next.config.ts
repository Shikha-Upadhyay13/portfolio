import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. Several stray lockfiles/node_modules
  // exist higher up (an abandoned three.js experiment in the parent dir + a
  // lockfile in the home dir), so Turbopack would otherwise guess the wrong
  // root and fail to resolve `tailwindcss`. next dev/build run from here.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
