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

export default function JournalPage() {
    const isMobile = useIsMobile();
    const pad = isMobile ? "120px 20px 60px" : "180px 40px 100px";

    const posts = [
        {
            title: "Laterite: The Red Earth of Malabar",
            date: "Oct 12, 2024",
            summary: "Exploring the geological and architectural significance of laterite stone in Kerala's coastal climate.",
            image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30eb2?q=80&w=1200",
            category: "Materiality"
        },
        {
            title: "Designing for the Silent Monsoon",
            date: "Sep 28, 2024",
            summary: "How typography and vertical voids can manage heavy rainfall while maintaining thermal comfort.",
            image: "https://images.unsplash.com/photo-1518107594022-4a00af80bc51?q=80&w=1200",
            category: "Climate"
        },
        {
            title: "The Nalukettu: A Modular Blueprint",
            date: "Aug 15, 2024",
            summary: "Deconstructing the traditional courtyard house to inform contemporary collective living.",
            image: "https://images.unsplash.com/photo-1600607687940-467f4b63528b?q=80&w=1200",
            category: "Research"
        }
    ];

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />
            
            {/* Header */}
            <section style={{ padding: pad, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "24px", color: "var(--accent)" }}>The Studio Journal</p>
                <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(2.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
                    THOUGHTS ON<br />SPACE & PLACE
                </h1>
            </section>

            {/* Posts Grid */}
            <section style={{ padding: isMobile ? "60px 20px" : "100px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "100px 60px" }}>
                    {posts.map((post, i) => (
                        <motion.div 
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "var(--ease-expo)" }}
                        >
                            <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "32px", background: "#f0f0f0" }}>
                                <motion.img 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.2, ease: "var(--ease-expo)" }}
                                    src={post.image} alt={post.title} 
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                />
                            </div>
                            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                                <span className="u-label" style={{ color: "var(--accent)" }}>{post.category}</span>
                                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ddd" }} />
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999" }}>{post.date}</span>
                            </div>
                            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "2rem", fontWeight: 400, marginBottom: "20px", letterSpacing: "-0.02em" }}>{post.title}</h2>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.6, color: "#666", maxWidth: "480px" }}>{post.summary}</p>
                            <Link href="#" style={{ display: "inline-block", marginTop: "32px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", borderBottom: "1px solid var(--accent)", paddingBottom: "4px" }}>READ ESSAY ↗</Link>
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
