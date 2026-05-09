"use client";
import { useEffect, useRef, useState } from "react";

const fallbackTestimonials = [
  { id: "1", customer_name: "Priya Sharma", location: "Mumbai", review: "An ethereal dining experience. Every course was a masterpiece of flavor and presentation. Noir & Co. is in a class of its own.", rating: 5 },
  { id: "2", customer_name: "James Whitmore", location: "London", review: "The private dining room exceeded every expectation. Impeccable service, flawless cuisine. We will return for every anniversary.", rating: 5 },
  { id: "3", customer_name: "Aiko Tanaka", location: "Tokyo", review: "Noir & Co. has ruined all other restaurants for me. The tasting menu was a journey I did not want to end.", rating: 5 },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.data?.length > 0) setTestimonials(d.data); })
      .catch(() => {});
  }, []);

  return (
    <>
      <section ref={ref} style={{ background:"#111111", padding:"6rem 2rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition:"all 0.8s ease" }}>
            <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.7rem", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"1rem" }}>Guest Experiences</p>
            <h2 style={{ color:"#F5F0E8", fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300 }}>
              What Our Guests Say
            </h2>
          </div>
          <div className="t-grid" style={{ display:"grid", gap:"1.5rem" }}>
            {testimonials.map((t, i) => (
              <div key={t.id} style={{
                background:"#0D0D0D", border:"1px solid rgba(201,169,110,0.1)",
                padding:"2.5rem 2rem", position:"relative",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.8s ease ${i * 0.15}s`
              }}>
                <div style={{ color:"rgba(201,169,110,0.15)", fontFamily:"Georgia,serif", fontSize:"5rem", lineHeight:0.8, marginBottom:"1.5rem", userSelect:"none" }}>"</div>
                <div style={{ display:"flex", marginBottom:"1.25rem" }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color:"#C9A96E", fontSize:"0.8rem", marginRight:"2px" }}>★</span>
                  ))}
                </div>
                <p style={{ color:"rgba(245,240,232,0.65)", fontFamily:"Cormorant Garamond,Georgia,serif", fontSize:"1.05rem", fontStyle:"italic", lineHeight:1.8, marginBottom:"1.75rem" }}>
                  "{t.review}"
                </p>
                <div style={{ borderTop:"1px solid rgba(201,169,110,0.1)", paddingTop:"1.2rem" }}>
                  <p style={{ color:"#C9A96E", fontFamily:"sans-serif", fontSize:"0.78rem", letterSpacing:"0.05em" }}>{t.customer_name}</p>
                  {t.location && <p style={{ color:"rgba(245,240,232,0.25)", fontFamily:"sans-serif", fontSize:"0.65rem", letterSpacing:"0.1em", marginTop:"0.2rem" }}>{t.location}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
