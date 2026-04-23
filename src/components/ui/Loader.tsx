"use client";
import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";

/**
 * Premium 2-second branded loader.
 * Pure CSS animations (defined in globals.css) — no heavy JS.
 * Auto-dismisses after 2s and unmounts after fade-out completes.
 */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Start exit animation at 1.4s, finish by 2s
    const exitTimer = setTimeout(() => setExiting(true), 1400);
    // Fully remove from DOM at 2.1s
    const removeTimer = setTimeout(() => {
      setGone(true);
      onComplete();
    }, 2100);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div className={`loader-screen ${exiting ? "loader-exit" : ""}`}>
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
