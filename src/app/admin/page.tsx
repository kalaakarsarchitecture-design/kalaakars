"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */
interface GalleryImage { src: string; span: "full" | "half"; }
interface Spec { label: string; value: string; }
interface Project {
    id?: string;
    slug: string;
    num: string;
    title: string;
    subtitle: string;
    category: string;
    location: string;
    year: string;
    hero_img: string;
    story: string;
    pull_quote?: string;
    gallery?: GalleryImage[];
    gallery_images?: GalleryImage[];
    specs?: Spec[];
}

interface JournalEntry {
    id?: string;
    slug: string;
    title: string;
    date: string;
    category: string;
    heroImg: string;
    content: string;
    readTime?: string;
    excerpt?: string;
}

interface SiteSettings {
    phone: string;
    email: string;
    address: string;
    yearsExp: string;
    instagram?: string;
    linkedin?: string;
}

const EMPTY_PROJECT: Project = {
    slug: "", num: "", title: "", subtitle: "", category: "", location: "",
    year: new Date().getFullYear().toString(), hero_img: "", story: "", pull_quote: "",
    gallery: [], specs: [],
};

const CATEGORIES = ["RESIDENTIAL", "COMMERCIAL", "CULTURAL", "LANDSCAPE", "HOSPITALITY"];

/* ═══════════════════════════════════════
   IMAGE INPUT  (URL + local upload)
═══════════════════════════════════════ */
function ImageInput({
    value,
    onChange,
    placeholder = "https://…",
    preview = true,
    compact = false,
}: {
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
    preview?: boolean;
    compact?: boolean;
}) {
    const [uploading, setUploading] = useState(false);
    const [tab, setTab] = useState<"url" | "upload">("url");
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const inputStyle: React.CSSProperties = {
        width: "100%", background: "#111",
        border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
        padding: "11px 14px", fontFamily: "var(--font-sans)", fontSize: "0.82rem",
        outline: "none", boxSizing: "border-box",
    };
    const tabBtn = (active: boolean): React.CSSProperties => ({
        padding: compact ? "4px 10px" : "5px 14px",
        background: active ? "rgba(212,165,32,0.15)" : "transparent",
        border: `1px solid ${active ? "rgba(212,165,32,0.4)" : "rgba(255,255,255,0.1)"}`,
        color: active ? "#D4A520" : "rgba(255,255,255,0.4)",
        fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.12em",
        cursor: "pointer",
    });

    const resizeImage = (file: File, maxWidth = 2000): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (maxWidth / width) * height;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas toBlob failed"));
                    }, "image/jpeg", 0.9);
                };
            };
            reader.onerror = reject;
        });
    };

    const upload = async (file: File) => {
        if (!file) return;
        setUploading(true);
        try {
            // Process image: limit dimensions and compress
            const processedBlob = await resizeImage(file);
            const fd = new FormData();
            fd.append("file", processedBlob, "upload.jpg");
            
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const json = await res.json();
            if (json.url) onChange(json.url);
            else alert(json.error ?? "Upload failed");
        } catch (err) {
            console.error("Upload process error:", err);
            alert("Image processing failed");
        }
        setUploading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) upload(f);
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) { setTab("upload"); upload(f); }
    };

    return (
        <div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                <button type="button" onClick={() => setTab("url")} style={tabBtn(tab === "url")}>URL</button>
                <button type="button" onClick={() => setTab("upload")} style={tabBtn(tab === "upload")}>↑ UPLOAD</button>
            </div>

            {tab === "url" ? (
                <input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle}
                />
            ) : (
                <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => !uploading && fileRef.current?.click()}
                    style={{
                        border: `1px dashed ${dragOver ? "#D4A520" : "rgba(255,255,255,0.2)"}`,
                        background: dragOver ? "rgba(212,165,32,0.05)" : "rgba(255,255,255,0.02)",
                        padding: compact ? "14px" : "22px",
                        textAlign: "center", cursor: uploading ? "wait" : "pointer",
                        transition: "border-color 0.2s, background 0.2s",
                    }}
                >
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                    {uploading ? (
                        <div>
                            <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.06)", marginBottom: "10px" }}>
                                <motion.div
                                    animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    style={{ height: "100%", width: "40%", background: "#D4A520" }}
                                />
                            </div>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#D4A520", letterSpacing: "0.15em" }}>UPLOADING…</p>
                        </div>
                    ) : (
                        <>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: compact ? "0.55rem" : "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", marginBottom: "4px" }}>
                                {dragOver ? "DROP TO UPLOAD" : "CLICK OR DRAG & DROP"}
                            </p>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>JPEG · PNG · WEBP · GIF · AVIF · MAX 10 MB</p>
                            {value && !compact && (
                                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "#D4A520", letterSpacing: "0.08em", marginTop: "8px", wordBreak: "break-all" }}>
                                    ✓ {value.split("/").pop()}
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Live preview */}
            {preview && value && !compact && (
                <div style={{ marginTop: "10px", height: "160px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function Toast({ msg, type, onDone }: { msg: string; type: "ok" | "err"; onDone: () => void }) {
    useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
            style={{
                position: "fixed", bottom: "32px", right: "32px", zIndex: 99999,
                background: type === "ok" ? "#1a1a1a" : "#3d0f0f",
                border: `1px solid ${type === "ok" ? "rgba(212,165,32,0.5)" : "rgba(220,50,50,0.5)"}`,
                borderLeft: `3px solid ${type === "ok" ? "#D4A520" : "#dc3232"}`,
                color: "#fff", padding: "14px 22px",
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: "12px", maxWidth: "380px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
        >
            <span style={{ fontSize: "1rem" }}>{type === "ok" ? "✓" : "✕"}</span>
            {msg}
        </motion.div>
    );
}

/* ═══════════════════════════════════════
   DELETE CONFIRM MODAL
═══════════════════════════════════════ */
function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
            onClick={onCancel}
        >
            <motion.div
                initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
                onClick={e => e.stopPropagation()}
                style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.1)", padding: "40px", maxWidth: "420px", width: "100%" }}
            >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#D4A520", marginBottom: "16px" }}>CONFIRM DELETE</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "#fff", marginBottom: "32px", lineHeight: 1.4 }}>
                    Delete <strong>&ldquo;{title}&rdquo;</strong>? This cannot be undone.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={onCancel} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer" }}>CANCEL</button>
                    <button onClick={onConfirm} style={{ flex: 1, padding: "12px", background: "#dc3232", border: "none", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 700 }}>DELETE</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════
   PROJECT FORM (Add / Edit)
═══════════════════════════════════════ */
function ProjectForm({
    initial, onSave, onCancel,
}: {
    initial: Project;
    onSave: (p: Project) => Promise<void>;
    onCancel: () => void;
}) {
    const [form, setForm] = useState<Project>({
        ...initial,
        gallery: initial.gallery_images ?? initial.gallery ?? [],
        specs: initial.specs ?? [],
    });
    const [saving, setSaving] = useState(false);

    const set = (k: keyof Project, v: unknown) => setForm(f => ({ ...f, [k]: v }));
    const setGallery = (val: GalleryImage[]) => set("gallery", val);
    const setSpecs = (val: Spec[]) => set("specs", val);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await onSave(form);
        setSaving(false);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff", padding: "11px 14px", fontFamily: "var(--font-sans)", fontSize: "0.85rem",
        outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem",
        letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "6px",
    };
    const sectionLabel: React.CSSProperties = {
        fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.25)", marginBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px",
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* Form header */}
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#D4A520", marginBottom: "4px" }}>
                        {initial.slug ? "EDIT PROJECT" : "NEW PROJECT"}
                    </p>
                    <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.3rem", color: "#fff", letterSpacing: "-0.02em" }}>
                        {form.title || "Untitled Project"}
                    </h2>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={onCancel} style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", cursor: "pointer" }}>CANCEL</button>
                    <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: saving ? "#333" : "#D4A520", border: "none", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}>
                        {saving ? "SAVING…" : "SAVE PROJECT"}
                    </button>
                </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>

                {/* BASIC INFO */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={sectionLabel}>BASIC INFO</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        {[
                            { key: "title", label: "TITLE", placeholder: "BEACH HOUSE CALICUT", required: true },
                            { key: "slug", label: "SLUG (URL)", placeholder: "beach-house-calicut", required: true },
                            { key: "num", label: "NUMBER", placeholder: "00" },
                            { key: "subtitle", label: "SUBTITLE", placeholder: "Residential" },
                        ].map(({ key, label, placeholder, required }) => (
                            <div key={key}>
                                <label style={labelStyle}>{label}</label>
                                <input
                                    required={required}
                                    value={String(form[key as keyof Project] ?? "")}
                                    onChange={e => set(key as keyof Project, e.target.value)}
                                    placeholder={placeholder}
                                    style={inputStyle}
                                />
                            </div>
                        ))}
                        <div>
                            <label style={labelStyle}>CATEGORY</label>
                            <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inputStyle, appearance: "none" }}>
                                <option value="">Select…</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>YEAR</label>
                            <input value={form.year} onChange={e => set("year", e.target.value)} placeholder="2024" style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                            <label style={labelStyle}>LOCATION</label>
                            <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="CALICUT, KL" style={inputStyle} />
                        </div>
                    </div>
                </section>

                {/* HERO IMAGE */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={sectionLabel}>HERO IMAGE</p>
                    <ImageInput
                        value={form.hero_img}
                        onChange={url => set("hero_img", url)}
                        placeholder="https://images.unsplash.com/…"
                        preview
                    />
                </section>

                {/* NARRATIVE */}
                <section style={{ marginBottom: "40px" }}>
                    <p style={sectionLabel}>NARRATIVE</p>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={labelStyle}>PROJECT STORY</label>
                        <textarea
                            value={form.story}
                            onChange={e => set("story", e.target.value)}
                            rows={5}
                            placeholder="Describe the project…"
                            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>PULL QUOTE (optional)</label>
                        <input value={form.pull_quote ?? ""} onChange={e => set("pull_quote", e.target.value)} placeholder="Every good building begins by listening to the land." style={inputStyle} />
                    </div>
                </section>

                {/* GALLERY */}
                <section style={{ marginBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>
                            GALLERY IMAGES ({(form.gallery ?? []).length})
                        </p>
                        <button type="button"
                            onClick={() => setGallery([...(form.gallery ?? []), { src: "", span: "half" }])}
                            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", padding: "5px 12px", cursor: "pointer" }}>
                            + ADD SLOT
                        </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {(form.gallery ?? []).map((img, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "16px" }}>
                                {/* Row: index + span selector + remove */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>IMAGE {i + 1}</span>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>SPAN</label>
                                        <select
                                            value={img.span}
                                            onChange={e => { const g = [...(form.gallery ?? [])]; g[i] = { ...g[i], span: e.target.value as "full" | "half" }; setGallery(g); }}
                                            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "4px 8px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", outline: "none" }}
                                        >
                                            <option value="half">Half</option>
                                            <option value="full">Full</option>
                                        </select>
                                        <button type="button"
                                            onClick={() => setGallery((form.gallery ?? []).filter((_, j) => j !== i))}
                                            style={{ background: "transparent", border: "1px solid rgba(220,50,50,0.3)", color: "rgba(220,50,50,0.7)", width: "28px", height: "28px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>✕</button>
                                    </div>
                                </div>
                                {/* Image input with upload */}
                                <ImageInput
                                    value={img.src}
                                    onChange={url => {
                                        const g = [...(form.gallery ?? [])];
                                        g[i] = { ...g[i], src: url };
                                        setGallery(g);
                                    }}
                                    preview={false}
                                    compact
                                />
                                {/* Compact thumbnail */}
                                {img.src && (
                                    <div style={{ marginTop: "8px", height: "80px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* SPECS */}
                <section style={{ marginBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)" }}>
                            PROJECT SPECS ({(form.specs ?? []).length})
                        </p>
                        <button type="button"
                            onClick={() => setSpecs([...(form.specs ?? []), { label: "", value: "" }])}
                            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", padding: "5px 12px", cursor: "pointer" }}>
                            + ADD SPEC
                        </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {(form.specs ?? []).map((spec, i) => (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "10px", alignItems: "center" }}>
                                <input value={spec.label} onChange={e => { const s = [...(form.specs ?? [])]; s[i] = { ...s[i], label: e.target.value }; setSpecs(s); }} placeholder="Label (e.g. Area)" style={{ ...inputStyle, fontSize: "0.75rem" }} />
                                <input value={spec.value} onChange={e => { const s = [...(form.specs ?? [])]; s[i] = { ...s[i], value: e.target.value }; setSpecs(s); }} placeholder="Value (e.g. 4,200 sq.ft)" style={{ ...inputStyle, fontSize: "0.75rem" }} />
                                <button type="button" onClick={() => setSpecs((form.specs ?? []).filter((_, j) => j !== i))}
                                    style={{ background: "transparent", border: "1px solid rgba(220,50,50,0.3)", color: "rgba(220,50,50,0.7)", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </form>
    );
}

const EMPTY_JOURNAL: JournalEntry = {
    slug: "", title: "", date: new Date().toLocaleDateString('en-GB'), 
    category: "ESSAY", heroImg: "", content: "", readTime: "5 MIN", excerpt: ""
};

/* ═══════════════════════════════════════
   JOURNAL FORM
═══════════════════════════════════════ */
function JournalForm({ initial, onSave, onCancel }: { initial: JournalEntry; onSave: (j: JournalEntry) => Promise<void>; onCancel: () => void; }) {
    const [form, setForm] = useState<JournalEntry>(initial);
    const [saving, setSaving] = useState(false);
    const set = (k: keyof JournalEntry, v: any) => setForm(f => ({ ...f, [k]: v }));

    const inputStyle: React.CSSProperties = { width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "11px 14px", fontFamily: "var(--font-sans)", fontSize: "0.85rem", outline: "none" };
    const labelStyle: React.CSSProperties = { display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "6px" };

    return (
        <form onSubmit={async e => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem" }}>{initial.slug ? "EDIT ENTRY" : "NEW JOURNAL ENTRY"}</h2>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={onCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #333", color: "#666", cursor: "pointer", fontSize: "0.6rem" }}>CANCEL</button>
                    <button type="submit" style={{ padding: "10px 24px", background: "#D4A520", border: "none", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: "0.6rem" }}>{saving ? "SAVING…" : "SAVE ENTRY"}</button>
                </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div><label style={labelStyle}>TITLE</label><input value={form.title} placeholder="The future of tropical design" onChange={e => set("title", e.target.value)} style={inputStyle} required /></div>
                    <div><label style={labelStyle}>SLUG</label><input value={form.slug} placeholder="future-of-tropical-design" onChange={e => set("slug", e.target.value)} style={inputStyle} required /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    <div><label style={labelStyle}>DATE</label><input value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>CATEGORY</label><input value={form.category} onChange={e => set("category", e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>READ TIME</label><input value={form.readTime} onChange={e => set("readTime", e.target.value)} style={inputStyle} /></div>
                </div>
                <div><label style={labelStyle}>HERO IMAGE</label><ImageInput value={form.heroImg} onChange={url => set("heroImg", url)} /></div>
                <div><label style={labelStyle}>EXCERPT</label><textarea value={form.excerpt} placeholder="Brief summary of the article..." onChange={e => set("excerpt", e.target.value)} style={{ ...inputStyle, resize: "none" }} rows={2} /></div>
                <div style={{ flex: 1 }}><label style={labelStyle}>CONTENT (Markdown supported)</label><textarea value={form.content} onChange={e => set("content", e.target.value)} style={{ ...inputStyle, resize: "vertical", minHeight: "300px" }} /></div>
            </div>
        </form>
    );
}

/* ═══════════════════════════════════════
   SETTINGS FORM
═══════════════════════════════════════ */
function SettingsForm({ initial, onSave }: { initial: SiteSettings; onSave: (s: SiteSettings) => Promise<void>; }) {
    const [form, setForm] = useState<SiteSettings>(initial);
    const [saving, setSaving] = useState(false);
    const set = (k: keyof SiteSettings, v: string) => setForm(f => ({ ...f, [k]: v }));

    const inputStyle: React.CSSProperties = { width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "14px", fontSize: "0.9rem", outline: "none" };
    const labelStyle: React.CSSProperties = { display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px" };

    return (
        <form onSubmit={async e => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false); }} style={{ padding: "40px", maxWidth: "800px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "40px" }}>Global Site Settings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div><label style={labelStyle}>PHONE NUMBER</label><input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>EMAIL ADDRESS</label><input value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>OFFICE ADDRESS</label><textarea value={form.address} onChange={e => set("address", e.target.value)} style={{ ...inputStyle, resize: "none" }} rows={3} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <div><label style={labelStyle}>INSTAGRAM URL</label><input value={form.instagram} onChange={e => set("instagram", e.target.value)} style={inputStyle} /></div>
                    <div><label style={labelStyle}>LINKEDIN URL</label><input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} style={inputStyle} /></div>
                </div>
                <div><label style={labelStyle}>YEARS OF EXPERIENCE</label><input value={form.yearsExp} onChange={e => set("yearsExp", e.target.value)} style={inputStyle} placeholder="e.g. 8" /></div>
                <button type="submit" style={{ padding: "16px", background: "#D4A520", color: "#000", fontWeight: 700, cursor: "pointer", border: "none", marginTop: "20px" }}>
                    {saving ? "UPDATING…" : "UPDATE SETTINGS"}
                </button>
            </div>
        </form>
    );
}

/* ═══════════════════════════════════════
   STAT CARD
═══════════════════════════════════════ */
function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
    return (
        <div style={{ background: "#111", border: `1px solid ${accent ? "rgba(212,165,32,0.3)" : "rgba(255,255,255,0.08)"}`, padding: "24px", flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: accent ? "#D4A520" : "rgba(255,255,255,0.35)", marginBottom: "10px" }}>{label}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>{value}</p>
        </div>
    );
}

/* ═══════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════ */
export default function AdminPage() {
    const isMobile = useIsMobile();
    const [authed, setAuthed] = useState(false);
    const [pw, setPw] = useState("");
    const [pwError, setPwError] = useState(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [journal, setJournal] = useState<JournalEntry[]>([]);
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    const [tab, setTab] = useState<"projects" | "journal" | "settings">("projects");
    const [view, setView] = useState<"list" | "form">("list");
    
    // For Projects
    const [editing, setEditing] = useState<Project | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

    // For Journal
    const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
    const [deleteTargetEntry, setDeleteTargetEntry] = useState<JournalEntry | null>(null);

    const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

    const showToast = (msg: string, type: "ok" | "err" = "ok") => setToast({ msg, type });

    const fetchProjects = useCallback(async () => {
        const res = await fetch("/api/projects");
        if (res.ok) setProjects(await res.json());
    }, []);

    const fetchJournal = useCallback(async () => {
        const res = await fetch("/api/journal");
        if (res.ok) setJournal(await res.json());
    }, []);

    const fetchSettings = useCallback(async () => {
        const res = await fetch("/api/settings");
        if (res.ok) setSettings(await res.json());
    }, []);

    useEffect(() => { 
        if (authed) {
            fetchProjects(); 
            fetchJournal();
            fetchSettings();
        } 
    }, [authed, fetchProjects, fetchJournal, fetchSettings]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pw === "kalaakars-admin-2024") { setAuthed(true); setPwError(false); }
        else { setPwError(true); setPw(""); }
    };

    const handleSave = async (p: Project) => {
        const isEdit = !!editing?.slug;
        const url = isEdit ? `/api/projects/${editing?.slug}` : "/api/projects";
        const method = isEdit ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
        if (res.ok) {
            showToast(isEdit ? "Project updated ✓" : "Project created ✓");
            setView("list");
            fetchProjects();
        } else {
            const err = await res.json();
            showToast(err.error ?? "Save failed", "err");
        }
    };

    const handleDelete = async (p: Project) => {
        const res = await fetch(`/api/projects/${p.slug}`, { method: "DELETE" });
        if (res.ok) { showToast("Project deleted"); fetchProjects(); }
        else showToast("Delete failed", "err");
        setDeleteTarget(null);
    };

    const handleSaveEntry = async (j: JournalEntry) => {
        const isEdit = !!editingEntry?.slug;
        const url = isEdit ? `/api/journal/${editingEntry?.slug}` : "/api/journal";
        const method = isEdit ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(j) });
        if (res.ok) {
            showToast(isEdit ? "Entry updated ✓" : "Entry created ✓");
            setView("list");
            fetchJournal();
        } else {
            showToast("Save failed", "err");
        }
    };

    const handleDeleteEntry = async (j: JournalEntry) => {
        const res = await fetch(`/api/journal/${j.slug}`, { method: "DELETE" });
        if (res.ok) { showToast("Entry deleted"); fetchJournal(); }
        else showToast("Delete failed", "err");
        setDeleteTargetEntry(null);
    };

    const handleSaveSettings = async (s: SiteSettings) => {
        const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
        if (res.ok) showToast("Settings updated ✓");
        else showToast("Update failed", "err");
    };

    const filtered = projects.filter(p => {
        const q = search.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
        const matchCat = filterCat === "ALL" || p.category === filterCat;
        return matchSearch && matchCat;
    });

    /* ── LOGIN ── */
    if (!authed) {
        return (
            <div style={{ minHeight: "100vh", background: "#090909", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: "380px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.svg" alt="K" style={{ width: "28px", height: "32px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                        <div>
                            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>Kalaakars</p>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>ADMIN CMS</p>
                        </div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.6rem", letterSpacing: "-0.03em", color: "#fff", marginBottom: "32px", lineHeight: 1.2 }}>
                            Studio<br />Control Panel
                        </p>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>ADMIN PASSWORD</label>
                            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwError(false); }} placeholder="Enter password" autoFocus
                                style={{ width: "100%", background: "#111", border: `1px solid ${pwError ? "rgba(220,50,50,0.6)" : "rgba(255,255,255,0.14)"}`, color: "#fff", padding: "14px 16px", fontFamily: "var(--font-sans)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                            {pwError && <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#dc3232", marginTop: "6px", letterSpacing: "0.1em" }}>Incorrect password</p>}
                        </div>
                        <button type="submit" style={{ width: "100%", padding: "14px", background: "#D4A520", border: "none", color: "#000", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 700, cursor: "pointer" }}>
                            ENTER STUDIO
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    /* ── DASHBOARD ── */
    return (
        <div style={{ minHeight: "100vh", background: "#090909", color: "#fff", display: "flex", flexDirection: "column" }}>

            {/* Top Nav */}
            <header style={{ height: isMobile ? "auto" : "60px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", padding: isMobile ? "20px" : "0 32px", flexShrink: 0, background: "#0c0c0c", gap: isMobile ? "16px" : "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.svg" alt="K" style={{ width: "18px", height: "22px", filter: "brightness(0) invert(1)", objectFit: "contain" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.18em", color: "#fff" }}>KALAAKARS</span>
                    {!isMobile && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em" }}>/ ADMIN CMS</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", width: isMobile ? "100%" : "auto", justifyContent: "space-between" }}>
                    <a href="/" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "5px 12px" }}>VIEW SITE ↗</a>
                    <button onClick={() => setAuthed(false)} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}>SIGN OUT</button>
                </div>
            </header>

            <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>

                {/* Sidebar / Mobile Nav */}
                <aside style={{ 
                    width: isMobile ? "100%" : "220px", 
                    height: isMobile ? "auto" : "auto",
                    borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)", 
                    borderBottom: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none",
                    padding: isMobile ? "0" : "28px 0", 
                    display: "flex", 
                    flexDirection: isMobile ? "row" : "column", 
                    gap: isMobile ? "0" : "4px", 
                    flexShrink: 0, 
                    background: "#0c0c0c" 
                }}>
                    {[
                        { id: "projects", label: "Projects", icon: "◈" },
                        { id: "journal", label: "Journal", icon: "✎" },
                        { id: "settings", label: "Settings", icon: "⚙" }
                    ].map(nav => (
                        <button 
                            key={nav.id}
                            onClick={() => { setTab(nav.id as any); setView("list"); }}
                            style={{ 
                                display: "flex", alignItems: "center", gap: "12px", padding: "11px 28px", 
                                background: tab === nav.id ? "rgba(212,165,32,0.08)" : "transparent", 
                                border: "none", borderLeft: tab === nav.id ? "2px solid #D4A520" : "2px solid transparent", 
                                cursor: "pointer", width: "100%", textAlign: "left"
                            }}
                        >
                            <span style={{ color: tab === nav.id ? "#D4A520" : "#444", fontSize: "1rem" }}>{nav.icon}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: tab === nav.id ? "#fff" : "rgba(255,255,255,0.4)" }}>{nav.label}</span>
                        </button>
                    ))}
                    <div style={{ marginTop: "auto", padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", lineHeight: 1.8 }}>
                            KALAAKARS CMS<br />MALAPPURAM · KERALA<br />LEGACY OF 8 YEARS
                        </p>
                    </div>
                </aside>

                {/* Main */}
                <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <AnimatePresence mode="wait">
                        {tab === "projects" && (
                            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                {view === "form" ? (
                                    <ProjectForm 
                                        initial={editing ?? EMPTY_PROJECT} 
                                        onSave={handleSave} 
                                        onCancel={() => { setView("list"); setEditing(null); }} 
                                    />
                                ) : (
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                        <div style={{ padding: isMobile ? "20px" : "32px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: "20px" }}>
                                            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? "1.4rem" : "1.8rem", fontWeight: 300 }}>Studio Projects</h1>
                                            <button onClick={() => { setEditing(null); setView("form"); }} style={{ padding: "12px 24px", background: "#D4A520", color: "#000", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.6rem", width: isMobile ? "100%" : "auto" }}>+ NEW PROJECT</button>
                                        </div>
                                        <div style={{ padding: isMobile ? "20px" : "32px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "16px", background: "#0b0b0b" }}>
                                            <StatCard label="TOTAL WORKS" value={projects.length} />
                                            <StatCard label="CATEGORIES" value={new Set(projects.map(p => p.category)).size} />
                                            <StatCard label="LATEST" value={projects[0]?.year || "N/A"} accent />
                                            <StatCard label="STATUS" value="LIVE" />
                                        </div>
                                        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "20px" : "32px" }}>
                                            {projects.map(p => (
                                                <div key={p.slug} style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center", gap: "16px" }}>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                                                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>{p.category} · {p.location}</p>
                                                    </div>
                                                    <div style={{ display: "flex", gap: "8px" }}>
                                                        <button onClick={() => { setEditing(p); setView("form"); }} style={{ padding: "8px 14px", background: "none", border: "1px solid #333", color: "#fff", cursor: "pointer", fontSize: "0.55rem", fontFamily: "var(--font-mono)" }}>EDIT</button>
                                                        <button onClick={() => setDeleteTarget(p)} style={{ padding: "8px 14px", background: "none", border: "1px solid rgba(220,50,50,0.2)", color: "#dc3232", cursor: "pointer", fontSize: "0.55rem", fontFamily: "var(--font-mono)" }}>DEL</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {tab === "journal" && (
                            <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                {view === "form" ? (
                                    <JournalForm 
                                        initial={editingEntry ?? EMPTY_JOURNAL} 
                                        onSave={handleSaveEntry} 
                                        onCancel={() => { setView("list"); setEditingEntry(null); }} 
                                    />
                                ) : (
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                        <div style={{ padding: "32px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "1.8rem", fontWeight: 300 }}>Architectural Journal</h1>
                                            <button onClick={() => { setEditingEntry(null); setView("form"); }} style={{ padding: "12px 24px", background: "#D4A520", color: "#000", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.6rem" }}>+ NEW ENTRY</button>
                                        </div>
                                        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
                                            {journal.map(j => (
                                                <div key={j.slug} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
                                                    <span>{j.title}</span>
                                                    <div style={{ display: "flex", gap: "8px" }}>
                                                        <button onClick={() => { setEditingEntry(j); setView("form"); }} style={{ padding: "6px 10px", background: "none", border: "1px solid #333", color: "#999", cursor: "pointer", fontSize: "0.5rem" }}>EDIT</button>
                                                        <button onClick={() => setDeleteTargetEntry(j)} style={{ padding: "6px 10px", background: "none", border: "1px solid #422", color: "#dc3232", cursor: "pointer", fontSize: "0.5rem" }}>DEL</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {tab === "settings" && settings && (
                            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ flex: 1, overflowY: "auto" }}>
                                <SettingsForm initial={settings} onSave={handleSaveSettings} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Delete modals */}
            <AnimatePresence>
                {deleteTarget && (
                    <DeleteModal title={deleteTarget.title} onConfirm={() => handleDelete(deleteTarget)} onCancel={() => setDeleteTarget(null)} />
                )}
                {deleteTargetEntry && (
                    <DeleteModal title={deleteTargetEntry.title} onConfirm={() => handleDeleteEntry(deleteTargetEntry)} onCancel={() => setDeleteTargetEntry(null)} />
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && <Toast key="toast" msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
}
