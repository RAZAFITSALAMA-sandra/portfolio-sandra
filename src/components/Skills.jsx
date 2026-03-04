import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SKILLS_DATA } from "../data/index.js";
import { useMobile } from "../hooks/useMobile.js";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG      = "#06090F";
const DIM     = "#0B1120";
const BORDER  = "#1E2D4A";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400&family=DM+Mono:wght@300&display=swap');`;

// Regroupe les 4 catégories qu'on veut afficher
const CATEGORIES = ["Frontend", "Backend", "Outils"];

export default function Skills({ t }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const isMobile = useMobile();

  return (
    <>
      <style>{`
        ${FONTS}
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <section
        id="skills"
        ref={ref}
        style={{
          background: DIM,
          padding: "clamp(60px, 10vh, 120px) clamp(28px, 8vw, 110px)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Faint dot grid */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.04,zIndex:0 }}>
          <defs>
            <pattern id="sk-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={TEXT}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sk-dots)"/>
        </svg>

        {/* Big faded number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            position: "absolute", top: "clamp(-10px,2vh,10px)",
            right: "clamp(20px,6vw,80px)",
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(100px,20vw,220px)",
            fontWeight: 800,
            color: "transparent",
            WebkitTextStroke: `1px ${BORDER}`,
            userSelect: "none", pointerEvents: "none",
            lineHeight: 1, zIndex: 0,
          }}
        >
          02
        </motion.div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}
          >
            <div style={{ width: 32, height: 1, background: BLUE }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem", letterSpacing: "0.28em",
              textTransform: "uppercase", color: BLUE_LT,
            }}>
              {t.skills.label}
            </span>
          </motion.div>

          {/* Title */}
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.03em", color: TEXT, margin: 0,
              }}
            >
              {t.skills.title[0]}
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 64 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: `1.5px ${BLUE_LT}`,
                margin: 0,
              }}
            >
              {t.skills.title[1]}
            </motion.h2>
          </div>

          {/* ── Categories ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {CATEGORIES.map((cat, ci) => {
              const items = SKILLS_DATA[cat] || [];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + ci * 0.12 }}
                >
                  {/* Category header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16,
                    marginBottom: 20,
                  }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.56rem", letterSpacing: "0.22em",
                      textTransform: "uppercase", color: BLUE_LT,
                    }}>
                      {String(ci + 1).padStart(2, "0")} · {cat}
                    </span>
                    <div style={{ flex: 1, height: 1, background: BORDER }} />
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.52rem", color: BORDER,
                    }}>
                      {items.length} techs
                    </span>
                  </div>

                  {/* Skill items — horizontal wrap */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {items.map((skill, si) => (
                      <SkillPill
                        key={skill.name}
                        skill={skill}
                        delay={0.5 + ci * 0.12 + si * 0.06}
                        inView={inView}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
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

// ── Skill pill ───────────────────────────────────
function SkillPill({ skill, delay, inView, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, borderColor: skill.color + "99" }}
      style={{
        display: "flex", alignItems: "center", gap: isMobile ? 8 : 10,
        padding: isMobile ? "8px 12px" : "10px 16px",
        background: BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        cursor: "default",
        transition: "border-color 0.22s, transform 0.22s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Color dot */}
      <span style={{
        display: "inline-block",
        width: 7, height: 7,
        borderRadius: "50%",
        background: skill.color,
        boxShadow: `0 0 8px ${skill.color}88`,
        flexShrink: 0,
      }} />

      {/* Icon */}
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.62rem", fontWeight: 300,
        color: skill.color,
        minWidth: 18, textAlign: "center",
        flexShrink: 0,
      }}>
        {skill.icon}
      </span>

      {/* Name */}
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: isMobile ? "0.72rem" : "0.78rem", fontWeight: 700,
        color: TEXT, letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}>
        {skill.name}
      </span>

      {/* Years badge — hidden on mobile */}
      {!isMobile && (
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.52rem", letterSpacing: "0.1em",
          color: SOFT,
          padding: "2px 7px",
          border: `1px solid ${BORDER}`,
          borderRadius: 4,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          {skill.years}
        </span>
      )}

      {/* Bottom progress bar */}
      <motion.div
        style={{
          position: "absolute", bottom: 0, left: 0,
          height: 2,
          background: skill.color,
          boxShadow: `0 0 8px ${skill.color}66`,
          borderRadius: "0 2px 0 0",
        }}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${skill.pct}%` } : {}}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}