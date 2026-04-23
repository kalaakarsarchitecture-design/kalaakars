import React from "react";
import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="loader-screen">
      {/* Animated Logo */}
      <div className="loader-logo">
        <Logo size={52} color="#D4A520" />
      </div>

      {/* Brand Name */}
      <div className="loader-brand-text" style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "0.9rem",
        letterSpacing: "0.35em",
        color: "#fff",
        textTransform: "uppercase",
      }}>
        Kalaakars
      </div>

      {/* Gold Accent Line */}
      <div className="loader-line" />

      {/* Tagline */}
      <div className="loader-tagline" style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.5rem",
        letterSpacing: "0.3em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
      }}>
        Architecture Studio
      </div>
    </div>
  );
}
