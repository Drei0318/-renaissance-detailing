import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["three", "@react-three/fiber"],
  images: { unoptimized: true },
}

export default nextConfig
