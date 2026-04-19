"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/sections/Marquee";

import { useIsMobile } from "@/lib/useIsMobile";

/* ═══════════════════════════════════════════
   FULL-SCREEN NAVIGATION OVERLAY
═══════════════════════════════════════════ */
function NavOverlay({ open, onClose, settings }: { open: boolean; onClose: () => void; settings?: any }) {
  const isMobile = useIsMobile();
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
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#0c0c0c",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
            </Link>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", cursor: "pointer", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: isMobile ? "24px" : "40px", padding: isMobile ? "32px 24px" : "60px 80px", overflowY: "auto" }}>
            {/* Primary Links */}
            <div style={{ flex: isMobile ? "none" : 1 }}>
              <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: isMobile ? "24px" : "40px" }}>NAVIGATION</p>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "24px" }}>
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{
                        display: "flex", alignItems: "baseline", gap: "16px",
                        textDecoration: "none", color: "#fff",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>{link.num}</span>
                      <span style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: isMobile ? "3rem" : "4.5rem",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }} className="nav-link-hover">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px", marginTop: isMobile ? "20px" : "0" }}>
                <div>
                   <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>BROWSE BY ARCHIVE</p>
                   <Link href="/projects" onClick={onClose} style={{ 
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#fff", 
                      padding: "14px 20px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px",
                      display: "inline-block", textDecoration: "none"
                   }}>
                    FULL ARCHIVE →
                   </Link>
                </div>

                <div>
                    <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>CONTACT</p>
                    <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "#fff", display: "block" }}>
                      {settings?.email || "kalaakaarsarchitecture@gmail.com"}
                    </a>
                    <a href={`tel:${settings?.phone || "+91 7306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--accent)", display: "block", marginTop: "8px" }}>
                      {settings?.phone || "+91 7306358793"}
                    </a>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", marginTop: "12px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode\nMalappuram, Kerala"}
                    </p>
                 </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)" }}>© 2024 KALAAKARS</span>
            <div style={{ display: "flex", gap: "20px" }}>
                {["Instagram", "LinkedIn"].map(s => <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)" }}>{s}</span>)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* ═══════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════ */



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
    <section style={{ padding: isMobile ? "72px 20px" : "100px 40px", borderTop: "1px solid #EBEBEB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexDirection: isMobile ? "column" : "row", gap: "12px", marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}>Recognition</h2>
        <span className="u-label">LEGACY OF 8 YEARS</span>
      </div>
      {awards.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", borderTop: "1px solid #EBEBEB" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "20px" : "48px" }}>
            <span className="u-label" style={{ width: "36px", flexShrink: 0 }}>{a.year}</span>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: isMobile ? "1.2rem" : "1.6rem", letterSpacing: "-0.01em" }}>{a.title}</span>
          </div>
          {!isMobile && <span className="u-label">{a.cat}</span>}
        </motion.div>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   CREDO (dark section)
═══════════════════════════════════════════ */
function Credo({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? "72px 20px" : "140px 40px", background: "#0c0c0c" }}>
      <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 1.2 }}
      >
        <p className="u-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>The Studio Philosophy</p>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 0.95, color: "#fff", maxWidth: "1200px" }}
        >
          Mastering the balance of <span style={{ color: "var(--accent)" }}>Style, Comfort & Function.</span> Crafting timeless resort environments with Malabar precision.
        </motion.p>
      </motion.div>
      <div style={{ marginTop: "64px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em" }}>
          ARCHITECTS OF THE KERALA COAST
        </span>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   FAQ SECTION
═══════════════════════════════════════════ */
function FAQ({ isMobile }: { isMobile: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { 
      q: "What types of projects do you specialize in?", 
      a: "We specialize in both modern and classic resort projects, premium residential villas, and boutique commercial spaces. Our core expertise lies in high-precision craftwork interiors." 
    },
    { 
      q: "How long does a typical project take?", 
      a: "Architectural timelines vary by scale, but typically a residential project takes 12–18 months from concept to handover, while resort projects may take 18–24 months." 
    },
    { 
      q: "Do you handle interior design as well?", 
      a: "Yes, we focus on 'Craftwork Interiors' where the architecture and interior flow are designed as a single cohesive narrative. We manage everything from spatial layout to bespoke furniture." 
    },
    { 
      q: "Do you work outside of Malappuram and Kerala?", 
      a: "While our studio is rooted in Areekode, we undertake projects across South India, especially in regions that allow for climate-responsive and tropical architectural interventions." 
    }
  ];

  return (
    <section id="faq" style={{ padding: isMobile ? "72px 20px" : "120px 40px", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: "64px" }}>
        <div>
           <p className="u-label" style={{ color: "var(--accent)", marginBottom: "24px" }}>Guidance</p>
           <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>Frequent<br />Inquiries</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
           {faqs.map((faq, i) => (
             <div key={i} style={{ borderBottom: "1px solid #eee" }}>
               <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ 
                  width: "100%", background: "none", border: "none", display: "flex", 
                  justifyContent: "space-between", alignItems: "center", padding: "32px 0", 
                  cursor: "pointer", textAlign: "left"
                }}
               >
                 <span style={{ fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.2rem" : "1.8rem", color: openIdx === i ? "var(--accent)" : "var(--fg)", transition: "color 0.4s" }}>{faq.q}</span>
                 <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} style={{ fontSize: "1.5rem", fontWeight: 300 }}>+</motion.span>
               </button>
               <AnimatePresence>
                 {openIdx === i && (
                   <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                   >
                     <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "#666", paddingBottom: "32px", maxWidth: "600px" }}>
                       {faq.a}
                     </p>
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
    <footer id="contact" style={{ padding: isMobile ? "72px 20px 48px" : "100px 40px 60px", borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? "60px" : "100px", marginBottom: "80px" }}>
        <div>
           <p className="u-label" style={{ marginBottom: "28px" }}>Newsletter</p>
           <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", marginBottom: "24px", color: "var(--fg)" }}>Subscribe to our journal on Kerala architecture.</p>
           <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", borderBottom: "1px solid var(--fg)", paddingBottom: "10px" }}>
             <input type="email" placeholder="Your email address" style={{ flex: 1, background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-sans)", fontSize: "0.9rem", outline: "none" }} />
             <button type="submit" style={{ background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Subscribe</button>
           </form>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>Connect</p>
          <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", display: "block", marginBottom: "8px" }}>{settings?.email || "kalaakaarsarchitecture@gmail.com"}</a>
          <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", display: "block", marginBottom: "8px", color: "var(--accent)" }}>{settings?.phone || "+91 7306358793"}</a>
        </div>
        <div>
          <p className="u-label" style={{ marginBottom: "20px" }}>Studio</p>
          <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>
            {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode\nMalappuram, Kerala"}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999", marginTop: "12px" }}>{settings?.yearsExp || "8"} YEARS OF EXCELLENCE</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "24px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", objectFit: "contain" }} />
          <span className="u-label">© 2024 KALAAKARS ARCHITECTURE STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
           <a href="#faq" className="u-label" style={{ color: "#999", textDecoration: "none" }}>FAQ</a>
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="u-label" style={{ background: "none", border: "none", color: "var(--accent)" }}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════════
   HOME PAGE COMPONENT
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
    location: "Kerala"
  } as any;

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const tickerItems = [
    "CRAFTWORK INTERIORS",
    "RESORT & RESIDENTIAL",
    "8 YEARS OF EXCELLENCE",
    "PRECISION & CREATIVITY",
    "MALAPPURAM · AREEKODE",
    "KERALA COAST",
    "DESIGN DRIVEN STUDIO",
  ];

  return (
    <>
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} settings={initialSettings} />

      <div style={{ background: "#fff" }}>

        {/* ══════════════════════════════════════
            HERO — Split-screen (desktop) / Stacked (mobile)
        ══════════════════════════════════════ */}
        {isMobile ? (
          /* ── PREMIUM MOBILE LAYOUT ── */
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a" }}>

            {/* Mobile: Full-bleed hero — tall, cinematic */}
            <div style={{ position: "relative", height: "78vh", flexShrink: 0, overflow: "hidden" }}>
              {/* BG crossfade */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0, backgroundImage: `url(${active.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              </AnimatePresence>

              {/* Deep gradient — dark bottom for text legibility */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.35) 100%)" }} />

              {/* ── TOP BAR ── */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20 }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
                {/* Hamburger */}
                <button
                  onClick={() => setNavOpen(true)}
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50px", cursor: "pointer", padding: "9px 14px", display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  <div style={{ width: "18px", height: "1.5px", background: "#fff" }} />
                  <div style={{ width: "14px", height: "1.5px", background: "rgba(255,255,255,0.6)" }} />
                </button>
              </div>

              {/* ── BOTTOM CONTENT BLOCK ── */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 32px", zIndex: 10 }}>
                {/* Category pill */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-cat"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "5px 12px", marginBottom: "16px" }}
                  >
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#D4A520" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase" }}>{active.category} {active.year}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Big studio name */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-name"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3rem, 16vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase", margin: 0 }}>
                      {active.title.split(" ")[0]}<br />
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>{active.title.split(" ").slice(1).join(" ")}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>

                {/* ── CTA PILLS ── */}
                <div style={{ display: "flex", gap: "10px", marginTop: "32px", width: "100%" }}>
                  <Link href={`/projects/${active.slug}`} style={{
                    flex: 1.4, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "15px 16px",
                    background: "#D4A520",
                    color: "#000",
                    fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700,
                    letterSpacing: "0.15em",
                    borderRadius: "4px",
                    textTransform: "uppercase"
                  }}>
                    VIEW CASE →
                  </Link>
                  <Link href="/studio#contact" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "15px 16px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 500,
                    letterSpacing: "0.1em",
                    borderRadius: "4px",
                    textTransform: "uppercase"
                  }}>
                    INQUIRY
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile: Project list — premium dark style */}
            <div style={{ flex: 1, background: "#0a0a0a" }}>

              {/* Section header */}
              <div style={{ padding: "24px 22px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Project Narratives</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#D4A520", letterSpacing: "0.1em" }}>{activeIdx + 1}/{initialProjects.length}</p>
              </div>

              {/* Project rows */}
              <nav>
                {initialProjects.map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <motion.div
                      key={p.id}
                      onClick={() => setActiveIdx(i)}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "20px 22px",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        background: isActive ? "rgba(212,165,32,0.06)" : "transparent",
                        transition: "background 0.3s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: isActive ? "#D4A520" : "rgba(255,255,255,0.2)" }}>{p.num}</span>
                                {isActive && <motion.div layoutId="mobile-indicator" style={{ height: "1px", width: "20px", background: "#D4A520" }} />}
                            </div>
                            <h3 style={{
                                fontFamily: "var(--font-sans)", fontWeight: 400,
                                fontSize: "1.15rem", letterSpacing: "-0.02em",
                                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                                transition: "color 0.3s",
                                margin: 0
                            }}>
                                {p.title.split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                            </h3>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>{p.category} · {p.location}</p>
                        </div>
                        
                        <div style={{ 
                            width: "56px", height: "56px", borderRadius: "100%", 
                            overflow: "hidden", flexShrink: 0, 
                            border: isActive ? "1px solid #D4A520" : "1px solid rgba(255,255,255,0.1)",
                            transition: "border 0.3s",
                            opacity: isActive ? 1 : 0.35
                        }}>
                            <img src={p.heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </div>
        ) : (
          /* ── DESKTOP: Original Split-Screen ── */
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* LEFT PANEL */}

            <aside style={{ width: "350px", minWidth: "300px", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", zIndex: 10, borderRight: "1px solid var(--border)" }}>
              <div style={{ padding: "32px 40px" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src="/logo.svg" alt="K" style={{ width: "24px", height: "28px", objectFit: "contain" }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.22em", color: "#111", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
              </div>

              <nav style={{ flex: 1, paddingTop: "40px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "var(--accent)", padding: "0 40px 20px", opacity: 0.7 }}>LATEST WORKS</p>
                {initialProjects.slice(0, 4).map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <motion.div 
                        key={p.id} 
                        initial={false}
                        onMouseEnter={() => setActiveIdx(i)} 
                        onClick={() => setActiveIdx(i)} 
                        style={{ 
                            padding: "20px 40px", 
                            cursor: "pointer", 
                            position: "relative",
                            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            background: isActive ? "rgba(212, 165, 32, 0.03)" : "transparent",
                            borderBottom: "1px solid rgba(0,0,0,0.03)"
                        }}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "3px", background: "var(--accent)" }}
                        />
                      )}
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: isActive ? "var(--accent)" : "#bfbfbf", transition: "color 0.4s" }}>{p.num}</p>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between", marginTop: "4px" }}>
                        <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", flex: 1 }}>
                            <p style={{ 
                                fontFamily: "var(--font-serif)", 
                                fontWeight: 400, 
                                fontSize: "1.6rem", 
                                letterSpacing: "-0.01em", 
                                color: isActive ? "#000" : "#999", 
                                lineHeight: 1.1, 
                                transition: "all 0.4s ease",
                                transform: isActive ? "translateX(4px)" : "none"
                            }}>
                                {p.title.split(" ").map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                            </p>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}

                <div style={{ marginTop: "40px" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#ccc", padding: "0 40px 20px" }}>UPCOMING</p>
                  {[
                    { title: "Coastal Research Lab", year: "2025" },
                    { title: "Wayanad Retreat", year: "2025" }
                  ].map((u, i) => (
                    <div key={i} style={{ padding: "12px 40px", opacity: 0.6 }}>
                       <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#555", letterSpacing: "-0.01em" }}>{u.title}</p>
                       <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "#bbb", marginTop: "2px" }}>/{u.year}</p>
                    </div>
                  ))}
                </div>
              </nav>

              <div style={{ padding: "40px" }}>
                <Link href="/projects" style={{ 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#111", color: "#fff", padding: "14px", borderRadius: "4px",
                  fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textDecoration: "none"
                }}>
                  PROJECTS ARCHIVE ↗
                </Link>
              </div>
            </aside>


            {/* RIGHT PANEL */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0, scale: 1.05 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: "absolute", inset: 0, backgroundImage: `url(${active.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)" }} />

              {/* Top-right: CTAs + Hamburger */}
              <div style={{ position: "absolute", top: "32px", right: "32px", display: "flex", alignItems: "center", gap: "16px", zIndex: 20 }}>
                <Link href="/studio" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", transition: "background 0.3s" }}>STUDIO</Link>
                <Link href="/studio#contact" style={{ padding: "12px 24px", background: "var(--accent)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", borderRadius: "100px", border: "none" }}>ENQUIRE</Link>
                <button onClick={() => setNavOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ width: "24px", height: "1.5px", background: "#fff" }} />
                  <div style={{ width: "16px", height: "1.5px", background: "#fff" }} />
                </button>
              </div>

              {/* Studio name overlay — ANIMATED */}
              <div style={{ position: "absolute", bottom: "100px", left: "60px", zIndex: 10, pointerEvents: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIdx} 
                    initial={{ opacity: 0, y: 40 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(4rem, 12vw, 12rem)", letterSpacing: "-0.04em", lineHeight: 0.8, color: "#fff", textTransform: "uppercase" }}>Kalaakars</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "12px" }}>
                        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 300, fontSize: "clamp(0.8rem, 2vw, 1.4rem)", letterSpacing: "0.5em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>ARCHITECTURE</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom project info */}
              <div style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 20, textAlign: "right" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--accent)", marginBottom: "8px" }}>{active.category} · {active.year}</p>
                    <Link href={`/projects/${active.slug}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.01em" }}>View Project Details →</Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        )}

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
