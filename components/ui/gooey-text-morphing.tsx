"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  /** seconds each text is visible (can be array for per-text control) */
  cooldownTime?: number | number[];
  /** fade transition duration in seconds */
  fadeTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  cooldownTime = 2,
  fadeTime = 0.7,
  className,
  textClassName,
}: GooeyTextProps) {
  // Two alternating slots — A and B
  const [slotA, setSlotA]       = React.useState(texts[0] ?? "");
  const [slotB, setSlotB]       = React.useState("");
  const [showA, setShowA]       = React.useState(true);  // true = A visible, B hidden

  const cooldowns = React.useMemo(() => {
    if (Array.isArray(cooldownTime)) return cooldownTime;
    return texts.map(() => cooldownTime as number);
  }, [cooldownTime, texts]);

  React.useEffect(() => {
    let indexRef = 0;
    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      const nextIndex = (indexRef + 1) % texts.length;

      // Load next text into the hidden slot, then swap visibility
      setShowA((prev) => {
        if (prev) {
          // A is showing → load next into B, then show B
          setSlotB(texts[nextIndex]);
        } else {
          // B is showing → load next into A, then show A
          setSlotA(texts[nextIndex]);
        }
        return !prev;
      });

      indexRef = nextIndex;
      timer = setTimeout(cycle, (cooldowns[nextIndex] + fadeTime) * 1000);
    };

    timer = setTimeout(cycle, (cooldowns[0] + fadeTime) * 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fade = `opacity ${fadeTime}s ease`;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <span
        className={cn("absolute inline-block select-none text-center whitespace-nowrap", textClassName)}
        style={{ opacity: showA ? 1 : 0, transition: fade }}
      >
        {slotA}
      </span>
      <span
        className={cn("absolute inline-block select-none text-center whitespace-nowrap", textClassName)}
        style={{ opacity: showA ? 0 : 1, transition: fade }}
      >
        {slotB}
      </span>
    </div>
  );
}
