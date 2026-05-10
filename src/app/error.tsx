"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Something went wrong</h1>
      <p>{error.message || "Unknown error"}</p>
      <button onClick={() => reset()} style={{ marginTop: "16px", padding: "10px 16px" }}>
        Try again
      </button>
    </div>
  );
}
