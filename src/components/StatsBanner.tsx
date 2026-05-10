"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { value: 12, suffix: "", label: "Years of Excellence", desc: "Est. 2012" },
  { value: 3, suffix: "", label: "Michelin Stars", desc: "India's finest" },
  { value: 200, suffix: "+", label: "Signature Recipes", desc: "Ever evolving" },
  { value: 40, suffix: "", label: "Seats Only", desc: "Intimate by design" },
];

import AnimatedSection from "@/components/AnimatedSection";
export default function StatsBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) ob.observe(ref.current);
    return (
  <AnimatedSection animation="up" delay={100} className="max-w-5xl mx-auto mt-12 px-6">) => ob.disconnect();
  }, []);

  const c0 = useCountUp(stats[0].value, 1800, visible);
  const c1 = useCountUp(stats[1].value, 1200, visible);
  const c2 = useCountUp(stats[2].value, 2000, visible);
  const c3 = useCountUp(stats[3].value, 1500, visible);
  const counts = [c0, c1, c2, c3];

  return (
  <AnimatedSection animation="up" delay={100} className="max-w-5xl mx-auto mt-12 px-6">
    <>
      <section ref={ref} className="stats-section" style={{ background: "#0D0D0D", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201,169,110,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />
        <div className="stats-grid" style={{ display: "grid", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: "center", padding: "2rem 1rem",
              borderRight: i < stats.length - 1 ? "1px solid rgba(201,169,110,0.1)" : "none",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.8s ease ${i * 0.15}s`
            }}>
              <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>
                {counts[i]}{stat.suffix}
              </p>
              <p style={{ color: "#F5F0E8", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0.75rem 0 0.3rem" }}>{stat.label}</p>
              <p style={{ color: "rgba(245,240,232,0.25)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em" }}>{stat.desc}</p>
            </div>
  </AnimatedSection>
          ))}
        </div>
  </AnimatedSection>
      </section>
    </>
  );
}
