import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto aunque haya otros package-lock.json en carpetas superiores.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
