import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMobile } from "../hooks/useMobile.js";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300&display=swap');`;

const BG      = "#06090F";
const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";
const BORDER  = "#1E2D4A";

function useTypewriter(words, speed = 78, pause = 2600) {
  const [text, setText] = useState("");
  const [wi, setWi]     = useState(0);
  const [ci, setCi]     = useState(0);
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const w = words[wi];
    const id = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, ci + 1));
        if (ci + 1 === w.length) setTimeout(() => setDel(true), pause);
        else setCi(c => c + 1);
      } else {
        setText(w.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi(i => (i + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [ci, del, wi, words, speed, pause]);
  return text;
}

export function Hero({ t, lang }) {
  const isMobile = useMobile();
  const roles = ["React Developer", "Node.js Developer", "App Architect", "UI/UX Enthusiast"];
  const tw = useTypewriter(roles);

  return (
    <>
      <style>{`
        ${FONTS}
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes glow-pulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.08); }
        }
      `}</style>

      <section id="hero" style={{
        minHeight: "100vh",
        height: isMobile ? "auto" : "100vh",
        background: BG,
        color: TEXT,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Glow */}
        <div style={{
          position: "absolute",
          top: isMobile ? "10%" : "30%",
          left: isMobile ? "-20%" : "25%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}18 0%, transparent 65%)`,
          animation: "glow-pulse 7s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── LEFT / TOP PANEL ── */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: isMobile
            ? "100px 28px 40px"
            : "0 clamp(32px, 6vw, 80px)",
        }}>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#4ADE80", boxShadow: "0 0 10px #4ADE80",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.56rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#4ADE80",
            }}>
              {t.available}
            </span>
            <span style={{ color: BORDER }}>—</span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.56rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: SOFT,
            }}>
              Remote · Madagascar
            </span>
          </motion.div>

          {/* Name */}
          <div style={{ overflow: "hidden", marginBottom: 2 }}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "clamp(3rem, 14vw, 5rem)" : "clamp(3rem, 6.5vw, 6.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.04em", color: TEXT, margin: 0,
              }}>
                Sandra
              </h1>
            </motion.div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 24 }}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.58, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "clamp(3rem, 14vw, 5rem)" : "clamp(3rem, 6.5vw, 6.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.04em", color: TEXT, margin: 0,
              }}>
                Laëticia
              </h1>
            </motion.div>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(0.72rem, 1.4vw, 0.95rem)",
              color: BLUE_LT, marginBottom: 24,
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ color: BORDER }}>//</span>
            <span>{tw}<span style={{ animation: "blink 1s step-end infinite" }}>▌</span></span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.4vw, 0.94rem)",
              fontWeight: 300, lineHeight: 1.85,
              color: SOFT, maxWidth: 380, marginBottom: 32,
            }}
          >
            {t.hero.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ boxShadow: `0 0 28px ${BLUE}80`, background: "#1D4ED8" }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: isMobile ? "14px 28px" : "12px 26px",
                background: BLUE, border: "none", color: "#fff",
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "0.7rem", letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                borderRadius: 2, transition: "all 0.22s",
                flex: isMobile ? 1 : "none",
              }}
            >
              {t.hero.cta}
            </motion.button>

            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ color: TEXT, borderColor: `${BLUE_LT}88` }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: isMobile ? "14px 28px" : "12px 22px",
                background: "transparent", border: `1px solid ${BORDER}`,
                color: SOFT, fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.7rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: 2,
                transition: "all 0.22s",
                flex: isMobile ? 1 : "none",
              }}
            >
              {t.hero.hire}
            </motion.button>
          </motion.div>
        </div>

        {/* ── RIGHT / BOTTOM PANEL — Photo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            position: "relative", zIndex: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile
              ? "40px 28px 60px"
              : "clamp(60px, 10vh, 100px) clamp(32px, 6vw, 72px)",
            overflow: "hidden",
            borderTop: isMobile ? `1px solid ${BORDER}` : "none",
          }}
        >
          <div style={{
            position: "absolute", width: "60%", height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BLUE}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "relative",
              width: isMobile ? "clamp(160px, 50vw, 240px)" : "clamp(240px, 34vw, 420px)",
              aspectRatio: "1 / 1",
            }}
          >
            {/* Corner brackets */}
            {[
              { top: -8, left: -8, borderTop: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` },
              { top: -8, right: -8, borderTop: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` },
              { bottom: -8, left: -8, borderBottom: `2px solid ${BLUE}`, borderLeft: `2px solid ${BLUE}` },
              { bottom: -8, right: -8, borderBottom: `2px solid ${BLUE}`, borderRight: `2px solid ${BLUE}` },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.07 }}
                style={{ position: "absolute", width: 24, height: 24, ...s }}
              />
            ))}

            <img
              src="/photo.jpg"
              alt="Sandra Laëticia"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block", borderRadius: "50%",
                filter: "grayscale(15%) contrast(1.05)",
              }}
            />

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "35%",
              background: `linear-gradient(to top, ${BG}88, transparent)`,
              pointerEvents: "none",
              borderRadius: "0 0 50% 50%",
            }} />
          </motion.div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BLUE}88, transparent)`,
            transformOrigin: "left", zIndex: 3,
          }}
        />
      </section>
    </>
  );
}