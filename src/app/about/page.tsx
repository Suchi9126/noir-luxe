"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function useVisible(threshold = 0.15) {
  const [v, setV] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return { ref, v };
}

const team = [
  { name: "Chef Arnav Mehta", role: "Executive Chef & Founder", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&h=500&q=80" },
  { name: "Meera Kapoor", role: "Head Sommelier", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&h=500&q=80" },
  { name: "Lucas Ferrand", role: "Pastry Chef", img: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=400&h=500&q=80" },
  { name: "Priya Nair", role: "Restaurant Director", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=500&q=80" },
];

const milestones = [
  { year: "2012", title: "The Beginning", desc: "Chef Arnav Mehta opens Noir & Co. in a 40-seat space on Lavelle Road with a 5-course tasting menu." },
  { year: "2015", title: "First Recognition", desc: "Awarded Best Fine Dining in South India by Condé Nast Traveller. A full house for the first time." },
  { year: "2018", title: "Michelin Journey", desc: "Included in the first Michelin Guide India edition. The team celebrated with a 20-course staff dinner." },
  { year: "2021", title: "Three Stars", desc: "Noir & Co. receives three Michelin stars — the highest distinction in fine dining. India's first." },
  { year: "2024", title: "The New Chapter", desc: "Complete redesign of the dining room. A new tasting menu inspired by the six seasons of India." },
];

export default function AboutPage() {
  const [pageVisible, setPageVisible] = useState(false);
  const s1 = useVisible();
  const s2 = useVisible();
  const s3 = useVisible();
  const s4 = useVisible();

  useEffect(() => { setTimeout(() => setPageVisible(true), 100); }, []);

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", height: "55vh", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="About" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.25)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 2rem" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: pageVisible ? 1 : 0, transition: "opacity 1s ease 0.3s" }}>Our Story</p>
          <h1 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 300, opacity: pageVisible ? 1 : 0, transform: pageVisible ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.5s", lineHeight: 1.2 }}>
            More Than a<br /><em style={{ color: "#C9A96E" }}>Restaurant</em>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section ref={s1.ref} style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "2rem", opacity: s1.v ? 1 : 0, transition: "opacity 0.8s ease" }}>Philosophy</p>
        <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.5, marginBottom: "2.5rem", opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(20px)", transition: "all 0.9s ease 0.2s" }}>
          "We do not serve food. We compose experiences that linger long after the last course."
        </h2>
        <div style={{ width: "50px", height: "1px", background: "#C9A96E", margin: "0 auto 2.5rem", opacity: s1.v ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }} />
        <p style={{ color: "rgba(245,240,232,0.55)", fontFamily: "sans-serif", fontSize: "0.95rem", lineHeight: 2, opacity: s1.v ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
          Noir & Co. was born from a simple conviction: that the finest ingredients, treated with the deepest respect, need no embellishment. Our kitchen is guided by restraint — we add nothing that does not belong, and remove everything that does not serve. The result is cuisine that feels inevitable.
        </p>
      </section>

      {/* Story Split */}
      <section ref={s2.ref} style={{ padding: "4rem 2rem 6rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="about-split">
          <div style={{ opacity: s2.v ? 1 : 0, transform: s2.v ? "translateX(0)" : "translateX(-40px)", transition: "all 1s ease 0.2s" }}>
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
              alt="Interior" style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
          <div style={{ opacity: s2.v ? 1 : 0, transform: s2.v ? "translateX(0)" : "translateX(40px)", transition: "all 1s ease 0.4s" }}>
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>The Space</p>
            <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.3 }}>
              Designed for<br /><em style={{ color: "#C9A96E" }}>Intimacy</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#C9A96E", marginBottom: "1.5rem" }} />
            <p style={{ color: "rgba(245,240,232,0.55)", fontFamily: "sans-serif", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "1.2rem" }}>
              Forty seats. Each one chosen deliberately. The dining room was designed by Bengaluru-based studio Atelier Noire — a dialogue between raw concrete, warm walnut, and candlelight that never overwhelms the table.
            </p>
            <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.88rem", lineHeight: 1.9 }}>
              Every detail — the weight of the cutlery, the texture of the linen, the distance between tables — has been considered in service of one thing: making you feel that tonight, this restaurant exists only for you.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section ref={s3.ref} style={{ background: "#0D0D0D", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: s3.v ? 1 : 0, transition: "opacity 0.8s ease" }}>Our Journey</p>
            <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 300, opacity: s3.v ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>The Milestones</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "calc(50% - 0.5px)", top: 0, bottom: 0, width: "1px", background: "rgba(201,169,110,0.15)" }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{
                display: "flex", gap: "3rem", marginBottom: "3.5rem",
                flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                alignItems: "flex-start",
                opacity: s3.v ? 1 : 0,
                transform: s3.v ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s ease ${i * 0.15 + 0.3}s`
              }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
                  <p style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.8rem", fontWeight: 300, marginBottom: "0.3rem" }}>{m.year}</p>
                  <p style={{ color: "#F5F0E8", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>{m.title}</p>
                  <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "sans-serif", fontSize: "0.8rem", lineHeight: 1.7 }}>{m.desc}</p>
                </div>
                <div style={{ width: "12px", height: "12px", background: "#C9A96E", borderRadius: "50%", flexShrink: 0, marginTop: "0.4rem", boxShadow: "0 0 20px rgba(201,169,110,0.4)" }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section ref={s4.ref} style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", opacity: s4.v ? 1 : 0, transition: "opacity 0.8s ease" }}>The People</p>
          <h2 style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 300, opacity: s4.v ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>Our Team</h2>
        </div>
        <div className="team-grid" style={{ display: "grid", gap: "1.5rem" }}>
          {team.map((member, i) => (
            <div key={member.name} style={{ opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s ease ${i * 0.15 + 0.3}s` }}>
              <div style={{ overflow: "hidden", marginBottom: "1.2rem" }}>
                <img src={member.img} alt={member.name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
              </div>
              <p style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{member.name}</p>
              <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "#0D0D0D", padding: "5rem 2rem", textAlign: "center", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <p style={{ color: "rgba(245,240,232,0.35)", fontFamily: "sans-serif", fontSize: "0.85rem", marginBottom: "2rem" }}>Ready to experience Noir & Co.?</p>
        <Link href="/reservations" style={{ color: "#0A0A0A", background: "#C9A96E", padding: "1.1rem 2.8rem", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "background 0.3s ease", display: "inline-block" }}
          onMouseEnter={e => e.currentTarget.style.background = "#E8D5B0"}
          onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}>
          Reserve a Table
        </Link>
      </section>

      <Footer />
    </main>
  );
}
