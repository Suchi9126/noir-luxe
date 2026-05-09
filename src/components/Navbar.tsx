"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-serif text-xl tracking-[0.25em] text-[#C9A96E] transition-opacity duration-300 hover:opacity-80 md:text-2xl"
            >
              NOIR & CO
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-stone-100 transition-colors duration-300 hover:text-[#C9A96E]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Reserve Button */}
              <Link
                href="/reservations"
                className="ml-4 border border-[#C9A96E] bg-transparent px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-[#C9A96E] transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#0a0a0a]"
              >
                Reserve
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`h-0.5 w-6 bg-[#C9A96E] transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "translate-y-2 rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-[#C9A96E] transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-[#C9A96E] transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-translate-y-2 -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(10,10,10,0.98)] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl uppercase tracking-[0.25em] text-stone-100 transition-all duration-300 hover:text-[#C9A96E] ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Reserve Button */}
          <Link
            href="/reservations"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mt-4 border border-[#C9A96E] bg-transparent px-8 py-3 text-sm uppercase tracking-[0.2em] text-[#C9A96E] transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#0a0a0a] ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navLinks.length * 100}ms`
                : "0ms",
            }}
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </>
  );
}
