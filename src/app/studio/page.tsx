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
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: c, textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"], ["INDEX", "/index"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: dark ? "rgba(255,255,255,0.7)" : "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function StudioPage() {
    const isMobile = useIsMobile();
    const pad = isMobile ? "72px 20px" : "140px 40px";
    const padS = isMobile ? "60px 20px" : "120px 40px";

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)" }}>
            {/* Hero */}
            <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar dark />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2400&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
                <div style={{ position: "absolute", bottom: isMobile ? "40px" : "60px", left: isMobile ? "20px" : "40px", color: "#fff" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", opacity: 0.7, marginBottom: "14px" }}>
                        Calicut (Kozhikode), Kerala — Est. 2019
                    </p>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.5rem, 10vw, 7.5rem)", letterSpacing: "-0.04em", lineHeight: 0.85 }}>
                        ROOTED IN<br />TRADITION,<br />BUILT FOR<br />THE FUTURE
                    </h1>
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
                        style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: isMobile ? "1.4rem" : "2.2rem", lineHeight: 1.3, letterSpacing: "-0.03em" }}
                    >
                        Kalaakars is an architectural practice based in Calicut, working at the intersection of Kerala's spatial legacy and <span style={{ color: "var(--accent)" }}>contemporary structural modularity.</span>
                    </motion.p>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "40px", marginTop: "64px" }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "#666" }}>
                           Our approach is climate-responsive, choosing materials that age gracefully with the Kerala monsoon. We believe light is a building material as significant as brick or timber.
                        </p>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "#666" }}>
                           The Malabar coast provides our context — its trade history, its tropical abundance, and its unique vernacular language which we translate for the 21st century.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section style={{ padding: padS, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "64px" }}>Milestones</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {[
                        { year: "2019", event: "Studio founded in Kozhikode." },
                        { year: "2020", event: "First coastal residential project completed." },
                        { year: "2021", event: "Recipient of the Malabar Design Award for Sustainability." },
                        { year: "2022", event: "Expansion into Kochi and Wayanad." },
                        { year: "2023", event: "Winner of the Kerala State Architecture Prize." },
                        { year: "2024", event: "Opening of the SM Street Research Lab." },
                    ].map((m, i) => (
                        <div key={m.year} style={{ display: "flex", padding: "32px 0", borderTop: "1px solid var(--border)", alignItems: "baseline" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", width: "120px", color: "var(--accent)" }}>{m.year}</span>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", letterSpacing: "-0.01em" }}>{m.event}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section style={{ padding: padS, borderBottom: "1px solid var(--border)", background: "#fafafa" }}>
                <p className="u-label" style={{ marginBottom: "64px" }}>Services</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "64px" }}>
                    {[
                        { title: "Residential", desc: "Private villas, coastal retreats and heritage Nalukettu restorations." },
                        { title: "Commercial", desc: "Boutique hotels, office hubs and responsive retail spaces." },
                        { title: "Landscape", desc: "Monsoon-ready gardens, urban ecosystems and tropical courtyards." },
                        { title: "Interior Architecture", desc: "Bespoke furniture and climate-aligned interior systems." },
                        { title: "Urban Research", desc: "Public space studies and cultural heritage mapping." },
                        { title: "Masterplanning", desc: "Sustainable developments and large-scale land strategies." },
                    ].map(s => (
                        <div key={s.title}>
                             <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                             <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", lineHeight: 1.6, color: "#666" }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: padS, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: isMobile ? "40px" : "72px" }}>The Team</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: isMobile ? "24px" : "40px" }}>
                    {[
                        { name: "Ar. Vishal Sharma", role: "Founding Principal", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" },
                        { name: "Ar. Ayaan Kapoor", role: "Design Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" },
                        { name: "Ar. Priya Mehta", role: "Project Architect", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800" },
                    ].map(m => (
                        <div key={m.name}>
                            <div style={{ aspectRatio: "4/5", overflow: "hidden", marginBottom: "20px", background: "#f0f0f0" }}>
                                <motion.img 
                                    whileHover={{ scale: 1.05 }} 
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                                    src={m.img} 
                                    alt={m.name} 
                                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.9)" }} 
                                />
                            </div>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1rem" }}>{m.name}</p>
                            <p className="u-label" style={{ marginTop: "4px", fontSize: "0.5rem" }}>{m.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" style={{ padding: padS }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: "64px" }}>
                    <div>
                        <p className="u-label" style={{ marginBottom: "24px" }}>Inquiries</p>
                        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "2.4rem", letterSpacing: "-0.04em", marginBottom: "16px" }}>Let's build something honest.</h2>
                        <p style={{ fontFamily: "var(--font-sans)", color: "#666", lineHeight: 1.7 }}>Whether it's a private home or a cultural landmark, we bring the same Malabar precision to every scale.</p>
                    </div>
                    <form style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Full Name</label>
                                <input type="text" placeholder="Your name" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem" }} />
                            </div>
                            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                                <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Email Address</label>
                                <input type="email" placeholder="hello@example.com" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem" }} />
                            </div>
                        </div>
                        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                            <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Project Type</label>
                            <select style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem", appearance: "none", cursor: "pointer" }}>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Interior</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                            <label className="u-label" style={{ color: "#bbb", marginBottom: "8px", display: "block" }}>Message</label>
                            <textarea rows={4} placeholder="Tell us about your project" style={{ width: "100%", background: "none", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: "1.1rem", resize: "none" }} />
                        </div>
                        <button type="submit" style={{ padding: "18px 32px", background: "var(--fg)", color: "var(--bg)", border: "none", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", width: isMobile ? "100%" : "240px", marginTop: "16px" }}>
                            SEND INQUIRY
                        </button>
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

