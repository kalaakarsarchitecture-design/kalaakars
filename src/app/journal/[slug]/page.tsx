"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { journalPosts } from "@/lib/journal-data";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.2rem", color: "var(--fg)" }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"], ["JOURNAL", "/journal"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#666" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

export default function JournalPostPage() {
    const params = useParams();
    const isMobile = useIsMobile();
    const post = journalPosts.find(p => p.slug === params.slug);

    if (!post) return <div style={{ padding: "100px", textAlign: "center" }}>Post not found.</div>;

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Image */}
            <section style={{ padding: isMobile ? "90px 0 40px" : "120px 0 80px" }}>
                <div style={{ padding: isMobile ? "0 20px" : "0 80px", marginBottom: "40px" }}>
                    <p className="u-label" style={{ color: "var(--accent)", marginBottom: "20px" }}>{post.category} — {post.date}</p>
                    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 0.9, maxWidth: "1000px" }}>
                        {post.title}
                    </h1>
                </div>
                
                <div style={{ height: "70vh", overflow: "hidden", margin: isMobile ? "0" : "0 40px", position: "relative" }}>
                     <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "var(--ease-expo)" }}
                        src={post.image} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: isMobile ? "40px 20px 100px" : "80px 40px 150px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: "100px" }}>
                <aside style={{ position: "sticky", top: "120px", height: "fit-content" }}>
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "#888", marginBottom: "32px", fontStyle: "italic", lineHeight: 1.4 }}>
                        "{post.summary}"
                    </p>
                    <div style={{ borderTop: "1px solid #eee", paddingTop: "24px" }}>
                         <p className="u-label" style={{ marginBottom: "12px" }}>Share</p>
                         <div style={{ display: "flex", gap: "20px" }}>
                             {["Twitter", "FB", "Email"].map(s => <span key={s} style={{ color: "#999", fontSize: "0.7rem", fontFamily: "var(--font-mono)" }}>{s.toUpperCase()}</span>)}
                         </div>
                    </div>
                </aside>

                <article 
                    style={{ 
                        fontFamily: "var(--font-sans)", 
                        fontSize: "1.25rem", 
                        lineHeight: 1.8, 
                        color: "#333",
                        maxWidth: "800px"
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </section>

            {/* Next Post CTA */}
            <section style={{ padding: "100px 40px", borderTop: "1px solid #eee", textAlign: "center", background: "#fdfdfd" }}>
                 <p className="u-label" style={{ marginBottom: "24px" }}>Continue Reading</p>
                 <Link href="/journal" style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#111", textDecoration: "none", borderBottom: "1px solid #111" }}>View More Thoughts ↗</Link>
            </section>

            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#bbb" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</p>
            </footer>
        </main>
    );
}
