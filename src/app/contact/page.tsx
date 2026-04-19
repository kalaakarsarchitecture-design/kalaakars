"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.2rem", color: "var(--fg)" }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#666" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function ContactPage() {
    const isMobile = useIsMobile();

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />
            
            <section style={{ padding: isMobile ? "120px 20px 60px" : "180px 40px 100px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: "100px" }}>
                <div>
                    <p className="u-label" style={{ color: "var(--accent)", marginBottom: "24px" }}>Collaborations</p>
                    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3.5rem, 8vw, 7.5rem)", letterSpacing: "-0.04em", lineHeight: 0.85, marginBottom: "48px" }}>
                        Let's build<br />something<br />timeless.
                    </h1>
                    
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "48px" }}>
                        <div>
                            <p className="u-label" style={{ marginBottom: "16px" }}>New Inquiries</p>
                            <a href="mailto:kalaakaarsarchitecture@gmail.com" style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--fg)", borderBottom: "1px solid var(--accent)", paddingBottom: "4px" }}>kalaakaarsarchitecture@gmail.com</a>
                            <a href="tel:+917306358793" style={{ display: "block", marginTop: "12px", fontFamily: "var(--font-sans)", fontSize: "1.2rem", color: "var(--accent)" }}>📞 +91 7306358793</a>
                        </div>
                        <div>
                            <p className="u-label" style={{ marginBottom: "16px" }}>Studio Address</p>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", lineHeight: 1.6, color: "#666" }}>
                                Opposite Hill Fort Auditorium Gate<br />Pathanapuram, Areekode<br />Malappuram, Kerala
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: "80px" }}>
                        <p className="u-label" style={{ marginBottom: "32px" }}>Follow our journey</p>
                        <div style={{ display: "flex", gap: "32px" }}>
                            {["Instagram", "LinkedIn", "Behance"].map(s => (
                                <a key={s} href="#" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#111" }}>{s.toUpperCase()}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ background: "#f9f9f9", padding: isMobile ? "40px 24px" : "60px", borderRadius: "4px" }}>
                    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="u-label">Full Name</label>
                            <input type="text" placeholder="Your Name" style={{ background: "none", border: "none", borderBottom: "1px solid #ddd", padding: "12px 0", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="u-label">Email Address</label>
                            <input type="email" placeholder="example@studio.com" style={{ background: "none", border: "none", borderBottom: "1px solid #ddd", padding: "12px 0", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="u-label">Project Type</label>
                            <select style={{ background: "none", border: "none", borderBottom: "1px solid #ddd", padding: "12px 0", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none", appearance: "none" }}>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Cultural</option>
                                <option>Other Inquiry</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="u-label">Message</label>
                            <textarea rows={4} placeholder="Tell us about your vision..." style={{ background: "none", border: "none", borderBottom: "1px solid #ddd", padding: "12px 0", fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none", resize: "none" }} />
                        </div>
                        <button type="submit" style={{ background: "#111", color: "#fff", border: "none", padding: "18px", borderRadius: "100px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", cursor: "pointer", marginTop: "20px" }}>
                            SEND INQUIRY ↗
                        </button>
                    </form>
                </div>
            </section>

            {/* Visual spacer / Map placeholder */}
            <section style={{ height: "60vh", background: "#eee", margin: "0 40px 40px", position: "relative", overflow: "hidden" }}>
                 <div style={{ position: "absolute", inset: 0, background: "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000) center/cover" }} />
                 <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.1)" }} />
            </section>

            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#bbb" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</p>
            </footer>
        </main>
    );
}
