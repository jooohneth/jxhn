"use client";

import {
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export function Reveal({
  as: Tag = "section",
  className,
  id,
  children,
  instant = false,
}: {
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
  instant?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(instant);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    items.forEach((item, i) => {
      if (!item.style.getPropertyValue("--i")) {
        item.style.setProperty("--i", String(i));
      }
    });
    if (instant) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instant]);

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-reveal=""
      className={shown ? `${className ?? ""} revealed`.trim() : className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  as: Tag = "div",
  className,
  index,
  children,
}: {
  as?: ElementType;
  className?: string;
  index?: number;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal-item=""
      className={className}
      style={index !== undefined ? { ["--i" as string]: index } : undefined}
    >
      {children}
    </Tag>
  );
}
