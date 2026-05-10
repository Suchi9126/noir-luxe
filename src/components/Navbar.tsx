"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav data-navbar style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.2rem 2rem",
        background: scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none"
      }}>
        <Link href="/" style={{ color: "#C9A96E", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.3rem", letterSpacing: "0.3em", textDecoration: "none", fontWeight: 300 }}>
          NOIR & CO.
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ gap: "2.5rem", alignItems: "center" }}>
          {["Menu", "About", "Gallery", "Reservations"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: "#F5F0E8", fontFamily: "sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={e => (e.currentTarget.style.color = "#F5F0E8")}>
              {item}
            </Link>
          ))}
          <Link href="/reservations" style={{ color: "#C9A96E", border: "1px solid #C9A96E", padding: "0.5rem 1.5rem", fontFamily: "sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#0A0A0A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}>
            Reserve
          </Link>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C9A96E", transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C9A96E", transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C9A96E", transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "#0A0A0A", zIndex: 99,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "2.5rem",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.4s ease"
      }}>
        {["Menu", "About", "Gallery", "Reservations"].map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{ color: "#F5F0E8", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2.5rem", fontWeight: 300, letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.3s ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={e => (e.currentTarget.style.color = "#F5F0E8")}>
            {item}
          </Link>
        ))}
        <Link href="/reservations" onClick={() => setMenuOpen(false)}
          style={{ color: "#0A0A0A", background: "#C9A96E", padding: "1rem 3rem", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", marginTop: "1rem" }}>
          Reserve a Table
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
          <div style={{ width: "30px", height: "1px", background: "rgba(201,169,110,0.3)" }} />
          <p style={{ color: "rgba(245,240,232,0.2)", fontFamily: "sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em" }}>NOIR & CO.</p>
          <div style={{ width: "30px", height: "1px", background: "rgba(201,169,110,0.3)" }} />
        </div>
      </div>
    </>
  );
}
