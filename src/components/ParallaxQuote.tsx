"use client";
import { useEffect, useRef, useState } from "react";

export default function ParallaxQuote() {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) setOffset(rect.top * 0.25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1920&q=80"
        alt="Ambience" style={{ position: "absolute", inset: "-10%", width: "120%", height: "120%", objectFit: "cover", transform: `translateY(${offset}px)`, willChange: "transform" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.82)" }} />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "5rem 2rem", maxWidth: "800px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.2s" }}>
          <div style={{ width: "50px", height: "1px", background: "rgba(201,169,110,0.5)" }} />
          <span style={{ color: "#C9A96E", fontSize: "1rem" }}>✦</span>
          <div style={{ width: "50px", height: "1px", background: "rgba(201,169,110,0.5)" }} />
        </div>
        <blockquote style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.55, marginBottom: "2.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s ease 0.4s" }}>
          "The finest dining experience does not announce itself. It envelops you — quietly, completely, and without end."
        </blockquote>
        <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.8s" }}>— Chef Arnav Mehta</p>
      </div>
    </section>
  );
}
