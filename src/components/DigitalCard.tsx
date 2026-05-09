"use client";
export default function DigitalCard() {
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Noir Luxe", text: "Premium fine dining.", url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };
  return (
    <section style={{ padding: "5rem 0", background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ width: "min(600px, calc(100% - 2rem))", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#D4AF37", textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".78rem", fontWeight: 700 }}>Digital Business Card</p>
        <div style={{ margin: "1.5rem auto", padding: "2rem", borderRadius: "28px", background: "linear-gradient(145deg,#1a1a1a,#111)", border: "1px solid rgba(212,175,55,.22)", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", color: "#fff", margin: "0 0 .4rem" }}>Noir Luxe</h2>
          <p style={{ color: "#D4AF37", letterSpacing: ".12em", fontSize: ".82rem", marginBottom: "1.5rem" }}>PREMIUM FINE DINING</p>
          <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", color: "rgba(255,255,255,.6)", fontSize: ".92rem", marginBottom: "1.8rem" }}>
            <span>Bengaluru, Karnataka</span>
            <span>+91 98765 43210</span>
            <span>noirluxe.com</span>
            <span>@noirluxe</span>
          </div>
          <button onClick={share} style={{ background: "#D4AF37", color: "#0A0A0A", border: "none", borderRadius: "999px", padding: ".95rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>
            Share this card
          </button>
        </div>
      </div>
    </section>
  );
}
