import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMobile } from "../hooks/useMobile.js";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG      = "#06090F";
const BORDER  = "#1E2D4A";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";
const DIM     = "#0B1120";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300&display=swap');`;


export function About({ t }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isMobile = useMobile();

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <>
      <style>{FONTS}</style>

      <section
        id="about"
        ref={ref}
        style={{
          background: BG,
          padding: "clamp(60px, 10vh, 120px) clamp(28px, 8vw, 110px)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Big faded number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "clamp(-10px, 2vh, 10px)",
            right: "clamp(20px, 6vw, 80px)",
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(100px, 20vw, 220px)",
            fontWeight: 800,
            color: "transparent",
            WebkitTextStroke: `1px ${BORDER}`,
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
            zIndex: 0,
          }}
        >
          01
        </motion.div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Section label ── */}
          <motion.div {...fade(0.2)} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <div style={{ width: 32, height: 1, background: BLUE }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: BLUE_LT,
            }}>
              {t.about.label}
            </span>
          </motion.div>

          {/* ── Main grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : "clamp(40px, 8vw, 100px)",
            alignItems: "start",
          }}>

            {/* LEFT — title + bio */}
            <div>
              {/* Title */}
              <div style={{ overflow: "hidden", marginBottom: 6 }}>
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.4rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: TEXT,
                    margin: 0,
                  }}
                >
                  {t.about.title[0]}
                </motion.h2>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 36 }}>
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.42, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.4rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: "transparent",
                    WebkitTextStroke: `1.5px ${BLUE_LT}`,
                    margin: 0,
                  }}
                >
                  {t.about.title[1]}
                </motion.h2>
              </div>

              {/* Bio paragraphs */}
              {[t.about.p1, t.about.p2].map((p, i) => (
                <motion.p
                  key={i}
                  {...fade(0.5 + i * 0.12)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: SOFT,
                    marginBottom: i === 0 ? 20 : 0,
                    maxWidth: 460,
                  }}
                >
                  {p}
                </motion.p>
              ))}

              {/* CTA link */}
              <motion.a
                {...fade(0.76)}
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 32,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: BLUE_LT,
                  textDecoration: "none",
                  borderBottom: `1px solid ${BLUE}44`,
                  paddingBottom: 4,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.borderBottomColor = TEXT; }}
                onMouseLeave={e => { e.currentTarget.style.color = BLUE_LT; e.currentTarget.style.borderBottomColor = `${BLUE}44`; }}
              >
                {t.contact.label.split("·")[1]?.trim() || "Me contacter"}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>

            {/* RIGHT — values + services */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>

              {/* Values */}
              {t.about.values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.4 + i * 0.1 }}
                  whileHover={{ borderColor: `${BLUE}66`, background: "#0D1525" }}
                  style={{
                    padding: "18px 22px",
                    border: `1px solid ${BORDER}`,
                    background: DIM,
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.22s, background 0.22s",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute", top: 0, left: 0, bottom: 0,
                      width: 2,
                      background: `linear-gradient(to bottom, ${BLUE}, ${BLUE_LT})`,
                      transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.9rem", color: BLUE_LT,
                      flexShrink: 0, marginTop: 1,
                    }}>{v.icon}</span>
                    <div>
                      <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "0.82rem", fontWeight: 700,
                        color: TEXT, marginBottom: 6,
                        letterSpacing: "0.01em",
                      }}>{v.title}</div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem", fontWeight: 300,
                        lineHeight: 1.7, color: SOFT,
                      }}>{v.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.75 }}
                style={{
                  padding: "18px 22px",
                  border: `1px solid ${BORDER}`,
                  background: DIM,
                  marginTop: 4,
                }}
              >
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.56rem", letterSpacing: "0.22em",
                  textTransform: "uppercase", color: BLUE_LT,
                  marginBottom: 14,
                }}>
                  {t.about.servicesLabel}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.about.services.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.85 + i * 0.05 }}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem", fontWeight: 400,
                        color: SOFT,
                        padding: "5px 12px",
                        border: `1px solid ${BORDER}`,
                        borderRadius: 4,
                        background: BG,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute", bottom: 0, left: "clamp(28px, 8vw, 110px)", right: "clamp(28px, 8vw, 110px)",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)`,
            transformOrigin: "left",
          }}
        />

      </section>
    </>
  );
}