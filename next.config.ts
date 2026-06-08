import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/-renaissance-detailing",
  transpilePackages: ["three", "@react-three/fiber"],
  images: { unoptimized: true },
}

export default nextConfig
