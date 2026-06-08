"use client"

import Image, { type ImageProps } from "next/image"
import Zoom from "react-medium-image-zoom"
import { cn } from "@/lib/utils"

export interface ImageZoomProps extends ImageProps {
  className?: string
}

function getImageSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src
  if ("default" in src) return (src as { default: { src: string } }).default.src
  return (src as { src: string }).src
}

export function ImageZoom({ className, ...props }: ImageZoomProps) {
  return (
    <Zoom
      zoomMargin={20}
      wrapElement="span"
      zoomImg={{ src: getImageSrc(props.src) }}
    >
      <Image
        className={cn("cursor-zoom-in transition-all", className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
        {...props}
      />
    </Zoom>
  )
}
