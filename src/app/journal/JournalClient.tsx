"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { Logo } from "@/components/ui/Logo";

function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`premium-nav ${scrolled ? "nav-scrolled" : "nav-transparent"}`}
            style={!scrolled ? { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" } : undefined}
        >
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <Logo size={22} color="#111" />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.18em", color: "var(--fg)", textTransform: "uppercase" as const }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"]].map(([l, h]) => (
                    <Link key={l} href={h} className="link-underline" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#666" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function JournalClient({ initialPosts, settings }: { initialPosts: any[]; settings?: any }) {
    const isMobile = useIsMobile();
    const pad = isMobile ? "120px 20px 60px" : "180px 40px 100px";

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />
            
            {/* Header */}
            <section style={{ padding: pad, borderBottom: "1px solid var(--border)" }}>
                <p className="u-label" style={{ marginBottom: "24px", color: "var(--accent)" }}>The Studio Journal</p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.85 }}>
                    Thoughts on<br />Space & Place
                </h1>
            </section>

            {/* Posts Grid */}
            <section style={{ padding: isMobile ? "60px 20px" : "100px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "100px 60px" }}>
                    {initialPosts.map((post, i) => (
                        <motion.div 
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "32px", background: "#f0f0f0" }}>
                                    <motion.img 
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        src={post.image} alt={post.title} 
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                    />
                                </div>
                                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                                    <span className="u-label" style={{ color: "var(--accent)" }}>{post.category}</span>
                                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ddd" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999" }}>{post.date}</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{post.title}</h2>
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.6, color: "#666", maxWidth: "480px" }}>{post.summary}</p>
                                <span style={{ display: "inline-block", marginTop: "32px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", borderBottom: "1px solid var(--accent)", paddingBottom: "4px" }}>READ ESSAY ↗</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#bbb" }}>© 2026 {settings?.companyName || "KALAAKARS ARCHITECTURE STUDIO"}</p>
                <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "24px" }}>
                    <a href={`mailto:${settings?.email}`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999" }}>EMAIL</a>
                    <a href={`tel:${settings?.phone}`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#999" }}>PHONE</a>
                </div>
            </footer>
        </main>
    );
}
