"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
        alt="Luxury dining"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          transform: loaded ? "scale(1.03)" : "scale(1.1)",
          transition: "transform 8s ease-out",
        }}
      />

      {/* Dark Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)"
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 2rem"
      }}>

        {/* Top label */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s", marginBottom: "1.5rem"
        }}>
          <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
            Fine Dining · Est. 2012
          </p>
          <div style={{ width: "40px", height: "1px", background: "#C9A96E" }} />
        </div>

        {/* Main Heading */}
        <h1 style={{
          color: "#F5F0E8", fontFamily: "Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 300, letterSpacing: "0.05em",
          lineHeight: 1.1, marginBottom: "1.5rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease 0.4s",
          textShadow: "0 2px 40px rgba(0,0,0,0.5)"
        }}>
          An Experience<br />
          <em style={{ color: "#C9A96E", fontStyle: "italic" }}>Beyond</em> Dining
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "rgba(245,240,232,0.7)", fontFamily: "sans-serif",
          fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
          letterSpacing: "0.15em", fontWeight: 300,
          marginBottom: "3rem", maxWidth: "500px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.7s"
        }}>
          Tasting menus crafted with intention.<br />Every detail, deliberate.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.9s"
        }}>
          <Link href="/reservations" style={{
            color: "#0A0A0A", background: "#C9A96E",
            padding: "1rem 2.5rem", fontFamily: "sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.2em",
            textDecoration: "none", textTransform: "uppercase",
            transition: "all 0.3s ease", display: "inline-block"
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#E8D5B0")}
          onMouseLeave={e => (e.currentTarget.style.background = "#C9A96E")}>
            Reserve a Table
          </Link>

          <Link href="/menu" style={{
            color: "#F5F0E8", background: "transparent",
            border: "1px solid rgba(245,240,232,0.4)",
            padding: "1rem 2.5rem", fontFamily: "sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.2em",
            textDecoration: "none", textTransform: "uppercase",
            transition: "all 0.3s ease", display: "inline-block"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#C9A96E";
            e.currentTarget.style.color = "#C9A96E";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(245,240,232,0.4)";
            e.currentTarget.style.color = "#F5F0E8";
          }}>
            Explore Menu
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{
          position: "absolute", bottom: "3rem",
          display: "flex", gap: "4rem",
          opacity: loaded ? 1 : 0,
          transition: "all 1s ease 1.2s"
        }}>
          {[
            { number: "12", label: "Years of Excellence" },
            { number: "3", label: "Michelin Stars" },
            { number: "200+", label: "Signature Dishes" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: 300, letterSpacing: "0.05em" }}>
                {stat.number}
              </p>
              <p style={{ color: "rgba(245,240,232,0.5)", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", right: "3rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          opacity: loaded ? 0.6 : 0, transition: "opacity 1s ease 1.5s"
        }}>
          <p style={{ color: "#C9A96E", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", writingMode: "vertical-rl" }}>
            Scroll
          </p>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #C9A96E, transparent)" }} />
        </div>

      </div>
    </section>
  );
}
