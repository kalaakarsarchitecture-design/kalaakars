"use client";
import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
    text: string;
    reverse?: boolean;
}

export const Marquee = ({ text, reverse = false }: MarqueeProps) => {
    return (
        <div style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "28px 0",
            background: "var(--bg)",
            position: "relative",
            zIndex: 5,
        }}>
            <motion.div
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ display: "flex", width: "fit-content" }}
            >
                {/* Reduced from 8 to 4 duplicates — fewer DOM nodes, same visual */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} style={{ display: "flex", gap: "60px", alignItems: "center", paddingRight: "60px" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                                color: "var(--fg)",
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                                whiteSpace: "nowrap",
                                textTransform: "uppercase",
                            }}
                        >
                            {text}
                        </span>
                        <span style={{ color: "var(--accent)", fontSize: "1rem", opacity: 0.5 }}>✦</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
