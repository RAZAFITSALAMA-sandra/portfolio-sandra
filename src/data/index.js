// ═══════════════════════════════════════════
// SKILLS DATA
// ═══════════════════════════════════════════

export const SKILLS_DATA = {
  Frontend: [
    { name: "React.js",         pct: 95, icon: "⚛",  color: "#61DAFB", years: "3 ans" },
    { name: "JavaScript ES6+",  pct: 92, icon: "JS", color: "#F7DF1E", years: "4 ans" },
    { name: "TypeScript",       pct: 80, icon: "TS", color: "#3178C6", years: "2 ans" },
    { name: "HTML5 / CSS3",     pct: 95, icon: "◈",  color: "#E34F26", years: "4 ans" },
    { name: "Tailwind CSS",     pct: 88, icon: "◈",  color: "#38BDF8", years: "2 ans" },
    { name: "Redux / Zustand",  pct: 82, icon: "⊡",  color: "#764ABC", years: "2 ans" },
  ],
  Backend: [
    { name: "Node.js",          pct: 90, icon: "⬡",  color: "#68A063", years: "3 ans" },
    { name: "Express.js",       pct: 88, icon: "∞",  color: "#ffffff", years: "3 ans" },
    { name: "MongoDB",          pct: 82, icon: "◉",  color: "#4DB33D", years: "2 ans" },
    { name: "PostgreSQL",       pct: 75, icon: "◉",  color: "#336791", years: "2 ans" },
    { name: "REST API",         pct: 92, icon: "⇄",  color: "#FF6B6B", years: "3 ans" },
    { name: "GraphQL",          pct: 70, icon: "◈",  color: "#E10098", years: "1 an" },
  ],
  Outils: [
    { name: "Git & GitHub",     pct: 90, icon: "⊙",  color: "#F05032", years: "4 ans" },
    { name: "Docker",           pct: 70, icon: "◻",  color: "#2496ED", years: "1 an" },
    { name: "Figma",            pct: 75, icon: "◈",  color: "#F24E1E", years: "2 ans" },
    { name: "Postman",          pct: 88, icon: "◉",  color: "#FF6C37", years: "3 ans" },
    { name: "Linux / Terminal", pct: 80, icon: "⊞",  color: "#FCC624", years: "3 ans" },
    { name: "VS Code",          pct: 98, icon: "◫",  color: "#007ACC", years: "4 ans" },
  ],
  Tools: [
    { name: "Git & GitHub",     pct: 90, icon: "⊙",  color: "#F05032", years: "4 yrs" },
    { name: "Docker",           pct: 70, icon: "◻",  color: "#2496ED", years: "1 yr"  },
    { name: "Figma",            pct: 75, icon: "◈",  color: "#F24E1E", years: "2 yrs" },
    { name: "Postman",          pct: 88, icon: "◉",  color: "#FF6C37", years: "3 yrs" },
    { name: "Linux / Terminal", pct: 80, icon: "⊞",  color: "#FCC624", years: "3 yrs" },
    { name: "VS Code",          pct: 98, icon: "◫",  color: "#007ACC", years: "4 yrs" },
  ],
};

// ═══════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════

export const PROJECTS_DATA = [
  {
    n: "01", title: "E-Commerce Platform", year: "2024", featured: true,
    descFr: "Plateforme e-commerce complète — catalogue produits, panier persistant, paiement Stripe, dashboard admin temps réel avec analytics.",
    descEn: "Full e-commerce platform — product catalog, persistent cart, Stripe payment, real-time admin dashboard with analytics.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "#", demo: "#",
  },
  {
    n: "02", title: "Task Manager Pro", year: "2024", featured: true,
    descFr: "Gestion de tâches collaboratif avec websockets, vues Kanban / timeline, notifications push et gestion d'équipes.",
    descEn: "Collaborative task management with websockets, Kanban / timeline views, push notifications and team management.",
    tech: ["React", "Socket.io", "Express", "PostgreSQL"],
    github: "#", demo: "#",
  },
  {
    n: "03", title: "Analytics Dashboard", year: "2023", featured: false,
    descFr: "Tableau de bord data pour réseaux sociaux — visualisations D3.js interactives, exports CSV et rapports automatisés.",
    descEn: "Social media data dashboard — interactive D3.js visualizations, CSV exports and automated reports.",
    tech: ["React", "D3.js", "Node.js", "REST API"],
    github: "#", demo: "#",
  },
  {
    n: "04", title: "Real-Time Chat", year: "2023", featured: false,
    descFr: "Messagerie chiffrée — rooms, partage de fichiers, indicateurs de présence, historique paginé.",
    descEn: "Encrypted messaging — rooms, file sharing, presence indicators, paginated history.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "#", demo: "#",
  },
  {
    n: "05", title: "API Microservices", year: "2023", featured: false,
    descFr: "Architecture microservices — auth JWT, rate limiting, queues Redis, documentation Swagger.",
    descEn: "Microservices architecture — JWT auth, rate limiting, Redis queues, Swagger docs.",
    tech: ["Node.js", "Docker", "Redis", "JWT"],
    github: "#", demo: "#",
  },
  {
    n: "06", title: "Portfolio Generator", year: "2022", featured: false,
    descFr: "Outil no-code — éditeur drag-and-drop, 12 templates, export PDF haute résolution.",
    descEn: "No-code tool — drag-and-drop editor, 12 templates, high-res PDF export.",
    tech: ["React", "TypeScript", "Canvas API"],
    github: "#", demo: "#",
  },
];

// ═══════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════

export const TRANSLATIONS = {
  fr: {
    nav: ["À propos", "Compétences", "Projets", "Contact"],
    navIds: ["about", "skills", "projects", "contact"],
    available: "Disponible",
    hero: {
      greeting: "Bonjour, je suis",
      role: "Développeuse Full Stack",
      sub: "React · Node.js · JavaScript",
      bio: "Je transforme des idées complexes en produits numériques élégants. Chaque ligne de code est une décision — je m'assure que les bonnes sont prises.",
      cta: "Voir mes projets",
      hire: "Me contacter",
    },
    about: {
      label: "01 · À propos",
      title: ["Du code qui a", "du sens."],
      p1: "Je suis Sandra Laëticia, développeuse full stack basée à Madagascar. Je conçois des applications modernes du frontend jusqu'à l'API — avec attention à la performance, l'accessibilité et l'expérience utilisateur.",
      p2: "Chaque projet est une opportunité de créer quelque chose qui dure. Je travaille avec précision, je communique avec clarté.",
      s1n: "3+",  s1l: "Ans d'expérience",
      s2n: "20+", s2l: "Projets livrés",
      s3n: "100%",s3l: "Satisfaction client",
      values: [
        { icon: "◎", title: "Code propre",          desc: "Chaque ligne compte. J'écris du code lisible, maintenable et scalable — pas juste du code qui fonctionne." },
        { icon: "◈", title: "Communication claire",  desc: "Je tiens mes clients informés à chaque étape. Pas de surprises, des livrables précis et dans les délais." },
        { icon: "⊙", title: "Orientée résultats",    desc: "Mon objectif : que votre produit fonctionne bien et serve vos utilisateurs, pas juste qu'il soit joli." },
      ],
      servicesLabel: "Services",
      services: ["Développement Fullstack", "API REST / GraphQL", "Applications React", "Backend Node.js", "Intégration UI/UX", "Mission Freelance"],
    },
    skills: {
      label: "02 · Compétences",
      title: ["Stack", "Technique"],
      tabs: ["Frontend", "Backend", "Outils"],
      tabKeys: ["Frontend", "Backend", "Outils"],
      explore: "Survolez pour explorer",
    },
    projects: {
      label: "03 · Projets",
      title: ["Mes", "réalisations"],
      code: "Code",
      demo: "Demo",
      featured: "Featured",
    },
    contact: {
      label: "04 · Contact",
      title: ["Travaillons", "ensemble."],
      sub: "Disponible pour des missions freelance, collaborations ou postes CDI.",
      namePh: "Votre nom",
      emailPh: "votre@email.com",
      msgPh: "Parlez-moi de votre projet…",
      send: "Envoyer",
      sent: "Envoyé ✓",
      loc: "Madagascar · Remote",
      email: "sandrarazafitsalama@gmail.com",
      phone: "+261 34 77 554 98",
    },
    footer: "Conçu & développé par Sandra Laëticia",
  },

  en: {
    nav: ["About", "Skills", "Projects", "Contact"],
    navIds: ["about", "skills", "projects", "contact"],
    available: "Available",
    hero: {
      greeting: "Hello, I am",
      role: "Full Stack Developer",
      sub: "React · Node.js · JavaScript",
      bio: "I turn complex ideas into elegant digital products. Every line of code is a decision — I make sure the right ones are made.",
      cta: "See my work",
      hire: "Hire me",
    },
    about: {
      label: "01 · About",
      title: ["Code that", "means something."],
      p1: "I'm Sandra Laëticia, a full stack developer based in Madagascar. I build modern applications from frontend to API — with focus on performance, accessibility and user experience.",
      p2: "Every project is a chance to create something that lasts. I work with precision, I communicate with clarity.",
      s1n: "3+",  s1l: "Years exp.",
      s2n: "20+", s2l: "Projects done",
      s3n: "100%",s3l: "Satisfaction",
      values: [
        { icon: "◎", title: "Clean code",           desc: "Every line matters. I write readable, maintainable and scalable code — not just code that works." },
        { icon: "◈", title: "Clear communication",  desc: "I keep clients informed at every step. No surprises, precise deliverables and on-time delivery." },
        { icon: "⊙", title: "Result-driven",        desc: "My goal: your product works well and serves your users — not just looks good." },
      ],
      servicesLabel: "Services",
      services: ["Fullstack Development", "REST / GraphQL API", "React Applications", "Node.js Backend", "UI/UX Integration", "Freelance Mission"],
    },
    skills: {
      label: "02 · Skills",
      title: ["Technical", "Stack"],
      tabs: ["Frontend", "Backend", "Tools"],
      tabKeys: ["Frontend", "Backend", "Tools"],
      explore: "Hover to explore",
    },
    projects: {
      label: "03 · Projects",
      title: ["My", "work"],
      code: "Code",
      demo: "Demo",
      featured: "Featured",
    },
    contact: {
      label: "04 · Contact",
      title: ["Let's work", "together."],
      sub: "Available for freelance, collaborations or full-time positions.",
      namePh: "Your name",
      emailPh: "your@email.com",
      msgPh: "Tell me about your project…",
      send: "Send",
      sent: "Sent ✓",
      loc: "Madagascar · Remote",
      email: "sandrarazafitsalama@gmail.com",
      phone: "+261 34 77 554 98",
    },
    footer: "Designed & developed by Sandra Laëticia",
  },
};