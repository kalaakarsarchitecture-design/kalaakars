"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <motion.img 
                src="/logo.svg" 
                alt="Logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "40px", marginBottom: "32px", filter: "grayscale(100%)" }}
            />
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "1px", background: "var(--accent)" }}
            />
            <p style={{ marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#bbb", textTransform: "uppercase" }}>
                Kalaakars
            </p>
        </div>
    );
}

