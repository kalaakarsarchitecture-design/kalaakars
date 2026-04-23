"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { Logo } from "@/components/ui/Logo";
import { useScrollReveal } from "@/hooks/useInteractions";

/* ── Premium Glass Navbar ── */
function Navbar({ dark = false }: { dark?: boolean }) {
    const c = dark ? "#fff" : "#111";
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`premium-nav ${dark && !scrolled ? "nav-dark" : scrolled ? "nav-scrolled" : "nav-transparent"}`}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Logo size={22} color={scrolled ? "#111" : c} />
                <span style={{
                    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem",
                    letterSpacing: "0.2em", color: scrolled ? "#111" : c, textTransform: "uppercase",
                    transition: "color 0.4s",
                }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"], ["JOURNAL", "/journal"]].map(([l, h]) => (
                    <Link key={l} href={h} className="link-underline" style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em",
                        color: scrolled ? "#666" : (dark ? "rgba(255,255,255,0.7)" : "#999"),
                        transition: "color 0.4s",
                    }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

/* ── Reveal Section Wrapper ── */
function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useScrollReveal(0.15);
    return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

export default function StudioClient({ settings }: { settings: any }) {
    const isMobile = useIsMobile();
    const pad = isMobile ? "72px 20px" : "140px 40px";
    const padS = isMobile ? "60px 20px" : "120px 40px";

    const [sending, setSending] = React.useState(false);
    const [sent, setSent] = React.useState(false);

    const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        setSent(true);
        const form = e.currentTarget;
        form.reset();
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)" }}>
            {/* Hero */}
            <section style={{
                height: "100vh", position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                textAlign: "center", background: "#0c0c0c",
            }}>
                <Navbar dark />
                <div style={{ padding: "20px", color: "#fff", zIndex: 10 }}>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="u-accent-label"
                        style={{ marginBottom: "32px" }}
                    >
                        Kalaakars Architecture Studio
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "var(--font-serif)", fontWeight: 400,
                            fontSize: isMobile ? "12vw" : "clamp(3.5rem, 10vw, 9rem)",
                            letterSpacing: "-0.04em", lineHeight: 0.9, textTransform: "uppercase",
                        }}
                    >
                        Mastery in<br />Space & Craft
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                        style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}
                    >
                        <a href="#contact" className="btn-primary">START A PROJECT</a>
                        <Link href="/projects" className="btn-glass">VIEW WORK</Link>
                    </motion.div>
                </div>
            </section>

            {/* Manifesto */}
            <RevealSection>
                <section style={{
                    padding: pad, display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
                    gap: isMobile ? "48px" : "100px", borderBottom: "1px solid var(--border)",
                }}>
                    <div>
                        <span className="u-accent-label">The Studio Profile</span>
                    </div>
                    <div>
                        <p style={{
                            fontFamily: "var(--font-serif)", fontWeight: 400,
                            fontSize: isMobile ? "1.7rem" : "2.6rem",
                            lineHeight: 1.15, letterSpacing: "-0.03em",
                        }}>
                            Kalaakars Architecture is a trusted name in modern architecture, known for delivering{" "}
                            <span style={{ color: "var(--accent)" }}>precise craftwork and timeless creativity.</span>
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "40px", marginTop: "64px" }}>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "var(--fg-muted)" }}>
                                With {settings?.yearsExp || "8"} years of experience, we specialize in designing spaces that perfectly balance style, comfort, and functionality. Our expertise lies in both modern and classic resort projects, where we combine contemporary design trends with timeless elegance.
                            </p>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "var(--fg-muted)" }}>
                                Every project we undertake reflects our commitment to quality, attention to detail, and client satisfaction. Whether residential or commercial, we ensure innovative solutions tailored to your unique vision.
                            </p>
                        </div>
                    </div>
                </section>
            </RevealSection>

            {/* Timeline */}
            <RevealSection>
                <section style={{ padding: padS, borderBottom: "1px solid var(--border)" }}>
                    <p className="u-accent-label" style={{ marginBottom: "64px" }}>Milestones</p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {[
                            { year: "2016", event: "Establishment of the studio." },
                            { year: "2018", event: "First breakthrough in modern resort architecture." },
                            { year: "2020", event: "Specialization in craftwork-heavy residential interiors." },
                            { year: "2022", event: "Project milestone: 50+ successful architectural handovers." },
                            { year: "2026", event: `${settings?.yearsExp || "8"} Years of excellence in modern architecture.` },
                        ].map((m) => (
                            <div key={m.year} style={{
                                display: "flex", padding: isMobile ? "24px 0" : "32px 0",
                                borderTop: "1px solid var(--border)", alignItems: "baseline",
                                gap: isMobile ? "16px" : "0",
                            }}>
                                <span style={{
                                    fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                                    width: isMobile ? "60px" : "120px", flexShrink: 0, color: "var(--accent)",
                                }}>{m.year}</span>
                                <span style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: isMobile ? "1.2rem" : "1.6rem",
                                    letterSpacing: "-0.01em",
                                }}>{m.event}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </RevealSection>

            {/* Services */}
            <RevealSection>
                <section style={{ padding: padS, borderBottom: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
                    <p className="u-accent-label" style={{ marginBottom: "64px" }}>Services</p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "40px" : "64px" }}>
                        {[
                            { title: "Resort Projects", desc: "Expertise in both modern and classic resort developments." },
                            { title: "Residential", desc: "Crafting homes that balance comfort, style, and functionality." },
                            { title: "Commercial", desc: "Innovative structural solutions for modern business environments." },
                            { title: "Craftwork Interiors", desc: "Best-in-class precision and creative interior craftsmanship." },
                            { title: "Classic Architecture", desc: "Timeless designs that echo elegance and structural honesty." },
                            { title: "Modernist Design", desc: "Latest contemporary trends tailored to client vision." },
                        ].map(s => (
                            <div key={s.title} className="hover-lift" style={{
                                padding: "32px", borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border)", background: "var(--bg-card)",
                                transition: "all 0.4s var(--ease-expo)",
                            }}>
                                <h3 style={{
                                    fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.5rem" : "1.7rem",
                                    fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em",
                                }}>{s.title}</h3>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--fg-muted)" }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </RevealSection>

            {/* Contact Form */}
            <RevealSection>
                <section id="contact" style={{ padding: padS }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "48px" : "64px" }}>
                        <div>
                            <p className="u-accent-label" style={{ marginBottom: "24px" }}>Contact Us</p>
                            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: isMobile ? "2rem" : "2.8rem", letterSpacing: "-0.04em", marginBottom: "24px" }}>
                                Let's talk about your vision.
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", color: "var(--fg)", fontSize: "1.05rem" }}>
                                    📞 {settings?.phone || "+91 7306358793"}
                                </a>
                                <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", color: "var(--fg)", fontSize: "1.05rem" }}>
                                    📧 {settings?.email || "kalaakaarsarchitecture@gmail.com"}
                                </a>
                            </div>
                            <p style={{ fontFamily: "var(--font-sans)", color: "var(--fg-subtle)", lineHeight: 1.5, marginTop: "24px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
                                {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode, Malappuram"}
                            </p>
                        </div>
                        <form onSubmit={handleInquiry} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                    <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Full Name</label>
                                    <input required name="name" type="text" placeholder="Your name" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.05rem" }} />
                                </div>
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                    <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Email Address</label>
                                    <input required name="email" type="email" placeholder="hello@example.com" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.05rem" }} />
                                </div>
                            </div>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Project Type</label>
                                <select name="type" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.05rem", appearance: "none", cursor: "pointer" }}>
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Interior</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Message</label>
                                <textarea required name="message" rows={4} placeholder="Tell us about your project" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.05rem", resize: "none" }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                                <button type="submit" disabled={sending} className="btn-primary" style={{ width: isMobile ? "100%" : "240px", cursor: sending ? "wait" : "pointer" }}>
                                    {sending ? "SENDING..." : "SEND INQUIRY"}
                                </button>
                                {sent && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>INQUIRY SENT ✓</span>}
                            </div>
                        </form>
                    </div>
                </section>
            </RevealSection>

            {/* Footer */}
            <footer style={{ padding: isMobile ? "60px 20px 40px" : "80px 40px 60px", borderTop: "1px solid var(--border)" }}>
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexDirection: isMobile ? "column" : "row", gap: "24px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Logo size={18} color="#D4A520" />
                        <span className="u-label" style={{ fontSize: "0.5rem" }}>© 2026 KALAAKARS ARCHITECTURE STUDIO</span>
                    </div>
                    <div style={{ display: "flex", gap: "32px" }}>
                        {["Instagram", "LinkedIn", "Behance"].map(s => (
                            <a key={s} href="#" className="u-label link-underline" style={{ fontSize: "0.55rem" }}>{s}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </main>
    );
}
