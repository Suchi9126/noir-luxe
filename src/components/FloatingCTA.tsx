"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="float-cta" style={{
        position: "fixed", bottom: "1.5rem", left: "1rem", right: "1rem", zIndex: 200,
        animation: show ? "floatIn 0.5s ease forwards" : "none",
        opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none", transition: "opacity 0.3s ease"
      }}>
        <Link href="/reservations" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#C9A96E", color: "#0A0A0A", padding: "1rem 1.5rem",
          fontFamily: "sans-serif", fontSize: "0.78rem", letterSpacing: "0.15em",
          textDecoration: "none", textTransform: "uppercase", width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
        }}>
          <span>Reserve a Table</span>
          <span style={{ fontSize: "1rem" }}>→</span>
        </Link>
      </div>
    </>
  );
}
