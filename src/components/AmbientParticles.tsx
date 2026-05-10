"use client";
import { useEffect, useRef } from "react";

interface Props {
  count?: number;
  color?: string;
}

export default function AmbientParticles({ count = 18, color = "201,168,76" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      const size = Math.random() * 3 + 1;
      dot.className = "particle";
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: rgba(${color}, ${Math.random() * 0.25 + 0.05});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 6 + 5}s;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(dot);
    }

    return () => { if (container) container.innerHTML = ""; };
  }, [count, color]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
