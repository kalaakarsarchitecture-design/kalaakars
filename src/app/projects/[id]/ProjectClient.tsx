"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.2rem", color: "#fff" }}>Kalaakars</span>
            </Link>
            <nav style={{ display: "flex", gap: "24px" }}>
                {[["PROJECTS", "/projects"], ["STUDIO", "/studio"], ["JOURNAL", "/journal"]].map(([l, h]) => (
                    <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)" }}>{l}</Link>
                ))}
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer style={{ padding: "60px 24px 40px", borderTop: "1px solid #EBEBEB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "12px" }}>
                <span className="u-label">© 2026 Kalaakars Architecture Studio</span>
                <div style={{ display: "flex", gap: "28px" }}>
                    {["Instagram", "LinkedIn"].map(s => (
                        <a key={s} href="#" className="u-mono" style={{ color: "#AAA" }}>{s}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

function GalleryImg({ src, height }: { src: string; height: string }) {
    return (
        <div style={{ height, overflow: "hidden" }}>
            <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src={src}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function ProjectClient({ project, nextProject }: { project: any, nextProject: any }) {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [selectedImg, setSelectedImg] = React.useState<string | null>(null);

    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, isMobile ? 120 : 250]);
    const heroOpacity = useTransform(scrollY, [0, 700], [1, 0.2]);

    if (!project) return <div style={{ padding: "200px 24px" }}>Project not found.</div>;

    const pad = isMobile ? "64px 20px" : "120px 40px";

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)" }}>
            {/* Scroll Progress */}
            <motion.div
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, height: "3px",
                    background: "var(--accent)", transformOrigin: "0%", zIndex: 10000,
                    scaleX: scrollYProgress
                }}
            />

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}
                    >
                        <motion.img 
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                            src={selectedImg} alt="Lightbox" 
                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                        />
                        <button style={{ position: "absolute", top: "40px", right: "40px", background: "none", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer" }}>✕</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. HERO */}
            <section ref={heroRef} style={{ height: isMobile ? "75vh" : "100vh", position: "relative", overflow: "hidden" }}>
                <Navbar />
                <motion.div
                    style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${project.heroImg})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        y: heroY, opacity: heroOpacity, willChange: "transform",
                    }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: isMobile ? "28px" : "60px", left: isMobile ? "20px" : "40px", right: isMobile ? "20px" : "40px", color: "#fff" }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--accent)", marginBottom: "16px" }}>
                        {project.category} · {project.location} · {project.year}
                    </motion.p>
                    <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3.5rem, 10vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.82, textTransform: "uppercase" }}>
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* 2. NARRATIVE (Concept + Story) */}
            <section style={{ padding: pad, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "48px" : "120px", borderBottom: "1px solid var(--border)" }}>
                <div>
                    <Reveal>
                        <p className="u-label" style={{ marginBottom: "24px" }}>The Concept</p>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: isMobile ? "2rem" : "3.2rem", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--fg)" }}>
                            {project.subtitle}
                        </h2>
                    </Reveal>
                </div>
                <div>
                    <Reveal delay={0.2}>
                         <p className="u-label" style={{ marginBottom: "24px" }}>Project Story</p>
                        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.7, color: "#555" }}>
                            {project.story}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 3. ADAPTIVE MASONRY GALLERY */}
            <section style={{ 
                padding: isMobile ? "20px" : "60px 40px", 
                background: "#0c0c0c",
            }}>
                <div style={{ 
                    columnCount: isMobile ? 1 : 2, 
                    columnGap: isMobile ? "20px" : "40px",
                }}>
                    {project.gallery.map((img: { src: string; span?: string }, i: number) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setSelectedImg(img.src)} 
                            style={{ 
                                cursor: "zoom-in", 
                                marginBottom: isMobile ? "20px" : "40px",
                                breakInside: "avoid",
                                position: "relative",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.08)", // Blueprint Frame
                                padding: "8px", // Inset frame effect
                                background: "#111"
                            }}
                        >
                            <img 
                                src={img.src} 
                                alt="" 
                                style={{ 
                                    width: "100%", 
                                    height: "auto", 
                                    display: "block",
                                    objectFit: "cover",
                                    transition: "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)"
                                }} 
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            />
                            {/* Technical Frame Detail */}
                            <div style={{ 
                                position: "absolute", 
                                bottom: "16px", 
                                right: "16px", 
                                fontFamily: "var(--font-mono)", 
                                fontSize: "0.5rem", 
                                color: "var(--accent)", 
                                opacity: 0.5,
                                letterSpacing: "0.1em"
                            }}>
                                [ ARCH-IMG-{i + 1} ]
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. PULL QUOTE */}
            {project.pullQuote && (
                <section style={{ padding: pad, textAlign: "center", borderTop: "1px solid var(--border)" }}>
                    <Reveal>
                        <blockquote style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: isMobile ? "1.6rem" : "3.5rem", letterSpacing: "-0.05em", lineHeight: 1.1, maxWidth: "1000px", margin: "0 auto" }}>
                            "<span style={{ color: "var(--accent)" }}>{project.pullQuote}</span>"
                        </blockquote>
                    </Reveal>
                </section>
            )}

            {/* 5. SPECS */}
            <section style={{ padding: pad, borderTop: "1px solid var(--border)", background: "#fafafa" }}>
                <p className="u-label" style={{ marginBottom: "60px" }}>Specifications</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "32px 20px" : "60px" }}>
                    {project.specs.map((spec: any) => (
                        <div key={spec.label}>
                            <p className="u-label" style={{ marginBottom: "12px", color: "#bbb" }}>{spec.label}</p>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.05rem" }}>{spec.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. NEXT PROJECT (Kinetic Section) */}
            <section
                onClick={() => router.push(`/projects/${nextProject.slug}`)}
                style={{ position: "relative", height: isMobile ? "60vh" : "90vh", cursor: "pointer", overflow: "hidden", background: "#000" }}
            >
                <motion.div
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0, backgroundImage: `url(${nextProject.heroImg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6 }}
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "40px" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", marginBottom: "32px", color: "var(--accent)" }}>RELATIONAL WORKS</p>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(3.5rem, 8vw, 9rem)", letterSpacing: "-0.04em", textAlign: "center" as const, lineHeight: 0.85, textTransform: "uppercase" }}>
                        {nextProject.title}
                    </h2>
                    <div style={{ marginTop: "48px", width: "1px", height: "80px", background: "#fff" }} />
                </div>
            </section>

            <Footer />
        </main>
    );
}

