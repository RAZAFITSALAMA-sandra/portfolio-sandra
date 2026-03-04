const BLUE   = "#2563EB";
const BLUE_LT = "#60A5FA";
const BG     = "#06090F";
const BORDER = "#1E2D4A";

const ITEMS = [
  "React", "Node.js", "TypeScript", "MongoDB",
  "PostgreSQL", "Docker", "GraphQL", "REST API",
  "Express", "Redis", "JWT", "Tailwind",
];

export function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <>
      <style>{`
        @keyframes marquee-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* Outer wrapper — clips overflow and applies tilt */}
      <div style={{
        transform: "rotate(0deg)",
        width: "100%",
        marginLeft: "0%",
        overflow: "hidden",
        padding: "18px 0",
        background: BG,
        borderTop:    `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
        position: "relative",
        zIndex: 2,
        marginTop: 0,
        marginBottom: 0,
      }}>
        {/* Scrolling track */}
        <div style={{
          display: "flex",
          gap: 0,
          width: "max-content",
          animation: "marquee-rtl 22s linear infinite",
        }}>
          {repeated.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: i % 5 === 0 ? BLUE_LT : `rgba(238,242,255,0.12)`,
                whiteSpace: "nowrap",
                padding: "0 clamp(20px, 3vw, 40px)",
                lineHeight: 1,
              }}>
                {item}
              </span>
              {/* Separator dot */}
              <span style={{
                display: "inline-block",
                width: 6, height: 6,
                borderRadius: "50%",
                background: i % 5 === 0 ? BLUE : BORDER,
                flexShrink: 0,
                opacity: i % 5 === 0 ? 0.9 : 0.4,
              }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}