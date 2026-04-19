"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink { label: string; href: string; }

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Journal", href: "/journal" },
];

export function SiteNavbar({
  links = DEFAULT_LINKS,
  dark = false,
  transparent = false,
}: {
  links?: NavLink[];
  dark?: boolean;
  transparent?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const textColor = dark ? "#fff" : "#111";
  const logoFilter = dark ? "brightness(0) invert(1)" : "none";

  return (
    <>
      {/* Navbar */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
        padding: "0 24px",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: transparent ? "transparent" : dark ? "rgba(12,12,12,0.92)" : "rgba(255,255,255,0.9)",
        backdropFilter: transparent ? "none" : "blur(16px)",
        WebkitBackdropFilter: transparent ? "none" : "blur(16px)",
        borderBottom: transparent ? "none" : `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
        transition: "background 0.3s",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="K" style={{ width: "20px", height: "24px", objectFit: "contain", filter: logoFilter }} />
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: textColor, textTransform: "uppercase" }}>
            Kalaakars
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="desktop-nav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {links.map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", color: dark ? "rgba(255,255,255,0.65)" : "#888", textTransform: "uppercase" }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-nav"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{
            background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: "50px",
            padding: "8px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            cursor: "pointer",
            minHeight: "auto",
          }}
        >
          <div style={{ width: "18px", height: "1.5px", background: textColor }} />
          <div style={{ width: "13px", height: "1.5px", background: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }} />
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#0c0c0c", display: "flex", flexDirection: "column" }}
          >
            {/* Drawer top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
              <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="K" style={{ width: "20px", height: "24px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: "auto", flexShrink: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px", gap: "4px" }}>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ display: "block", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", fontWeight: 400, letterSpacing: "-0.04em", lineHeight: 1, color: "#fff" }}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom info */}
            <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
              <a href="tel:+917306358793" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--accent)", display: "block", marginBottom: "8px" }}>
                +91 7306358793
              </a>
              <a href="mailto:kalaakaarsarchitecture@gmail.com" style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                kalaakaarsarchitecture@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
