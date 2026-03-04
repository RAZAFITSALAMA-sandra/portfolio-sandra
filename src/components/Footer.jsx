import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BLUE = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG = "#06090F";
const BORDER = "#1E2D4A";
const TEXT = "#EEF2FF";
const SOFT = "#94A3B8";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300&display=swap');`;

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RAZAFITSALAMA-sandra" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sandra-laeticia/" },
];

export function Footer({ t }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const year = new Date().getFullYear();

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{FONTS}</style>

      <footer
        ref={ref}
        style={{
          background: BG,
          borderTop: `1px solid ${BORDER}`,
          padding:
            "clamp(40px,6vh,64px) clamp(28px,8vw,110px) clamp(24px,4vh,36px)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BLUE}66, transparent)`,
            transformOrigin: "left",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* ── Main row ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 40,
              marginBottom: 48,
            }}
          >
            {/* Logo + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => go("hero")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginBottom: 12,
                  display: "block",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: TEXT,
                  }}
                >
                  Sandra<span style={{ color: BLUE_LT, marginLeft: 2 }}>.</span>
                </span>
              </button>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: BORDER,
                  maxWidth: 220,
                  lineHeight: 1.7,
                }}
              >
                Fullstack Developer · Remote · Madagascar
              </p>
            </motion.div>

            {/* Nav links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: BLUE_LT,
                  marginBottom: 4,
                }}
              >
                Navigation
              </span>
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: SOFT,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = SOFT)}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: BLUE_LT,
                  marginBottom: 4,
                }}
              >
                Socials
              </span>
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: SOFT,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = SOFT)}
                >
                  {l.label} <span style={{ fontSize: "0.5rem" }}>↗</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.14em",
                color: BORDER,
              }}
            >
              © {year} Sandra Laëticia — {t.footer}
            </span>

            <button
              onClick={() => go("hero")}
              style={{
                background: "none",
                border: `1px solid ${BORDER}`,
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: SOFT,
                padding: "6px 14px",
                borderRadius: 9999,
                transition: "all 0.22s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = BLUE_LT;
                e.currentTarget.style.color = BLUE_LT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = SOFT;
              }}
            >
              ↑ Back to top
            </button>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
