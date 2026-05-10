"use client";

const items = ["Fine Dining", "✦", "Private Events", "✦", "Tasting Menus", "✦", "Wine Pairing", "✦", "Chef's Table", "✦", "Bengaluru", "✦", "Michelin Starred", "✦", "Est. 2012", "✦"];

import { useEffect } from "react";

export default function MarqueeStrip() {
  return (
    <div style={{ background: "#C9A96E", overflow: "hidden", padding: "0.9rem 0", whiteSpace: "nowrap" }}>
      <div className="marquee-inner">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ color: "#0A0A0A", fontFamily: "sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", padding: "0 1.5rem" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
