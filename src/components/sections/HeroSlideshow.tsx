"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoSlideshow, useSwipe } from "@/hooks/useInteractions";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  heroImg: string;
  location: string;
  pull_quote?: string;
}

export function HeroSlideshow({ projects }: { projects: Project[] }) {
  const { activeIdx, next, prev, goTo, pause, resume } = useAutoSlideshow(projects.length, 2000);
  const swipe = useSwipe(next, prev);
  const active = projects[activeIdx] || projects[0];

  if (!active) return null;

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      {...swipe}
    >
      {/* Background Image Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.heroImg + activeIdx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={active.heroImg}
            alt={active.title}
            fill
            priority={activeIdx < 2}
            sizes="(max-width: 768px) 100vw, 70vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.35) 100%)",
      }} />

      {/* Content overlay */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 10 }}>
        {/* Project info - bottom left */}
        <div style={{ padding: "0 clamp(24px, 5vw, 80px) clamp(80px, 12vh, 140px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx + "-badge"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px",
                padding: "6px 16px", marginBottom: "20px",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A520" }} />
              <span className="u-accent-label" style={{ color: "#fff", fontWeight: 600 }}>
                {active.category} · {active.year}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={activeIdx + "-title"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-serif)", fontWeight: 400,
                fontSize: "clamp(3rem, 10vw, 9rem)",
                letterSpacing: "-0.04em", lineHeight: 0.85,
                color: "#fff", textTransform: "uppercase", margin: 0,
              }}
            >
              {active.title}
            </motion.h1>
          </AnimatePresence>

          {active.pull_quote && (
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx + "-quote"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-serif)", fontStyle: "italic",
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                  color: "rgba(255,255,255,0.6)", marginTop: "20px",
                  maxWidth: "500px",
                }}
              >
                "{active.pull_quote}"
              </motion.p>
            </AnimatePresence>
          )}

          {/* CTA */}
          <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
            <Link href={`/projects/${active.slug}`} className="btn-primary">
              VIEW PROJECT →
            </Link>
            <Link href="/studio#contact" className="btn-glass">
              ENQUIRE
            </Link>
          </div>
        </div>

        {/* Bottom bar: dots + arrows + counter */}
        <div style={{
          padding: "16px clamp(24px, 5vw, 80px)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
        }}>
          {/* Slide progress bar */}
          <motion.div
            key={activeIdx + "-progress"}
            className="slide-progress"
            style={{ position: "absolute", top: 0, left: 0, height: 3, background: "var(--accent)" }}
          />

          {/* Dots */}
          <div className="slide-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`slide-dot ${activeIdx === i ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows + Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em",
            }}>
              {String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={prev} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
