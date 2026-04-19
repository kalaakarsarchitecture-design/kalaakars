"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { SiteNavbar } from "@/components/ui/MobileNav";

export default function JournalClient({ initialPosts, settings }: { initialPosts: any[]; settings?: any }) {
    const isMobile = useIsMobile();

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <SiteNavbar
                links={[
                    { label: "Home", href: "/" },
                    { label: "Projects", href: "/projects" },
                    { label: "Studio", href: "/studio" },
                    { label: "Journal", href: "/journal" },
                ]}
            />

            {/* Header */}
            <section style={{ padding: isMobile ? "96px 20px 48px" : "160px 40px 80px", borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "20px", color: "var(--accent)" }}>The Studio Journal</p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(2.8rem, 9vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
                    Thoughts on<br />Space &amp; Place
                </h1>
            </section>

            {/* Posts Grid */}
            <section style={{ padding: isMobile ? "48px 20px 80px" : "80px 40px 120px" }}>
                {initialPosts.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 20px", color: "#bbb" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em" }}>COMING SOON</p>
                        <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginTop: "16px", color: "#999" }}>No entries yet.</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "60px" : "80px 60px" }}>
                        {initialPosts.map((post) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                                    <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "24px", background: "#f0f0f0", borderRadius: "2px" }}>
                                        <motion.img
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                            src={post.heroImg || post.image}
                                            alt={post.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
                                        <span className="u-label" style={{ color: "var(--accent)" }}>{post.category}</span>
                                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ddd", flexShrink: 0 }} />
                                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#999" }}>{post.date}</span>
                                    </div>
                                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 400, marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", lineHeight: 1.65, color: "#666" }}>
                                        {post.excerpt || post.summary}
                                    </p>
                                    <span style={{ display: "inline-block", marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.15em", borderBottom: "1px solid var(--accent)", paddingBottom: "4px", color: "var(--accent)" }}>
                                        READ ESSAY ↗
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer style={{ padding: isMobile ? "40px 20px 32px" : "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "#bbb" }}>
                    © 2024 {settings?.companyName || "KALAAKARS ARCHITECTURE STUDIO"}
                </p>
                <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                    <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999" }}>EMAIL</a>
                    <a href={`tel:${settings?.phone || "+917306358793"}`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999" }}>PHONE</a>
                    <Link href="/studio" style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999" }}>STUDIO</Link>
                </div>
            </footer>
        </main>
    );
}

