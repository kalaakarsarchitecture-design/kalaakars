"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
                {[["HOME", "/"], ["STUDIO", "/studio"], ["PROCESS", "/process"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: dark ? "rgba(255,255,255,0.7)" : "#999" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function ProjectsClient({ initialProjects, settings }: { initialProjects: any[]; settings?: any }) {
    const [filter, setFilter] = useState("ALL");
    const isMobile = useIsMobile();

    const categories = ["ALL", ...new Set(initialProjects.map(p => p.category))];
    const filtered = filter === "ALL" ? initialProjects : initialProjects.filter(p => p.category === filter);

    return (
        <main style={{ background: "#fff", color: "#111", minHeight: "100vh" }}>
            <Navbar />
            
            {/* Header */}
            <section style={{ padding: isMobile ? "120px 20px 60px" : "180px 40px 100px", borderBottom: "1px solid #eee" }}>
                <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--accent)", marginBottom: "24px" }}
                >
                    EXTENDED ARCHIVE
                </motion.p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(3.5rem, 8vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.85 }}>
                    Selected Works<br />& Interventions.
                </h1>
            </section>

            {/* Filter */}
            <div style={{ position: "sticky", top: "70px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", zIndex: 100, padding: "20px 40px" }}>
                <div style={{ display: "flex", gap: "32px", overflowX: "auto", paddingBottom: "4px" }}>
                    {categories.map(c => (
                        <button 
                            key={c}
                            onClick={() => setFilter(c)}
                            style={{ 
                                background: "none", border: "none", padding: 0, 
                                fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em",
                                color: filter === c ? "var(--accent)" : "#999", cursor: "pointer",
                                borderBottom: filter === c ? "1px solid var(--accent)" : "1px solid transparent",
                                transition: "all 0.3s"
                            }}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <section style={{ padding: isMobile ? "20px" : "80px 40px" }}>
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
                    gap: isMobile ? "40px" : "100px 60px" 
                }}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p, i) => {
                            const isFeatured = !isMobile && i % 3 === 0; // Every 3rd project is featured (wider/different)
                            return (
                                <motion.div 
                                    key={p.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                                    style={{ 
                                        gridColumn: isFeatured ? "1 / -1" : "auto",
                                        maxWidth: isFeatured ? "1000px" : "100%",
                                        margin: isFeatured ? "0 auto" : "0"
                                    }}
                                >
                                    <Link href={`/projects/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                                        <div style={{ 
                                            position: "relative",
                                            background: "#f9f9f9",
                                            border: "1px solid #eee", // Architectural Frame
                                            padding: isFeatured ? "16px" : "10px",
                                            marginBottom: "28px",
                                            overflow: "hidden"
                                        }}>
                                            <div style={{ 
                                                aspectRatio: isFeatured ? "21/9" : "4/5", // Adaptive Dimensions
                                                overflow: "hidden" 
                                            }}>
                                                <motion.img 
                                                    whileHover={{ scale: 1.04 }}
                                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                                    src={p.heroImg} 
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                                />
                                            </div>
                                            {/* Technical Tag */}
                                            <div style={{ 
                                                position: "absolute", bottom: "24px", right: "24px", 
                                                fontFamily: "var(--font-mono)", fontSize: "0.5rem", 
                                                color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em",
                                                pointerEvents: "none"
                                            }}>
                                                REF-{p.num}
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div>
                                                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: isFeatured ? "2rem" : "1.4rem", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                                                    {(p.title || "Untitled Project").split(" ").map((w: any) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                                                </h3>
                                                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999", letterSpacing: "0.1em" }}>{p.location} · {p.year}</p>
                                                    <span style={{ width: "30px", height: "1px", background: "#eee" }} />
                                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--accent)", letterSpacing: "0.1em" }}>{p.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>

            {/* Upcoming Section */}
            <section style={{ padding: isMobile ? "80px 20px" : "120px 40px", background: "#0c0c0c", color: "#fff" }}>
                <p className="u-label" style={{ color: "var(--accent)", marginBottom: "48px" }}>Future Narrative</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "60px" }}>
                    {[
                        { title: "Coastal Research Lab", loc: "Kannur", year: "2025" },
                        { title: "Boutique Wellness Retreat", loc: "Wayanad", year: "2025" },
                        { title: "Public Plaza Intervention", loc: "Calicut", year: "2026" },
                    ].map((u, i) => (
                        <div key={i} style={{ opacity: 0.8 }}>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>UPCOMING · {u.year}</p>
                            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.02em" }}>{u.title}</h3>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--accent)", marginTop: "8px" }}>{u.loc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ padding: "80px 40px", borderTop: "1px solid #eee", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#999", marginBottom: "16px" }}>© 2026 {settings?.companyName || "KALAAKARS ARCHITECTURE STUDIO"}</p>
                <Link href="/" className="u-label">Back to Workspace</Link>
            </footer>
        </main>
    );
}
