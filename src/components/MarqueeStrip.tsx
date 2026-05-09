"use client";

const items = ["Fine Dining", "★", "Private Events", "★", "Tasting Menus", "★", "Wine Pairing", "★", "Chef's Table", "★", "Bengaluru", "★"];

export default function MarqueeStrip() {
  return (
    <div style={{
      background: "#C9A96E", overflow: "hidden",
      padding: "1rem 0", whiteSpace: "nowrap"
    }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            color: "#0A0A0A", fontFamily: "sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "0 1.5rem"
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
