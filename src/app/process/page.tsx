"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { Logo } from "@/components/ui/Logo";
import { useScrollReveal } from "@/hooks/useInteractions";

/* ── Premium Glass Navbar ── */
function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`premium-nav ${scrolled ? "nav-scrolled" : "nav-transparent"}`}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <Logo size={22} color={scrolled ? "#111" : "var(--fg)"} />
                <span style={{
                    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem",
                    letterSpacing: "0.18em", color: scrolled ? "#111" : "var(--fg)",
                    textTransform: "uppercase", transition: "color 0.4s",
                }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"]].map(([l, h]) => (
                    <Link key={l} href={h} className="link-underline" style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                        letterSpacing: "0.15em", color: scrolled ? "#666" : "var(--fg-muted)",
                        transition: "color 0.4s",
                    }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

/* ── Reveal Wrapper ── */
function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useScrollReveal(0.15);
    return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

export default function ProcessPage() {
    const isMobile = useIsMobile();
    const pad = isMobile ? "120px 20px 60px" : "180px 40px 100px";

    const phases = [
        {
            step: "01", title: "Brief & Discovery",
            desc: "We begin by listening to the land and the client. This phase involves site analysis, understanding local climate patterns, and defining the core spatial requirements.",
            duration: "2-4 Weeks",
        },
        {
            step: "02", title: "Concept Design",
            desc: "Translation of the brief into a spatial narrative. We explore forms, light, and materiality through sketches and physical models.",
            duration: "4-6 Weeks",
        },
        {
            step: "03", title: "Design Development",
            desc: "Refining the concept into structural reality. We detail the systems, select specific materials (laterite, timber, stone), and finalize the layout.",
            duration: "6-8 Weeks",
        },
        {
            step: "04", title: "Documentation",
            desc: "Preparation of detailed technical drawings for construction. This includes structural engineering and municipal approvals.",
            duration: "4-6 Weeks",
        },
        {
            step: "05", title: "Construction",
            desc: "Regular site visits to ensure the design intent is preserved. We work closely with master craftsmen to achieve Malabar precision.",
            duration: "8-18 Months",
        },
        {
            step: "06", title: "Handover",
            desc: "The final layer of styling and post-occupancy evaluation. We ensure the building breathes as intended in the Kerala monsoon.",
            duration: "1 Month",
        },
    ];

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />

            {/* Header */}
            <section style={{ padding: pad, borderBottom: "1px solid var(--border)" }}>
                <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="u-accent-label" style={{ marginBottom: "24px" }}
                >
                    The Studio Method
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "var(--font-serif)", fontWeight: 400,
                        fontSize: "clamp(3rem, 9vw, 8rem)",
                        letterSpacing: "-0.04em", lineHeight: 0.85, maxWidth: "1000px",
                    }}
                >
                    Translating<br />Vision Into<br />Vital Structure
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontFamily: "var(--font-sans)", fontSize: "1.15rem", fontWeight: 300,
                        color: "var(--fg-muted)", marginTop: "48px", maxWidth: "600px", lineHeight: 1.6,
                    }}
                >
                    Our process is iterative, rigorous, and deeply rooted in the physical reality of the Malabar coast.
                </motion.p>
            </section>

            {/* Phases */}
            <RevealSection>
                <section style={{ padding: isMobile ? "60px 20px" : "100px 40px" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                        gap: isMobile ? "48px" : "80px 120px",
                    }}>
                        {phases.map((p, i) => (
                            <motion.div
                                key={p.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.8 }}
                                className="hover-lift"
                                style={{
                                    padding: "32px",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--border)",
                                    background: "var(--bg-card)",
                                }}
                            >
                                <div style={{
                                    display: "flex", justifyContent: "space-between",
                                    alignItems: "flex-end", paddingBottom: "16px",
                                    marginBottom: "24px", borderBottom: "1px solid var(--border)",
                                }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700 }}>{p.step}</span>
                                    <span className="u-label" style={{ fontSize: "0.5rem", color: "var(--fg-subtle)" }}>Est. {p.duration}</span>
                                </div>
                                <h3 style={{
                                    fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.6rem" : "1.9rem",
                                    fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em",
                                }}>{p.title}</h3>
                                <p style={{
                                    fontFamily: "var(--font-sans)", fontSize: "0.95rem",
                                    lineHeight: 1.7, color: "var(--fg-muted)",
                                }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </RevealSection>

            {/* CTA */}
            <RevealSection>
                <section style={{
                    padding: isMobile ? "80px 20px" : "120px 40px",
                    background: "#0c0c0c", textAlign: "center",
                }}>
                    <p className="u-accent-label" style={{ marginBottom: "24px" }}>Ready to Build?</p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 400, color: "#fff", letterSpacing: "-0.03em",
                        lineHeight: 1, marginBottom: "40px",
                    }}>
                        Let's create something<br /><span style={{ color: "var(--accent)" }}>extraordinary.</span>
                    </h2>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/studio#contact" className="btn-primary">START A PROJECT</Link>
                        <Link href="/projects" className="btn-glass">VIEW PORTFOLIO</Link>
                    </div>
                </section>
            </RevealSection>

            {/* Footer */}
            <footer style={{
                padding: isMobile ? "60px 20px 40px" : "80px 40px 60px",
                borderTop: "1px solid var(--border)", textAlign: "center",
            }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--fg-subtle)" }}>
                    © 2026 KALAAKARS ARCHITECTURE STUDIO
                </p>
            </footer>
        </main>
    );
}
