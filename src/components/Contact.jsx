import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMobile } from "../hooks/useMobile.js";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG      = "#06090F";
const DIM     = "#0B1120";
const BORDER  = "#1E2D4A";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400&family=DM+Mono:wght@300&display=swap');`;

const LINKS = [
  { label: "Email",    value: "sandralaeticiarazafitsalama@gmail.com", href: "mailto:sandralaeticiarazafitsalama@gmail.com", icon: "✉" },
  { label: "LinkedIn", value: "linkedin.com/in/sandra-laeticia",        href: "https://www.linkedin.com/in/sandra-laeticia/", icon: "↗" },
  { label: "GitHub",   value: "github.com/RAZAFITSALAMA-sandra",        href: "https://github.com/RAZAFITSALAMA-sandra", icon: "↗" },
  { label: "WhatsApp", value: "+261 34 77 554 98",                      href: "https://wa.me/261347755498", icon: "◌" },
];

export function Contact({ t }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const isMobile = useMobile();

  return (
    <>
      <style>{FONTS}</style>

      <section
        id="contact"
        ref={ref}
        style={{
          background: DIM,
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
          04
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
              {t.contact.label}
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
              {t.contact.title[0]}
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden", marginBottom: 72 }}>
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
              {t.contact.title[1]}
            </motion.h2>
          </div>

          {/* ── Main grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : "clamp(40px,8vw,100px)",
            alignItems: "start",
          }}>

            {/* LEFT — tagline + availability */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.95rem,2vw,1.15rem)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: SOFT,
                  maxWidth: 400,
                  marginBottom: 48,
                }}
              >
                {t.contact.sub}
              </motion.p>

              {/* Availability card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 24px",
                  border: `1px solid ${BORDER}`,
                  background: BG,
                  borderRadius: 4,
                  marginBottom: 48,
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#4ADE80",
                  boxShadow: "0 0 12px #4ADE80",
                  animation: "ping 2.4s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.78rem", fontWeight: 700,
                    color: TEXT, marginBottom: 2,
                  }}>
                    {t.available}
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.56rem", letterSpacing: "0.12em",
                    color: SOFT,
                  }}>
                    Remote · Madagascar · UTC+3
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.56rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: BORDER,
                }}>
                  {t.contact.loc}
                </span>
              </motion.div>
            </div>

            {/* RIGHT — contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.1 }}
                  whileHover={{ borderColor: `${BLUE}66`, background: "#0D1525" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "20px 22px",
                    border: `1px solid ${BORDER}`,
                    background: BG,
                    textDecoration: "none",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.22s",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                >
                  {/* Left accent on hover */}
                  <motion.div
                    style={{
                      position: "absolute", top: 0, left: 0, bottom: 0,
                      width: 2,
                      background: `linear-gradient(to bottom, ${BLUE}, ${BLUE_LT})`,
                      transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.25 }}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.56rem", letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: BORDER,
                      minWidth: 64,
                    }}>
                      {link.label}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(0.72rem,1.4vw,0.85rem)",
                      fontWeight: 300,
                      color: SOFT,
                      wordBreak: "break-all",
                      overflow: "hidden",
                      textOverflow: isMobile ? "ellipsis" : "unset",
                      whiteSpace: isMobile ? "nowrap" : "normal",
                      maxWidth: isMobile ? "160px" : "none",
                    }}>
                      {link.value}
                    </span>
                  </div>

                  <motion.span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.9rem",
                      color: BLUE_LT,
                      flexShrink: 0,
                    }}
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes ping {
            0%,100% { opacity: 1; box-shadow: 0 0 12px #4ADE80; }
            50%      { opacity: 0.7; box-shadow: 0 0 24px #4ADE80, 0 0 6px #4ADE80; }
          }
        `}</style>
      </section>
    </>
  );
}