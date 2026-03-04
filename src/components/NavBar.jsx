import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "../hooks/useMobile.js";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";
const TEXT    = "#EEF2FF";
const SOFT    = "#94A3B8";
const BORDER  = "#1E2D4A";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Mono:wght@300&display=swap');`;

export function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isMobile                = useMobile(639);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <style>{`
        ${FONTS}
        @keyframes nav-fade-in {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: "fixed",
        top: scrolled ? 14 : 20,
        left: 0, right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 999,
        transition: "top 0.4s ease",
        animation: "nav-fade-in 0.6s ease both",
        animationDelay: "0.3s",
        padding: "0 16px",
      }}>
        <motion.nav
          animate={{
            backgroundColor: scrolled ? "rgba(6,9,15,0.82)" : "rgba(6,9,15,0)",
            backdropFilter:  scrolled ? "blur(20px) saturate(1.4)" : "blur(0px)",
            boxShadow:       scrolled ? `0 4px 32px rgba(0,0,0,0.5)` : "none",
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: isMobile ? "10px 16px" : "10px 20px",
            borderRadius: 9999,
            border: scrolled
              ? `1px solid rgba(30,45,74,0.95)`
              : `0.5px solid rgba(30,45,74,0.4)`,
            width: "100%",
            maxWidth: 760,
          }}
        >
          {/* Desktop logo */}
          {!isMobile && (
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.9rem", fontWeight: 700,
              color: TEXT, letterSpacing: "-0.01em",
              flexShrink: 0,
            }}>
              Sandra<span style={{ color: BLUE_LT }}>.</span>
            </span>
          )}

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {t.nav.map((lbl, i) => (
                <motion.button
                  key={i}
                  onClick={() => go(t.navIds[i])}
                  whileHover={{ color: TEXT, backgroundColor: `${BLUE}18` }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.7rem", fontWeight: 600,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: SOFT, padding: "7px 14px", borderRadius: 9999,
                    transition: "color 0.2s, background-color 0.2s",
                  }}
                >
                  {lbl}
                </motion.button>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-end",
            marginLeft: isMobile ? 0 : "auto",
          }}>
            {/* Mobile logo */}
            {isMobile && (
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.9rem", fontWeight: 700,
                color: TEXT, letterSpacing: "-0.01em",
              }}>
                Sandra<span style={{ color: BLUE_LT }}>.</span>
              </span>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Lang */}
              <motion.button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                whileHover={{ color: BLUE_LT }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "none", border: `1px solid ${BORDER}`,
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem", fontWeight: 300,
                  letterSpacing: "0.12em", color: SOFT,
                  padding: "5px 11px", borderRadius: 9999,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = BLUE_LT}
                onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
              >
                {lang === "fr" ? "EN" : "FR"}
              </motion.button>

              {/* Desktop hire CTA */}
              {!isMobile && (
                <motion.button
                  onClick={() => go("contact")}
                  whileHover={{ boxShadow: `0 0 20px ${BLUE}66`, backgroundColor: "#1D4ED8" }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    background: BLUE, border: "none", cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#fff", padding: "8px 18px", borderRadius: 9999,
                    transition: "all 0.22s",
                  }}
                >
                  {t.hero.hire}
                </motion.button>
              )}

              {/* Mobile burger */}
              {isMobile && (
                <button
                  onClick={() => setOpen(o => !o)}
                  style={{
                    background: "none",
                    border: `1px solid ${open ? BLUE_LT : BORDER}`,
                    cursor: "pointer", padding: "7px 10px",
                    borderRadius: 9999, display: "flex",
                    flexDirection: "column", gap: 4,
                    transition: "border-color 0.2s",
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={
                        open
                          ? i === 0 ? { rotate: 45, y: 5, width: 18 }
                          : i === 1 ? { opacity: 0 }
                          : { rotate: -45, y: -5, width: 18 }
                          : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 14 : 18 }
                      }
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "block", height: 1,
                        background: open ? BLUE_LT : SOFT,
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </button>
              )}
            </div>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 16, right: 16,
                background: "rgba(8,13,24,0.97)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                padding: "8px",
                display: "flex", flexDirection: "column", gap: 2,
              }}
            >
              {t.nav.map((lbl, i) => (
                <motion.button
                  key={i}
                  onClick={() => go(t.navIds[i])}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "0.9rem", fontWeight: 600,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: SOFT, padding: "14px 16px", borderRadius: 12,
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.background = `${BLUE}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = SOFT; e.currentTarget.style.background = "none"; }}
                >
                  {lbl}
                </motion.button>
              ))}
              <motion.button
                onClick={() => go("contact")}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: BLUE, border: "none",
                  cursor: "pointer", marginTop: 4,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#fff", padding: "14px 16px", borderRadius: 12,
                }}
              >
                {t.hero.hire}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}