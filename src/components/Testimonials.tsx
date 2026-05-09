"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  { quote: "An ethereal dining experience. Every course was a masterpiece of flavor and presentation. Noir & Co. is in a class of its own.", name: "Priya Sharma", location: "Mumbai", rating: 5 },
  { quote: "The private dining room exceeded every expectation. Impeccable service, flawless cuisine. We will return for every anniversary.", name: "James Whitmore", location: "London", rating: 5 },
  { quote: "Noir & Co. has ruined all other restaurants for me. The tasting menu was a journey I did not want to end.", name: "Aiko Tanaka", location: "Tokyo", rating: 5 },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#0A0A0A", padding: "8rem 4rem", position: "relative", overflow: "hidden" }}>
      {/* Background text */}
      <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "20vw", fontFamily: "Georgia, serif", color: "rgba(201,169,110,0.03)", whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none" }}>REVIEWS</p>

      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>Testimonials</p>
        <div style={{ width: "60px", height: "1px", background: "#C9A96E", margin: "0 auto 1.5rem", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }} />
        <h2 style={{ color: "#F5F0E8", fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>What Our Guests Say</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <div key={t.name} style={{
            background: "#141414", border: "1px solid rgba(201,169,110,0.15)",
            padding: "3rem 2.5rem",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.8s ease ${i * 0.15 + 0.4}s`
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} style={{ color: "#C9A96E", fontSize: "1rem" }}>★</span>
              ))}
            </div>
            {/* Quote mark */}
            <p style={{ color: "rgba(201,169,110,0.2)", fontFamily: "Georgia, serif", fontSize: "5rem", lineHeight: 0.8, marginBottom: "1rem" }}>"</p>
            <p style={{ color: "rgba(245,240,232,0.75)", fontFamily: "Georgia, serif", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: "2rem" }}>"{t.quote}"</p>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "1.5rem" }}>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}>{t.name}</p>
              <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.2rem" }}>{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
