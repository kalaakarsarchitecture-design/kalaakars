"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar({ dark = false }: { dark?: boolean }) {
    const c = dark ? "#fff" : "#111";
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain", filter: dark ? "brightness(0) invert(1)" : "none" }} />
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.2rem", color: c }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"], ["JOURNAL", "/journal"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: dark ? "rgba(255,255,255,0.7)" : "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
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
        // Simulate API call for now or connect to a future /api/contact
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
            <section style={{ height: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "#0c0c0c" }}>
                <Navbar dark />
                <div style={{ padding: "20px", color: "#fff", zIndex: 10 }}>
                    <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.33em", opacity: 0.6, marginBottom: "32px", textTransform: "uppercase" }}
                    >
                        Kalaakars Architecture Studio
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "var(--ease-expo)" }}
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: isMobile ? "12vw" : "clamp(3.5rem, 10vw, 9rem)", letterSpacing: "-0.04em", lineHeight: 0.9, textTransform: "uppercase" }}
                    >
                        Mastery in<br />Space & Craft
                    </motion.h1>
                </div>
            </section>


            {/* Manifesto */}
            <section style={{ padding: pad, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "48px" : "100px", borderBottom: "1px solid var(--border)" }}>
                <div>
                    <span className="u-label">The Studio Profile</span>
                </div>
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: isMobile ? "1.8rem" : "2.8rem", lineHeight: 1.1, letterSpacing: "-0.03em" }}
                    >
                        Kalaakars Architecture is a trusted name in modern architecture, known for delivering <span style={{ color: "var(--accent)" }}>precise craftwork and timeless creativity.</span>
                    </motion.p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "40px", marginTop: "64px" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "#666" }}>
                           With {settings?.yearsExp || "8"} years of experience, we specialize in designing spaces that perfectly balance style, comfort, and functionality. Our expertise lies in both modern and classic resort projects, where we combine contemporary design trends with timeless elegance.
                        </p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "#666" }}>
                           Every project we undertake reflects our commitment to quality, attention to detail, and client satisfaction. Whether residential or commercial, we ensure innovative solutions tailored to your unique vision.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section style={{ padding: padS, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "64px" }}>Milestones</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                     {[
                        { year: "2016", event: "Establishment of the studio." },
                        { year: "2018", event: "First breakthrough in modern resort architecture." },
                        { year: "2020", event: "Specialization in craftwork-heavy residential interiors." },
                        { year: "2022", event: "Project milestone: 50+ successful architectural handovers." },
                        { year: "2024", event: `${settings?.yearsExp || "8"} Years of excellence in the field of modern architecture.` },
                    ].map((m, i) => (
                        <div key={m.year} style={{ display: "flex", padding: "32px 0", borderTop: "1px solid var(--border)", alignItems: "baseline" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", width: "120px", color: "var(--accent)" }}>{m.year}</span>
                            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", letterSpacing: "-0.01em" }}>{m.event}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section style={{ padding: padS, borderBottom: "1px solid var(--border)", background: "#fafafa" }}>
                <p className="u-label" style={{ marginBottom: "64px" }}>Services</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "64px" }}>
                     {[
                        { title: "Resort Projects", desc: "Expertise in both modern and classic resort developments." },
                        { title: "Residential", desc: "Crafting homes that balance comfort, style, and functionality." },
                        { title: "Commercial", desc: "Innovative structural solutions for modern business environments." },
                        { title: "Craftwork Interiors", desc: "Best-in-class precision and creative interior craftsmanship." },
                        { title: "Classic Architecture", desc: "Timeless designs that echo elegance and structural honesty." },
                        { title: "Modernist Design", desc: "Latest contemporary trends tailored to client vision." },
                    ].map(s => (
                        <div key={s.title}>
                             <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                             <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.6, color: "#666" }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* Contact Form */}
            <section id="contact" style={{ padding: padS }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: "64px" }}>
                    <div>
                        <p className="u-label" style={{ marginBottom: "24px" }}>Contact Us</p>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.8rem", letterSpacing: "-0.04em", marginBottom: "24px" }}>Let's talk about your vision.</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-sans)", color: "var(--fg)", fontSize: "1.1rem" }}>📞 {settings?.phone || "+91 7306358793"}</a>
                            <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-sans)", color: "var(--fg)", fontSize: "1.1rem" }}>📧 {settings?.email || "kalaakaarsarchitecture@gmail.com"}</a>
                        </div>
                        <p style={{ fontFamily: "var(--font-sans)", color: "#999", lineHeight: 1.5, marginTop: "24px", fontSize: "0.9rem", whiteSpace: "pre-line" }}>
                             {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode, Malappuram"}
                        </p>
                    </div>
                    <form onSubmit={handleInquiry} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Full Name</label>
                                <input required name="name" type="text" placeholder="Your name" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem" }} />
                            </div>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Email Address</label>
                                <input required name="email" type="email" placeholder="hello@example.com" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem" }} />
                            </div>
                        </div>
                        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                            <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Project Type</label>
                            <select name="type" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem", appearance: "none", cursor: "pointer" }}>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Interior</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                            <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Message</label>
                            <textarea required name="message" rows={4} placeholder="Tell us about your project" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem", resize: "none" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <button type="submit" disabled={sending} style={{ padding: "18px 32px", background: "var(--fg)", color: "var(--bg)", border: "none", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", width: isMobile ? "100%" : "240px", cursor: sending ? "wait" : "pointer" }}>
                                {sending ? "SENDING..." : "SEND INQUIRY"}
                            </button>
                            {sent && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)" }}>INQUIRY SENT ✓</span>}
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: isMobile ? "60px 20px 40px" : "80px 40px 60px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", objectFit: "contain" }} />
                        <span className="u-label" style={{ fontSize: "0.5rem" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</span>
                    </div>
                    <div style={{ display: "flex", gap: "32px" }}>
                        {["Instagram", "LinkedIn", "Behance"].map(s => (
                            <a key={s} href="#" className="u-label" style={{ fontSize: "0.55rem" }}>{s}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </main>
    );
}
