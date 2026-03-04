import { useState } from "react";
import { TRANSLATIONS } from "./data/index.js";
import { Hero } from "./components/Hero.jsx";
import { Cursor } from "./components/Cursor.jsx";
import Skills from "./components/Skills.jsx";
import { Navbar } from "./components/NavBar.jsx";
import { Marquee } from "./components/Marquee.jsx";
import { About } from "./components/About.jsx";
import { Projects } from "./components/Projects.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import { useMobile } from "./hooks/useMobile.js";

export default function App() {
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang];
  const isMobile = useMobile();

  return (
    <div
      style={{
        background: "#06090F",
        color: "#EEF2FF",
        minHeight: "100vh",
        cursor: "default",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {!isMobile && <Cursor />}
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} isMobile={isMobile} />
      <Marquee />
      <About t={t} />
      <Skills t={t} />
      <Projects t={t} lang={lang} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
