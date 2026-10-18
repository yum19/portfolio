import { useState, useEffect, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import ITModels3D from "./ITModels3D";
import {
  SiKubernetes,
  SiDocker,
  SiOpenstack,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiNginx,
  SiHelm,
  SiJenkins,
  SiTraefikproxy,
  SiReact,
  SiNodedotjs,
  SiAngular,
  SiSpringboot,
  SiExpress,
  SiSymfony,
  SiLaravel,
  SiFlask,
  SiFlutter,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiPython,
  SiCplusplus,
  SiPhp,
  SiTypescript,
  SiJavascript,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGit,
  SiFigma,
  SiPostman,
  SiArduino,
  SiAnthropic,
  SiChartdotjs,
  SiDotnet,
} from "react-icons/si";
import { FaLinkedin, FaGithub, FaJava, FaDownload, FaAws } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { IoMail, IoCall, IoSunny, IoMoon } from "react-icons/io5";

/* ══════════════════════════════════════════════════════════════
   TRANSLATIONS DICTIONARY (EN & FR)
══════════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  EN: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      projects: "PROJECTS",
      skills: "SKILLS",
      experience: "EXPERIENCE",
      contact: "CONTACT",
      downloadCV: "Download CV",
      letsTalk: "Let's Talk ↗",
    },
    hero: {
      hi: "Hi, I'm",
      title1: "Yomna",
      title2: "Bouallegue",
      role: "Cloud Computing Engineering Student · ESPRIT (3rd year)",
      desc1: "I build ",
      descCloud: "cloud-native",
      descMid: " systems, ",
      descFullStack: "full-stack",
      descAnd: " platforms, and ",
      descAi: "AI-powered",
      descEnd: " apps that actually ship.",
      location: "✦ Tunis, Tunisia · open to internships ♡",
      exploreBtn: "Explore My Work ↗",
      downloadCV: "Download CV",
      terminalSchool: '"ESPRIT – Cloud Computing (3rd year)"',
      terminalPassion: '"building cloud-native platforms"',
    },
    about: {
      title: "About me ☆",
      p1_1: "3rd-year ",
      p1_cloud: "Cloud Computing Engineering",
      p1_2: " student at ESPRIT Tunis.",
      p2: "I love building things — from deploying OpenStack private clouds and Kubernetes clusters, to shipping full-stack platforms (Laravel, React, Spring Boot, Node.js, .NET, C#) and integrating AI into real products.",
      p3: "Also a fantasy fiction enthusiast who believes strong female leads and clean deployments have a lot in common ☕",
      getInTouch: "Get in touch ↗",
      statProjects: "Major Projects",
      statStacks: "Tech Stacks",
      statInternships: "Internships",
      statLove: "Love for Code",
      drivesTitle: "What\ndrives\nme →",
      note1Title: "Curious", note1Text: "I ask questions and never stop learning.",
      note2Title: "Builder", note2Text: "From code to cloud — I turn ideas into products.",
      note3Title: "Cloud",   note3Text: "Cloud-native at heart: K8s, Docker, AWS, OpenStack.",
      note4Title: "AI-First",note4Text: "I weave AI APIs into every platform I build.",
    },
    projects: {
      title: "Projects",
      tagline: "Things I've built and shipped ♡",
      edoraTitle: "Edora LMS",
      edoraSub: "Analytics Portal for Moodle LMS",
      edoraDesc: "Built a Laravel 13 API backend & React 19/TypeScript SPA extending Moodle LMS with a separate analytics platform. Implemented Moodle-native auth (Web Services token exchange, Sanctum), scheduled sync jobs to PostgreSQL, and production deployment on Azure K3s with Jenkins CI/CD & Prometheus/Grafana.",
      edoraBadge: "Edora LMS Internship (2026)",
      tfakadniTitle: "TFAKADNI",
      tfakadniSub: "Cloud-Native Maternal Health Platform",
      tfakadniDesc: "7-node OpenStack private cloud + Kubernetes v1.29 cluster with auto-remediation pipeline for CrashLoopBackOff. Angular + Spring Boot + MySQL with JWT/BCrypt security, Prometheus + Grafana monitoring, and Ingress-nginx.",
      tfakadniBadge: "Bal des Projets (2025–2026)",
      fitlifeTitle: "FitLife",
      fitlifeSub: "Sports & Nutrition Coaching Platform",
      fitlifeDesc: "Designed and delivered a full sports & nutrition coaching application within 6 weeks during internship at Teck Catalyze. Multi-role React Native mobile app + React.js admin dashboard + secure Node.js REST API on Azure VM with Docker & Nginx.",
      fitlifeBadge: "Teck Catalyze Internship (2025)",
      medassistTitle: "MedAssist AI",
      medassistSub: "Medical Diagnosis Platform using Machine Learning",
      medassistDesc: "Medical application for early detection of serious diseases: lung cancer, brain tumor, diabetes, depression & anxiety. Trained & benchmarked 6 ML models across 5 datasets. Flask prediction interface with interpretable real-time results.",
      medassistBadge: "AI / ML (2025–2026)",
      chronoTitle: "ChronoSerena",
      chronoSub: "Distributed Medical Platform for Chronic Diseases",
      chronoDesc: "Distributed medical platform (JavaFX desktop app + Symfony web interface) for managing patients with chronic conditions. MVC architecture, REST APIs, Singleton pattern & reactive data validation.",
      chronoBadge: "Full-Stack (2024–2025)",
      brushTitle: "Brush & Bargain",
      brushSub: "Mobile Art Sales & Exhibition App",
      brushDesc: "Cross-platform mobile app (FlutterFlow) for buying, selling and showcasing artworks, featuring event management, bookings, and a customer claims module.",
      brushBadge: "Mobile App (2024–2025)",
      agroTitle: "AgroDesk",
      agroSub: "Agricultural Management Desktop App + Arduino System",
      agroDesc: "OOP C++ desktop application with Qt Designer for farm management, integrated with an Arduino module for automated animal feeding scheduling (servo motor, push button).",
      agroBadge: "Desktop + Embedded (2023–2024)",
      bankTitle: "Banking Security System",
      bankSub: "PIC16F877 Microcontroller Security System",
      bankDesc: "Embedded banking security system on PIC16F877 monitoring gas and temperature sensors, with automatic alarm triggers and an EEPROM incident log for security agents.",
      bankBadge: "Embedded Systems (2023–2024)",
      aryamTitle: "Aryam",
      aryamSub: "2D Narrative Video Game (SDL / C)",
      aryamDesc: "Narrative 2D game in C/SDL where heroine Aryam fights depression during Covid-19 lockdown, featuring custom game loop, sprite rendering and collision detection.",
      aryamBadge: "Game Dev (2022–2023)",
      kadamniTitle: "KADAMNI",
      kadamniSub: "Web Recruitment Platform",
      kadamniDesc: "Full recruitment website covering job posting, application management, and administration of employer and candidate accounts built with PHP and MySQL.",
      kadamniBadge: "Web Project (2023–2024)",
    },
    skills: {
      title: "Skills",
      tagline: "Tools I build with every day ✦",
      g1Label: "Cloud & DevOps", g1Tagline: "My primary focus",
      g2Label: "Full-Stack & Web/Mobile", g2Tagline: "What I build every day",
      g3Label: "Languages & Databases", g3Tagline: "The foundation layer",
      g4Label: "Machine Learning & Tools", g4Tagline: "AI models & workflow",
    },
    experience: {
      title: "Experience",
      tagline: "Real-world work",
      eduTitle: "Education",
      eduTagline: "Academic background",
      exp1Tag: "Professional Experience",
      exp1Title: "Intern — Full-Stack Developer",
      exp1Sub: "Edora LMS · Analytics Portal for Moodle LMS",
      exp1Text: "Built a Laravel 13 API backend & React 19/TypeScript SPA extending Moodle LMS with a separate analytics platform. Implemented Moodle-native auth (Web Services, Sanctum), scheduled PostgreSQL sync jobs, and deployed to production on Azure K3s with Traefik, cert-manager TLS, Jenkins CI/CD, and Prometheus/Grafana.",
      exp2Tag: "Professional Experience",
      exp2Title: "Intern — Full-Stack Developer",
      exp2Sub: "Teck Catalyze · FitLife Platform",
      exp2Text: "Designed and delivered a full sports & nutrition coaching app in 6 weeks. Built a multi-role React Native mobile app, React.js admin dashboard, and secure Node.js/Express REST API. Deployed full stack on Azure Linux VM with Docker & Nginx.",
      edu1Tag: "Engineering Degree",
      edu1Title: "Cloud Computing Engineering (3rd year)",
      edu1Sub: "ESPRIT, Tunis",
      edu1Text: "Hands-on curriculum in cloud-native infrastructure, DevOps automation, full-stack development, AI integrations, and systems programming. Building real-world projects every semester.",
      edu2Tag: "Secondary Education",
      edu2Title: "Scientific Baccalaureate",
      edu2Sub: "",
      edu2Text: "Graduated with a scientific baccalaureate — the foundation for engineering studies.",
    },
    contact: {
      title: "Let's Connect ",
      tagline: "Let's build something amazing together.",
      cardTitle: "Let's build\nsomething\nremarkable.",
      cardSub: "open to opportunities · 2026",
      statProjects: "PROJECTS",
      statInternships: "INTERNSHIPS",
      statDrive: "DRIVE",
      strangerText: "Don't be a stranger ⌁♡",
    },
    footer: {
      slogan: "Build. Deploy. Impact. ♡",
      thanks: "Thanks for stopping by ✦",
    }
  },
  FR: {
    nav: {
      home: "ACCUEIL",
      about: "À PROPOS",
      projects: "PROJETS",
      skills: "COMPÉTENCES",
      experience: "EXPÉRIENCE",
      contact: "CONTACT",
      downloadCV: "Télécharger CV",
      letsTalk: "Me contacter ↗",
    },
    hero: {
      hi: "Bonjour, je suis",
      title1: "Yomna",
      title2: "Bouallegue",
      role: "Étudiante Ingénieure Cloud Computing · ESPRIT (3e année)",
      desc1: "Je conçois des systèmes ",
      descCloud: "cloud-native",
      descMid: ", des plateformes ",
      descFullStack: "full-stack",
      descAnd: " et des applications ",
      descAi: "propulsées par l'IA",
      descEnd: " en production.",
      location: "✦ Tunis, Tunisie · disponible pour un stage ♡",
      exploreBtn: "Explorer mes projets ↗",
      downloadCV: "Télécharger CV",
      terminalSchool: '"ESPRIT – Cycle Ingénieur Cloud (3e année)"',
      terminalPassion: '"développement & déploiement cloud-native"',
    },
    about: {
      title: "À propos de moi ☆",
      p1_1: "Étudiante en 3e année du cycle ingénieur en ",
      p1_cloud: "Cloud Computing",
      p1_2: " à l'ESPRIT Tunis.",
      p2: "J'aime concevoir et déployer des infrastructures cloud privé OpenStack et clusters Kubernetes, créer des plateformes full-stack (Laravel, React, Spring Boot, Node.js, .NET, C#) et intégrer l'IA dans des produits concrets.",
      p3: "Également passionnée de fiction fantastique qui pense que les héroïnes fortes et les déploiements propres ont beaucoup en commun ☕",
      getInTouch: "Me contacter ↗",
      statProjects: "Projets Majeurs",
      statStacks: "Stacks Tech",
      statInternships: "Stages Pro",
      statLove: "Passion Code",
      drivesTitle: "Ce qui\nme motive\n→",
      note1Title: "Curieuse", note1Text: "J'apprends constamment et je pose les bonnes questions.",
      note2Title: "Bâtisseuse", note2Text: "Du code au cloud — je transforme les idées en produits.",
      note3Title: "Cloud-Native", note3Text: "Cloud dans l'âme : K8s, Docker, AWS, OpenStack.",
      note4Title: "IA-First", note4Text: "J'intègre des API d'IA dans chaque application.",
    },
    projects: {
      title: "Projets",
      tagline: "Quelques réalisations concrètes ♡",
      edoraTitle: "Edora LMS",
      edoraSub: "Portail Analytique pour Moodle LMS",
      edoraDesc: "Développement d'un backend Laravel 13 et d'une SPA React 19/TypeScript étendant Moodle avec une plateforme analytique dédiée. Authentification native Moodle (tokens Web Services, Sanctum), synchronisation PostgreSQL et déploiement Azure K3s avec Jenkins CI/CD et Prometheus/Grafana.",
      edoraBadge: "Stage Edora LMS (2026)",
      tfakadniTitle: "TFAKADNI",
      tfakadniSub: "Plateforme de Santé Maternelle Cloud-Native",
      tfakadniDesc: "Cloud privé OpenStack 7 nœuds + cluster Kubernetes v1.29 avec pipeline d'auto-remédiation des erreurs CrashLoopBackOff. Web Angular + Spring Boot + MySQL sécurisé JWT/BCrypt, monitoring Prometheus/Grafana et Ingress-nginx.",
      tfakadniBadge: "Bal des Projets (2025–2026)",
      fitlifeTitle: "FitLife",
      fitlifeSub: "Plateforme de Coaching Sportif & Nutritionnel",
      fitlifeDesc: "Application complète de coaching conçue et livrée en 6 semaines lors du stage chez Teck Catalyze. App mobile React Native multi-rôles + dashboard admin React.js + API REST Node.js/Express sur Azure Linux VM via Docker & Nginx.",
      fitlifeBadge: "Stage Teck Catalyze (2025)",
      medassistTitle: "MedAssist IA",
      medassistSub: "Plateforme de Diagnostic Médical par Machine Learning",
      medassistDesc: "Application médicale de détection précoce des maladies graves (cancer du poumon, tumeur cérébrale, diabète, dépression). Entraînement de 6 modèles ML évalués sur 5 datasets. Interface de prédiction Flask en temps réel.",
      medassistBadge: "IA / ML (2025–2026)",
      chronoTitle: "ChronoSerena",
      chronoSub: "Plateforme Médicale Distribuée pour Maladies Chroniques",
      chronoDesc: "Plateforme médicale distribuée (application desktop JavaFX + interface web Symfony) pour la gestion de patients. Architecture MVC, API REST, design pattern Singleton et validation réactive.",
      chronoBadge: "Full-Stack (2024–2025)",
      brushTitle: "Brush & Bargain",
      brushSub: "Application Mobile de Vente et Exposition d'Art",
      brushDesc: "Application mobile multiplateforme (FlutterFlow) pour l'achat, la vente et l'exposition d'œuvres d'art, avec gestion d'événements, réservations et module de réclamations.",
      brushBadge: "App Mobile (2024–2025)",
      agroTitle: "AgroDesk",
      agroSub: "Application Desktop de Gestion Agricole + Système Arduino",
      agroDesc: "Application desktop C++ (POO) avec Qt Designer pour la gestion d'exploitations agricoles, couplée à un module Arduino de planification automatisée de l'alimentation animale (moteur servo, bouton).",
      agroBadge: "Desktop + Embarqué (2023–2024)",
      bankTitle: "Système de Sécurité Bancaire",
      bankSub: "Microcontrôleur PIC16F877 & Capteurs",
      bankDesc: "Système embarqué de surveillance bancaire (gaz, température) sur PIC16F877 avec déclenchements automatiques d'alarmes et journal des incidents en mémoire EEPROM.",
      bankBadge: "Systèmes Embarqués (2023–2024)",
      aryamTitle: "Aryam",
      aryamSub: "Jeu Vidéo 2D Narratif (SDL / C)",
      aryamDesc: "Jeu vidéo 2D narratif en C/SDL où l'héroïne Aryam combat la dépression pendant le confinement Covid-19, avec boucle de jeu, gestion de sprites et détection de collisions.",
      aryamBadge: "Game Dev (2022–2023)",
      kadamniTitle: "Kadamni",
      kadamniSub: "Plateforme Web de Recrutement",
      kadamniDesc: "Site de recrutement complet : publication d'offres, gestion des candidatures et administration des comptes employeurs et candidats développé en PHP et MySQL.",
      kadamniBadge: "Projet Web (2023–2024)",
    },
    skills: {
      title: "Compétences",
      tagline: "Outils et technologies utilisés au quotidien ✦",
      g1Label: "Cloud & DevOps", g1Tagline: "Mon domaine de prédilection",
      g2Label: "Full-Stack & Web/Mobile", g2Tagline: "Ce que je développe chaque jour",
      g3Label: "Langages & Bases de Données", g3Tagline: "Le socle technique",
      g4Label: "Machine Learning & Outils", g4Tagline: "Modèles IA & workflow",
    },
    experience: {
      title: "Expérience",
      tagline: "Parcours professionnel",
      eduTitle: "Formation",
      eduTagline: "Parcours académique",
      exp1Tag: "Expérience Professionnelle",
      exp1Title: "Stage — Développeuse Full-Stack",
      exp1Sub: "Edora LMS · Portail Analytique pour Moodle LMS",
      exp1Text: "Développement d'un backend Laravel 13 et d'une SPA React 19/TypeScript étendant Moodle avec une plateforme analytique dédiée. Authentification native Moodle (Web Services, Sanctum), synchronisation PostgreSQL et déploiement Azure K3s avec Jenkins CI/CD et Prometheus/Grafana.",
      exp2Tag: "Expérience Professionnelle",
      exp2Title: "Stage — Développeuse Full-Stack",
      exp2Sub: "Teck Catalyze · FitLife Platform",
      exp2Text: "Conception et livraison d'une application complète de coaching sportif en 6 semaines. App mobile React Native multi-rôles, dashboard admin React.js et API REST Node.js/Express. Déploiement full-stack sur Azure Linux VM via Docker & Nginx.",
      edu1Tag: "Diplôme d'Ingénieur",
      edu1Title: "Cycle Ingénieur — Cloud Computing (3e année)",
      edu1Sub: "ESPRIT, Tunis",
      edu1Text: "Formation axée sur les infrastructures cloud-native, l'automatisation DevOps, le développement full-stack, l'intégration de l'IA et la programmation système.",
      edu2Tag: "Enseignement Secondaire",
      edu2Title: "Baccalauréat Scientifique",
      edu2Sub: "",
      edu2Text: "Obtention du baccalauréat scientifique — fondement des études d'ingénieur.",
    },
    contact: {
      title: "Me Contacter ",
      tagline: "Construisons un projet ensemble.",
      cardTitle: "Construisons\nquelque chose\nde remarquable.",
      cardSub: "ouverte aux opportunités · 2026",
      statProjects: "PROJETS",
      statInternships: "STAGES",
      statDrive: "MOTIVATION",
      strangerText: "N'hésitez pas à me contacter ⌁♡",
    },
    footer: {
      slogan: "Concevoir. Déployer. Impacter. ♡",
      thanks: "Merci pour votre visite ✦",
    }
  }
};

/* ══════════════════════════════════════════════════════════════
   THEME CONTEXT
══════════════════════════════════════════════════════════════ */
const ThemeContext = createContext({
  dark: true,
  toggle: () => {},
  lang: "EN",
  setLang: () => {},
  toggleLang: () => {},
  C: {},
  t: TRANSLATIONS.EN,
});
export const useTheme = () => useContext(ThemeContext);

/* ══════════════════════════════════════════════════════════════
   COLOR PALETTE — Midnight Gold
   dark = true  (default)
   dark = false → Ivory/Sand light mode
══════════════════════════════════════════════════════════════ */
const DARK = {
  gold:       "#f0a830",   // PRIMARY
  cyan:       "#5eb8d4",   // SECONDARY
  ember:      "#e06b3c",   // TERTIARY
  sage:       "#4ecf8a",   // SUCCESS / LIVE
  champagne:  "#e8d5a0",   // WARM WHITE ACCENT
  bg:         "#08091a",
  surface:    "#0d1128",
  card:       "#111930",
  text:       "#ffffff",
  textMuted:  "rgba(255,255,255,0.45)",
  textSub:    "rgba(255,255,255,0.28)",
  border:     "rgba(240,168,48,0.15)",
  gridLine:   "rgba(240,168,48,0.022)",
  navBg:      "rgba(8,9,26,0.65)",
  glow1:      "#f0a830",
  glow2:      "#5eb8d4",
};

const LIGHT = {
  gold:       "#b8730e",
  cyan:       "#1b7591",
  ember:      "#b84318",
  sage:       "#15824c",
  champagne:  "#6e5420",
  bg:         "#faf7f2",
  surface:    "#f0ebe1",
  card:       "#e6e0d4",
  text:       "#1a1408",
  textMuted:  "rgba(26,20,8,0.85)",
  textSub:    "rgba(26,20,8,0.68)",
  border:     "rgba(184,115,14,0.30)",
  gridLine:   "rgba(184,115,14,0.08)",
  navBg:      "rgba(250,247,242,0.92)",
  glow1:      "#f0a830",
  glow2:      "#5eb8d4",
};

/* ─── REAL BRAND LOGO ICONS ─────────────────────────────────── */
const Icon = {
  Kubernetes: () => <SiKubernetes size={28} color="#326CE5" />,
  Docker: () => <SiDocker size={28} color="#2496ED" />,
  OpenStack: () => <SiOpenstack size={28} color="#ED1944" />,
  Azure: () => (
    <svg viewBox="0 0 96 96" width="28" height="28">
      <path fill="#0089D6" d="M33.6 12L12 79.2h21.6L52.8 12z"/>
      <path fill="#0072C6" d="M52.8 12L38.4 57.6h28.8z"/>
      <path fill="#0089D6" d="M38.4 57.6L24 79.2h60L67.2 40.8z"/>
    </svg>
  ),
  AWS: () => <FaAws size={28} color="#FF9900" />,
  Ansible: () => <SiAnsible size={28} color="#EE0000" />,
  Prometheus: () => <SiPrometheus size={28} color="#E6522C" />,
  Grafana: () => <SiGrafana size={28} color="#F46800" />,
  Nginx: () => <SiNginx size={28} color="#009639" />,
  Helm: () => { const { dark } = useTheme(); return <SiHelm size={28} color={dark ? "#668cf2" : "#0F1689"} />; },
  Jenkins: () => <SiJenkins size={28} color="#D24939" />,
  Traefik: () => <SiTraefikproxy size={28} color="#24A1C1" />,
  React: () => <SiReact size={28} color="#61DAFB" />,
  NodeJS: () => <SiNodedotjs size={28} color="#5FA04E" />,
  Angular: () => <SiAngular size={28} color="#DD0031" />,
  SpringBoot: () => <SiSpringboot size={28} color="#6DB33F" />,
  Express: () => { const { dark } = useTheme(); return <SiExpress size={28} color={dark ? "#E0E0E0" : "#1a1408"} />; },
  Symfony: () => { const { dark } = useTheme(); return <SiSymfony size={28} color={dark ? "#FFFFFF" : "#1a1408"} />; },
  Laravel: () => <SiLaravel size={28} color="#FF2D20" />,
  Flask: () => { const { dark } = useTheme(); return <SiFlask size={28} color={dark ? "#FFFFFF" : "#1a1408"} />; },
  Flutter: () => <SiFlutter size={28} color="#02569B" />,
  Dotnet: () => <SiDotnet size={28} color="#512BD4" />,
  JavaFX: () => <FaJava size={28} color="#ED8B00" />,
  Java: () => <FaJava size={28} color="#007396" />,
  Python: () => <SiPython size={28} color="#3776AB" />,
  CPP: () => <SiCplusplus size={28} color="#00599C" />,
  Csharp: () => <TbBrandCSharp size={28} color="#239120" />,
  PHP: () => <SiPhp size={28} color="#777BB3" />,
  TypeScript: () => <SiTypescript size={28} color="#3178C6" />,
  JavaScript: () => <SiJavascript size={28} color="#F7DF1E" />,
  PostgreSQL: () => <SiPostgresql size={28} color="#4169E1" />,
  Redis: () => <SiRedis size={28} color="#DC382D" />,
  MongoDB: () => <SiMongodb size={28} color="#47A248" />,
  MySQL: () => <SiMysql size={28} color="#4479A1" />,
  OracleDB: () => (
    <svg viewBox="0 0 256 168" width="28" height="28">
      <path fill="#F80000" d="M80.2 0C35.9 0 0 35.9 0 80.2s35.9 80.2 80.2 80.2h95.6c44.3 0 80.2-35.9 80.2-80.2S220.1 0 175.8 0H80.2zm93 129.5H82.8c-27.2 0-49.3-22.1-49.3-49.3s22.1-49.3-49.3-49.3h90.4c27.2 0 49.3 22.1 49.3 49.3s-22.1 49.3-49.3 49.3z"/>
    </svg>
  ),
  Firebase: () => <SiFirebase size={28} color="#FFCA28" />,
  ScikitLearn: () => <SiScikitlearn size={28} color="#F7931E" />,
  Pandas: () => { const { dark } = useTheme(); return <SiPandas size={28} color={dark ? "#b0a4e8" : "#150458"} />; },
  NumPy: () => { const { dark } = useTheme(); return <SiNumpy size={28} color={dark ? "#4da6c4" : "#013243"} />; },
  XGBoost: () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <rect width="24" height="24" rx="4" fill="#226496"/>
      <path d="M6 18L18 6M6 6l12 12" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  ChartJS: () => <SiChartdotjs size={28} color="#FF6384" />,
  Git: () => <SiGit size={28} color="#F05032" />,
  GitHub: () => { const { dark } = useTheme(); return <FaGithub size={28} color={dark ? "#FFFFFF" : "#1a1408"} />; },
  Figma: () => <SiFigma size={28} color="#F24E1E" />,
  Postman: () => <SiPostman size={28} color="#FF6C37" />,
  Arduino: () => <SiArduino size={28} color="#00979D" />,
  Claude: () => <SiAnthropic size={28} color="#CC785C" />,
  LinkedIn: () => <FaLinkedin size={28} color="#0A66C2" />,
  Email: () => <IoMail size={28} color="#EA4335" />,
  Phone: () => <IoCall size={26} color="#4ECF8A" />,
  Download: () => <FaDownload size={16} />,
  Sun: () => <IoSunny size={19} />,
  Moon: () => <IoMoon size={18} />,
};

/* ─── SVG HEART cursor ───────────────────────────────────────── */
function HeartCursor({ color, visible }) {
  const [trail, setTrail] = useState([]);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const id = Date.now() + Math.random();
      setTrail((prev) => [
        ...prev.slice(-12),
        { id, cx: e.clientX, cy: e.clientY, size: Math.random() * 12 + 8, angle: Math.random() * 360 },
      ]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const HeartSVG = ({ size, fillColor, opacity }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} style={{ opacity, filter: `drop-shadow(0 0 6px ${fillColor})` }}>
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
  );

  return (
    <>
      {visible && trail.map((s) => (
        <motion.div key={s.id}
          initial={{ opacity: 0.75, scale: 1, x: s.cx, y: s.cy, rotate: s.angle }}
          animate={{ opacity: 0, scale: 0.1, y: s.cy - 36 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setTrail((p) => p.filter((t) => t.id !== s.id))}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ translateX: "-50%", translateY: "-50%" }}>
          <HeartSVG size={s.size} fillColor={color} opacity={1} />
        </motion.div>
      ))}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}>
        <motion.div
          animate={visible ? { scale: [1, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={visible
            ? { scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.18 } }
            : { duration: 0.18 }}>
          <HeartSVG size={22} fillColor={color} opacity={1} />
        </motion.div>
      </motion.div>
    </>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const { dark, toggle, lang, setLang, C, t } = useTheme();
  const [cursorColor, setCursorColor] = useState(C.gold);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cvFile = lang === "FR" ? "Yomna_Bouallegue_CV_FR.pdf" : "Yomna_Bouallegue_CV_EN.pdf";
  const cvPath = `${import.meta.env.BASE_URL}${cvFile}`;

  const navLinks = [
    { label: t.nav.home,       href: "#home",       key: "gold"      },
    { label: t.nav.about,      href: "#about",      key: "cyan"      },
    { label: t.nav.projects,   href: "#projects",   key: "ember"     },
    { label: t.nav.skills,     href: "#skills",     key: "gold"      },
    { label: t.nav.experience, href: "#experience", key: "sage"      },
    { label: t.nav.contact,    href: "#contact",    key: "champagne" },
  ];

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeartCursor color={cursorColor} visible={cursorVisible} />
      <header className="fixed top-0 left-0 w-full z-50 md:cursor-none"
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => { setCursorVisible(false); setCursorColor(C.gold); }}>
        <nav className="w-full">
          <div style={{ background: C.navBg, borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(20px)" }}
            className="flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 md:py-4">

            <motion.a href="#home"
              onMouseEnter={() => setCursorColor(C.cyan)}
              onMouseLeave={() => setCursorColor(C.gold)}
              whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}
              className="font-bold leading-none md:cursor-none"
              style={{
                fontFamily: "'Caveat', cursive", fontSize: 28,
                backgroundImage: `linear-gradient(100deg, ${C.gold}, ${C.champagne}, ${C.ember})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                textShadow: dark ? `0 0 8px ${C.gold}55` : "none",
              }}>
              Yomna Bouallegue ♡
            </motion.a>

            <div className="hidden lg:flex items-center gap-8 text-[11px] font-extrabold tracking-[0.2em]">
              {navLinks.map((link) => (
                <motion.a key={link.label} href={link.href}
                  onMouseEnter={() => setCursorColor(C[link.key])}
                  onMouseLeave={() => setCursorColor(C.gold)}
                  className="relative md:cursor-none"
                  style={{ color: dark ? "rgba(255,255,255,0.85)" : "rgba(26,20,8,0.8)" }}
                  whileHover={{ color: C[link.key] }}>
                  <motion.span className="block" whileHover="hovered" initial="rest">
                    {link.label}
                    <motion.span
                      variants={{ rest: { scaleX: 0, opacity: 0 }, hovered: { scaleX: 1, opacity: 1 } }}
                      transition={{ duration: 0.25 }}
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full origin-left block"
                      style={{ background: C[link.key], boxShadow: `0 0 6px ${C[link.key]}` }} />
                  </motion.span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Language Selector EN | FR */}
              <div className="flex items-center rounded-full p-0.5 text-[10px] font-bold"
                style={{ border: `1px solid ${C.gold}33`, background: `${C.gold}08` }}>
                <button
                  onClick={() => setLang("EN")}
                  className="px-2 py-0.5 rounded-full transition-all duration-200"
                  style={{
                    background: lang === "EN" ? C.gold : "transparent",
                    color: lang === "EN" ? "#1a0e00" : C.textMuted,
                  }}>
                  EN
                </button>
                <button
                  onClick={() => setLang("FR")}
                  className="px-2 py-0.5 rounded-full transition-all duration-200"
                  style={{
                    background: lang === "FR" ? C.gold : "transparent",
                    color: lang === "FR" ? "#1a0e00" : C.textMuted,
                  }}>
                  FR
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggle}
                className="flex items-center justify-center w-8 h-8 rounded-full text-sm transition"
                style={{ border: `1px solid ${C.gold}33`, background: `${C.gold}08`, color: C.gold }}
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {dark ? <Icon.Sun /> : <Icon.Moon />}
              </button>

              {/* Download CV */}
              <motion.a
                href={cvPath}
                download={cvFile}
                whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${C.gold}55` }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setCursorColor(C.ember)}
                onMouseLeave={() => setCursorColor(C.gold)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] md:cursor-none"
                style={{ border: `1.5px solid ${C.gold}55`, color: C.gold, background: `${C.gold}0d`, transition: "all 0.3s" }}>
                <Icon.Download />
                {t.nav.downloadCV}
              </motion.a>

              <motion.a href="#contact"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="px-3.5 sm:px-6 py-2 rounded-md font-extrabold text-[12px] sm:text-[14px] md:cursor-none inline-flex items-center gap-1"
                style={{ background: C.gold, color: "#1a0e00", boxShadow: `0 0 24px ${C.gold}44` }}>
                {t.nav.letsTalk}
              </motion.a>

              <button className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md text-lg"
                style={{ border: `1px solid ${C.gold}33`, background: `${C.gold}08`, color: C.text }}
                onClick={() => setMenuOpen((v) => !v)}>
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="lg:hidden px-5 py-4 flex flex-col gap-1"
                style={{ background: dark ? "rgba(8,9,26,0.92)" : "rgba(245,240,232,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
                {navLinks.map((link, i) => (
                  <motion.a key={link.label} href={link.href}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-extrabold tracking-[0.2em]"
                    style={{ color: C.textMuted }}>
                    <span className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                      style={{ background: C[link.key], boxShadow: `0 0 6px ${C[link.key]}` }} />
                    {link.label}
                  </motion.a>
                ))}
                
                <div className="flex items-center justify-between px-3 py-2 mt-2"
                  style={{ borderTop: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: C.textMuted }}>Lang:</span>
                    <button onClick={() => setLang("EN")}
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: lang === "EN" ? C.gold : "transparent", color: lang === "EN" ? "#1a0e00" : C.textMuted }}>EN</button>
                    <button onClick={() => setLang("FR")}
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: lang === "FR" ? C.gold : "transparent", color: lang === "FR" ? "#1a0e00" : C.textMuted }}>FR</button>
                  </div>
                  <button onClick={toggle}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold"
                    style={{ color: C.gold, border: `1px solid ${C.gold}33` }}>
                    {dark ? <Icon.Sun /> : <Icon.Moon />}
                    {dark ? "LIGHT" : "DARK"}
                  </button>
                </div>

                <a href={cvPath} download={cvFile}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[12px] font-extrabold tracking-[0.2em] mt-2"
                  style={{ color: C.gold, border: `1px solid ${C.gold}33`, background: `${C.gold}08` }}>
                  <Icon.Download />
                  {t.nav.downloadCV} ({lang})
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const { dark, lang, C, t } = useTheme();
  const [cursorVisible, setCursorVisible] = useState(false);

  const cvFile = lang === "FR" ? "Yomna_Bouallegue_CV_FR.pdf" : "Yomna_Bouallegue_CV_EN.pdf";
  const cvPath = `${import.meta.env.BASE_URL}${cvFile}`;

  return (
    <>
      <HeartCursor color={C.gold} visible={cursorVisible} />
      <section id="home"
        className="relative z-10 px-4 sm:px-8 md:px-12 pt-28 md:pt-36 pb-16 overflow-hidden cursor-none"
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}>

        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute pointer-events-none rounded-full"
          style={{ width: 520, height: 520, top: "-10%", right: "5%", background: C.gold, filter: "blur(140px)", opacity: 0.1 }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute pointer-events-none rounded-full"
          style={{ width: 380, height: 380, bottom: "10%", left: "5%", background: C.cyan, filter: "blur(120px)", opacity: 0.07 }} />

        <div className="grid lg:grid-cols-12 items-center gap-8">
          <motion.div initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-6 z-20 text-center lg:text-left">

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(26px,4vw,50px)", color: C.text }}>
              {t.hero.hi}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(44px,8.5vw,110px)",
                lineHeight: 0.85,
                fontWeight: 700,
                marginTop: 8,
                backgroundImage: `linear-gradient(120deg, ${C.gold} 0%, ${C.champagne} 45%, ${C.ember} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: dark ? `0 0 14px ${C.gold}44` : "none",
              }}>
              {t.hero.title1}<br />{t.hero.title2}
            </motion.h1>

            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              style={{
                originX: 0, height: 3, width: "clamp(120px,18vw,200px)", marginTop: 10,
                marginLeft: "auto", marginRight: "auto", transform: "rotate(-2deg)",
                background: `linear-gradient(90deg, ${C.gold}, ${C.champagne}, ${C.ember})`,
                boxShadow: `0 0 12px ${C.gold}55`
              }}
              className="lg:mx-0 lg:ml-16" />

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-7 inline-flex items-center gap-2 justify-center lg:justify-start">
              <motion.span animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: C.gold, boxShadow: `0 0 8px ${C.gold}` }} />
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: dark ? `${C.gold}cc` : C.gold }}>
                {t.hero.role}
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-4 leading-7 max-w-md text-[15px] mx-auto lg:mx-0"
              style={{ color: C.textMuted }}>
              {t.hero.desc1}<span style={{ color: C.gold, fontWeight: 600 }}>{t.hero.descCloud}</span>{t.hero.descMid}<span style={{ color: C.cyan, fontWeight: 600 }}>{t.hero.descFullStack}</span>{t.hero.descAnd}<span style={{ color: C.ember, fontWeight: 600 }}>{t.hero.descAi}</span>{t.hero.descEnd}
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
              style={{ fontFamily: "'Caveat', cursive", marginTop: 12, fontSize: 18, color: dark ? `${C.gold}77` : C.gold, transform: "rotate(-1.5deg)" }}>
              {t.hero.location}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 }}
              className="flex flex-wrap gap-4 mt-9 justify-center lg:justify-start">
              <motion.a href="#projects"
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${C.gold}55` }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold text-sm"
                style={{ background: C.gold, color: "#1a0e00" }}>
                {t.hero.exploreBtn}
              </motion.a>
              <motion.a href={cvPath} download={cvFile}
                whileHover={{ scale: 1.05, borderColor: C.gold, color: C.gold }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold text-sm transition-all duration-300"
                style={{ border: `1.5px solid ${C.gold}55`, color: C.text }}>
                <Icon.Download />
                {t.hero.downloadCV}
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex gap-5 mt-9 justify-center lg:justify-start">
              {[
                { Ic: Icon.LinkedIn, href: "https://www.linkedin.com/in/yomna-bouallegue-788731273/", label: "LinkedIn" },
                { Ic: Icon.GitHub,   href: "https://github.com/yum19",                     label: "GitHub"   },
                { Ic: Icon.Email,    href: "mailto:yomnabouallegue2468@gmail.com",                      label: "Email"    },
              ].map((s, i) => (
                <motion.a key={i} href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                  whileHover={{ scale: 1.25, y: -3 }} transition={{ duration: 0.2 }}
                  title={s.label} style={{ display: "inline-flex", opacity: 0.85 }}>
                  <s.Ic />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Terminal card */}
          <motion.div initial={{ opacity: 0, scale: 0.9, x: 35 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-6 flex items-center justify-center min-h-[300px]">

            <motion.div animate={{ y: [0, -10, 0], rotate: [0.5, -0.5, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden w-full max-w-[440px]"
              style={{
                background: "rgba(18, 22, 38, 0.96)",
                border: `1px solid ${C.gold}44`,
                boxShadow: dark ? `0 0 60px ${C.gold}15, 0 0 120px ${C.cyan}0a` : `0 20px 50px rgba(0,0,0,0.18)`,
              }}>
              <div className="flex items-center gap-2 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", borderBottom: `1px solid ${C.gold}22` }}>
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-4 font-mono text-[11px]" style={{ color: "#f0a830aa" }}>yomna@esprit:~$</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.9]">
                <div style={{ color: "#ffffff" }}><span style={{ color: "#5eb8d4" }}>const</span> <span style={{ color: "#f0a830" }}>yomna</span> <span style={{ color: "rgba(255,255,255,0.6)" }}>=</span> {"{"}</div>
                <div className="ml-5" style={{ color: "#ffffff" }}><span style={{ color: "#e8d5a0" }}>name</span><span style={{ color: "rgba(255,255,255,0.6)" }}>:</span> <span style={{ color: "#4ecf8a" }}>"Yomna Bouallegue"</span>,</div>
                <div className="ml-5" style={{ color: "#ffffff" }}><span style={{ color: "#e8d5a0" }}>school</span><span style={{ color: "rgba(255,255,255,0.6)" }}>:</span> <span style={{ color: "#4ecf8a" }}>{t.hero.terminalSchool}</span>,</div>
                <div className="ml-5" style={{ color: "#ffffff" }}><span style={{ color: "#e8d5a0" }}>stack</span><span style={{ color: "rgba(255,255,255,0.6)" }}>:</span> [<span style={{ color: "#e06b3c" }}>"K8s"</span>, <span style={{ color: "#e06b3c" }}>"AWS"</span>, <span style={{ color: "#e06b3c" }}>"Laravel 13"</span>, <span style={{ color: "#e06b3c" }}>"React 19"</span>, <span style={{ color: "#e06b3c" }}>".NET"</span>],</div>
                <div className="ml-5" style={{ color: "#ffffff" }}><span style={{ color: "#e8d5a0" }}>passion</span><span style={{ color: "rgba(255,255,255,0.6)" }}>:</span> <span style={{ color: "#4ecf8a" }}>{t.hero.terminalPassion}</span>,</div>
                <div className="ml-5" style={{ color: "#ffffff" }}><span style={{ color: "#e8d5a0" }}>openToInternship</span><span style={{ color: "rgba(255,255,255,0.6)" }}>:</span> <span style={{ color: "#f0a830" }}>true</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>// ♡</span></div>
                <div style={{ color: "#ffffff" }}>{"}"}</div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block w-2 h-5 align-middle ml-1 mt-1 rounded-sm"
                  style={{ background: "#f0a830" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About() {
  const { dark, C, t } = useTheme();

  const notes = [
    { title: t.about.note1Title, text: t.about.note1Text, bg: dark ? "#1a1205" : "#fdf0d5", border: C.gold, rotate: "-2deg",  svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
    { title: t.about.note2Title, text: t.about.note2Text, bg: dark ? "#071620" : "#dff3fb", border: C.cyan, rotate:  "1.5deg", svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
    { title: t.about.note3Title, text: t.about.note3Text, bg: dark ? "#1a0c05" : "#fde8dc", border: C.ember,rotate: "-1deg",   svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.ember} strokeWidth="2" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg> },
    { title: t.about.note4Title, text: t.about.note4Text, bg: dark ? "#061a0e" : "#d8f5e8", border: C.sage, rotate:  "2deg",   svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.sage} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill={C.sage}/></svg> },
  ];

  return (
    <section id="about" className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-12 overflow-x-hidden">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="lg:col-span-5 text-center lg:text-left">
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text }}>
            {t.about.title}
          </h2>
          <div className="mt-6 space-y-4 leading-8 text-[15px] sm:text-[17px] max-w-[420px] mx-auto lg:mx-0" style={{ color: C.textMuted }}>
            <p>{t.about.p1_1}<span style={{ color: C.gold, fontWeight: 600 }}>{t.about.p1_cloud}</span>{t.about.p1_2}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <a href="#contact"
              className="mt-7 inline-block rounded-full px-6 py-2.5 font-bold text-sm transition hover:scale-105"
              style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}44`, color: C.gold }}>
              {t.about.getInTouch}
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="lg:col-span-7 relative flex justify-center items-center min-h-[260px] order-first lg:order-none">
          <div className="absolute w-64 h-64 rounded-full pointer-events-none"
            style={{ background: C.gold, filter: "blur(100px)", opacity: 0.07 }} />
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm relative z-10">
            {[
              { num: "9+", label: t.about.statProjects, color: C.gold      },
              { num: "4+", label: t.about.statStacks,   color: C.cyan      },
              { num: "2",  label: t.about.statInternships, color: C.ember  },
              { num: "∞",  label: t.about.statLove,     color: C.sage      },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.04 }}
                className="rounded-xl p-4 text-center"
                style={{ background: `${s.color}0a`, border: `1px solid ${s.color}28`, boxShadow: `0 0 20px ${s.color}0a` }}>
                <div className="text-4xl font-black" style={{ color: s.color }}>{s.num}</div>
                <div className="text-[11px] mt-1 tracking-wide" style={{ color: C.textMuted }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute right-12 top-8 text-3xl hidden sm:block pointer-events-none whitespace-pre-line text-center"
            style={{ fontFamily: "'Caveat', cursive", color: C.cyan, opacity: 0.45, transform: "rotate(-8deg)" }}>
            cloud{"\n"}native{"\n"}engineer
          </motion.span>
        </motion.div>
      </div>

      <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-4 items-start">
        <div className="whitespace-pre-line text-center" style={{ fontFamily: "'Caveat', cursive", color: `${C.gold}88`, fontSize: 26, lineHeight: 0.95, transform: "rotate(-8deg)", paddingTop: 16 }}>
          {t.about.drivesTitle}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {notes.map((note, i) => (
            <motion.div key={note.title}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, rotate: "0deg" }}
              className="rounded-xl px-5 py-4 min-h-[118px]"
              style={{ background: note.bg, border: `1px solid ${note.border}33`, transform: `rotate(${note.rotate})`, boxShadow: `0 8px 24px rgba(0,0,0,0.18)` }}>
              <div className="mb-2"><note.svgIcon /></div>
              <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, lineHeight: 1, color: note.border }}>{note.title}</h3>
              <p className="mt-2 text-[13px] leading-4" style={{ color: C.textMuted }}>{note.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────── */
function Projects() {
  const { dark, C, t } = useTheme();
  const [selected, setSelected] = useState(null);

  const projects = [
    {
      title: t.projects.edoraTitle,
      subtitle: t.projects.edoraSub,
      tags: ["Laravel 13", "PHP", "PostgreSQL", "Redis", "React 19", "TypeScript", "Docker", "K3s", "Sanctum", "Chart.js"],
      desc: t.projects.edoraDesc,
      accent: C.sage,
      badge: t.projects.edoraBadge,
      Icon: Icon.Laravel,
    },
    {
      title: t.projects.tfakadniTitle,
      subtitle: t.projects.tfakadniSub,
      tags: ["OpenStack", "Kubernetes", "Angular", "Spring Boot", "Prometheus", "Grafana", "JWT"],
      desc: t.projects.tfakadniDesc,
      accent: C.gold,
      badge: t.projects.tfakadniBadge,
      Icon: Icon.Kubernetes,
    },
    {
      title: t.projects.fitlifeTitle,
      subtitle: t.projects.fitlifeSub,
      tags: ["React Native", "React.js", "Node.js", "MongoDB", "Express.js", "Docker", "Azure VM", "Nginx"],
      desc: t.projects.fitlifeDesc,
      accent: C.cyan,
      badge: t.projects.fitlifeBadge,
      Icon: Icon.React,
    },
    {
      title: t.projects.medassistTitle,
      subtitle: t.projects.medassistSub,
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Flask", "XGBoost", "LightGBM", "Random Forest", "SVM"],
      desc: t.projects.medassistDesc,
      accent: C.sage,
      badge: t.projects.medassistBadge,
      Icon: Icon.ScikitLearn,
    },
    {
      title: t.projects.chronoTitle,
      subtitle: t.projects.chronoSub,
      tags: ["JavaFX", "Symfony", "PHP", "MySQL", "REST API", "MVC"],
      desc: t.projects.chronoDesc,
      accent: C.champagne,
      badge: t.projects.chronoBadge,
      Icon: Icon.Symfony,
    },
    {
      title: t.projects.brushTitle,
      subtitle: t.projects.brushSub,
      tags: ["FlutterFlow", "Dart", "Firebase"],
      desc: t.projects.brushDesc,
      accent: C.ember,
      badge: t.projects.brushBadge,
      Icon: Icon.Flutter,
    },
    {
      title: t.projects.agroTitle,
      subtitle: t.projects.agroSub,
      tags: ["C++", "Qt Designer", "Oracle DB", "Arduino", "Servo Motor"],
      desc: t.projects.agroDesc,
      accent: C.gold,
      badge: t.projects.agroBadge,
      Icon: Icon.Arduino,
    },
    {
      title: t.projects.bankTitle,
      subtitle: t.projects.bankSub,
      tags: ["Embedded C", "PIC16F877", "EEPROM", "Gas Sensors", "Temperature Sensors"],
      desc: t.projects.bankDesc,
      accent: C.ember,
      badge: t.projects.bankBadge,
      Icon: Icon.CPP,
    },
    {
      title: t.projects.aryamTitle,
      subtitle: t.projects.aryamSub,
      tags: ["C", "SDL"],
      desc: t.projects.aryamDesc,
      accent: C.cyan,
      badge: t.projects.aryamBadge,
      Icon: Icon.CPP,
    },
    {
      title: t.projects.kadamniTitle,
      subtitle: t.projects.kadamniSub,
      tags: ["PHP", "HTML", "CSS", "MySQL"],
      desc: t.projects.kadamniDesc,
      accent: C.sage,
      badge: t.projects.kadamniBadge,
      Icon: Icon.PHP,
    },
  ];

  return (
    <section id="projects" className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-16">
      <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex items-center gap-4 mb-2">
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(48px,8vw,96px)", color: C.text, lineHeight: 1 }}>{t.projects.title}</h2>
        <motion.span animate={{ scale: [1, 1.25, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: 32, color: C.ember }}>✦</motion.span>
      </motion.div>
      <p className="mb-10 text-[10px] tracking-[0.22em] uppercase" style={{ color: C.textSub }}>
        {t.projects.tagline}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <motion.div key={p.title}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }}
            whileHover={{ y: -7, boxShadow: `0 16px 48px ${p.accent}18` }}
            onClick={() => setSelected(p)}
            className="relative rounded-2xl p-5 cursor-pointer overflow-hidden"
            style={{ background: `${p.accent}06`, border: `1px solid ${p.accent}28`, transition: "all 0.3s" }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${p.accent}70, transparent)` }} />
            <div className="flex items-start justify-between mb-3">
              <div style={{ filter: `drop-shadow(0 0 6px ${p.accent}55)` }}>
                <p.Icon />
              </div>
              <span className="text-[9px] font-bold px-2 py-1 rounded-full tracking-wider"
                style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}30` }}>
                {p.badge}
              </span>
            </div>
            <h3 className="font-black text-lg mb-1" style={{ color: C.text }}>{p.title}</h3>
            <p className="text-[12px] mb-3" style={{ color: p.accent }}>{p.subtitle}</p>
            <p className="text-[13px] leading-5 mb-4" style={{ color: C.textMuted }}>{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(184,115,14,0.14)", color: dark ? "rgba(255,255,255,0.85)" : "#1a1408" }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex items-center justify-center p-4"
            style={{ background: dark ? "rgba(8,9,26,0.88)" : "rgba(245,240,232,0.88)", backdropFilter: "blur(10px)" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl p-7 max-w-lg w-full"
              style={{ background: dark ? "#0d1128" : "#f5f0e8", border: `1px solid ${selected.accent}44`, boxShadow: `0 0 60px ${selected.accent}18` }}>
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-xl transition"
                style={{ color: C.textMuted }}>✕</button>
              <div className="mb-4" style={{ filter: `drop-shadow(0 0 8px ${selected.accent}66)` }}>
                <selected.Icon />
              </div>
              <h3 className="text-2xl font-black" style={{ color: C.text }}>{selected.title}</h3>
              <p className="text-sm mb-4" style={{ color: selected.accent }}>{selected.subtitle}</p>
              <p className="text-[15px] leading-7" style={{ color: C.textMuted }}>{selected.desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {selected.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-3 py-1 rounded-full font-semibold"
                    style={{ background: `${selected.accent}18`, color: selected.accent, border: `1px solid ${selected.accent}30` }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function SkillPill({ skill, index }) {
  const { dark, C } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.035 }}
      whileHover={{ y: -4, scale: 1.06 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="rounded-xl flex flex-col items-center justify-center px-2 py-3"
      style={{
        height: 96,
        background: hov ? `${skill.color}15` : dark ? "rgba(255,255,255,0.02)" : "rgba(26,20,8,0.035)",
        border: hov ? `1.5px solid ${skill.color}77` : dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(184,115,14,0.22)",
        transition: "all 0.25s",
      }}>
      <div className="mb-2" style={{ filter: hov ? `drop-shadow(0 0 8px ${skill.color})` : "none", transition: "filter 0.25s" }}>
        <skill.Icon />
      </div>
      <p className="text-[8px] font-bold tracking-[0.1em] uppercase text-center px-1 leading-tight"
        style={{ color: hov ? skill.color : C.textMuted, transition: "color 0.25s" }}>{skill.name}</p>
    </motion.div>
  );
}

function Marquee({ items, color }) {
  const { C } = useTheme();
  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 w-20 h-full z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${C.bg}, transparent)` }} />
      <div className="absolute right-0 top-0 w-20 h-full z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${C.bg}, transparent)` }} />
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="px-4 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={{ border: `1px solid ${color}28`, background: `${color}07`, color: `${color}bb`, letterSpacing: "0.05em" }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Skills() {
  const { dark, C, t } = useTheme();

  const skillGroups = [
    {
      label: t.skills.g1Label, accent: C.gold, tagline: t.skills.g1Tagline,
      skills: [
        { name: "Kubernetes", Icon: Icon.Kubernetes, color: "#326CE5" },
        { name: "Docker",     Icon: Icon.Docker,     color: "#2496ED" },
        { name: "AWS",        Icon: Icon.AWS,        color: "#FF9900" },
        { name: "OpenStack",  Icon: Icon.OpenStack,  color: "#ED1944" },
        { name: "Azure",      Icon: Icon.Azure,      color: "#0089D6" },
        { name: "Ansible",    Icon: Icon.Ansible,    color: "#EE0000" },
        { name: "Prometheus", Icon: Icon.Prometheus, color: "#E6522C" },
        { name: "Grafana",    Icon: Icon.Grafana,    color: "#F46800" },
        { name: "Nginx",      Icon: Icon.Nginx,      color: "#009639" },
        { name: "Helm",       Icon: Icon.Helm,       color: "#0F1689" },
        { name: "Jenkins",    Icon: Icon.Jenkins,    color: "#D24939" },
        { name: "Traefik",    Icon: Icon.Traefik,    color: "#24A1C1" },
      ],
    },
    {
      label: t.skills.g2Label, accent: C.cyan, tagline: t.skills.g2Tagline,
      skills: [
        { name: "React.js",     Icon: Icon.React,      color: "#61DAFB" },
        { name: "React Native", Icon: Icon.React,      color: "#61DAFB" },
        { name: "Laravel",      Icon: Icon.Laravel,    color: "#FF2D20" },
        { name: "Node.js",      Icon: Icon.NodeJS,     color: "#5FA04E" },
        { name: "Spring Boot",  Icon: Icon.SpringBoot, color: "#6DB33F" },
        { name: ".NET",         Icon: Icon.Dotnet,     color: "#512BD4" },
        { name: "Angular",      Icon: Icon.Angular,    color: "#DD0031" },
        { name: "Express.js",   Icon: Icon.Express,    color: "#E0E0E0" },
        { name: "Symfony",      Icon: Icon.Symfony,    color: "#ffffff" },
        { name: "Flask",        Icon: Icon.Flask,      color: "#ffffff" },
        { name: "Flutter",      Icon: Icon.Flutter,    color: "#02569B" },
        { name: "JavaFX",       Icon: Icon.JavaFX,     color: "#ED8B00" },
        { name: "Chart.js",     Icon: Icon.ChartJS,    color: "#FF6384" },
      ],
    },
    {
      label: t.skills.g3Label, accent: C.ember, tagline: t.skills.g3Tagline,
      skills: [
        { name: "Python",       Icon: Icon.Python,      color: "#3776AB" },
        { name: "C#",           Icon: Icon.Csharp,      color: "#239120" },
        { name: "TypeScript",   Icon: Icon.TypeScript,  color: "#3178C6" },
        { name: "JavaScript",   Icon: Icon.JavaScript,  color: "#F7DF1E" },
        { name: "PHP",          Icon: Icon.PHP,         color: "#777BB3" },
        { name: "C / C++",      Icon: Icon.CPP,         color: "#00599C" },
        { name: "Java",         Icon: Icon.Java,        color: "#007396" },
        { name: "PostgreSQL",   Icon: Icon.PostgreSQL,  color: "#4169E1" },
        { name: "Redis",        Icon: Icon.Redis,       color: "#DC382D" },
        { name: "MongoDB",      Icon: Icon.MongoDB,     color: "#47A248" },
        { name: "MySQL",        Icon: Icon.MySQL,       color: "#4479A1" },
        { name: "Oracle DB",    Icon: Icon.OracleDB,    color: "#F80000" },
        { name: "Firebase",     Icon: Icon.Firebase,    color: "#FFCA28" },
      ],
    },
    {
      label: t.skills.g4Label, accent: C.sage, tagline: t.skills.g4Tagline,
      skills: [
        { name: "Scikit-learn", Icon: Icon.ScikitLearn, color: "#F7931E" },
        { name: "Pandas",       Icon: Icon.Pandas,      color: "#150458" },
        { name: "NumPy",        Icon: Icon.NumPy,       color: "#013243" },
        { name: "XGBoost",      Icon: Icon.XGBoost,     color: "#226496" },
        { name: "Git / GitHub", Icon: Icon.Git,        color: "#F05032" },
        { name: "Figma",        Icon: Icon.Figma,      color: "#F24E1E" },
        { name: "Postman",      Icon: Icon.Postman,    color: "#FF6C37" },
        { name: "Arduino",      Icon: Icon.Arduino,     color: "#00979D" },
        { name: "Claude API",   Icon: Icon.Claude,      color: "#CC785C" },
      ],
    },
  ];

  const marqueeItems1 = ["Laravel 13 ✦", "React 19 ✦", ".NET ✦", "C# ✦", "TypeScript ✦", "Python ✦", "Java ✦", "PHP ✦", "Dart ✦", "SQL ✦", "C / C++ ✦"];
  const marqueeItems2 = ["AWS ✦", "K3s / K8s ✦", "Traefik ✦", "cert-manager ✦", "Jenkins CI/CD ✦", "Sanctum ✦", "PostgreSQL ✦", "Redis ✦", "Git/GitHub ✦", "Postman ✦", "Agile/Scrum ✦"];

  return (
    <section id="skills" className="relative z-10 px-4 sm:px-8 md:px-14 pt-10 pb-24 overflow-hidden">
      <div className="absolute right-[5%] top-[5%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: C.gold, filter: "blur(160px)", opacity: 0.06 }} />
      <div className="relative max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-2">
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(48px,8vw,96px)", color: C.text, lineHeight: 1 }}>{t.skills.title}</h2>
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: 28, color: C.gold, display: "inline-block" }}>☸</motion.span>
        </motion.div>
        <p className="mb-14 text-[10px] tracking-[0.22em] uppercase" style={{ color: C.textSub }}>
          {t.skills.tagline}
        </p>

        <div className="space-y-12">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.label}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.6 }}>
              <div className="flex items-baseline gap-3 mb-5">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: gi * 0.5 }}
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: group.accent, boxShadow: `0 0 8px ${group.accent}` }} />
                <h3 className="text-[11px] tracking-[0.24em] uppercase font-bold" style={{ color: group.accent }}>{group.label}</h3>
                <span className="text-[10px] hidden sm:block" style={{ color: C.textSub }}>— {group.tagline}</span>
                <div className="flex-1 h-px ml-1" style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(184,115,14,0.22)" }} />
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
                {group.skills.map((skill, si) => <SkillPill key={skill.name} skill={skill} index={gi * 10 + si} />)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 space-y-5">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: C.cyan }}>{t.skills.marquee1Title}</p>
            <Marquee items={marqueeItems1} color={C.cyan} />
          </div>
          <div>
            <p className="mb-3 text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: C.ember }}>{t.skills.marquee2Title}</p>
            <Marquee items={marqueeItems2} color={C.ember} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TIMELINE ITEM ──────────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const { C } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.13 }}
      className="grid grid-cols-[70px_22px_1fr] sm:grid-cols-[90px_28px_1fr] gap-3 sm:gap-5 items-start">
      <div>
        <p className="text-base sm:text-xl font-bold" style={{ color: item.accent }}>{item.year}</p>
        <p className="mt-1 text-[10px] tracking-widest uppercase" style={{ color: `${item.accent}88` }}>{item.period}</p>
      </div>
      <div className="relative z-10 mt-1.5">
        <motion.div animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          className="w-4 h-4 rounded-full"
          style={{ background: item.accent, border: `3px solid ${C.bg}`, boxShadow: `0 0 16px ${item.accent}bb` }} />
      </div>
      <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.25 }}
        className="relative rounded-xl p-4 overflow-hidden"
        style={{ background: `${item.accent}06`, border: `1px solid ${item.accent}22` }}>
        <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
          style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}bb` }} />
        <div className="pl-3">
          <p className="text-[9px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: `${item.accent}88` }}>{item.tag}</p>
          <h3 className="text-sm sm:text-base font-bold" style={{ color: C.text }}>{item.title}</h3>
          {item.subtitle && <p className="text-[11px] mt-0.5" style={{ color: item.accent }}>{item.subtitle}</p>}
          <p className="mt-1.5 text-xs sm:text-sm leading-5 sm:leading-6 max-w-sm" style={{ color: C.textMuted }}>{item.text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── DEPLOY DASHBOARD ───────────────────────────────────────── */
function DeployDashboard() {
  const { dark, C, t } = useTheme();
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-full max-w-[360px]"
      style={{ borderRadius: 20, overflow: "hidden", background: dark ? "#0d1128" : "#ede8df", border: `1.5px solid ${C.gold}40`, boxShadow: `0 0 60px ${C.gold}18, 0 30px 60px rgba(0,0,0,0.35)` }}>

      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: `${C.gold}07`, borderBottom: `1px solid ${C.gold}22` }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: `${C.gold}77`, letterSpacing: "0.1em" }}>{t.experience.dashboardDeploy}</span>
        <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 1.2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: C.sage, display: "inline-block", boxShadow: `0 0 8px ${C.sage}` }} />
      </div>

      <div className="px-5 py-4 space-y-2" style={{ fontFamily: "monospace", fontSize: 11 }}>
        {[
          { prefix: "✔", text: "OpenStack cloud provisioned",       color: C.sage,      delay: 0   },
          { prefix: "✔", text: "Kubernetes cluster ready (7 nodes)", color: C.sage,      delay: 0.3 },
          { prefix: "✔", text: "Docker images built & pushed",       color: C.cyan,      delay: 0.6 },
          { prefix: "✔", text: "Helm chart deployed to prod",        color: C.gold,      delay: 0.9 },
          { prefix: "✔", text: "Prometheus + Grafana live",          color: C.champagne, delay: 1.2 },
          { prefix: "▶", text: "Ingress-nginx serving traffic...",   color: C.ember,     delay: 1.5 },
        ].map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 + line.delay, duration: 0.4 }}
            className="flex items-center gap-2">
            <span style={{ color: line.color, fontSize: 10, flexShrink: 0 }}>{line.prefix}</span>
            <span style={{ color: C.textMuted }}>{line.text}</span>
            {i === 5 && (
              <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: line.color }}>_</motion.span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mx-5 mb-2">
        <div className="flex justify-between mb-1">
          <span style={{ fontSize: 9, color: `${C.gold}88`, fontFamily: "monospace", letterSpacing: "0.1em" }}>{t.experience.dashboardProgress}</span>
          <span style={{ fontSize: 9, color: C.sage, fontFamily: "monospace", fontWeight: 700 }}>100%</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: dark ? "rgba(255,255,255,0.08)" : "rgba(184,115,14,0.20)" }}>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }}
            viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
            style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${C.gold}, ${C.sage})`, boxShadow: `0 0 8px ${C.gold}` }} />
        </div>
      </div>

      <motion.div animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 2.5, repeat: Infinity }}
        className="mx-5 mb-5 mt-3 rounded-xl flex items-center gap-3 px-4 py-3"
        style={{ background: `${C.sage}10`, border: `1px solid ${C.sage}33` }}>
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 8, height: 8, borderRadius: "50%", background: C.sage, boxShadow: `0 0 12px ${C.sage}`, flexShrink: 0 }} />
        <div>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: C.sage, fontWeight: 700, letterSpacing: "0.06em" }}>{t.experience.dashboardLive}</p>
          <p style={{ fontFamily: "monospace", fontSize: 9, color: C.textMuted, marginTop: 2 }}>uptime: 99.97% · latency: 12ms</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────── */
function Experience() {
  const { C, t } = useTheme();

  const experiences = [
    {
      year: "2026", period: "Jul – Aug", tag: t.experience.exp1Tag,
      title: t.experience.exp1Title, subtitle: t.experience.exp1Sub,
      text: t.experience.exp1Text,
      accent: C.sage,
    },
    {
      year: "2025", period: "Jul – Aug", tag: t.experience.exp2Tag,
      title: t.experience.exp2Title, subtitle: t.experience.exp2Sub,
      text: t.experience.exp2Text,
      accent: C.gold,
    },
  ];

  const education = [
    {
      year: "2023", period: "– Present", tag: t.experience.edu1Tag,
      title: t.experience.edu1Title, subtitle: t.experience.edu1Sub,
      text: t.experience.edu1Text,
      accent: C.cyan,
    },
    {
      year: "2021", period: "– 2022", tag: t.experience.edu2Tag,
      title: t.experience.edu2Title, subtitle: t.experience.edu2Sub,
      text: t.experience.edu2Text,
      accent: C.champagne,
    },
  ];

  return (
    <section id="experience" className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-10 overflow-hidden">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute left-[20%] top-[10%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: C.gold, filter: "blur(130px)" }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-7 space-y-14">
          <div>
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text, lineHeight: 1 }}>{t.experience.title}</h2>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 11h.01M12 11h.01M16 11h.01"/>
              </svg>
            </motion.div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-8" style={{ color: C.textSub }}>{t.experience.tagline}</p>
            <div className="relative">
              <div className="absolute left-[72px] sm:left-[87px] top-3 bottom-2 w-[2px] rounded-full"
                style={{ background: `linear-gradient(to bottom, ${C.gold}, ${C.gold}22)`, boxShadow: `0 0 10px ${C.gold}44` }} />
              <div className="space-y-8">
                {experiences.map((item, i) => <TimelineItem key={`${item.title}-${i}`} item={item} index={i} />)}
              </div>
            </div>
          </div>

          <div>
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text, lineHeight: 1 }}>{t.experience.eduTitle}</h2>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/>
              </svg>
            </motion.div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-8" style={{ color: C.textSub }}>{t.experience.eduTagline}</p>
            <div className="relative">
              <div className="absolute left-[72px] sm:left-[87px] top-3 bottom-2 w-[2px] rounded-full"
                style={{ background: `linear-gradient(to bottom, ${C.cyan}, ${C.champagne}55)`, boxShadow: `0 0 10px ${C.cyan}44` }} />
              <div className="space-y-8">
                {education.map((item, i) => <TimelineItem key={`${item.title}-${i}`} item={item} index={i} />)}
              </div>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.88, x: 30 }} whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.23,1,0.32,1] }}
          className="lg:col-span-5 relative min-h-[400px] hidden lg:flex justify-center items-center sticky top-28 self-start">
          <div className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ background: C.gold, filter: "blur(120px)", opacity: 0.08 }} />
          <DeployDashboard />
          <motion.div animate={{ y: [0, -6, 0], rotate: [3, 5, 3] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-4 right-0 z-20 px-4 py-3 rounded-2xl"
            style={{ background: `${C.ember}15`, border: `1.5px solid ${C.ember}55`, boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${C.ember}18` }}>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: C.ember, lineHeight: 1, textAlign: "center" }}>9+</p>
            <p style={{ fontSize: 9, color: C.textMuted, textAlign: "center", letterSpacing: "0.12em", marginTop: 2 }}>{t.experience.statProjects}</p>
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0], rotate: [-4, -2, -4] }} transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
            className="absolute bottom-4 right-0 z-20 px-4 py-3 rounded-2xl"
            style={{ background: `${C.sage}15`, border: `1.5px solid ${C.sage}55`, boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${C.sage}18` }}>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: C.sage, lineHeight: 1, textAlign: "center" }}>∞</p>
            <p style={{ fontSize: 9, color: C.textMuted, textAlign: "center", letterSpacing: "0.12em", marginTop: 2 }}>{t.experience.statCuriosity}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  const { dark, C, t } = useTheme();
  const [cursorColor, setCursorColor] = useState(C.gold);
  const [cursorVisible, setCursorVisible] = useState(false);

  const socials = [
    { IconComp: Icon.GitHub,   label: "GitHub",   handle: "github.com/yomnabouallegue",             href: "https://github.com/yum19",                       color: C.gold      },
    { IconComp: Icon.LinkedIn, label: "LinkedIn", handle: "yomna-bouallegue-787731273",              href: "https://www.linkedin.com/in/yomna-bouallegue-788731273/",   color: C.cyan      },
    { IconComp: Icon.Email,    label: "Email",    handle: "yomnabouallegue2468@gmail.com",              href: "mailto:yomnabouallegue2468@gmail.com",                        color: C.sage      },
    { IconComp: Icon.Phone,    label: "Phone",    handle: "+216 26 847 647",                         href: "tel:+21626847647",                                         color: C.ember     },
  ];

  return (
    <>
      <HeartCursor color={cursorColor} visible={cursorVisible} />
      <section id="contact"
        className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-16 md:pb-24 overflow-hidden md:cursor-none"
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => { setCursorVisible(false); setCursorColor(C.gold); }}>

        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute left-[30%] top-[10%] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: C.gold, filter: "blur(130px)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative">
            <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(40px,7vw,88px)", color: C.text, lineHeight: 1 }}>
              {t.contact.title}{" "}
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ color: C.gold, display: "inline-block" }}>♡</motion.span>
            </h2>
            <p className="text-[11px] tracking-[0.22em] uppercase mt-2 mb-8" style={{ color: C.textSub }}>
              {t.contact.tagline}
            </p>
            <div className="space-y-3">
              {socials.map((s, i) => (
                <motion.a key={s.label} href={s.href}
                  target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onMouseEnter={() => setCursorColor(s.color)}
                  onMouseLeave={() => setCursorColor(C.gold)}
                  className="flex items-center gap-4 p-4 rounded-2xl no-underline"
                  style={{ background: `${s.color}07`, border: `1px solid ${s.color}22`, transition: "all 0.3s", cursor: "none" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}14`, border: `1px solid ${s.color}30` }}>
                    <s.IconComp />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: `${s.color}99` }}>{s.label}</p>
                    <p className="text-sm font-semibold truncate mt-0.5" style={{ color: C.textMuted }}>{s.handle}</p>
                  </div>
                  <span style={{ color: s.color, fontSize: 18 }}>↗</span>
                </motion.a>
              ))}
            </div>
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity }}
              style={{ fontFamily: "'Caveat', cursive", fontSize: 26, marginTop: 28, color: `${C.gold}55`, transform: "rotate(-2deg)" }}>
              {t.contact.strangerText}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92, x: 30 }} whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative min-h-[220px] md:min-h-[420px] flex items-center justify-center">

            <div className="absolute w-[380px] h-[380px] rounded-full pointer-events-none"
              style={{ background: C.gold, filter: "blur(130px)", opacity: 0.07 }} />
            <div className="absolute w-[220px] h-[220px] rounded-full pointer-events-none"
              style={{ background: C.cyan, filter: "blur(100px)", opacity: 0.05, top: "10%", right: "5%" }} />

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[440px]">
              <div style={{ position: "absolute", inset: -1, borderRadius: 28, background: `linear-gradient(135deg, ${C.gold}55, ${C.cyan}33, ${C.sage}33)`, zIndex: 0 }} />
              <div style={{ position: "relative", borderRadius: 26, background: dark ? "rgba(13,17,40,0.95)" : "rgba(237,232,223,0.97)", backdropFilter: "blur(20px)", zIndex: 1, overflow: "hidden", padding: "36px 32px 32px" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.03,
                  backgroundImage: `linear-gradient(to right, ${C.gold} 1px, transparent 1px), linear-gradient(to bottom, ${C.gold} 1px, transparent 1px)`,
                  backgroundSize: "28px 28px" }} />
                <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.cyan}, transparent)`, borderRadius: 99 }} />
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ position: "absolute", top: 20, right: 24, width: 60, height: 60, borderRadius: "50%",
                    background: `radial-gradient(circle, ${C.gold}66, transparent)`, filter: "blur(12px)" }} />
                <motion.p animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(34px,5vw,52px)", lineHeight: 1.05,
                    backgroundImage: `linear-gradient(120deg, ${C.gold}, ${C.champagne}, ${C.cyan}, ${C.gold})`,
                    backgroundSize: "200% 200%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    textShadow: dark ? `0 0 20px ${C.gold}33` : "none", marginBottom: 6, whitespace: "pre-line" }}>
                  {t.contact.cardTitle}
                </motion.p>
                <p style={{ fontSize: 11, color: C.textSub, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 28, fontFamily: "'Inter', sans-serif" }}>
                  {t.contact.cardSub}
                </p>
                <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                  {[
                    { val: "9+", label: t.contact.statProjects,   color: C.gold  },
                    { val: "2",  label: t.contact.statInternships,color: C.ember },
                    { val: "∞",  label: t.contact.statDrive,      color: C.sage  },
                  ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.06, y: -3 }}
                      style={{ flex: 1, borderRadius: 14, padding: "12px 8px", textAlign: "center",
                        background: `${stat.color}08`, border: `1px solid ${stat.color}28` }}>
                      <p style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: stat.color, lineHeight: 1, fontWeight: 700 }}>{stat.val}</p>
                      <p style={{ fontSize: 9, color: C.textSub, letterSpacing: "0.12em", marginTop: 4 }}>{stat.label.toUpperCase()}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.a href="mailto:yomnabouallegue2468@gmail.com"
                  whileHover={{ scale: 1.03, boxShadow: `0 0 32px ${C.gold}44` }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "14px 0", borderRadius: 14, textDecoration: "none",
                    background: `linear-gradient(135deg, ${C.gold}22, ${C.cyan}11)`,
                    border: `1.5px solid ${C.gold}55`,
                    color: C.gold, fontFamily: "'Inter', sans-serif", fontWeight: 800,
                    fontSize: 13, letterSpacing: "0.1em", transition: "all 0.3s" }}>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                  yomnabouallegue2468@gmail.com
                </motion.a>
                <motion.div animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ marginTop: 20, height: 1, borderRadius: 99, transformOrigin: "center",
                    background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.cyan}, transparent)` }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  const { C, t } = useTheme();
  return (
    <footer className="relative z-10 mt-24 pb-12 pt-8">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${C.gold}0a, transparent 65%)` }} />
      <div className="relative flex flex-col items-center text-center">
        <div className="w-40 h-px mb-8"
          style={{ background: `linear-gradient(to right, transparent, ${C.gold}66, transparent)` }} />
        <motion.p animate={{ opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity }}
          style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(26px,5vw,46px)", color: `${C.gold}88` }}>
          {t.footer.slogan}
        </motion.p>
        <p className="mt-4 text-sm tracking-wide" style={{ color: C.textSub }}>{t.footer.thanks}</p>
        <p style={{ fontFamily: "'Caveat', cursive", marginTop: 24, fontSize: 24, color: C.textMuted }}>— Yomna</p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: C.textSub }}>© 2026 Yomna Bouallegue</p>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("EN");
  const C = dark ? DARK : LIGHT;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  const gridLine = C.gridLine;

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d), lang, setLang, toggleLang: () => setLang(l => l === "EN" ? "FR" : "EN"), C, t }}>
      <main style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
        {/* Ambient radial glow */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: dark
            ? `radial-gradient(circle at 70% 40%, ${C.gold}10, transparent 28%), radial-gradient(circle at 20% 70%, ${C.cyan}09, transparent 26%), ${C.bg}`
            : `radial-gradient(circle at 70% 40%, ${C.gold}18, transparent 30%), radial-gradient(circle at 20% 70%, ${C.cyan}12, transparent 28%), ${C.bg}`,
          transition: "background 0.4s",
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.6,
          backgroundImage: `linear-gradient(to right, ${gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(circle at 65% 45%, black 5%, transparent 72%)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <ITModels3D />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </ThemeContext.Provider>
  );
}