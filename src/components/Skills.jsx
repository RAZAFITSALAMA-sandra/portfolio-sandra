import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SKILLS_DATA } from "../data/index.js";

const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const GOLD_DARK  = "#A0782A";

// ── Variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.88 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
  exit: { opacity: 0, y: -30, scale: 0.92, transition: { duration: 0.25 } },
};

// ── Ring Progress ─────────────────────────────────
function RingProgress({ pct, color, size = 90, stroke = 4, dark }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div ref={ref} style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={dark ? "#1a1a1a" : "#ebebeb"} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ - (circ * pct) / 100 } : {}}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={1} strokeLinecap="round"
          strokeDasharray={`4 ${circ}`}
          initial={{ strokeDashoffset: circ, opacity: 0 }}
          animate={inView ? { strokeDashoffset: circ - (circ * pct) / 100, opacity: 0.3 } : {}}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        {inView && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem",
            fontWeight: 500, color, textShadow: `0 0 12px ${color}66`,
          }}>{pct}%</span>
        )}
      </div>
    </div>
  );
}

// ── Scan Line ─────────────────────────────────────
function ScanLine({ color }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
        pointerEvents: "none", zIndex: 10,
      }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 0.8, 0.8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
    />
  );
}

// ── Particles ─────────────────────────────────────
function Particles({ color, count = 5, active }) {
  return (
    <AnimatePresence>
      {active && [...Array(count)].map((_, i) => (
        <motion.div key={i}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
            pointerEvents: "none", zIndex: 20,
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? "-6px" : "calc(100% + 4px)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -(20 + i * 8), -(50 + i * 10)],
            x: i % 2 === 0 ? [-4, -12, -6] : [4, 14, 8],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}
    </AnimatePresence>
  );
}

// ── Glow Follower — VERSION CORRIGÉE ──
function GlowFollower({ glowX, glowY, color }) {
  const bg = useTransform([glowX, glowY], (latest) => {
    const [x, y] = latest;
    return `radial-gradient(circle at ${x} ${y}, ${color}18 0%, transparent 65%)`;
  });
  
  return (
    <motion.div style={{
      position: "absolute", inset: 0,
      pointerEvents: "none", borderRadius: 16,
      background: bg,
    }} />
  );
}

// ── Skill Card 3D magnétique ──────────────────────
function SkillCard({ skill, index, dark }) {
  const cardRef  = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div variants={cardVariants} style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 600); }}
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: 16,
          padding: "24px 20px",
          background: dark ? "#0d0d0d" : "#fafafa",
          border: `1px solid ${hovered ? skill.color + "55" : (dark ? "#1c1c1c" : "#e8e8e8")}`,
          overflow: "hidden",
          cursor: "none",
          transition: "border-color 0.3s, background 0.3s",
        }}
        whileTap={{ scale: 0.97 }}
      >
        {hovered && <ScanLine color={skill.color} />}
        <Particles color={skill.color} count={5} active={hovered} />
        {hovered && <GlowFollower glowX={glowX} glowY={glowY} color={skill.color} />}

        <motion.div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            borderRadius: "16px 16px 0 0",
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />

        <AnimatePresence>
          {clicked && (
            <motion.div
              style={{
                position: "absolute", inset: 0, borderRadius: 16,
                border: `2px solid ${skill.color}`,
                pointerEvents: "none",
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.08, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <RingProgress pct={skill.pct} color={skill.color} dark={dark} />

          <div style={{ flex: 1, paddingTop: 8 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 6,
              background: `${skill.color}18`,
              border: `1px solid ${skill.color}33`,
              fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600, color: skill.color, marginBottom: 8,
              textShadow: `0 0 8px ${skill.color}88`,
            }}>
              {skill.icon}
            </div>

            <h4 style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "0.92rem", fontWeight: 600,
              color: dark ? "#e8e8e8" : "#1a1a1a",
              marginBottom: 4, lineHeight: 1.2,
            }}>{skill.name}</h4>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                color: skill.color, letterSpacing: "0.08em",
              }}>{skill.years}</span>

              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i}
                    style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: i < Math.round(skill.pct / 20)
                        ? skill.color
                        : (dark ? "#222" : "#e0e0e0"),
                      boxShadow: i < Math.round(skill.pct / 20)
                        ? `0 0 4px ${skill.color}88` : "none",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, height: 2, background: dark ? "#161616" : "#f0f0f0", borderRadius: 1 }}>
          <motion.div
            style={{
              height: 2, borderRadius: 1,
              background: `linear-gradient(90deg, ${GOLD_DARK}, ${skill.color}, ${GOLD_LIGHT})`,
              boxShadow: `0 0 10px ${skill.color}66`,
            }}
            initial={{ width: "0%" }}
            whileInView={{ width: `${skill.pct}%` }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Tab Button ────────────────────────────────────
function TabButton({ label, active, onClick, dark }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: "relative", padding: "10px 28px",
        background: "none", border: "none", cursor: "none",
        fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem",
        fontWeight: active ? 600 : 400,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: active ? GOLD : (dark ? "#3a3a3a" : "#bbb"),
        transition: "color 0.25s",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="tab-bg"
            style={{
              position: "absolute", inset: 0,
              background: `${GOLD}10`,
              border: `1px solid ${GOLD}44`,
              borderRadius: 6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>

      {active && (
        <motion.div
          layoutId="tab-indicator"
          style={{
            position: "absolute", bottom: 0, left: "20%", right: "20%",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            borderRadius: 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

// ── Section principale ────────────────────────────
export default function Skills({ dark, t }) {
  const [tab, setTab] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentKey  = t.skills.tabKeys[tab];
  const currentData = SKILLS_DATA[currentKey] || SKILLS_DATA["Frontend"];
  const avgPct      = Math.round(currentData.reduce((a, s) => a + s.pct, 0) / currentData.length);

  return (
    <section id="skills" style={{
      padding: "130px 48px",
      background: dark ? "#060606" : "#f7f7f5",
      borderTop:    `1px solid ${dark ? "#141414" : "#ebebeb"}`,
      borderBottom: `1px solid ${dark ? "#141414" : "#ebebeb"}`,
      position: "relative",
      overflow: "hidden",
      zIndex: 2,
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(${dark ? "#ffffff04" : "#00000003"} 1px, transparent 1px),
          linear-gradient(90deg, ${dark ? "#ffffff04" : "#00000003"} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${GOLD}07 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 52, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
            >
              <motion.div
                style={{ width: 24, height: 1, background: GOLD }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem",
                fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase",
                color: GOLD,
              }}>{t.skills.label}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 300,
                lineHeight: 1.0, color: dark ? "#fafafa" : "#0a0a0a",
              }}
            >
              {t.skills.title[0]}{" "}
              <span style={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${dark ? "#fafafa" : "#0a0a0a"} 30%, ${GOLD} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {t.skills.title[1]}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            style={{
              padding: "16px 24px",
              border: `1px solid ${GOLD}33`,
              background: `${GOLD}08`,
              borderRadius: 12, textAlign: "center",
            }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: dark ? "#444" : "#bbb", marginBottom: 6,
            }}>avg. mastery</div>
            {inView && (
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem",
                fontWeight: 300, color: GOLD, textShadow: `0 0 20px ${GOLD}44`,
              }}>{avgPct}%</span>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex", gap: 4, marginBottom: 52,
            background: dark ? "#0d0d0d" : "#f0f0ee",
            border: `1px solid ${dark ? "#1c1c1c" : "#e8e8e8"}`,
            borderRadius: 8, padding: 4, width: "fit-content",
          }}
        >
          {t.skills.tabs.map((label, i) => (
            <TabButton
              key={i} label={label}
              active={tab === i}
              onClick={() => setTab(i)}
              dark={dark}
            />
          ))}
        </motion.div>
        
{/* Ripple au clic - COMMENTÉ TEMPORAIREMENT
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {currentData.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} dark={dark} />
            ))}
          </motion.div>
        </AnimatePresence>
        */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: 32, textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: dark ? "#222" : "#d8d8d8",
          }}
        >
          // {t.skills.explore}
        </motion.p>
      </div>
    </section>
  );
}