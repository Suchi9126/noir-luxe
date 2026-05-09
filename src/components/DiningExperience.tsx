"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    number: "01",
    title: "The Tasting Menu",
    desc: "Seven courses. Seven stories. A progression through textures, temperatures, and techniques that redefine what a meal can be.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "02",
    title: "Private Dining",
    desc: "Exclusive rooms for up to 20 guests. Your occasion, elevated. Bespoke menus crafted around your story.",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "03",
    title: "The Wine Journey",
    desc: "A curated cellar of over 400 labels. Our sommelier pairs each course with a wine that transforms the meal into a dialogue.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  },
];

export default function DiningExperience() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} style={{ background: "#0A0A0A", padding: "8rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 4rem" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Experiences</p>
            <h2 style={{ color: "#F5F0E8", fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300 }}>
              Every Visit, <em style={{ color: "#C9A96E" }}>Unforgettable</em>
            </h2>
          </div>
          <div style={{ width: "60px", height: "1px", background: "rgba(201,169,110,0.3)", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }} />
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* Left: List */}
          <div>
            {experiences.map((exp, i) => (
              <div key={exp.number}
                onClick={() => setActive(i)}
                style={{
                  padding: "2rem 0", borderBottom: "1px solid rgba(201,169,110,0.1)",
                  cursor: "pointer",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.7s ease ${i * 0.15 + 0.3}s`
                }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
                  <span style={{
                    color: active === i ? "#C9A96E" : "rgba(201,169,110,0.2)",
                    fontFamily: "Georgia, serif", fontSize: "0.9rem",
                    transition: "color 0.4s ease", marginTop: "0.2rem", flexShrink: 0
                  }}>{exp.number}</span>
                  <div>
                    <p style={{
                      color: active === i ? "#F5F0E8" : "rgba(245,240,232,0.4)",
                      fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 300,
                      marginBottom: "0.75rem", transition: "color 0.4s ease"
                    }}>{exp.title}</p>
                    <p style={{
                      color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif",
                      fontSize: "0.85rem", lineHeight: 1.8,
                      maxHeight: active === i ? "100px" : "0",
                      overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease",
                      opacity: active === i ? 1 : 0
                    }}>{exp.desc}</p>
                  </div>
                  <span style={{
                    marginLeft: "auto", color: "#C9A96E",
                    fontSize: "1.2rem", flexShrink: 0,
                    transform: active === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.4s ease"
                  }}>+</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div style={{
            position: "relative", overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transition: "all 1s ease 0.5s"
          }}>
            <img
              src={experiences[active].image}
              alt={experiences[active].title}
              style={{
                width: "100%", height: "500px", objectFit: "cover",
                transition: "opacity 0.5s ease"
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
            {/* Progress dots */}
            <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem" }}>
              {[0,1,2].map(i => (
                <div key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? "24px" : "6px", height: "6px",
                  background: i === active ? "#C9A96E" : "rgba(255,255,255,0.3)",
                  borderRadius: "3px", cursor: "pointer", transition: "all 0.4s ease"
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
