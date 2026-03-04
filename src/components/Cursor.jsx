import { useEffect, useRef, useState } from "react";

const BLUE    = "#2563EB";
const BLUE_LT = "#60A5FA";

export function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: -200, y: -200 });
  const sm   = useRef({ x: -200, y: -200 });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove  = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const onOver  = (e) => {
      if (e.target.closest("a, button")) {
        if (ring.current) {
          ring.current.style.width       = "48px";
          ring.current.style.height      = "48px";
          ring.current.style.borderColor = BLUE_LT;
          ring.current.style.opacity     = "0.7";
        }
        if (dot.current) dot.current.style.background = BLUE_LT;
      }
    };

    const onOut   = () => {
      if (ring.current) {
        ring.current.style.width       = "32px";
        ring.current.style.height      = "32px";
        ring.current.style.borderColor = BLUE;
        ring.current.style.opacity     = "0.35";
      }
      if (dot.current) dot.current.style.background = BLUE;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    let raf;
    const loop = () => {
      sm.current.x += (pos.current.x - sm.current.x) * 0.1;
      sm.current.y += (pos.current.y - sm.current.y) * 0.1;
      const rw = parseFloat(ring.current?.style.width) || 32;
      if (dot.current)
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${sm.current.x - rw / 2}px, ${sm.current.y - rw / 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: BLUE,
          boxShadow: `0 0 8px ${BLUE}`,
          zIndex: 9999,
          pointerEvents: "none",
          transition: "background 0.2s",
        }}
      />
      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "32px", height: "32px",
          borderRadius: "50%",
          border: `1px solid ${BLUE}`,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0.35,
          transition: "width 0.25s, height 0.25s, border-color 0.25s, opacity 0.25s",
        }}
      />
    </>
  );
}