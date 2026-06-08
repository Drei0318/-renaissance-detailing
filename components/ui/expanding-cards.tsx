"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  return (
    <ul
      className={cn(
        "w-full gap-1.5",
        "grid",
        "h-[520px] md:h-[480px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden",
            "md:min-w-[60px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:brightness-75 scale-105 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-1.5 p-5">
            {/* Rotated title when collapsed — desktop only */}
            <h3 className="hidden origin-left rotate-90 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-white/50 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0 whitespace-nowrap">
              {item.title}
            </h3>

            {/* Expanded content */}
            <div className="text-white/80 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>
            <p className="w-full max-w-xs text-[0.75rem] text-white/70 leading-relaxed opacity-0 transition-all duration-300 delay-200 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
