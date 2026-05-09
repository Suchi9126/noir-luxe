export default function OfferStrip() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #D4AF37, #b8982e)",
      padding: ".9rem 1rem",
      textAlign: "center",
      color: "#0A0A0A",
      fontWeight: 700,
      fontSize: "clamp(.82rem,2vw,.95rem)",
      letterSpacing: ".04em"
    }}>
      15% off your first reservation — use code NOIR15 at checkout
    </div>
  );
}
