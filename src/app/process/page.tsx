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
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "var(--fg)", textTransform: "uppercase" }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/"], ["STUDIO", "/studio"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#666" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function ProcessPage() {
    const isMobile = useIsMobile();
    const pad = isMobile ? "120px 20px 60px" : "180px 40px 100px";

    const phases = [
        { 
            step: "01",
            title: "Brief & Discovery", 
            desc: "We begin by listening to the land and the client. This phase involves site analysis, understanding local climate patterns, and defining the core spatial requirements.", 
            duration: "2-4 Weeks"
        },
        { 
            step: "02",
            title: "Concept Design", 
            desc: "Translation of the brief into a spatial narrative. We explore forms, light, and materiality through sketches and physical models.", 
            duration: "4-6 Weeks"
        },
        { 
            step: "03",
            title: "Design Development", 
            desc: "Refining the concept into structural reality. We detail the systems, select specific materials (laterite, timber, stone), and finalize the layout.", 
            duration: "6-8 Weeks"
        },
        { 
            step: "04",
            title: "Documentation", 
            desc: "Preparation of detailed technical drawings for construction. This includes structural engineering and municipal approvals.", 
            duration: "4-6 Weeks"
        },
        { 
            step: "05",
            title: "Construction", 
            desc: "Regular site visits to ensure the design intent is preserved. We work closely with master craftsmen to achieve Malabar precision.", 
            duration: "8-18 Months"
        },
        { 
            step: "06",
            title: "Handover", 
            desc: "The final layer of styling and post-occupancy evaluation. We ensure the building breathes as intended in the Kerala monsoon.", 
            duration: "1 Month"
        },
    ];

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />
            
            {/* Header */}
            <section style={{ padding: pad, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "24px", color: "var(--accent)" }}>The Studio Method</p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.85, maxWidth: "1000px" }}>
                    Translating<br />Vision Into<br />Vital Structure
                </h1>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", fontWeight: 300, color: "#666", marginTop: "48px", maxWidth: "600px", lineHeight: 1.6 }}>
                    Our process is iterative, rigorous, and deeply rooted in the physical reality of the Malabar coast.
                </p>
            </section>

            {/* Phases */}
            <section style={{ padding: isMobile ? "60px 20px" : "100px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "80px 120px" }}>
                    {phases.map((p, i) => (
                        <motion.div 
                            key={p.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "24px" }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)" }}>{p.step}</span>
                                <span className="u-label" style={{ fontSize: "0.5rem", color: "#bbb" }}> Est. {p.duration}</span>
                            </div>
                            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em" }}>{p.title}</h3>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.7, color: "#555" }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#bbb" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</p>
            </footer>
        </main>
    );
}
