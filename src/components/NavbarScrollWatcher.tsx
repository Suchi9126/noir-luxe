"use client";
import { useEffect } from "react";

export default function NavbarScrollWatcher() {
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    if (!navbar) return;

    navbar.classList.add("navbar-top");

    const handler = () => {
      if (window.scrollY > 60) {
        navbar.classList.add("navbar-scrolled");
        navbar.classList.remove("navbar-top");
      } else {
        navbar.classList.remove("navbar-scrolled");
        navbar.classList.add("navbar-top");
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return null;
}
