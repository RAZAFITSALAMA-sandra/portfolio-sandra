import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Skills from "./components/Skills.jsx";
import { TRANSLATIONS, PROJECTS_DATA } from "./data/index.js";

// ── Design tokens ─────────────────────────────────
const GOLD       = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const GOLD_DARK  = "#A0782A";
const SAGE       = "#7A9E7E";

// ════════════════════════════════════════════════
// CUSTOM CURSOR
// ════════════════════════════════════════════════
function Cursor({ dark }) {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: -200, y: -200 });
  const sm   = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const mv = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => {
      if (e.target.closest("a,button")) {
        if (ring.current) {
          ring.current.style.width  = "52px";
          ring.current.style.height = "52px";
          ring.current.style.borderColor = GOLD;
          ring.current.style.opacity = "0.7";
        }
        if (dot.current) dot.current.style.background = GOLD;
      }
    };
    const out = () => {
      if (ring.current) {
        ring.current.style.width  = "34px";
        ring.current.style.height = "34px";
        ring.current.style.borderColor = dark ? "#fafafa" : "#0a0a0a";
        ring.current.style.opacity = "0.28";
      }
      if (dot.current) dot.current.style.background = dark ? "#fafafa" : "#0a0a0a";
    };
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    let raf;
    const loop = () => {
      sm.current.x += (pos.current.x - sm.current.x) * 0.1;
      sm.current.y += (pos.current.y - sm.current.y) * 0.1;
      const rw = parseFloat(ring.current?.style.width) || 34;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${sm.current.x - rw/2}px,${sm.current.y - rw/2}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, [dark]);

  return <>
    <div ref={dot} style={{ position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",
      background:dark?"#fafafa":"#0a0a0a",zIndex:9999,pointerEvents:"none",
      transition:"background 0.3s" }} />
    <div ref={ring} style={{ position:"fixed",top:0,left:0,
      width:"34px",height:"34px",borderRadius:"50%",
      border:`1px solid ${dark?"#fafafa":"#0a0a0a"}`,
      zIndex:9998,pointerEvents:"none",opacity:0.28,
      transition:"width 0.3s,height 0.3s,border-color 0.3s,opacity 0.3s" }} />
  </>;
}

// ════════════════════════════════════════════════
// NOISE GRAIN
// ════════════════════════════════════════════════
function Grain() {
  return (
    <svg style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",
      zIndex:1,pointerEvents:"none",opacity:0.032 }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ════════════════════════════════════════════════
// MARQUEE
// ════════════════════════════════════════════════
function Marquee({ dark }) {
  const items = ["React","Node.js","JavaScript","TypeScript","MongoDB","PostgreSQL","Docker","GraphQL","REST API","Figma","Express","Redis","JWT","Tailwind"];
  return (
    <div style={{ overflow:"hidden",
      borderTop:`1px solid ${dark?"#1c1c1c":"#e8e8e8"}`,
      borderBottom:`1px solid ${dark?"#1c1c1c":"#e8e8e8"}`,
      padding:"12px 0", position:"relative", zIndex:2 }}>
      <div style={{ display:"flex",gap:"48px",width:"max-content",animation:"marquee 28s linear infinite" }}>
        {[...items,...items,...items].map((item,i) => (
          <span key={i} style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.7rem",fontWeight:400,
            letterSpacing:"0.2em",textTransform:"uppercase",
            color: i%7===0 ? GOLD : (dark?"#252525":"#d0d0d0"),whiteSpace:"nowrap" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════
function Navbar({ dark, setDark, lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setOpen(false); };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4,0,0.2,1] }}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:500,
        padding:"0 48px",height:scrolled?"60px":"80px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?(dark?"rgba(8,8,8,0.97)":"rgba(252,252,252,0.97)"):"transparent",
        backdropFilter:scrolled?"blur(16px)":"none",
        borderBottom:scrolled?`1px solid ${dark?"#181818":"#ebebeb"}`:"none",
        transition:"all 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
      <button onClick={()=>go("hero")} style={{ background:"none",border:"none",cursor:"none",
        fontFamily:"'Cormorant Garamond',serif",fontSize:"1.45rem",fontWeight:700,
        color:dark?"#fafafa":"#0a0a0a",letterSpacing:"0.04em",display:"flex",alignItems:"center",gap:4 }}>
        SL<span style={{ width:6,height:6,borderRadius:"50%",background:GOLD,
          display:"inline-block",marginLeft:2,marginBottom:10,boxShadow:`0 0 8px ${GOLD}` }} />
      </button>

      <div style={{ display:"flex",gap:"32px",alignItems:"center" }} className="desk-only">
        {t.nav.map((lbl,i) => (
          <motion.button key={i} onClick={()=>go(t.navIds[i])}
            whileHover={{ y: -2 }}
            style={{ background:"none",border:"none",cursor:"none",
              fontFamily:"'Outfit',sans-serif",fontSize:"0.75rem",fontWeight:400,
              letterSpacing:"0.15em",textTransform:"uppercase",
              color:dark?"#666":"#999",transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color=GOLD}
            onMouseLeave={e=>e.currentTarget.style.color=dark?"#666":"#999"}>
            {lbl}
          </motion.button>
        ))}
      </div>

      <div style={{ display:"flex",gap:"12px",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:7,padding:"5px 14px",
          border:`1px solid ${SAGE}22`,background:`${SAGE}11`,borderRadius:20 }}
          className="desk-only">
          <span style={{ width:7,height:7,borderRadius:"50%",background:SAGE,
            animation:"pulse-sage 2s infinite" }} />
          <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.64rem",
            letterSpacing:"0.1em",textTransform:"uppercase",color:SAGE }}>{t.available}</span>
        </div>

        <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
          onClick={()=>setLang(lang==="fr"?"en":"fr")}
          style={{ background:"none",border:`1px solid ${dark?"#252525":"#e0e0e0"}`,
            padding:"5px 12px",cursor:"none",
            fontFamily:"'Outfit',sans-serif",fontSize:"0.7rem",fontWeight:500,
            letterSpacing:"0.1em",color:dark?"#666":"#999",transition:"all 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=dark?"#252525":"#e0e0e0";e.currentTarget.style.color=dark?"#666":"#999";}}>
          {lang==="fr"?"EN":"FR"}
        </motion.button>

        <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
          onClick={()=>setDark(!dark)}
          style={{ background:"none",border:`1px solid ${dark?"#252525":"#e0e0e0"}`,
            width:32,height:32,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"0.85rem",color:dark?"#666":"#999",transition:"border-color 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD}
          onMouseLeave={e=>e.currentTarget.style.borderColor=dark?"#252525":"#e0e0e0"}>
          {dark?"○":"●"}
        </motion.button>

        <button onClick={()=>setOpen(!open)} className="mob-only"
          style={{ background:"none",border:"none",cursor:"none",display:"none",
            flexDirection:"column",gap:5,padding:4 }}>
          {[26,18,26].map((w,i)=>(
            <span key={i} style={{ display:"block",height:"1px",width:w,
              background:dark?"#fafafa":"#0a0a0a" }} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            style={{ position:"absolute",top:"100%",left:0,right:0,
              background:dark?"rgba(8,8,8,0.98)":"rgba(252,252,252,0.98)",
              backdropFilter:"blur(20px)",
              borderBottom:`1px solid ${dark?"#181818":"#ebebeb"}`,
              padding:"20px 48px" }}>
            {t.nav.map((lbl,i)=>(
              <button key={i} onClick={()=>go(t.navIds[i])} style={{
                display:"block",background:"none",border:"none",cursor:"none",
                width:"100%",textAlign:"left",padding:"14px 0",
                fontFamily:"'Outfit',sans-serif",fontSize:"0.8rem",
                letterSpacing:"0.14em",textTransform:"uppercase",
                color:dark?"#666":"#999",
                borderBottom:`1px solid ${dark?"#111":"#f0f0f0"}`,
                transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color=GOLD}
              onMouseLeave={e=>e.target.style.color=dark?"#666":"#999"}>{lbl}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ════════════════════════════════════════════════
// TYPEWRITER
// ════════════════════════════════════════════════
function useTypewriter(words, speed=85, pause=2400) {
  const [text, setText]   = useState("");
  const [wi, setWi]       = useState(0);
  const [ci, setCi]       = useState(0);
  const [del, setDel]     = useState(false);
  useEffect(()=>{
    const w = words[wi];
    const t = setTimeout(()=>{
      if(!del){ setText(w.slice(0,ci+1)); if(ci+1===w.length) setTimeout(()=>setDel(true),pause); else setCi(c=>c+1); }
      else { setText(w.slice(0,ci-1)); if(ci-1===0){setDel(false);setWi(i=>(i+1)%words.length);setCi(0);} else setCi(c=>c-1); }
    }, del?speed/2:speed);
    return ()=>clearTimeout(t);
  },[ci,del,wi,words,speed,pause]);
  return text;
}

// ════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════
function Hero({ dark, t, lang }) {
  const tw = useTypewriter(
    lang==="fr"
      ? ["Développeuse React.","Développeuse Node.js.","Architecte d'apps.","Passionnée du code."]
      : ["React Developer.","Node.js Developer.","App Architect.","Code Passionate."]
  );

  return (
    <section id="hero" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",
      justifyContent:"flex-end",padding:"0 48px 88px",position:"relative",overflow:"hidden",zIndex:2 }}>

      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:3,
        background:`linear-gradient(to bottom, transparent 10%, ${GOLD} 40%, ${GOLD_LIGHT} 70%, transparent 90%)`,
        opacity:0.5 }} />

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:1.2, delay:0.6 }}
        style={{ position:"absolute",top:"50%",right:"3vw",transform:"translateY(-52%)",
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(140px,20vw,300px)",fontWeight:700,lineHeight:1,
          color:"transparent",
          WebkitTextStroke:`1px ${dark?"#1c1c1c":"#e5e5e5"}`,
          userSelect:"none",pointerEvents:"none",letterSpacing:"-0.04em" }}>SL</motion.div>

      <div style={{ position:"absolute",top:"15%",right:"15%",width:200,height:200,borderRadius:"50%",
        background:`radial-gradient(circle, ${GOLD}12 0%, transparent 70%)`,pointerEvents:"none" }} />

      <div style={{ maxWidth:820,position:"relative",zIndex:1 }}>
        <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.7}}
          style={{ display:"flex",alignItems:"center",gap:12,marginBottom:28 }}>
          <motion.div style={{width:32,height:1,background:GOLD}}
            initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:0.6,delay:0.2}} />
          <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.75rem",fontWeight:400,
            letterSpacing:"0.22em",textTransform:"uppercase",color:GOLD }}>{t.hero.greeting}</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.1,ease:[0.4,0,0.2,1]}}
          style={{ fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(3.5rem,9vw,8rem)",fontWeight:300,lineHeight:0.92,
            letterSpacing:"-0.025em",color:dark?"#fafafa":"#0a0a0a",marginBottom:4 }}>
          Sandra
        </motion.h1>
        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.17,ease:[0.4,0,0.2,1]}}
          style={{ fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(3.5rem,9vw,8rem)",fontWeight:700,lineHeight:0.92,
            letterSpacing:"-0.025em",
            color: dark ? "#fafafa" : "#0a0a0a", // Couleur unie au lieu du gradient
            marginBottom:40 }}>
          Laëticia
        </motion.h1>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.6,delay:0.25}}
          style={{ marginBottom:10 }}>
          <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.72rem",fontWeight:600,
            letterSpacing:"0.2em",textTransform:"uppercase",
            padding:"4px 14px",border:`1px solid ${GOLD}55`,background:`${GOLD}0d`,color:GOLD }}>
            {t.hero.role}
          </span>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
          style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(1rem,1.8vw,1.2rem)",
            fontWeight:300,color:dark?"#555":"#aaa",marginBottom:28,minHeight:"1.8em" }}>
          {tw}<span style={{ animation:"blink 0.9s step-end infinite",color:GOLD }}>|</span>
        </motion.div>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.7,delay:0.38,ease:[0.4,0,0.2,1]}}
          style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(0.9rem,1.3vw,1.05rem)",
            fontWeight:300,lineHeight:1.9,color:dark?"#666":"#888",
            maxWidth:480,marginBottom:52 }}>
          {t.hero.bio}
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{duration:0.6,delay:0.46}}
          style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
          <motion.button whileHover={{y:-3,boxShadow:`0 16px 40px ${GOLD}45`}}
            whileTap={{scale:0.97}}
            onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            style={{ padding:"15px 40px",border:`1px solid ${GOLD}`,
              background:`linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`,
              color:"#0a0a0a",fontFamily:"'Outfit',sans-serif",fontWeight:600,
              fontSize:"0.75rem",letterSpacing:"0.18em",textTransform:"uppercase",cursor:"none",
              boxShadow:`0 8px 30px ${GOLD}30`,transition:"box-shadow 0.3s" }}>
            {t.hero.cta}
          </motion.button>
          <motion.button whileHover={{y:-3}} whileTap={{scale:0.97}}
            onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{ padding:"15px 40px",border:`1px solid ${dark?"#2a2a2a":"#e0e0e0"}`,
              background:"transparent",color:dark?"#888":"#777",
              fontFamily:"'Outfit',sans-serif",fontWeight:500,
              fontSize:"0.75rem",letterSpacing:"0.18em",textTransform:"uppercase",cursor:"none",
              transition:"all 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=dark?"#fafafa":"#0a0a0a";e.currentTarget.style.color=dark?"#fafafa":"#0a0a0a";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=dark?"#2a2a2a":"#e0e0e0";e.currentTarget.style.color=dark?"#888":"#777";}}>
            {t.hero.hire}
          </motion.button>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
        style={{ position:"absolute",bottom:44,right:48,
          display:"flex",flexDirection:"column",alignItems:"center",gap:10,zIndex:1 }}>
        <motion.div style={{ width:1,background:`linear-gradient(to bottom, ${GOLD}, transparent)` }}
          initial={{height:0}} animate={{height:60}} transition={{duration:1.5,delay:1.2,ease:[0.4,0,0.2,1]}} />
        <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.58rem",
          letterSpacing:"0.25em",textTransform:"uppercase",color:dark?"#333":"#ccc",
          writingMode:"vertical-rl" }}>scroll</span>
      </motion.div>
    </section>
  );
}

// ════════════════════════════════════════════════
// ABOUT - AVEC VOTRE PHOTO
// ════════════════════════════════════════════════
function About({ dark, t }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 });
  const border = dark?"#181818":"#e8e8e8";

  return (
    <section id="about" ref={ref} style={{ padding:"130px 48px",position:"relative",zIndex:2 }}>
      <div style={{ position:"absolute",top:60,right:48,
        fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(80px,11vw,150px)",
        fontWeight:700,lineHeight:1,color:"transparent",
        WebkitTextStroke:`1px ${dark?"#111":"#f0f0f0"}`,
        userSelect:"none",pointerEvents:"none" }}>01</div>

      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
          transition={{duration:0.6}}
          style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <motion.div style={{width:24,height:1,background:GOLD}}
            initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{duration:0.6,delay:0.2}} />
          <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:500,
            letterSpacing:"0.22em",textTransform:"uppercase",color:GOLD }}>{t.about.label}</span>
        </motion.div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start" }}>
          <div>
            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.85,delay:0.1,ease:[0.4,0,0.2,1]}}
              style={{ fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(2.2rem,4.5vw,4rem)",fontWeight:300,lineHeight:1.05,
                color:dark?"#fafafa":"#0a0a0a",marginBottom:44 }}>
              {t.about.title[0]}<br/>
              <span style={{ fontWeight:700,
                background:`linear-gradient(135deg, ${dark?"#fafafa":"#0a0a0a"} 30%, ${GOLD} 100%)`,
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                {t.about.title[1]}
              </span>
            </motion.h2>

            {/* PHOTO - AVEC VOTRE IMAGE */}
            <motion.div 
              initial={{opacity:0}} 
              animate={inView?{opacity:1}:{}}
              transition={{duration:0.9,delay:0.25}}
              style={{ 
                width:"100%",
                maxWidth:320,
                aspectRatio:"3/4",
                borderRadius: "8px",
                border:`1px solid ${border}`,
                position:"relative",
                overflow:"hidden",
                boxShadow: `0 20px 40px -15px ${dark ? '#00000080' : '#00000020'}`,
              }}
            >
              {/* VOTRE PHOTO - chemin public/photo.jpg */}
              <img 
                src="/photo.jpg" 
                alt="Sandra Laëticia"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              
              {/* Coins décoratifs en or */}
              <motion.div 
                style={{ 
                  position:"absolute",
                  top:0,
                  right:0,
                  width:36,
                  height:36,
                  borderTop:`2px solid ${GOLD}`,
                  borderRight:`2px solid ${GOLD}`,
                  zIndex:2,
                }}
                initial={{opacity:0}} 
                animate={inView?{opacity:1}:{}} 
                transition={{delay:0.8}} 
              />
              <motion.div 
                style={{ 
                  position:"absolute",
                  bottom:0,
                  left:0,
                  width:36,
                  height:36,
                  borderBottom:`2px solid ${GOLD}`,
                  borderLeft:`2px solid ${GOLD}`,
                  zIndex:2,
                }}
                initial={{opacity:0}} 
                animate={inView?{opacity:1}:{}} 
                transition={{delay:0.9}} 
              />
            </motion.div>
          </div>

          <div style={{ paddingTop:80 }}>
            {[t.about.p1, t.about.p2].map((p,i)=>(
              <motion.p key={i} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
                transition={{duration:0.8,delay:0.25+i*0.12,ease:[0.4,0,0.2,1]}}
                style={{ fontFamily:"'Outfit',sans-serif",fontSize:"1rem",fontWeight:300,
                  lineHeight:1.95,color:dark?"#777":"#555",marginBottom:i===0?22:56 }}>{p}</motion.p>
            ))}

            {/* STATS */}
            <motion.div 
              initial={{opacity:0}} 
              animate={inView?{opacity:1}:{}}
              transition={{duration:0.9,delay:0.5}}
              style={{ 
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"1px",
                background:border,
                border:`1px solid ${border}`
              }}
            >
              {[
                [t.about.s1n, t.about.s1l],
                [t.about.s2n, t.about.s2l], 
                [t.about.s3n, t.about.s3l]
              ].map(([n,l],i)=>(
                <motion.div 
                  key={i} 
                  whileHover={{background:dark?"#100f08":"#fffdf5"}}
                  style={{ 
                    padding:"28px 16px",
                    textAlign:"center",
                    background:dark?"#0a0a0a":"#fafafa",
                    transition:"background 0.2s" 
                  }}
                >
                  <div style={{ 
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"2.8rem",
                    fontWeight:300,
                    lineHeight:1,
                    background:`linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                    WebkitBackgroundClip:"text",
                    WebkitTextFillColor:"transparent"
                  }}>
                    {n}
                  </div>
                  <div style={{ 
                    fontFamily:"'Outfit',sans-serif",
                    fontSize:"0.62rem",
                    letterSpacing:"0.16em",
                    textTransform:"uppercase",
                    color:dark?"#333":"#bbb",
                    marginTop:8 
                  }}>
                    {l}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════
function ProjectCard({ p, dark, t, lang, i }) {
  const [hov, setHov] = useState(false);
  const border = dark?"#141414":"#e8e8e8";

  return (
    <motion.div
      initial={{opacity:0,y:60,scale:0.94}}
      whileInView={{opacity:1,y:0,scale:1}}
      viewport={{once:true,amount:0.1}}
      transition={{duration:0.7,delay:i*0.07,ease:[0.4,0,0.2,1]}}
      whileHover={{y:-8,boxShadow:`0 24px 60px ${GOLD}12`}}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      style={{ padding:32,border:`1px solid ${hov?GOLD+"55":border}`,
        background:hov?(dark?"#0d0c08":"#fffdf8"):(dark?"#0a0a0a":"#fafafa"),
        position:"relative",overflow:"hidden",cursor:"none",
        transition:"border-color 0.3s,background 0.3s" }}>

      <motion.div style={{ position:"absolute",top:0,left:0,right:0,height:2,borderRadius:"0",
        background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)`,transformOrigin:"left" }}
        initial={{scaleX:0}} animate={{scaleX:hov?1:0}} transition={{duration:0.4}} />

      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",
          fontWeight:300,color:dark?"#1e1e1e":"#e8e8e8" }}>{p.n}</span>
        {p.featured && (
          <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.6rem",fontWeight:500,
            letterSpacing:"0.14em",textTransform:"uppercase",
            padding:"3px 10px",border:`1px solid ${GOLD}44`,background:`${GOLD}0d`,color:GOLD }}>
            {t.projects.featured}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily:"'Cormorant Garamond',serif",
        fontSize:"clamp(1.3rem,2vw,1.7rem)",fontWeight:400,
        color:hov?GOLD:(dark?"#fafafa":"#0a0a0a"),marginBottom:8,transition:"color 0.3s" }}>{p.title}</h3>
      <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",
        color:dark?"#333":"#ccc",letterSpacing:"0.1em",marginBottom:14,display:"block" }}>— {p.year}</span>

      <p style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.85rem",fontWeight:300,
        lineHeight:1.75,color:dark?"#555":"#888",marginBottom:20,
        opacity:hov?1:0.75,transition:"opacity 0.3s" }}>
        {lang==="fr"?p.descFr:p.descEn}
      </p>

      <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:20 }}>
        {p.tech.map(tc=>(
          <motion.span key={tc} whileHover={{borderColor:GOLD,color:GOLD}}
            style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",fontWeight:400,
              letterSpacing:"0.12em",textTransform:"uppercase",
              padding:"3px 10px",border:`1px solid ${hov?GOLD+"33":(dark?"#1a1a1a":"#e8e8e8")}`,
              color:hov?GOLD:(dark?"#444":"#999"),transition:"all 0.3s" }}>{tc}</motion.span>
        ))}
      </div>

      <motion.div style={{ display:"flex",gap:20 }}
        initial={{opacity:0,y:6}} animate={{opacity:hov?1:0,y:hov?0:6}} transition={{duration:0.3}}>
        {[[t.projects.code,p.github],[t.projects.demo,p.demo]].map(([lbl,href])=>(
          <motion.a key={lbl} href={href} whileHover={{x:3}}
            style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.7rem",fontWeight:500,
              letterSpacing:"0.14em",textTransform:"uppercase",
              color:GOLD,textDecoration:"none",display:"flex",alignItems:"center",gap:6 }}>
            ↗ {lbl}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function Projects({ dark, t, lang }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 });
  return (
    <section id="projects" style={{ padding:"130px 48px",position:"relative",zIndex:2 }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div ref={ref} style={{ marginBottom:60 }}>
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
            style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
            <motion.div style={{width:24,height:1,background:GOLD}}
              initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{delay:0.2}} />
            <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:500,
              letterSpacing:"0.22em",textTransform:"uppercase",color:GOLD }}>{t.projects.label}</span>
          </motion.div>
          <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
            transition={{duration:0.8,delay:0.1,ease:[0.4,0,0.2,1]}}
            style={{ fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:300,color:dark?"#fafafa":"#0a0a0a" }}>
            {t.projects.title[0]}{" "}
            <span style={{ fontWeight:700,
              background:`linear-gradient(135deg, ${dark?"#fafafa":"#0a0a0a"} 30%, ${GOLD} 100%)`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
              {t.projects.title[1]}
            </span>
          </motion.h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1px",
          background:dark?"#141414":"#e8e8e8" }}>
          {PROJECTS_DATA.map((p,i)=>(
            <ProjectCard key={p.n} p={p} dark={dark} t={t} lang={lang} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════
// CONTACT - AVEC VOS LIENS
// ════════════════════════════════════════════════
function Contact({ dark, t }) {
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.1 });
  const [form, setForm] = useState({ name:"",email:"",msg:"" });
  const [sent, setSent] = useState(false);
  const border = dark?"#141414":"#e8e8e8";

  const inp = {
    width:"100%",background:"none",border:"none",
    borderBottom:`1px solid ${dark?"#1e1e1e":"#e0e0e0"}`,
    padding:"16px 0",color:dark?"#fafafa":"#0a0a0a",
    fontFamily:"'Outfit',sans-serif",fontSize:"0.92rem",fontWeight:300,
    outline:"none",transition:"border-color 0.25s",boxSizing:"border-box",
  };

  return (
    <section id="contact" ref={ref} style={{ padding:"130px 48px",
      background:dark?"#060606":"#f7f7f5",
      borderTop:`1px solid ${border}`,position:"relative",zIndex:2 }}>

      <div style={{ position:"absolute",bottom:"10%",right:"8%",width:300,height:300,borderRadius:"50%",
        background:`radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`,pointerEvents:"none" }} />

      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"start" }}>
          <div>
            <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
              style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
              <motion.div style={{width:24,height:1,background:GOLD}}
                initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{delay:0.2}} />
              <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:500,
                letterSpacing:"0.22em",textTransform:"uppercase",color:GOLD }}>{t.contact.label}</span>
            </motion.div>

            <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.85,delay:0.1}}
              style={{ fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(2.2rem,4.5vw,4rem)",fontWeight:300,lineHeight:1.05,
                color:dark?"#fafafa":"#0a0a0a",marginBottom:24 }}>
              {t.contact.title[0]}<br/>
              <span style={{ fontWeight:700,
                background:`linear-gradient(135deg, ${dark?"#fafafa":"#0a0a0a"} 30%, ${GOLD} 100%)`,
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                {t.contact.title[1]}
              </span>
            </motion.h2>

            <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.2}}
              style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.98rem",fontWeight:300,
                lineHeight:1.85,color:dark?"#555":"#888",marginBottom:52 }}>{t.contact.sub}</motion.p>

            {/* LOCALISATION */}
            {["◎", t.contact.loc, ""].map((icon,main,sub) => (
              <motion.div key="loc" initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
                transition={{delay:0.3}}
                style={{ display:"flex",gap:18,padding:"18px 0",borderBottom:`1px solid ${border}` }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",
                  color:GOLD,flexShrink:0,paddingTop:2 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.88rem",fontWeight:400,
                    color:dark?"#ccc":"#333" }}>{main}</div>
                </div>
              </motion.div>
            ))}

            {/* EMAIL - avec lien mailto */}
            <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
              transition={{delay:0.42}}
              style={{ display:"flex",gap:18,padding:"18px 0",borderBottom:`1px solid ${border}` }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",
                color:GOLD,flexShrink:0,paddingTop:2 }}>✉</span>
              <div>
                <a 
                  href="mailto:sandrarazafitsalama@gmail.com"
                  style={{ 
                    fontFamily:"'Outfit',sans-serif",
                    fontSize:"0.88rem",
                    fontWeight:400,
                    color:dark?"#ccc":"#333",
                    textDecoration:"none",
                    transition:"color 0.2s",
                  }}
                  onMouseEnter={e=>e.target.style.color=GOLD}
                  onMouseLeave={e=>e.target.style.color=dark?"#ccc":"#333"}
                >
                  sandrarazafitsalama@gmail.com
                </a>
              </div>
            </motion.div>

            {/* WHATSAPP - avec lien direct */}
            <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
              transition={{delay:0.54}}
              style={{ display:"flex",gap:18,padding:"18px 0",borderBottom:`1px solid ${border}` }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",
                color:GOLD,flexShrink:0,paddingTop:2 }}>◌</span>
              <div>
                <a 
                  href="https://wa.me/261347755498"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    fontFamily:"'Outfit',sans-serif",
                    fontSize:"0.88rem",
                    fontWeight:400,
                    color:dark?"#ccc":"#333",
                    textDecoration:"none",
                    transition:"color 0.2s",
                  }}
                  onMouseEnter={e=>e.target.style.color=GOLD}
                  onMouseLeave={e=>e.target.style.color=dark?"#ccc":"#333"}
                >
                  +261 34 77 554 98
                </a>
                <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",
                  color:dark?"#333":"#bbb",marginTop:3 }}>WhatsApp</div>
              </div>
            </motion.div>

            {/* RÉSEAUX SOCIAUX - avec vos liens */}
            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.7}}
              style={{ display:"flex",gap:20,marginTop:36 }}>
              
              {/* LinkedIn */}
              <motion.a 
                href="https://www.linkedin.com/in/sandra-laeticia/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{x:3,color:GOLD}}
                style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:400,
                  letterSpacing:"0.14em",textTransform:"uppercase",
                  color:dark?"#333":"#bbb",textDecoration:"none" }}>
                LinkedIn ↗
              </motion.a>
              
              {/* GitHub */}
              <motion.a 
                href="https://github.com/RAZAFITSALAMA-sandra"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{x:3,color:GOLD}}
                style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:400,
                  letterSpacing:"0.14em",textTransform:"uppercase",
                  color:dark?"#333":"#bbb",textDecoration:"none" }}>
                GitHub ↗
              </motion.a>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.4}}
            style={{ paddingTop:80 }}>
            {[{key:"name",ph:t.contact.namePh,multi:false},{key:"email",ph:t.contact.emailPh,multi:false},{key:"msg",ph:t.contact.msgPh,multi:true}]
              .map(f=>(
              <div key={f.key} style={{ marginBottom:28 }}>
                {f.multi?(
                  <textarea value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    placeholder={f.ph} rows={5} style={{...inp,resize:"none",display:"block"}}
                    onFocus={e=>e.target.style.borderBottomColor=GOLD}
                    onBlur={e=>e.target.style.borderBottomColor=dark?"#1e1e1e":"#e0e0e0"} />
                ):(
                  <input value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                    placeholder={f.ph} style={inp}
                    onFocus={e=>e.target.style.borderBottomColor=GOLD}
                    onBlur={e=>e.target.style.borderBottomColor=dark?"#1e1e1e":"#e0e0e0"} />
                )}
              </div>
            ))}

            <motion.button
              whileHover={!sent?{y:-3,boxShadow:`0 12px 40px ${GOLD}40`}:{}}
              whileTap={{scale:0.97}}
              onClick={()=>{
                // Simulation d'envoi (à remplacer par EmailJS plus tard)
                setSent(true);
                setForm({name:"",email:"",msg:""});
                setTimeout(()=>setSent(false),4000);
              }}
              style={{ padding:"15px 44px",cursor:"none",
                fontFamily:"'Outfit',sans-serif",fontWeight:600,
                fontSize:"0.75rem",letterSpacing:"0.18em",textTransform:"uppercase",
                border:`1px solid ${GOLD}`,
                background:sent?`linear-gradient(135deg, ${GOLD_DARK}, ${GOLD})`:"transparent",
                color:sent?"#0a0a0a":GOLD,
                boxShadow:sent?`0 8px 30px ${GOLD}35`:"none",
                transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
              {sent?t.contact.sent:t.contact.send+" →"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════
export default function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang];

  return (
    <div style={{ background:dark?"#0a0a0a":"#fafafa",color:dark?"#fafafa":"#0a0a0a",
      minHeight:"100vh",transition:"background 0.5s,color 0.5s",cursor:"none",overflowX:"hidden" }}>

      <style>{`
        ::placeholder { color:${dark?"#1e1e1e":"#d0d0d0"} !important; font-family:'Outfit',sans-serif; font-weight:300; }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-33.333%);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes pulse-sage {
          0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(122,158,126,.4);}
          50%{opacity:.8;box-shadow:0 0 0 6px rgba(122,158,126,0);}
        }
        @media(max-width:900px){
          .desk-only{display:none!important;}
          .mob-only{display:flex!important;}
          section{padding-left:24px!important;padding-right:24px!important;}
        }
      `}</style>

      <Grain />
      <Cursor dark={dark} />
      <Navbar dark={dark} setDark={setDark} lang={lang} setLang={setLang} t={t} />
      <Hero dark={dark} t={t} lang={lang} />
      <Marquee dark={dark} />
      <About dark={dark} t={t} />
      <Skills dark={dark} t={t} />
      <Projects dark={dark} t={t} lang={lang} />
      <Contact dark={dark} t={t} />

      <footer style={{ padding:"28px 48px",display:"flex",justifyContent:"space-between",
        alignItems:"center",flexWrap:"wrap",gap:10,
        borderTop:`1px solid ${dark?"#111":"#ebebeb"}`,position:"relative",zIndex:2 }}>
        <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"0.68rem",fontWeight:300,
          letterSpacing:"0.1em",color:dark?"#2a2a2a":"#d0d0d0" }}>
          {t.footer} — {new Date().getFullYear()}
        </span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",
          fontWeight:700,color:GOLD,letterSpacing:"0.04em" }}>
          SL<span style={{ width:5,height:5,borderRadius:"50%",background:GOLD,
            display:"inline-block",marginLeft:2,marginBottom:8,boxShadow:`0 0 8px ${GOLD}` }} />
        </span>
      </footer>
    </div>
  );
}