"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Marquee } from "@/components/sections/Marquee";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { StatsSection, CredoSection, FAQSection, FooterSection } from "@/components/sections/PremiumSections";
import { Loader } from "@/components/ui/Loader";
import { Logo } from "@/components/ui/Logo";
import { useIsMobile } from "@/lib/useIsMobile";

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
   FULL-SCREEN NAV OVERLAY
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
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0,
          }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Logo size={22} color="#fff" />
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem",
                letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase",
              }}>Kalaakars</span>
            </Link>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%", cursor: "pointer", width: 45, height: 45,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            gap: isMobile ? "24px" : "40px",
            padding: isMobile ? "32px 24px" : "60px 80px",
            overflowY: "auto",
          }}>
            <div style={{ flex: isMobile ? "none" : 1 }}>
              <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: isMobile ? "24px" : "40px" }}>NAVIGATION</p>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "12px" : "24px" }}>
                {links.map((link, i) => (
                  <motion.div key={link.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} onClick={onClose} style={{ display: "flex", alignItems: "baseline", gap: "16px", color: "#fff" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>{link.num}</span>
                      <span style={{
                        fontFamily: "var(--font-serif)", fontSize: isMobile ? "2.8rem" : "4.5rem",
                        fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em",
                        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}>
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
                <Link href="/projects" onClick={onClose} className="btn-glass" style={{ display: "inline-block" }}>
                  FULL ARCHIVE →
                </Link>
              </div>
              <div>
                <p className="u-label" style={{ color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>CONTACT</p>
                <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#fff", display: "block" }}>
                  {settings?.email || "kalaakaarsarchitecture@gmail.com"}
                </a>
                <a href={`tel:${settings?.phone || "+91 7306358793"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--accent)", display: "block", marginTop: "8px" }}>
                  {settings?.phone || "+91 7306358793"}
                </a>
              </div>
            </div>
          </div>

          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)" }}>© 2026 KALAAKARS</span>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Instagram", "LinkedIn"].map(s => (
                <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)" }}>{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   DESKTOP SIDEBAR
═══════════════════════════════════════════ */
function DesktopSidebar({
  projects, activeIdx, onHover, upcoming, onNavOpen,
}: {
  projects: any[]; activeIdx: number; onHover: (i: number) => void;
  upcoming: UpcomingProject[]; onNavOpen: () => void;
}) {
  return (
    <aside style={{
      width: 380, minWidth: 350, flexShrink: 0, background: "#fff",
      display: "flex", flexDirection: "column", overflowY: "auto",
      zIndex: 10, borderRight: "1px solid var(--border)",
    }}>
      <div style={{ padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Logo size={26} color="#111" />
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.25em", color: "#111", textTransform: "uppercase" }}>
            Kalaakars
          </span>
        </Link>
        <button onClick={onNavOpen} className="hamburger" style={{ color: "#111" }}>
          <span /><span />
        </button>
      </div>

      <nav style={{ flex: 1, paddingTop: "40px" }}>
        <p className="u-accent-label" style={{ padding: "0 48px 24px" }}>LATEST WORKS</p>
        {projects.slice(0, 5).map((p, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={p.id}
              onMouseEnter={() => onHover(i)}
              onClick={() => onHover(i)}
              style={{
                padding: "24px 48px", cursor: "pointer", position: "relative",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                background: isActive ? "var(--accent-soft)" : "transparent",
                borderBottom: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  style={{ position: "absolute", left: 0, top: "25%", bottom: "25%", width: 4, background: "var(--accent)" }}
                />
              )}
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em",
                color: isActive ? "var(--accent)" : "#bfbfbf", fontWeight: 600,
              }}>
                {p.num}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "space-between", marginTop: "6px" }}>
                <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", flex: 1 }}>
                  <p style={{
                    fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.7rem",
                    letterSpacing: "-0.01em", color: isActive ? "#000" : "#999",
                    lineHeight: 1.1, transition: "all 0.5s ease",
                    transform: isActive ? "translateX(6px)" : "none",
                  }}>
                    {p.title}
                  </p>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Future Narratives */}
        <div style={{ marginTop: "60px", paddingBottom: "40px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#aaa", padding: "0 48px 24px", fontWeight: 700 }}>
            FUTURE NARRATIVES
          </p>
          {(upcoming.length > 0 ? upcoming : [
            { id: "1", title: "Coastal Research Lab", year: "2026", status: "Design Phase", progress: 35 },
            { id: "2", title: "Wayanad Retreat", year: "2026", status: "Execution", progress: 65 },
          ]).map((u) => (
            <div key={u.id} style={{ padding: "16px 48px", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#444", fontWeight: 500 }}>{u.title}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#bbb" }}>/{u.year}</p>
              </div>
              <div style={{ position: "relative", height: 2, background: "rgba(0,0,0,0.05)", width: "100%", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${u.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                  style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "var(--accent)" }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "#aaa", marginTop: "8px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {u.status} — {u.progress}%
              </p>
            </div>
          ))}
        </div>
      </nav>

      <div style={{ padding: "48px" }}>
        <Link href="/projects" className="btn-outline" style={{ width: "100%", justifyContent: "center", color: "#111", borderColor: "#111" }}>
          PROJECTS ARCHIVE ↗
        </Link>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════
   MOBILE HERO (full-screen with project list)
═══════════════════════════════════════════ */
function MobileHero({
  projects, activeIdx, onSelect, onNavOpen,
}: {
  projects: any[]; activeIdx: number; onSelect: (i: number) => void; onNavOpen: () => void;
}) {
  const active = projects[activeIdx] || projects[0];
  if (!active) return null;

  return (
    <div className="mobile-flex" style={{
      height: "100svh", overflow: "hidden", flexDirection: "column",
      background: "#0a0a0a", width: "100%",
    }}>
      {/* Hero image area */}
      <div style={{ position: "relative", height: "72svh", flexShrink: 0, overflow: "hidden" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={active.heroImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image src={active.heroImg} alt={active.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          </motion.div>
        </AnimatePresence>

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Mobile Nav Bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "20px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20,
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Logo size={20} color="#fff" />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.22em", color: "#fff", textTransform: "uppercase" }}>
              Kalaakars
            </span>
          </Link>
          <button onClick={onNavOpen} style={{
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50px",
            cursor: "pointer", padding: "10px 14px",
            display: "flex", flexDirection: "column", gap: "4px",
          }}>
            <div style={{ width: 18, height: 1.5, background: "#fff" }} />
            <div style={{ width: 12, height: 1.5, background: "rgba(255,255,255,0.7)" }} />
          </button>
        </div>

        {/* Project info overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 32px", zIndex: 10 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx + "-cat"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "5px 12px", marginBottom: "16px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4A520" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>{active.category} {active.year}</span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1 key={activeIdx + "-name"} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.8rem, 14vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.85, color: "#fff", textTransform: "uppercase", margin: 0 }}>
              {active.title.split(" ")[0]}<br />
              <span style={{ color: "rgba(255,255,255,0.6)" }}>{active.title.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
          </AnimatePresence>

          <div style={{ display: "flex", gap: "10px", marginTop: "28px", width: "100%" }}>
            <Link href={`/projects/${active.slug}`} className="btn-primary" style={{ flex: 1.4, padding: "16px 16px", fontSize: "0.55rem" }}>
              VIEW CASE →
            </Link>
            <Link href="/studio#contact" className="btn-glass" style={{ flex: 1, padding: "16px 16px", fontSize: "0.55rem" }}>
              INQUIRY
            </Link>
          </div>
        </div>
      </div>

      {/* Project list */}
      <div style={{ flex: 1, background: "#0a0a0a", overflowY: "auto", overflowX: "hidden" }}>
        <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Project Narratives</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#D4A520", letterSpacing: "0.15em", fontWeight: 600 }}>{activeIdx + 1}/{projects.length}</p>
        </div>
        <nav>
          {projects.map((p, i) => {
            const isActive = activeIdx === i;
            return (
              <div key={p.id} onClick={() => onSelect(i)} style={{
                padding: "20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer", background: isActive ? "rgba(212,165,32,0.08)" : "transparent",
                transition: "background 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: isActive ? "#D4A520" : "rgba(255,255,255,0.25)", fontWeight: 500 }}>{p.num}</span>
                      {isActive && <motion.div layoutId="mobile-indicator" style={{ height: 1.5, width: 20, background: "#D4A520" }} />}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-sans)", fontWeight: isActive ? 500 : 400,
                      fontSize: "1.15rem", letterSpacing: "-0.02em",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                      transition: "all 0.4s ease", margin: 0,
                    }}>
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", marginTop: "4px", letterSpacing: "0.05em" }}>
                      {p.category} · {p.location}
                    </p>
                  </div>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                    border: isActive ? "1.5px solid #D4A520" : "1px solid rgba(255,255,255,0.12)",
                    opacity: isActive ? 1 : 0.4, position: "relative",
                  }}>
                    <Image src={p.heroImg} alt={p.title} fill sizes="52px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE — MAIN COMPONENT
═══════════════════════════════════════════ */
export default function HomeClient({
  initialProjects,
  initialSettings,
  initialUpcoming = [],
}: {
  initialProjects: any[];
  initialSettings?: any;
  initialUpcoming?: UpcomingProject[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const isMobile = useIsMobile();

  const active = initialProjects[activeIdx] || initialProjects[0] || {
    title: "Kalaakars Architecture", category: "Studio", year: "2026",
    heroImg: "https://images.unsplash.com/photo-1628080185121-7243cde15286?q=80&w=2000",
    slug: "coming-soon", location: "Kerala",
  } as any;

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

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
      {/* 2-second branded loader */}
      {!loaderDone && <Loader onComplete={handleLoaderComplete} />}

      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} settings={initialSettings} />

      <div style={{ background: "#fff" }}>

        {/* ── MOBILE LAYOUT ── */}
        <MobileHero
          projects={initialProjects}
          activeIdx={activeIdx}
          onSelect={setActiveIdx}
          onNavOpen={() => setNavOpen(true)}
        />

        {/* ── DESKTOP: Split-Screen with Slideshow ── */}
        <div className="desktop-flex" style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <DesktopSidebar
            projects={initialProjects}
            activeIdx={activeIdx}
            onHover={setActiveIdx}
            upcoming={initialUpcoming}
            onNavOpen={() => setNavOpen(true)}
          />

          {/* Main hero area with auto-slideshow */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <HeroSlideshow projects={initialProjects} />

            {/* Desktop top-right nav buttons */}
            <div style={{
              position: "absolute", top: 40, right: 40,
              display: "flex", alignItems: "center", gap: "12px", zIndex: 30,
            }}>
              <Link href="/studio" className="btn-glass">STUDIO</Link>
              <Link href="/studio#contact" className="btn-primary">ENQUIRE</Link>
            </div>
          </div>
        </div>

        {/* ── SHARED SECTIONS ── */}
        <Marquee text={tickerItems.join("  ✦  ")} />
        <StatsSection settings={initialSettings} />
        <CredoSection isMobile={isMobile} />
        <FAQSection isMobile={isMobile} />
        <FooterSection isMobile={isMobile} settings={initialSettings} />
      </div>
    </>
  );
}
