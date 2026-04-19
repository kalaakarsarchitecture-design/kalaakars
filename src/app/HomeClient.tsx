"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/sections/Marquee";
import { useIsMobile } from "@/lib/useIsMobile";

/* ═══════════════════════════════════════════
   INLINE RESPONSIVE STYLES
═══════════════════════════════════════════ */
const mobileCSS = `
  /* Hero layout */
  .hk-hero { display: flex; flex-direction: column; min-height: 100svh; }
  .hk-hero-img { position: relative; height: 78svh; flex-shrink: 0; overflow: hidden; }
  .hk-hero-desktop { display: none !important; }
  .hk-hero-mobile { display: flex !important; flex-direction: column; }

  /* Project list panel */
  .hk-proj-panel { flex: 1; background: #0a0a0a; overflow-y: auto; }

  @media (min-width: 769px) {
    .hk-hero { flex-direction: row; height: 100vh; min-height: unset; }
    .hk-hero-img { height: 100vh; flex: 1; }
    .hk-hero-desktop { display: flex !important; }
    .hk-hero-mobile { display: none !important; }
  }

  /* Section padding responsive */
  .hk-section { padding: 72px 20px; }
  @media (min-width: 769px) { .hk-section { padding: 120px 40px; } }

  /* Desktop sidebar */
  .hk-sidebar { width: 340px; min-width: 300px; flex-shrink: 0; background: #fff; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; border-right: 1px solid rgba(0,0,0,0.07); }

  /* Awards grid */
  .hk-awards-row { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-top: 1px solid #EBEBEB; }
  .award-cat { display: none; }
  @media (min-width: 769px) { .award-cat { display: block; } }

  /* Footer grid */
  .hk-footer-grid { display: grid; grid-template-columns: 1fr; gap: 48px; margin-bottom: 60px; }
  @media (min-width: 769px) { .hk-footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 100px; } }

  /* FAQ grid */
  .hk-faq-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
  @media (min-width: 769px) { .hk-faq-grid { grid-template-columns: 1fr 1.5fr; gap: 64px; } }

  /* Credo text */
  .hk-credo-text { font-size: clamp(1.8rem, 7vw, 6rem); }
`;

/* ═══════════════════════════════════════════
   NAV OVERLAY
═══════════════════════════════════════════ */
function NavOverlay({ open, onClose, settings }: { open: boolean; onClose: () => void; settings?: any }) {
  const links = [
    { label: "Projects", href: "/projects", num: "01" },
    { label: "Studio", href: "/studio", num: "02" },
    { label: "Process", href: "/process", num: "03" },
    { label: "Journal", href: "/journal", num: "04" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#0c0c0c", display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="K" style={{ width: "20px", height: "24px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
            </Link>
            <button onClick={onClose} aria-label="Close menu" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", cursor: "pointer", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "auto", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 28px", gap: "4px", overflowY: "auto" }}>
            {links.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={link.href} onClick={onClose} style={{ display: "flex", alignItems: "baseline", gap: "14px", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--accent)" }}>{link.num}</span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em", color: "#fff" }}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <div>
              <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>Email</p>
              <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "#fff", wordBreak: "break-all" }}>
                {settings?.email || "kalaakaarsarchitecture@gmail.com"}
              </a>
            </div>
            <div>
              <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>Phone</p>
              <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--accent)" }}>
                {settings?.phone || "+91 7306358793"}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   AWARDS STRIP
═══════════════════════════════════════════ */
function AwardsStrip({ isMobile }: { isMobile: boolean }) {
  const awards = [
    { year: "2024", title: "Kerala Architecture Award", cat: "Residential" },
    { year: "2024", title: "Malabar Design Prize", cat: "Shortlisted" },
    { year: "2023", title: "South India Architecture", cat: "Commercial" },
    { year: "2023", title: "JK Cement Architectural Award", cat: "Cultural" },
  ];

  return (
    <section className="hk-section" style={{ borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", gap: "12px", marginBottom: "40px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}>Recognition</h2>
        <span className="u-label">LEGACY OF 8 YEARS</span>
      </div>
      {awards.map((a, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="hk-awards-row">
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "16px" : "48px" }}>
            <span className="u-label" style={{ width: "34px", flexShrink: 0 }}>{a.year}</span>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1rem, 3.5vw, 1.6rem)", letterSpacing: "-0.01em" }}>{a.title}</span>
          </div>
          <span className="u-label award-cat">{a.cat}</span>
        </motion.div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   CREDO
═══════════════════════════════════════════ */
function Credo({ isMobile: _ }: { isMobile: boolean }) {
  return (
    <section className="hk-section" style={{ background: "#0c0c0c" }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}>
        <p className="u-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "28px" }}>The Studio Philosophy</p>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hk-credo-text"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.0, color: "#fff", maxWidth: "1200px" }}
        >
          Mastering the balance of <span style={{ color: "var(--accent)" }}>Style, Comfort &amp; Function.</span> Crafting timeless resort environments with Malabar precision.
        </motion.p>
      </motion.div>
      <div style={{ marginTop: "56px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em" }}>ARCHITECTS OF THE KERALA COAST</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
═══════════════════════════════════════════ */
function FAQ({ isMobile: _ }: { isMobile: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "What types of projects do you specialize in?", a: "We specialize in both modern and classic resort projects, premium residential villas, and boutique commercial spaces. Our core expertise lies in high-precision craftwork interiors." },
    { q: "How long does a typical project take?", a: "Architectural timelines vary by scale, but typically a residential project takes 12–18 months from concept to handover, while resort projects may take 18–24 months." },
    { q: "Do you handle interior design as well?", a: "Yes, we focus on 'Craftwork Interiors' where the architecture and interior flow are designed as a single cohesive narrative. We manage everything from spatial layout to bespoke furniture." },
    { q: "Do you work outside of Malappuram and Kerala?", a: "While our studio is rooted in Areekode, we undertake projects across South India, especially in regions that allow for climate-responsive and tropical architectural interventions." },
  ];
  return (
    <section id="faq" className="hk-section" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="hk-faq-grid">
        <div>
          <p className="u-label" style={{ color: "var(--accent)", marginBottom: "20px" }}>Guidance</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>Frequent<br />Inquiries</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", cursor: "pointer", textAlign: "left", minHeight: "auto", gap: "16px" }}
              >
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 3vw, 1.6rem)", color: openIdx === i ? "var(--accent)" : "var(--fg)", transition: "color 0.4s", lineHeight: 1.3 }}>{faq.q}</span>
                <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} style={{ fontSize: "1.5rem", fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "#666", paddingBottom: "28px", maxWidth: "600px" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer({ isMobile, settings }: { isMobile: boolean; settings?: any }) {
  return (
    <footer id="contact" style={{ padding: isMobile ? "60px 20px 40px" : "100px 40px 60px", borderTop: "1px solid var(--border)" }}>
      <div className="hk-footer-grid">
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>Newsletter</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", marginBottom: "20px", color: "var(--fg)" }}>Subscribe to our journal on Kerala architecture.</p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", borderBottom: "1px solid var(--fg)", paddingBottom: "10px" }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none", minHeight: "auto" }} />
            <button type="submit" style={{ background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", minHeight: "auto", cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe</button>
          </form>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "16px" }}>Connect</p>
          <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", display: "block", marginBottom: "8px", wordBreak: "break-all" }}>{settings?.email || "kalaakaarsarchitecture@gmail.com"}</a>
          <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", display: "block", marginBottom: "8px", color: "var(--accent)" }}>{settings?.phone || "+91 7306358793"}</a>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "16px" }}>Studio</p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode\nMalappuram, Kerala"}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", marginTop: "12px" }}>{settings?.yearsExp || "8"} YEARS OF EXCELLENCE</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "20px", paddingTop: "28px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", objectFit: "contain" }} />
          <span className="u-label">© 2024 KALAAKARS ARCHITECTURE STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#faq" className="u-label" style={{ color: "#999" }}>FAQ</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="u-label" style={{ background: "none", border: "none", color: "var(--accent)", minHeight: "auto", cursor: "pointer" }}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export default function HomeClient({ initialProjects, initialSettings }: { initialProjects: any[]; initialSettings?: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();

  const active = initialProjects[activeIdx] || initialProjects[0] || {
    title: "Kalaakars Architecture",
    category: "Studio",
    year: "2024",
    heroImg: "https://images.unsplash.com/photo-1628080185121-7243cde15286?q=80&w=2000",
    slug: "coming-soon",
    location: "Kerala",
  } as any;

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const tickerItems = ["CRAFTWORK INTERIORS", "RESORT & RESIDENTIAL", "8 YEARS OF EXCELLENCE", "PRECISION & CREATIVITY", "MALAPPURAM · AREEKODE", "KERALA COAST", "DESIGN DRIVEN STUDIO"];

  return (
    <>
      {/* Responsive CSS via style tag */}
      <style>{mobileCSS}</style>

      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} settings={initialSettings} />

      <div style={{ background: "#fff" }}>

        {/* ══════════════ HERO ══════════════ */}
        <div className="hk-hero">

          {/* ── FULL-BLEED BG IMAGE (both mobile & desktop) ── */}
          <div className="hk-hero-img">
            {/* BG crossfade */}
            <AnimatePresence mode="sync">
              <motion.div
                key={active.heroImg}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0, backgroundImage: `url(${active.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.4) 100%)" }} />

            {/* ── TOP BAR (shared across all sizes) ── */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "env(safe-area-inset-top, 0px) 20px 0", paddingTop: "max(20px, env(safe-area-inset-top))", paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", zIndex: 20 }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
              </Link>

              {/* Desktop: pill links + hamburger */}
              <div className="hk-hero-desktop" style={{ alignItems: "center", gap: "16px" }}>
                <Link href="/studio" style={{ padding: "10px 20px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)" }}>STUDIO</Link>
                <Link href="/studio#contact" style={{ padding: "10px 20px", background: "var(--accent)", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", borderRadius: "100px", fontWeight: 700 }}>ENQUIRE</Link>
                <button onClick={() => setNavOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px", minHeight: "auto" }}>
                  <div style={{ width: "22px", height: "1.5px", background: "#fff" }} />
                  <div style={{ width: "15px", height: "1.5px", background: "rgba(255,255,255,0.6)" }} />
                </button>
              </div>

              {/* Mobile: hamburger only */}
              <button
                className="hk-hero-mobile"
                onClick={() => setNavOpen(true)}
                aria-label="Open menu"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50px", padding: "8px 14px", gap: "4px", flexDirection: "column", cursor: "pointer", minHeight: "auto" }}
              >
                <div style={{ width: "18px", height: "1.5px", background: "#fff" }} />
                <div style={{ width: "13px", height: "1.5px", background: "rgba(255,255,255,0.6)" }} />
              </button>
            </div>

            {/* ── BOTTOM CONTENT (project title + CTAs) ── */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px max(28px, env(safe-area-inset-bottom))", zIndex: 10 }}>
              {/* Category pill */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx + "-cat"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "5px 13px", marginBottom: "14px" }}
                >
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase" }}>{active.category} {active.year}</span>
                </motion.div>
              </AnimatePresence>

              {/* Big project title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx + "-title"}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.8rem, 14vw, 12rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase", margin: "0 0 24px" }}>
                    {(active.title || "Kalaakars").split(" ")[0]}<br />
                    <span style={{ opacity: 0.55 }}>{(active.title || "").split(" ").slice(1).join(" ")}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "480px" }}>
                <Link href={`/projects/${active.slug}`} style={{ flex: "1.4", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 14px", background: "var(--accent)", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.13em", borderRadius: "4px", textTransform: "uppercase", minHeight: "52px" }}>
                  VIEW CASE →
                </Link>
                <Link href="/studio#contact" style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 14px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.1em", borderRadius: "4px", textTransform: "uppercase", minHeight: "52px" }}>
                  INQUIRY
                </Link>
              </div>

              {/* Desktop: bottom-right project info */}
              <div className="hk-hero-desktop" style={{ position: "absolute", bottom: "max(40px, env(safe-area-inset-bottom))", right: "40px", textAlign: "right", flexDirection: "column" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--accent)", marginBottom: "8px" }}>{active.category} · {active.year}</p>
                    <Link href={`/projects/${active.slug}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", color: "#fff" }}>View Project Details →</Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── MOBILE: Project selector panel below hero ── */}
          <div className="hk-proj-panel hk-hero-mobile">
            <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em" }}>PROJECT NARRATIVES</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--accent)", letterSpacing: "0.1em" }}>{activeIdx + 1}/{initialProjects.length || 1}</p>
            </div>
            <nav>
              {initialProjects.map((p, i) => {
                const isActive = activeIdx === i;
                return (
                  <motion.div
                    key={p.id || i}
                    onClick={() => setActiveIdx(i)}
                    whileTap={{ scale: 0.98 }}
                    style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", background: isActive ? "rgba(212,165,32,0.07)" : "transparent", transition: "background 0.3s" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: isActive ? "var(--accent)" : "rgba(255,255,255,0.2)" }}>{p.num}</span>
                          {isActive && <motion.div layoutId="mob-ind" style={{ height: "1px", width: "18px", background: "var(--accent)" }} />}
                        </div>
                        <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.05rem", letterSpacing: "-0.02em", color: isActive ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.3s", margin: 0 }}>
                          {(p.title || "").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                        </h3>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "rgba(255,255,255,0.2)", marginTop: "3px" }}>{p.category} · {p.location}</p>
                      </div>
                      <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: isActive ? "1.5px solid var(--accent)" : "1px solid rgba(255,255,255,0.1)", opacity: isActive ? 1 : 0.35, transition: "all 0.3s" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </nav>
            {/* View all projects CTA */}
            <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Link href="/projects" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                ALL PROJECTS ↗
              </Link>
            </div>
          </div>

          {/* ── DESKTOP: Sidebar ── */}
          <aside className="hk-sidebar hk-hero-desktop" style={{ flexDirection: "column" }}>
            <div style={{ padding: "32px 40px" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.22em", color: "#111", textTransform: "uppercase" }}>Kalaakars</span>
              </Link>
            </div>
            <nav style={{ flex: 1, paddingTop: "32px", overflowY: "auto" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--accent)", padding: "0 40px 18px", opacity: 0.7 }}>LATEST WORKS</p>
              {initialProjects.slice(0, 5).map((p, i) => {
                const isActive = activeIdx === i;
                return (
                  <motion.div key={p.id || i} initial={false} onMouseEnter={() => setActiveIdx(i)} onClick={() => setActiveIdx(i)} style={{ padding: "18px 40px", cursor: "pointer", position: "relative", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", background: isActive ? "rgba(212, 165, 32, 0.03)" : "transparent", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
                    {isActive && <motion.div layoutId="active-indicator" style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "3px", background: "var(--accent)" }} />}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: isActive ? "var(--accent)" : "#bfbfbf", transition: "color 0.4s" }}>{p.num}</p>
                    </div>
                    <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block", marginTop: "4px" }}>
                      <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.6rem", letterSpacing: "-0.01em", color: isActive ? "#000" : "#999", lineHeight: 1.1, transition: "all 0.4s ease", transform: isActive ? "translateX(4px)" : "none" }}>
                        {(p.title || "").split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
              <div style={{ padding: "32px 40px 24px" }}>
                <Link href="/projects" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", padding: "14px", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em" }}>
                  PROJECTS ARCHIVE ↗
                </Link>
              </div>
            </nav>
          </aside>
        </div>
        {/* ══ END HERO ══ */}

        {/* ── MARQUEE ── */}
        <Marquee text={tickerItems.join("  ✦  ")} />

        {/* ── AWARDS ── */}
        <AwardsStrip isMobile={isMobile} />

        {/* ── CREDO ── */}
        <Credo isMobile={isMobile} />

        {/* ── FAQ ── */}
        <FAQ isMobile={isMobile} />

        {/* ── FOOTER ── */}
        <Footer isMobile={isMobile} settings={initialSettings} />

      </div>
    </>
  );
}


