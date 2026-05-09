"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.5rem 3rem",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? "1px solid rgba(201,169,110,0.2)" : "none"
    }}>
      <Link href="/" style={{
        color: "#C9A96E", fontFamily: "serif", fontSize: "1.4rem",
        letterSpacing: "0.3em", textDecoration: "none", fontWeight: 300
      }}>
        NOIR & CO.
      </Link>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {["Menu", "About", "Gallery", "Reservations"].map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`} style={{
            color: "#F5F0E8", fontFamily: "sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase",
            transition: "color 0.3s ease"
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = "#C9A96E"}
          onMouseLeave={e => (e.target as HTMLElement).style.color = "#F5F0E8"}>
            {item}
          </Link>
        ))}
        <Link href="/reservations" style={{
          color: "#C9A96E", border: "1px solid #C9A96E",
          padding: "0.5rem 1.5rem", fontFamily: "sans-serif",
          fontSize: "0.7rem", letterSpacing: "0.15em",
          textDecoration: "none", textTransform: "uppercase",
          transition: "all 0.3s ease", background: "transparent"
        }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.background = "#C9A96E";
          (e.target as HTMLElement).style.color = "#0A0A0A";
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.background = "transparent";
          (e.target as HTMLElement).style.color = "#C9A96E";
        }}>
          Reserve
        </Link>
      </div>
    </nav>
  );
}
