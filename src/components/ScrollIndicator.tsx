"use client";

export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontSize: "0.65rem" }}>
        Scroll
      </span>
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 0v16M2 10l6 6 6-6" />
      </svg>
    </div>
  );
}
