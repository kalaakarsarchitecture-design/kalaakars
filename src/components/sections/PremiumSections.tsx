"use client";
import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useInteractions";

/* Stats / Numbers Section — animated counters */
export function StatsSection({ settings }: { settings?: any }) {
  const ref = useScrollReveal(0.2);
  const stats = [
    { value: settings?.yearsExp || "8", suffix: "+", label: "Years of Excellence" },
    { value: "50", suffix: "+", label: "Projects Delivered" },
    { value: "100", suffix: "%", label: "Client Satisfaction" },
    { value: "12", suffix: "+", label: "Design Awards" },
  ];

  return (
    <section ref={ref} className="reveal" style={{
      padding: "0", background: "var(--bg)",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "48px 32px", textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-serif)", fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1,
                color: "var(--accent)", marginBottom: "12px",
              }}
            >
              {s.value}<span style={{ fontSize: "0.6em", fontWeight: 300 }}>{s.suffix}</span>
            </motion.p>
            <p className="u-label" style={{ fontSize: "0.5rem" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Credo / Philosophy Section — dark full-bleed */
export function CredoSection({ isMobile }: { isMobile: boolean }) {
  const ref = useScrollReveal(0.15);

  return (
    <section ref={ref} className="reveal" style={{
      padding: isMobile ? "100px 24px" : "160px 40px", background: "#0c0c0c",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p className="u-accent-label" style={{ marginBottom: "40px" }}>The Studio Philosophy</p>
        <p style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(2.4rem, 7vw, 6rem)",
          letterSpacing: "-0.03em", lineHeight: 0.95,
          color: "#fff", maxWidth: "1200px",
        }}>
          Mastering the balance of{" "}
          <span style={{ color: "var(--accent)" }}>Style, Comfort & Function.</span>{" "}
          Crafting timeless resort environments with Malabar precision.
        </p>
        <div style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.3em", textTransform: "uppercase",
          }}>
            Architects of the Kerala Coast
          </span>
        </div>
      </div>
    </section>
  );
}

/* FAQ Section */
export function FAQSection({ isMobile }: { isMobile: boolean }) {
  const ref = useScrollReveal(0.1);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const faqs = [
    { q: "What types of projects do you specialize in?", a: "We specialize in both modern and classic resort projects, premium residential villas, and boutique commercial spaces. Our core expertise lies in high-precision craftwork interiors." },
    { q: "How long does a typical project take?", a: "Architectural timelines vary by scale, but typically a residential project takes 12–18 months from concept to handover, while resort projects may take 18–24 months." },
    { q: "Do you handle interior design as well?", a: "Yes, we focus on 'Craftwork Interiors' where the architecture and interior flow are designed as a single cohesive narrative. We manage everything from spatial layout to bespoke furniture." },
    { q: "Do you work outside of Malappuram and Kerala?", a: "While our studio is rooted in Areekode, we undertake projects across South India, especially in regions that allow for climate-responsive and tropical architectural interventions." },
  ];

  return (
    <section ref={ref} className="reveal" id="faq" style={{
      padding: isMobile ? "100px 24px" : "160px 40px",
      background: "#fff", borderTop: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
        gap: isMobile ? "60px" : "100px",
      }}>
        <div>
          <p className="u-accent-label" style={{ marginBottom: "24px" }}>Guidance</p>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            letterSpacing: "-0.03em", lineHeight: 1,
          }}>
            Frequent{isMobile ? " " : <br />}Inquiries
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eee" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: isMobile ? "28px 0" : "36px 0", cursor: "pointer",
                  textAlign: "left", gap: "20px",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-serif)", fontSize: isMobile ? "1.3rem" : "1.8rem",
                  color: openIdx === i ? "var(--accent)" : "var(--fg)",
                  transition: "color 0.4s", lineHeight: 1.3, flex: 1,
                }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  style={{ fontSize: isMobile ? "1.3rem" : "1.6rem", fontWeight: 300, color: "var(--fg)", flexShrink: 0 }}
                >
                  +
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIdx === i ? "auto" : 0,
                  opacity: openIdx === i ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: isMobile ? "0.95rem" : "1.1rem",
                  lineHeight: 1.8, color: "#666", paddingBottom: "36px", maxWidth: "650px",
                }}>
                  {faq.a}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Premium Footer */
export function FooterSection({ isMobile, settings }: { isMobile: boolean; settings?: any }) {
  const ref = useScrollReveal(0.1);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="reveal" id="contact" style={{
      padding: isMobile ? "100px 24px 60px" : "160px 40px 80px",
      borderTop: "1px solid var(--border)", background: "var(--bg-subtle)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1.2fr 1fr",
          gap: isMobile ? "60px" : "120px", marginBottom: "100px",
        }}>
          {/* Newsletter */}
          <div>
            <p className="u-label" style={{ marginBottom: "32px" }}>Newsletter</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", marginBottom: "32px", color: "var(--fg)" }}>
              Subscribe to our journal on Kerala architecture.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{
              display: "flex", borderBottom: "1.5px solid var(--fg)", paddingBottom: "12px", maxWidth: "500px",
            }}>
              <input type="email" placeholder="Your email address" style={{
                flex: 1, background: "none", border: "none", color: "var(--fg)",
                fontFamily: "var(--font-sans)", fontSize: "1rem", outline: "none",
              }} />
              <button type="submit" style={{
                background: "none", border: "none", color: "var(--fg)",
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
              }}>
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <p className="u-label" style={{ marginBottom: "24px" }}>Connect</p>
            <a href={`mailto:${settings?.email || "kalaakaarsarchitecture@gmail.com"}`}
              className="link-underline"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", display: "block", marginBottom: "12px" }}>
              {settings?.email || "kalaakaarsarchitecture@gmail.com"}
            </a>
            <a href={`tel:${settings?.phone || "+917306358793"}`}
              style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", display: "block", color: "var(--accent)", fontWeight: 500 }}>
              {settings?.phone || "+91 7306358793"}
            </a>
          </div>

          {/* Studio */}
          <div>
            <p className="u-label" style={{ marginBottom: "24px" }}>Studio</p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {settings?.address || "Opposite Hill Fort Auditorium Gate\nPathanapuram, Areekode\nMalappuram, Kerala"}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)", marginTop: "16px", letterSpacing: "0.1em" }}>
              {settings?.yearsExp || "8"} YEARS OF EXCELLENCE
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexDirection: isMobile ? "column" : "row", gap: "24px",
          paddingTop: "48px", borderTop: "1px solid var(--border)",
        }}>
          <span className="u-label" style={{ fontSize: "0.5rem", letterSpacing: "0.2em" }}>
            © {year} KALAAKARS ARCHITECTURE STUDIO
          </span>
          <div style={{ display: "flex", gap: "32px" }}>
            <a href="#faq" className="u-label link-underline" style={{ color: "var(--fg-subtle)", fontSize: "0.5rem" }}>FAQ</a>
            <a href="https://instagram.com/kalaakaars_architecture" target="_blank" rel="noopener" className="u-label link-underline" style={{ color: "var(--fg-subtle)", fontSize: "0.5rem" }}>Instagram</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="u-label" style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.5rem" }}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
