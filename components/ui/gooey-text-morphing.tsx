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
  fadeTime = 0.8,
  className,
  textClassName,
}: GooeyTextProps) {
  const [current, setCurrent] = React.useState(0);
  const [next, setNext]       = React.useState<number | null>(null);
  const [phase, setPhase]     = React.useState<"hold" | "out" | "in">("hold");

  // Normalise cooldownTime to an array
  const cooldowns = React.useMemo(() => {
    if (Array.isArray(cooldownTime)) return cooldownTime;
    return texts.map(() => cooldownTime as number);
  }, [cooldownTime, texts]);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const hold = (index: number) => {
      setPhase("hold");
      timer = setTimeout(() => fadeOut(index), cooldowns[index] * 1000);
    };

    const fadeOut = (index: number) => {
      const nextIndex = (index + 1) % texts.length;
      setNext(nextIndex);
      setPhase("out");
      timer = setTimeout(() => fadeIn(nextIndex), fadeTime * 1000);
    };

    const fadeIn = (index: number) => {
      setCurrent(index);
      setNext(null);
      setPhase("in");
      timer = setTimeout(() => hold(index), fadeTime * 1000);
    };

    hold(current);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentOpacity = phase === "out" ? 0 : 1;
  const nextOpacity    = phase === "out" || phase === "in" ? 1 : 0;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Current text */}
      <span
        className={cn("absolute inline-block select-none text-center whitespace-nowrap", textClassName)}
        style={{
          opacity: currentOpacity,
          transition: `opacity ${fadeTime}s ease`,
        }}
      >
        {texts[current]}
      </span>

      {/* Next text (fades in over current) */}
      {next !== null && (
        <span
          className={cn("absolute inline-block select-none text-center whitespace-nowrap", textClassName)}
          style={{
            opacity: nextOpacity,
            transition: `opacity ${fadeTime}s ease`,
          }}
        >
          {texts[next]}
        </span>
      )}
    </div>
  );
}
