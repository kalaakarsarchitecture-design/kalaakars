"use client";
import React from "react";
import Link from "next/link";
import { useIsMobile } from "@/lib/useIsMobile";

function Navbar() {
    return (
        <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <img src="/logo.svg" alt="K" style={{ width: "22px", height: "26px", objectFit: "contain" }} />
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.2rem", color: "var(--fg)" }}>Kalaakars</span>
            </Link>
        </header>
    );
}

export default function LegalPage() {
    const isMobile = useIsMobile();

    return (
        <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
            <Navbar />
            
            <section style={{ padding: isMobile ? "120px 20px" : "180px 40px", maxWidth: "800px" }}>
                <p className="u-label" style={{ color: "var(--accent)", marginBottom: "32px" }}>Legal & Compliance</p>
                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "4rem", marginBottom: "60px", letterSpacing: "-0.04em" }}>Privacy Policy</h1>
                
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.8, color: "#555" }}>
                    <h2 style={{ color: "#111", fontSize: "1.5rem", marginTop: "40px", marginBottom: "20px" }}>1. Data Collection</h2>
                    <p>At Kalaakars Architecture Studio, we respect your privacy. We only collect personal information that you voluntarily provide to us through our contact form—such as your name, email, and project details.</p>
                    
                    <h2 style={{ color: "#111", fontSize: "1.5rem", marginTop: "40px", marginBottom: "20px" }}>2. Use of Information</h2>
                    <p>The information collected is strictly used to communicate with you regarding your architectural inquiries. We do not sell, trade, or otherwise transfer your data to outside parties.</p>

                    <h2 style={{ color: "#111", fontSize: "1.5rem", marginTop: "40px", marginBottom: "20px" }}>3. Intellectual Property</h2>
                    <p>All architectural designs, sketches, and photographs displayed on this website are the intellectual property of Kalaakars Architecture Studio. Unauthorised use or reproduction is strictly prohibited.</p>
                    
                    <h2 style={{ color: "#111", fontSize: "1.5rem", marginTop: "40px", marginBottom: "20px" }}>4. Contact</h2>
                    <p>If you have any questions regarding this policy, please contact us at hello@kalaakars.in.</p>
                </div>
            </section>

            <footer style={{ padding: "80px 40px 60px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#bbb" }}>© 2024 KALAAKARS ARCHITECTURE STUDIO</p>
            </footer>
        </main>
    );
}
