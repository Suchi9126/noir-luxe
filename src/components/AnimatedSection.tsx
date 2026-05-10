"use client";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  animation?: "up" | "left" | "right" | "scale";
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "up",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animClass =
      animation === "left"
        ? "reveal-left"
        : animation === "scale"
        ? "reveal-scale"
        : "reveal";

    el.classList.add(animClass);
    if (delay > 0) el.style.setProperty("transition-delay", `${delay}ms`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
