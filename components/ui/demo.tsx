"use client"

import { useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function HeroBackground() {
  const [speed] = useState(0.6)

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#000000", "#111111", "#1a1a1a", "#0d0d0d"]}
        speed={speed}
      />

      {/* Subtle shimmer overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/[0.015] rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/[0.01] rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "9s", animationDelay: "2s" }}
        />
      </div>

      {/* Vertical line accents matching the static site */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 40, 60, 80].map((left) => (
          <div
            key={left}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${left}%`,
              background: "linear-gradient(180deg, transparent, rgba(192,192,192,0.04), transparent)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
