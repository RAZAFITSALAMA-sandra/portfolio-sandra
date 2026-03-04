import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS_DATA } from "../data/index.js";
import { useMobile } from "../hooks/useMobile.js";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG      = "#06090F";
const DIM     = "#0B1120";
const BORDER  = "#1E2D4A";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400&family=DM+Mono:wght@300&display=swap');`;

export function Projects({ t, lang }) {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const isMobile = useMobile();
  const project = PROJECTS_DATA[active];
  const total   = PROJECTS_DATA.length;

  return (
    <>
      <style>{FONTS}</style>

      <section
        id="projects"
        ref={ref}
        style={{
          background: BG,
          padding: "clamp(60px,10vh,120px) clamp(28px,8vw,110px)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Faded number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          style={{
            position: "absolute", top: "clamp(-10px,2vh,10px)",
            right: "clamp(20px,6vw,80px)",
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(100px,20vw,220px)",
            fontWeight: 800, lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: `1px ${BORDER}`,
            userSelect: "none", pointerEvents: "none", zIndex: 0,
          }}
        >
          03
        </motion.div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}
          >
            <div style={{ width: 32, height: 1, background: BLUE }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem", letterSpacing: "0.28em",
              textTransform: "uppercase", color: BLUE_LT,
            }}>
              {t.projects.label}
            </span>
          </motion.div>

          {/* ── Title ── */}
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "clamp(1.4rem, 8vw, 2rem)" : "clamp(2.4rem,5vw,4.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.03em", color: TEXT, margin: 0,
              }}
            >
              {t.projects.title[0]}
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 64 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "clamp(1.4rem, 8vw, 2rem)" : "clamp(2.4rem,5vw,4.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: `1.5px ${BLUE_LT}`,
                margin: 0,
              }}
            >
              {t.projects.title[1]}
            </motion.h2>
          </div>

          {/* ── Mobile pills nav ── */}
          {isMobile && (
            <div style={{ position: "relative", marginBottom: 36 }}>
              {/* Fade right hint */}
              <div style={{
                position: "absolute", top: 0, right: 0, bottom: 4,
                width: 48,
                background: `linear-gradient(to left, ${BG}, transparent)`,
                pointerEvents: "none", zIndex: 1,
              }} />
              <div style={{
                display: "flex", gap: 8, overflowX: "auto",
                paddingBottom: 4, paddingRight: 32,
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}>
                {PROJECTS_DATA.map((p, i) => (
                  <motion.button
                    key={p.n}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    style={{
                      flexShrink: 0,
                      padding: "7px 14px",
                      background: i === active ? BLUE : "transparent",
                      border: `1px solid ${i === active ? BLUE : BORDER}`,
                      borderRadius: 9999,
                      cursor: "pointer",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "0.68rem", fontWeight: 700,
                      color: i === active ? "#fff" : SOFT,
                      transition: "all 0.22s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.title}
                  </motion.button>
                ))}
              </div>
              {/* Scroll hint text */}
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                marginTop: 10,
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.5rem", letterSpacing: "0.16em",
                  textTransform: "uppercase", color: BORDER,
                }}>
                  swipe →
                </span>
                <div style={{ flex: 1, height: 1, background: BORDER, opacity: 0.4 }} />
              </div>
            </div>
          )}

          {/* ── Main layout ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
            gap: isMobile ? 0 : "clamp(32px,5vw,64px)",
            alignItems: "start",
          }}>

            {/* LEFT — project detail */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Index + featured */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.58rem", letterSpacing: "0.2em",
                      color: BORDER,
                    }}>
                      {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    {project.featured && (
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.52rem", letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "3px 10px",
                        border: `1px solid ${BLUE}44`,
                        background: `${BLUE}0d`,
                        color: BLUE_LT,
                        borderRadius: 4,
                      }}>
                        {t.projects.featured}
                      </span>
                    )}
                  </div>

                  {/* Project title */}
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: isMobile ? "clamp(1.8rem, 8vw, 2.8rem)" : "clamp(2rem,4.5vw,3.8rem)",
                    fontWeight: 800, lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: TEXT,
                    margin: "0 0 20px",
                  }}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.88rem,1.5vw,1rem)",
                    fontWeight: 300, lineHeight: 1.85,
                    color: SOFT,
                    maxWidth: 520,
                    marginBottom: 28,
                  }}>
                    {lang === "fr" ? project.descFr : project.descEn}
                  </p>

                  {/* Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                    {project.tech.map((tc, i) => (
                      <motion.span
                        key={tc}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem", letterSpacing: "0.08em",
                          color: BLUE_LT,
                          padding: "5px 12px",
                          border: `1px solid ${BLUE}33`,
                          background: `${BLUE}0a`,
                          borderRadius: 4,
                        }}
                      >
                        {tc}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <motion.a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ boxShadow: `0 0 24px ${BLUE}66`, backgroundColor: "#1D4ED8" }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "12px 24px",
                        background: BLUE, border: "none", color: "#fff",
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.68rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        textDecoration: "none", borderRadius: 2,
                        transition: "all 0.22s",
                        flex: isMobile ? 1 : "none",
                      }}
                    >
                      {t.projects.code} ↗
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      target="_blank" rel="noopener noreferrer"
                      whileHover={{ color: TEXT, borderColor: `${BLUE_LT}88` }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "12px 24px",
                        background: "transparent",
                        border: `1px solid ${BORDER}`,
                        color: SOFT,
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.68rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        textDecoration: "none", borderRadius: 2,
                        transition: "all 0.22s",
                        flex: isMobile ? 1 : "none",
                      }}
                    >
                      {t.projects.demo} ↗
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT — project list nav (desktop only) */}
            {!isMobile && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {PROJECTS_DATA.map((p, i) => (
                  <motion.button
                    key={p.n}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    whileHover={{ background: DIM }}
                    style={{
                      background: i === active ? DIM : "transparent",
                      border: `1px solid ${i === active ? BLUE + "55" : "transparent"}`,
                      borderRadius: 4, padding: "14px 16px",
                      cursor: "pointer", textAlign: "left",
                      position: "relative", overflow: "hidden",
                      transition: "all 0.22s",
                    }}
                  >
                    <motion.div
                      style={{
                        position: "absolute", top: 0, left: 0, bottom: 0,
                        width: 2,
                        background: `linear-gradient(to bottom, ${BLUE}, ${BLUE_LT})`,
                        transformOrigin: "top",
                      }}
                      animate={{ scaleY: i === active ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.5rem", letterSpacing: "0.16em",
                        color: i === active ? BLUE_LT : BORDER,
                        transition: "color 0.22s",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.featured && (
                        <span style={{
                          width: 5, height: 5, borderRadius: "50%",
                          background: BLUE, boxShadow: `0 0 8px ${BLUE}`,
                          flexShrink: 0,
                        }} />
                      )}
                    </div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "0.82rem", fontWeight: 700,
                      color: i === active ? TEXT : SOFT,
                      letterSpacing: "0.01em", lineHeight: 1.2, marginBottom: 5,
                      transition: "color 0.22s",
                    }}>
                      {p.title}
                    </div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.5rem", letterSpacing: "0.1em",
                      color: i === active ? BORDER : `${BORDER}88`,
                      transition: "color 0.22s",
                    }}>
                      {p.tech.slice(0, 2).join(" · ")}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            position: "absolute", bottom: 0,
            left: "clamp(28px,8vw,110px)", right: "clamp(28px,8vw,110px)",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)`,
            transformOrigin: "left",
          }}
        />

      </section>
    </>
  );
}