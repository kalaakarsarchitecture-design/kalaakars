"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/sections/Marquee";
import { useIsMobile } from "@/lib/useIsMobile";
import { Logo } from "@/components/ui/Logo";

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
interface UpcomingProject {
  id: string;
  title: string;
  year: string;
  status: string;
  progress: number;
}

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
          transition={{ duration: 0.35, ease: "easeOut" }}
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
              <Logo size={22} color="#fff" />
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
                    transition={{ delay: i * 0.05 }}
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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)" }}>© 2026 KALAAKARS</span>
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
   CREDO (dark section)
═══════════════════════════════════════════ */
function Credo({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? "100px 24px" : "160px 40px", background: "#0c0c0c" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p className="u-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "40px" }}>The Studio Philosophy</p>
        <p style={{ 
          fontFamily: "var(--font-serif)", 
          fontWeight: 400, 
          fontSize: "clamp(2.8rem, 8vw, 6.5rem)", 
          letterSpacing: "-0.03em", 
          lineHeight: 0.95, 
          color: "#fff", 
          maxWidth: "1200px" 
        }}>
          Mastering the balance of <span style={{ color: "var(--accent)" }}>Style, Comfort & Function.</span> Crafting timeless resort environments with Malabar precision.
        </p>
        <div style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Architects of the Kerala Coast
          </span>
        </div>
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
    <section id="faq" style={{ padding: isMobile ? "100px 24px" : "160px 40px", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "60px" : "100px" }}>
        <div>
           <p className="u-label" style={{ color: "var(--accent)", marginBottom: "24px" }}>Guidance</p>
           <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 7vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>Frequent{isMobile ? " " : <br />}Inquiries</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
           {faqs.map((faq, i) => (
             <div key={i} style={{ borderBottom: "1px solid #eee" }}>
               <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ 
                  width: "100%", background: "none", border: "none", display: "flex", 
                  justifyContent: "space-between", alignItems: "center", padding: isMobile ? "28px 0" : "36px 0", 
                  cursor: "pointer", textAlign: "left", gap: "20px"
                }}
               >
                 <span style={{ fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.4rem" : "2rem", color: openIdx === i ? "var(--accent)" : "var(--fg)", transition: "color 0.4s", lineHeight: 1.3, flex: 1 }}>{faq.q}</span>
                 <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} style={{ fontSize: isMobile ? "1.3rem" : "1.6rem", fontWeight: 300, color: "var(--fg)", flexShrink: 0 }}>+</motion.span>
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
                     <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "1rem" : "1.15rem", lineHeight: 1.8, color: "#666", paddingBottom: "36px", maxWidth: "650px" }}>
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
    <footer id="contact" style={{ padding: isMobile ? "100px 24px 60px" : "160px 40px 80px", borderTop: "1px solid var(--border)", background: "#fafafa" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1.2fr 1fr", gap: isMobile ? "80px" : "120px", marginBottom: "100px" }}>
          <div>
             <p className="u-label" style={{ marginBottom: "32px" }}>Newsletter</p>
             <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", marginBottom: "32px", color: "var(--fg)" }}>Subscribe to our journal on Kerala architecture.</p>
             <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", borderBottom: "1.5px solid var(--fg)", paddingBottom: "12px", maxWidth: "500px" }}>
               <input type="email" placeholder="Your email address" style={{ flex: 1, background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none" }} />
               <button type="submit" style={{ background: "none", border: "none", color: "var(--fg)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Subscribe</button>
             </form>
          </div>
          <div>
            <p className="u-label" style={{ marginBottom: "24px" }}>Connect</p>
            <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", display: "block", marginBottom: "12px", textDecoration: "none", color: "inherit" }}>{settings?.email || "kalaakaarsarchitecture@gmail.com"}</a>
            <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", display: "block", marginBottom: "12px", color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>{settings?.phone || "+91 7306358793"}</a>
          </div>
          <div>
            <p className="u-label" style={{ marginBottom: "24px" }}>Studio</p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode\nMalappuram, Kerala"}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#999", marginTop: "16px", letterSpacing: "0.1em" }}>{settings?.yearsExp || "8"} YEARS OF EXCELLENCE</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "32px", paddingTop: "48px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Logo size={20} color="#D4A520" />
            <span className="u-label" style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}>© 2026 KALAAKARS ARCHITECTURE STUDIO</span>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
             <a href="#faq" className="u-label" style={{ color: "#999", textDecoration: "none", fontSize: "0.55rem" }}>FAQ</a>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="u-label" style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.55rem" }}>Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE COMPONENT
═══════════════════════════════════════════ */
export default function HomeClient({ 
  initialProjects, 
  initialSettings,
  initialUpcoming = [] 
}: { 
  initialProjects: any[]; 
  initialSettings?: any;
  initialUpcoming?: UpcomingProject[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const active = initialProjects[activeIdx] || initialProjects[0] || {
    title: "Kalaakars Architecture",
    category: "Studio",
    year: "2026",
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
    `${initialSettings?.yearsExp || "8"} YEARS OF EXCELLENCE`,
    "PRECISION & CREATIVITY",
    "MALAPPURAM · AREEKODE",
    "KERALA COAST",
    "DESIGN DRIVEN STUDIO",
  ];

  return (
    <>
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} settings={initialSettings} />

      <div style={{ background: "#fff" }}>

        {/* ── PREMIUM MOBILE LAYOUT ── */}
        <div className="mobile-flex" style={{ height: "100svh", overflow: "hidden", flexDirection: "column", background: "#0a0a0a", width: "100%" }}>
          <div style={{ position: "relative", height: "78svh", flexShrink: 0, overflow: "hidden" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                   <Image 
                    src={active.heroImg} 
                    alt={active.title} 
                    fill 
                    priority 
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>

              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)" }} />

              <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "24px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20 }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Logo size={22} color="#fff" />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.22em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
                <button
                  onClick={() => setNavOpen(true)}
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px", cursor: "pointer", padding: "10px 16px", display: "flex", flexDirection: "column", gap: "5px" }}
                >
                  <div style={{ width: "20px", height: "1.5px", background: "#fff" }} />
                  <div style={{ width: "14px", height: "1.5px", background: "rgba(255,255,255,0.7)" }} />
                </button>
              </div>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 40px", zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-cat"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}
                  >
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4A520" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#fff", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>{active.category} {active.year}</span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx + "-name"}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3.5rem, 18vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase", margin: 0 }}>
                      {active.title.split(" ")[0]}<br />
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>{active.title.split(" ").slice(1).join(" ")}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>

                <div style={{ display: "flex", gap: "12px", marginTop: "40px", width: "100%" }}>
                  <Link href={`/projects/${active.slug}`} style={{
                    flex: 1.4, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "18px 20px",
                    background: "#D4A520",
                    color: "#000",
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.2em",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    textDecoration: "none"
                  }}>
                    VIEW CASE →
                  </Link>
                  <Link href="/studio#contact" style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "18px 20px",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.15em",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    textDecoration: "none"
                  }}>
                    INQUIRY
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, background: "#0a0a0a", overflowY: "auto", overflowX: "hidden" }}>
              <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Project Narratives</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#D4A520", letterSpacing: "0.15em", fontWeight: 600 }}>{activeIdx + 1}/{initialProjects.length}</p>
              </div>

              <nav>
                {initialProjects.map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setActiveIdx(i)}
                      style={{
                        padding: "24px 24px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        cursor: "pointer",
                        background: isActive ? "rgba(212,165,32,0.08)" : "transparent",
                        transition: "background 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: isActive ? "#D4A520" : "rgba(255,255,255,0.25)", fontWeight: 500 }}>{p.num}</span>
                                {isActive && <motion.div layoutId="mobile-indicator" style={{ height: "1.5px", width: "24px", background: "#D4A520" }} />}
                            </div>
                            <h3 style={{
                                fontFamily: "var(--font-sans)", fontWeight: isActive ? 500 : 400,
                                fontSize: "1.25rem", letterSpacing: "-0.02em",
                                color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                                transition: "all 0.4s ease",
                                margin: 0
                            }}>
                                {p.title}
                            </h3>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", marginTop: "6px", letterSpacing: "0.05em" }}>{p.category} · {p.location}</p>
                        </div>
                        
                        <div style={{ 
                            width: "64px", height: "64px", borderRadius: "100%", 
                            overflow: "hidden", flexShrink: 0, 
                            border: isActive ? "1.5px solid #D4A520" : "1px solid rgba(255,255,255,0.15)",
                            transition: "all 0.4s ease",
                            opacity: isActive ? 1 : 0.4,
                            position: "relative"
                        }}>
                            <Image 
                              src={p.heroImg} 
                              alt={p.title} 
                              fill 
                              sizes="64px"
                              style={{ objectFit: "cover" }} 
                            />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
        </div>

        {/* ── DESKTOP: Original Split-Screen ── */}
        <div className="desktop-flex" style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
            <aside style={{ width: "380px", minWidth: "350px", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", zIndex: 10, borderRight: "1px solid var(--border)" }}>
              <div style={{ padding: "40px 48px" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Logo size={26} color="#111" />
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.25em", color: "#111", textTransform: "uppercase" }}>Kalaakars</span>
                </Link>
              </div>

              <nav style={{ flex: 1, paddingTop: "40px" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--accent)", padding: "0 48px 24px", opacity: 0.8, fontWeight: 700 }}>LATEST WORKS</p>
                {initialProjects.slice(0, 5).map((p, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <div 
                        key={p.id} 
                        onMouseEnter={() => setActiveIdx(i)} 
                        onClick={() => setActiveIdx(i)} 
                        style={{ 
                            padding: "24px 48px", 
                            cursor: "pointer", 
                            position: "relative",
                            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                            background: isActive ? "rgba(212, 165, 32, 0.04)" : "transparent",
                            borderBottom: "1px solid rgba(0,0,0,0.03)"
                        }}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          style={{ position: "absolute", left: 0, top: "25%", bottom: "25%", width: "4px", background: "var(--accent)" }}
                        />
                      )}
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: isActive ? "var(--accent)" : "#bfbfbf", transition: "color 0.5s", fontWeight: 600 }}>{p.num}</p>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between", marginTop: "6px" }}>
                        <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", flex: 1 }}>
                            <p style={{ 
                                fontFamily: "var(--font-serif)", 
                                fontWeight: 400, 
                                fontSize: "1.8rem", 
                                letterSpacing: "-0.01em", 
                                color: isActive ? "#000" : "#999", 
                                lineHeight: 1.1, 
                                transition: "all 0.5s ease",
                                transform: isActive ? "translateX(6px)" : "none"
                            }}>
                                {p.title}
                            </p>
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* DYNAMIC FUTURE NARRATIVES CMS SECTION */}
                <div style={{ marginTop: "60px", paddingBottom: "40px" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#aaa", padding: "0 48px 24px", fontWeight: 700 }}>FUTURE NARRATIVES</p>
                  {(initialUpcoming.length > 0 ? initialUpcoming : [
                    { id: "1", title: "Coastal Research Lab", year: "2026", status: "Design Phase", progress: 35 },
                    { id: "2", title: "Wayanad Retreat", year: "2026", status: "Execution", progress: 65 }
                  ]).map((u) => (
                    <div key={u.id} style={{ padding: "16px 48px", marginBottom: "8px" }}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#444", letterSpacing: "-0.01em", fontWeight: 500 }}>{u.title}</p>
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#bbb" }}>/{u.year}</p>
                       </div>
                       
                       {/* Premium Gold Progress Bar */}
                       <div style={{ position: "relative", height: "2px", background: "rgba(0,0,0,0.05)", width: "100%", overflow: "hidden" }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${u.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                            style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#D4A520" }}
                          />
                       </div>
                       
                       <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "#aaa", marginTop: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{u.status} — {u.progress}%</p>
                    </div>
                  ))}
                </div>
              </nav>

              <div style={{ padding: "48px" }}>
                <Link href="/projects" style={{ 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#111", color: "#fff", padding: "18px", borderRadius: "4px",
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textDecoration: "none",
                  transition: "background 0.3s"
                }} className="hover-dark">
                  PROJECTS ARCHIVE ↗
                </Link>
              </div>
            </aside>

            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={active.heroImg}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                   <Image 
                    src={active.heroImg} 
                    alt={active.title} 
                    fill 
                    priority 
                    sizes="70vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%, rgba(0,0,0,0.4) 100%)" }} />

              <div style={{ position: "absolute", top: "40px", right: "40px", display: "flex", alignItems: "center", gap: "20px", zIndex: 20 }}>
                <Link href="/studio" style={{ padding: "14px 28px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", borderRadius: "100px", border: "1.5px solid rgba(255,255,255,0.25)", transition: "all 0.3s", textDecoration: "none" }}>STUDIO</Link>
                <Link href="/studio#contact" style={{ padding: "14px 28px", background: "var(--accent)", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", borderRadius: "100px", border: "none", transition: "all 0.3s", textDecoration: "none" }}>ENQUIRE</Link>
                <button onClick={() => setNavOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px", display: "flex", flexDirection: "column", gap: "7px" }}>
                  <div style={{ width: "28px", height: "2px", background: "#fff" }} />
                  <div style={{ width: "18px", height: "2px", background: "#fff" }} />
                </button>
              </div>

              <div style={{ position: "absolute", bottom: "120px", left: "80px", zIndex: 10, pointerEvents: "none" }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIdx} 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(5rem, 14vw, 13rem)", letterSpacing: "-0.04em", lineHeight: 0.8, color: "#fff", textTransform: "uppercase" }}>Kalaakars</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "16px" }}>
                        <div style={{ width: "60px", height: "1.5px", background: "rgba(255,255,255,0.4)" }} />
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 300, fontSize: "clamp(1rem, 2.5vw, 1.6rem)", letterSpacing: "0.6em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>ARCHITECTURE</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div style={{ position: "absolute", bottom: "48px", right: "48px", zIndex: 20, textAlign: "right" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeIdx} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "12px", fontWeight: 700 }}>{active.category} · {active.year}</p>
                    <Link href={`/projects/${active.slug}`} style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.01em", textDecoration: "none", borderBottom: "1.5px solid rgba(255,255,255,0.2)", paddingBottom: "4px" }}>View Project Details →</Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        <Marquee text={tickerItems.join("  ✦  ")} />
        <Credo isMobile={isMobile} />
        <FAQ isMobile={isMobile} />
        <Footer isMobile={isMobile} settings={initialSettings} />
      </div>
    </>
  );
}
