import { useState, useEffect, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import ITModels3D from "./ITModels3D";

/* ══════════════════════════════════════════════════════════════
   THEME CONTEXT
══════════════════════════════════════════════════════════════ */
const ThemeContext = createContext({ dark: true, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);

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
  gold:       "#c47f10",
  cyan:       "#2e8fad",
  ember:      "#c04e20",
  sage:       "#1f9e5e",
  champagne:  "#8a6d2e",
  bg:         "#f5f0e8",
  surface:    "#ede8df",
  card:       "#e5dfd5",
  text:       "#1a1408",
  textMuted:  "rgba(26,20,8,0.55)",
  textSub:    "rgba(26,20,8,0.35)",
  border:     "rgba(192,126,16,0.2)",
  gridLine:   "rgba(192,126,16,0.06)",
  navBg:      "rgba(245,240,232,0.75)",
  glow1:      "#f0a830",
  glow2:      "#5eb8d4",
};

/* ─── SVG ICONS (real brand logos) ──────────────────────────── */
const Icon = {
  Kubernetes: () => (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
      <path d="M16 2.667L3.333 9.333v13.334L16 29.333l12.667-6.666V9.333L16 2.667z" fill="#326CE5"/>
      <path d="M16 7l-2.5 4.5-5 .5 3.5 3.5-.5 5 4.5-2.5 4.5 2.5-.5-5 3.5-3.5-5-.5L16 7z" fill="white"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#2496ED"/>
      <path d="M17.5 13h-2v2h2v-2zm-3 0h-2v2h2v-2zm-3 0h-2v2h2v-2zm-3 0h-2v2h2v-2zm9-3h-2v2h2v-2zm-3 0h-2v2h2v-2zm-3 0h-2v2h2v-2zm12 3h-2v2h2v-2zm-3 0h-2v2h2v-2zm1-6h-2v2h2V7z" fill="white"/>
      <path d="M27.5 15.5s-.5-2-3-2c0 0-1-2-4-2H5s-1 5 2 7c1.5 1 3.5 1 5 1h11c4 0 5-2 5-2s1 0 1-2h-1z" fill="white"/>
    </svg>
  ),
  OpenStack: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#ED1944"/>
      <rect x="5" y="5" width="9" height="3" rx="1" fill="white"/>
      <rect x="18" y="5" width="9" height="3" rx="1" fill="white"/>
      <rect x="5" y="14.5" width="9" height="3" rx="1" fill="white"/>
      <rect x="18" y="14.5" width="9" height="3" rx="1" fill="white"/>
      <rect x="5" y="24" width="9" height="3" rx="1" fill="white"/>
      <rect x="18" y="24" width="9" height="3" rx="1" fill="white"/>
    </svg>
  ),
  Azure: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <path d="M16 2L4 28h8l3-6h6l3 6h8L16 2z" fill="#0089D6"/>
      <path d="M16 8l-5 12h10L16 8z" fill="#50E6FF"/>
    </svg>
  ),
  Ansible: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <circle cx="16" cy="16" r="14" fill="#1A1918"/>
      <path d="M16 5a11 11 0 100 22A11 11 0 0016 5zm4.5 16.5l-7-4.5 5-9 5 14.5h-3z" fill="#EE0000"/>
    </svg>
  ),
  Prometheus: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <circle cx="16" cy="16" r="14" fill="#E6522C"/>
      <circle cx="16" cy="16" r="5" fill="white"/>
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.9 6.9l2.8 2.8M22.3 22.3l2.8 2.8M6.9 25.1l2.8-2.8M22.3 9.7l2.8-2.8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Grafana: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#F46800"/>
      <circle cx="16" cy="16" r="8" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M12 16h2l2-4 2 8 2-4h2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Nginx: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#009639"/>
      <path d="M7 25V7l9 13.5L25 7v18" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Helm: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#0F1689"/>
      <circle cx="16" cy="16" r="7" fill="none" stroke="#277A9F" strokeWidth="2"/>
      <circle cx="16" cy="16" r="3" fill="#277A9F"/>
      <path d="M16 5v4M16 23v4M5 16h4M23 16h4" stroke="#277A9F" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#339933"/>
      <path d="M16 7v14M10 10.5l6 3.5 6-3.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Angular: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <path d="M16 3L4 7l2 17 10 5 10-5 2-17L16 3z" fill="#DD0031"/>
      <path d="M16 3v26" stroke="#C3002F" strokeWidth="1"/>
      <path d="M11 20l5-12 5 12M13 17h6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  SpringBoot: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <circle cx="16" cy="16" r="13" fill="#6DB33F"/>
      <path d="M10 22C8 19 8 13 12 10c-1 3 0 6 3 7-1-2 0-5 2-6 0 4 3 7 2 11-1 2-4 3-6 2-1 0-2-2-3-4z" fill="white"/>
    </svg>
  ),
  Express: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#404040"/>
      <text x="5" y="21" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="white">Ex</text>
    </svg>
  ),
  Symfony: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#1A171B"/>
      <path d="M16.5 7C11.5 7 8 10.5 8 15.5c0 4.4 3 8 7.5 8.5 4.5.5 8.5-2.5 9-7 .5-3.5-1.5-6.5-5-7.5 2 1 3 3 2.7 5-.3 1.5-1.5 2.5-3 2.5-1 0-1.7-.7-1.5-1.5.1-.4.4-.7.7-.7.6 0 1 .5.8 1.1.4-.1.7-.5.8-1 .2-1.2-.5-2.3-1.7-2.5-1.8-.3-3.5 1-3.8 2.8-.4 2 1 3.8 3 4 1.5.2 3-.5 3.8-1.8.9-1.5.7-3.3-.5-4.5 2 .7 3 2.5 2.8 4.5-.3 2.5-2.5 4.3-5 4.2-3-.1-5.2-2.7-5-5.7.2-2.5 2.2-4.5 4.7-4.5.8 0 1.5.2 2.2.5C18.5 8.2 17 7 15 7h1.5z" fill="white"/>
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#13AA52"/>
      <path d="M16 4c0 0-6 8-6 14a6 6 0 0012 0C22 12 16 4 16 4z" fill="white"/>
      <path d="M16 28V16" stroke="#13AA52" strokeWidth="1.5"/>
    </svg>
  ),
  MySQL: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#00618A"/>
      <path d="M5 10c0 0 3-2 7-1.5L15 10M15 10c2.5-2.5 7-2.5 9 0M5 22c0 0 3 2 7 1.5L15 22M15 22c2.5 2.5 7 2.5 9 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M5 10v12M15 10v12M24 10v12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  OracleDB: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#F80000"/>
      <ellipse cx="16" cy="16" rx="11" ry="6.5" fill="none" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <defs>
        <linearGradient id="pyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#366996"/>
          <stop offset="100%" stopColor="#FFD845"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="4" fill="url(#pyGrad)"/>
      <path d="M16 4c-5 0-5 2-5 2v3h10V8H11V6.5C11 6.5 11 5 16 5c5 0 5 1.5 5 1.5V10h-3V8H16z" fill="white" opacity="0.85"/>
      <path d="M16 28c5 0 5-2 5-2v-3H11v1h10v1.5c0 0 0 1.5-5 1.5-5 0-5-1.5-5-1.5V22h3v2h2z" fill="white" opacity="0.85"/>
      <circle cx="14" cy="7" r="1" fill="#366996"/>
      <circle cx="18" cy="25" r="1" fill="#FFD845"/>
    </svg>
  ),
  Flask: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
      <path d="M14 5h4v8l5 10c1 2-1 4-3 4H12c-2 0-4-2-3-4l5-10V5z" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M10 22l12 0" stroke="#f0a830" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="24" r="1" fill="#f0a830"/>
      <circle cx="16" cy="25.5" r="1" fill="#f0a830"/>
    </svg>
  ),
  Flutter: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <defs>
        <linearGradient id="flGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#54C5F8"/>
          <stop offset="100%" stopColor="#01579B"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="4" fill="url(#flGrad)"/>
      <path d="M8 16L18 6h6L14 16l10 10h-6L8 16z" fill="white"/>
      <path d="M14 16l4 4-4 4-4-4 4-4z" fill="#29B6F6"/>
    </svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#FFCA28"/>
      <path d="M7 26L12 7l5 9-3 4 3 6H7z" fill="#FF8F00"/>
      <path d="M17 22l3-12 5 14H17z" fill="#FF6F00"/>
      <path d="M14 16l2-6 5 14" fill="#FFA000" opacity="0.7"/>
    </svg>
  ),
  CPP: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#00427C"/>
      <text x="6" y="22" fontFamily="monospace" fontWeight="bold" fontSize="13" fill="white">C++</text>
    </svg>
  ),
  ScikitLearn: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#F89939"/>
      <circle cx="11" cy="16" r="5" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="22" cy="16" r="4" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M16 14v4M14 16h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#F05032"/>
      <circle cx="22" cy="10" r="3" fill="white"/>
      <circle cx="22" cy="22" r="3" fill="white"/>
      <circle cx="10" cy="22" r="3" fill="white"/>
      <path d="M22 13v6M13 22h6M10 19V13l9-3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#1E1E1E"/>
      <circle cx="19" cy="16" r="4" fill="#1ABCFE"/>
      <rect x="9" y="5" width="8" height="8" rx="2" fill="#FF7262"/>
      <rect x="17" y="5" width="8" height="8" rx="2" fill="#F24E1E"/>
      <rect x="9" y="13" width="8" height="8" rx="2" fill="#A259FF"/>
      <rect x="9" y="21" width="8" height="8" rx="2" fill="#0ACF83"/>
    </svg>
  ),
  Postman: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#FF6C37"/>
      <circle cx="16" cy="16" r="9" fill="white"/>
      <circle cx="16" cy="16" r="5" fill="#FF6C37"/>
      <path d="M16 11v5l3 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Arduino: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#00979D"/>
      <path d="M9 16h4M19 16h4M16 12h-2a4 4 0 000 8h2M16 12h2a4 4 0 010 8h-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Claude: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="6" fill="#CC785C"/>
      <path d="M10 22l3-12h2l3 8 3-8h2l3 12h-2l-2-8-3 8h-1l-3-8-2 8H10z" fill="white"/>
    </svg>
  ),
  JavaFX: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#ED8B00"/>
      <text x="5" y="22" fontFamily="serif" fontWeight="bold" fontSize="12" fill="white">Java</text>
    </svg>
  ),
  PHP: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#777BB3"/>
      <ellipse cx="16" cy="16" rx="14" ry="8" fill="#4F5B93"/>
      <text x="9" y="20" fontFamily="monospace" fontWeight="bold" fontSize="12" fill="white">PHP</text>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="16" fill="#1b1f23"/>
      <path d="M16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 4.6 3 8.5 7.1 9.9.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-.1.3 2.8 1 2.7 0 1.4.6 2.3 1 2.7 0 4-2.4 4.9-4.7 5.2.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4.1-1.4 7.1-5.3 7.1-9.9C26.5 10.2 21.8 5.5 16 5.5z" fill="white"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#0A66C2"/>
      <path d="M8 12h4v12H8V12zm2-6a2 2 0 110 4 2 2 0 010-4zm6 6h3.8v1.6h.1c.5-1 1.8-2 3.7-2 3.9 0 4.6 2.6 4.6 6V24h-4v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.2 1.5-2.2 3V24H14V12z" fill="white"/>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="4" fill="#EA4335"/>
      <path d="M6 10l10 8 10-8M6 10h20v14H6V10z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 32 32" width="28" height="28">
      <rect width="32" height="32" rx="16" fill="#4ecf8a"/>
      <path d="M11 8h4l2 5-2.5 2c1 2 3 4 5 5l2-2.5 5 2v4c0 2-2 3-4 2A20 20 0 019 10c-1-2 0-4 2-2z" fill="white"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
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
const navLinks = [
  { label: "HOME",       href: "#home",       key: "gold"      },
  { label: "ABOUT",      href: "#about",      key: "cyan"      },
  { label: "PROJECTS",   href: "#projects",   key: "ember"     },
  { label: "SKILLS",     href: "#skills",     key: "gold"      },
  { label: "EXPERIENCE", href: "#experience", key: "sage"      },
  { label: "CONTACT",    href: "#contact",    key: "champagne" },
];

function Navbar() {
  const { dark, toggle, C } = useTheme();
  const [cursorColor, setCursorColor] = useState(C.gold);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            className="flex items-center justify-between px-5 sm:px-10 md:px-16 py-4 md:py-5">

            <motion.a href="#home"
              onMouseEnter={() => setCursorColor(C.cyan)}
              onMouseLeave={() => setCursorColor(C.gold)}
              whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}
              className="font-bold leading-none md:cursor-none"
              style={{
                fontFamily: "'Caveat', cursive", fontSize: 30,
                background: `linear-gradient(100deg, ${C.gold}, ${C.champagne}, ${C.ember})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                textShadow: `0 0 8px ${C.gold}55`,
              }}>
              Yomna Bouallegue ♡
            </motion.a>

            <div className="hidden lg:flex items-center gap-10 text-[11px] font-extrabold tracking-[0.22em]">
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

            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              

              <motion.a
                href="/Yomna_Bouallegue_CV_EN.pdf"
                download="Yomna_Bouallegue_CV.pdf"
                whileHover={{ scale: 1.06, boxShadow: `0 0 24px ${C.gold}55` }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setCursorColor(C.ember)}
                onMouseLeave={() => setCursorColor(C.gold)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[13px] md:cursor-none"
                style={{ border: `1.5px solid ${C.gold}55`, color: C.gold, background: `${C.gold}0d`, transition: "all 0.3s" }}>
                <Icon.Download />
                Download CV
              </motion.a>

              <motion.a href="#contact"
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
                className="px-4 sm:px-7 py-2.5 sm:py-3 rounded-md font-extrabold text-[13px] sm:text-[15px] md:cursor-none inline-flex items-center gap-1"
                style={{ background: C.gold, color: "#1a0e00", boxShadow: `0 0 28px ${C.gold}44` }}>
                Let's Talk ↗
              </motion.a>

              <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-xl"
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
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-[12px] font-extrabold tracking-[0.2em]"
                    style={{ color: C.textMuted }}>
                    <span className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                      style={{ background: C[link.key], boxShadow: `0 0 6px ${C[link.key]}` }} />
                    {link.label}
                  </motion.a>
                ))}
                <button onClick={toggle}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-[12px] font-extrabold tracking-[0.2em]"
                  style={{ color: C.gold }}>
                  {dark ? <Icon.Sun /> : <Icon.Moon />}
                  {dark ? "LIGHT MODE" : "DARK MODE"}
                </button>
                <a href="/Yomna_Bouallegue_CV_EN.pdf" download="Yomna_Bouallegue_CV.pdf"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-[12px] font-extrabold tracking-[0.2em] mt-2"
                  style={{ color: C.gold, border: `1px solid ${C.gold}33`, background: `${C.gold}08` }}>
                  <Icon.Download />
                  DOWNLOAD CV
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
  const { dark, C } = useTheme();
  const [cursorVisible, setCursorVisible] = useState(false);

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
              Hi, I'm
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(44px,8.5vw,110px)",
                lineHeight: 0.85,
                fontWeight: 700,
                marginTop: 8,
                background: `linear-gradient(120deg, ${C.gold} 0%, ${C.champagne} 45%, ${C.ember} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 14px ${C.gold}44`,
              }}>
              Yomna<br />Bouallegue
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
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: `${C.gold}cc` }}>
                Cloud Computing Engineering Student · ESPRIT
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-4 leading-7 max-w-md text-[15px] mx-auto lg:mx-0"
              style={{ color: C.textMuted }}>
              I build <span style={{ color: C.gold, fontWeight: 600 }}>cloud-native</span> systems,{" "}
              <span style={{ color: C.cyan, fontWeight: 600 }}>full-stack</span> platforms, and{" "}
              <span style={{ color: C.ember, fontWeight: 600 }}>AI-powered</span> apps that actually ship.
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
              style={{ fontFamily: "'Caveat', cursive", marginTop: 12, fontSize: 18, color: `${C.gold}77`, transform: "rotate(-1.5deg)" }}>
              ✦ Tunis, Tunisia · open to internships ♡
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 }}
              className="flex flex-wrap gap-4 mt-9 justify-center lg:justify-start">
              <motion.a href="#projects"
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${C.gold}55` }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold text-sm"
                style={{ background: C.gold, color: "#1a0e00" }}>
                Explore My Work ↗
              </motion.a>
              <motion.a href="/Yomna_Bouallegue_CV_EN.pdf" download="Yomna_Bouallegue_CV.pdf"
                whileHover={{ scale: 1.05, borderColor: C.gold, color: C.gold }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold text-sm transition-all duration-300"
                style={{ border: `1px solid ${C.gold}44`, color: C.textMuted }}>
                <Icon.Download />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex gap-5 mt-9 justify-center lg:justify-start">
              {[
                { Ic: Icon.LinkedIn, href: "https://www.linkedin.com/in/yomna-bouallegue-788731273/", label: "LinkedIn" },
                { Ic: Icon.GitHub,   href: "https://github.com/yum19",                     label: "GitHub"   },
                { Ic: Icon.Email,    href: "mailto:yomna.bouallegue@esprit.tn",                      label: "Email"    },
              ].map((s, i) => (
                <motion.a key={i} href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                  whileHover={{ scale: 1.25, y: -3 }} transition={{ duration: 0.2 }}
                  title={s.label} style={{ display: "inline-flex", opacity: 0.75, filter: "grayscale(0.2)" }}>
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
              style={{ background: dark ? "rgba(8,9,26,0.92)" : "rgba(237,232,223,0.95)", border: `1px solid ${C.gold}33`, boxShadow: `0 0 60px ${C.gold}15, 0 0 120px ${C.cyan}0a` }}>
              <div className="flex items-center gap-2 px-4 py-3"
                style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)", borderBottom: `1px solid ${C.gold}18` }}>
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-4 font-mono text-[11px]" style={{ color: `${C.gold}66` }}>yomna@esprit:~$</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.9]">
                <div style={{ color: C.text }}><span style={{ color: C.cyan }}>const</span> <span style={{ color: C.gold }}>yomna</span> <span style={{ color: C.textMuted }}>=</span> {"{"}</div>
                <div className="ml-5" style={{ color: C.text }}><span style={{ color: C.champagne }}>name</span><span style={{ color: C.textMuted }}>:</span> <span style={{ color: C.sage }}>"Yomna Bouallegue"</span>,</div>
                <div className="ml-5" style={{ color: C.text }}><span style={{ color: C.champagne }}>school</span><span style={{ color: C.textMuted }}>:</span> <span style={{ color: C.sage }}>"ESPRIT – Cloud Computing"</span>,</div>
                <div className="ml-5" style={{ color: C.text }}><span style={{ color: C.champagne }}>stack</span><span style={{ color: C.textMuted }}>:</span> [<span style={{ color: C.ember }}>"K8s"</span>, <span style={{ color: C.ember }}>"React"</span>, <span style={{ color: C.ember }}>"Azure"</span>],</div>
                <div className="ml-5" style={{ color: C.text }}><span style={{ color: C.champagne }}>passion</span><span style={{ color: C.textMuted }}>:</span> <span style={{ color: C.sage }}>"building things that matter"</span>,</div>
                <div className="ml-5" style={{ color: C.text }}><span style={{ color: C.champagne }}>openToInternship</span><span style={{ color: C.textMuted }}>:</span> <span style={{ color: C.gold }}>true</span> <span style={{ color: C.textSub }}>// ♡</span></div>
                <div style={{ color: C.text }}>{"}"}</div>
                <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block w-2 h-5 align-middle ml-1 mt-1 rounded-sm"
                  style={{ background: C.gold }} />
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
  const { dark, C } = useTheme();

  const notes = [
    { title: "Curious",  text: "I ask questions and never stop learning.",         bg: dark ? "#1a1205" : "#fdf0d5", border: C.gold,      rotate: "-2deg",  svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
    { title: "Builder",  text: "From code to cloud — I turn ideas into products.", bg: dark ? "#071620" : "#dff3fb", border: C.cyan,      rotate:  "1.5deg", svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
    { title: "Cloud",    text: "Cloud-native at heart: K8s, Docker, OpenStack.",   bg: dark ? "#1a0c05" : "#fde8dc", border: C.ember,     rotate: "-1deg",   svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.ember} strokeWidth="2" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg> },
    { title: "AI-First", text: "I weave AI APIs into every platform I build.",     bg: dark ? "#061a0e" : "#d8f5e8", border: C.sage,      rotate:  "2deg",   svgIcon: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={C.sage} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill={C.sage}/></svg> },
  ];

  return (
    <section id="about" className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-12 overflow-x-hidden">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="lg:col-span-5 text-center lg:text-left">
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text }}>
            About me <span style={{ color: C.gold }}>☆</span>
          </h2>
          <div className="mt-6 space-y-4 leading-8 text-[15px] sm:text-[17px] max-w-[420px] mx-auto lg:mx-0" style={{ color: C.textMuted }}>
            <p>2nd-year <span style={{ color: C.gold, fontWeight: 600 }}>Cloud Computing Engineering</span> student at ESPRIT Tunis.</p>
            <p>I love building things — from deploying OpenStack private clouds and Kubernetes clusters, to shipping full-stack apps and integrating AI into real products.</p>
            <p>Also a fantasy fiction enthusiast who believes strong female leads and clean deployments have a lot in common ☕</p>
          </div>
          <div className="flex justify-center lg:justify-start">
            <a href="#contact"
              className="mt-7 inline-block rounded-full px-6 py-2.5 font-bold text-sm transition hover:scale-105"
              style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}44`, color: C.gold }}>
              Get in touch ↗
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
              { num: "6+", label: "Major Projects", color: C.gold      },
              { num: "3+", label: "Tech Stacks",     color: C.cyan      },
              { num: "1",  label: "Internship",      color: C.ember     },
              { num: "∞",  label: "Love for Code",   color: C.sage      },
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
            className="absolute right-12 top-8 text-3xl hidden sm:block pointer-events-none"
            style={{ fontFamily: "'Caveat', cursive", color: C.cyan, opacity: 0.45, transform: "rotate(-8deg)" }}>
            cloud<br/>native<br/>engineer
          </motion.span>
        </motion.div>
      </div>

      <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-4 items-start">
        <div style={{ fontFamily: "'Caveat', cursive", color: `${C.gold}88`, fontSize: 28, lineHeight: 0.95, transform: "rotate(-8deg)", paddingTop: 16, textAlign: "center" }}>
          What<br />drives<br />me →
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
  const { dark, C } = useTheme();
  const [selected, setSelected] = useState(null);

  const projects = [
    {
      title: "TFAKADNI",
      subtitle: "Cloud-Native Maternal Health Platform",
      tags: ["OpenStack", "Kubernetes", "Angular", "Spring Boot", "Prometheus", "JWT"],
      desc: "7-node OpenStack private cloud + Kubernetes v1.29 cluster with auto-remediation pipeline for CrashLoopBackOff. Angular + Spring Boot + MySQL with JWT/BCrypt security, Prometheus + Grafana monitoring, and Ingress-nginx.",
      accent: C.gold,
      badge: "Bal des Projets",
      Icon: Icon.Kubernetes,
    },
    {
      title: "FitLife",
      subtitle: "Sports & Nutrition Coaching Platform",
      tags: ["React Native", "React.js", "Node.js", "MongoDB", "Docker", "Azure VM", "Nginx"],
      desc: "Complete coaching platform built & deployed in 6 weeks during internship at Catalyze Tech. Multi-role mobile app + React.js admin dashboard + secure REST API. Deployed on Azure Linux VM with Docker & Nginx.",
      accent: C.cyan,
      badge: "Catalyze Tech Internship",
      Icon: Icon.NodeJS,
    },
    {
      title: "MedAssist AI",
      subtitle: "Medical Diagnosis Platform using Machine Learning",
      tags: ["Python", "Scikit-learn", "Flask", "XGBoost", "LightGBM", "Random Forest", "SVM"],
      desc: "Early detection of lung cancer, brain tumor, diabetes, depression & anxiety. Trained and benchmarked 6 ML models across 5 medical datasets. Flask-based prediction interface with interpretable real-time results.",
      accent: C.sage,
      badge: "AI / ML",
      Icon: Icon.ScikitLearn,
    },
    {
      title: "CHRONOSERENA",
      subtitle: "Distributed Medical Platform for Chronic Diseases",
      tags: ["JavaFX", "Symfony", "PHP", "MySQL", "REST API", "MVC"],
      desc: "Distributed medical platform for patients with chronic conditions. JavaFX desktop app + Symfony web interface. MVC architecture, REST APIs, Singleton design pattern and reactive data validation.",
      accent: C.champagne,
      badge: "Full-Stack",
      Icon: Icon.JavaFX,
    },
    {
      title: "Brush & Bargain",
      subtitle: "Mobile Art Sales & Exhibition App",
      tags: ["FlutterFlow", "Dart", "Firebase"],
      desc: "Cross-platform mobile app for buying, selling and showcasing artworks. Features event management, bookings, and a customer claims module — built with FlutterFlow and Firebase.",
      accent: C.ember,
      badge: "Mobile",
      Icon: Icon.Flutter,
    },
    {
      title: "AgroDesk",
      subtitle: "Agricultural Management Desktop App + Arduino System",
      tags: ["C++", "Qt Designer", "Oracle DB", "Arduino", "Servo Motor"],
      desc: "OOP C++ desktop application with Qt Designer for farm management, integrated with an Arduino module for automated animal feeding scheduling using a servo motor and push button.",
      accent: C.gold,
      badge: "Desktop + Embedded",
      Icon: Icon.Arduino,
    },
    {
      title: "Banking Security System",
      subtitle: "PIC16F877 Microcontroller Security System",
      tags: ["Embedded C", "PIC16F877", "EEPROM", "Gas Sensors", "Temperature Sensors"],
      desc: "Embedded banking security system on PIC16F877 monitoring gas and temperature sensors, with automatic alarm triggers and an EEPROM incident log for security agents.",
      accent: C.ember,
      badge: "Embedded Systems",
      Icon: Icon.CPP,
    },
    {
      title: "Aryam",
      subtitle: "2D Narrative Video Game (SDL / C)",
      tags: ["C", "SDL"],
      desc: "Narrative 2D game where heroine Aryam fights depression during the Covid-19 lockdown. Full game loop, sprite rendering and collision detection — built entirely in C with SDL.",
      accent: C.cyan,
      badge: "Game Dev",
      Icon: Icon.CPP,
    },
    {
      title: "KADAMNI",
      subtitle: "Web Recruitment Platform",
      tags: ["PHP", "HTML", "CSS", "MySQL"],
      desc: "Full recruitment website covering job posting, application management, and administration of employer and candidate accounts — built with vanilla PHP and MySQL.",
      accent: C.sage,
      badge: "Web Project",
      Icon: Icon.PHP,
    },
  ];

  return (
    <section id="projects" className="relative z-10 px-4 sm:px-8 md:px-12 pt-10 pb-16">
      <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="flex items-center gap-4 mb-2">
        <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(48px,8vw,96px)", color: C.text, lineHeight: 1 }}>Projects</h2>
        <motion.span animate={{ scale: [1, 1.25, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: 32, color: C.ember }}>✦</motion.span>
      </motion.div>
      <p className="mb-10 text-[10px] tracking-[0.22em] uppercase" style={{ color: C.textSub }}>
        Things I've built and shipped ♡
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
              {p.tags.map((t) => (
                <span key={t} className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)", color: C.textMuted }}>{t}</span>
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
                {selected.tags.map((t) => (
                  <span key={t} className="text-[11px] px-3 py-1 rounded-full font-semibold"
                    style={{ background: `${selected.accent}18`, color: selected.accent, border: `1px solid ${selected.accent}30` }}>{t}</span>
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
  const { C } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.035 }}
      whileHover={{ y: -4, scale: 1.06 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="rounded-xl flex flex-col items-center justify-center px-2 py-3"
      style={{
        height: 96,
        background: hov ? `${skill.color}0d` : "rgba(255,255,255,0.015)",
        border: hov ? `1px solid ${skill.color}55` : `1px solid rgba(255,255,255,0.06)`,
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
  const { C } = useTheme();

  const skillGroups = [
    {
      label: "Cloud & DevOps", accent: C.gold, tagline: "My primary focus",
      skills: [
        { name: "Kubernetes", Icon: Icon.Kubernetes, color: "#326CE5" },
        { name: "Docker",     Icon: Icon.Docker,     color: "#2496ED" },
        { name: "OpenStack",  Icon: Icon.OpenStack,  color: "#ED1944" },
        { name: "Azure",      Icon: Icon.Azure,      color: "#0089D6" },
        { name: "Ansible",    Icon: Icon.Ansible,    color: "#EE0000" },
        { name: "Prometheus", Icon: Icon.Prometheus, color: "#E6522C" },
        { name: "Grafana",    Icon: Icon.Grafana,    color: "#F46800" },
        { name: "Nginx",      Icon: Icon.Nginx,      color: "#009639" },
        { name: "Helm",       Icon: Icon.Helm,       color: "#277A9F" },
      ],
    },
    {
      label: "Full-Stack Dev", accent: C.cyan, tagline: "What I build every day",
      skills: [
        { name: "React.js",     Icon: Icon.React,      color: "#61DAFB" },
        { name: "React Native", Icon: Icon.React,      color: "#61DAFB" },
        { name: "Node.js",      Icon: Icon.NodeJS,     color: "#339933" },
        { name: "Angular",      Icon: Icon.Angular,    color: "#DD0031" },
        { name: "Spring Boot",  Icon: Icon.SpringBoot, color: "#6DB33F" },
        { name: "Express.js",   Icon: Icon.Express,    color: "#999"    },
        { name: "Symfony",      Icon: Icon.Symfony,    color: "#ffffff" },
        { name: "JavaFX",       Icon: Icon.JavaFX,     color: "#ED8B00" },
        { name: "Flask",        Icon: Icon.Flask,      color: "#f0a830" },
        { name: "Flutter",      Icon: Icon.Flutter,    color: "#54C5F8" },
      ],
    },
    {
      label: "Languages & Databases", accent: C.ember, tagline: "The foundation layer",
      skills: [
        { name: "Python",       Icon: Icon.Python,      color: "#FFD845" },
        { name: "C / C++",      Icon: Icon.CPP,         color: "#00427C" },
        { name: "PHP",          Icon: Icon.PHP,         color: "#777BB3" },
        { name: "MongoDB",      Icon: Icon.MongoDB,     color: "#13AA52" },
        { name: "MySQL",        Icon: Icon.MySQL,       color: "#00618A" },
        { name: "Oracle DB",    Icon: Icon.OracleDB,    color: "#F80000" },
        { name: "Firebase",     Icon: Icon.Firebase,    color: "#FFCA28" },
        { name: "Scikit-learn", Icon: Icon.ScikitLearn, color: "#F89939" },
        { name: "Arduino",      Icon: Icon.Arduino,     color: "#00979D" },
      ],
    },
    {
      label: "Tools & Methods", accent: C.sage, tagline: "How I work",
      skills: [
        { name: "Git / GitHub", Icon: Icon.Git,    color: "#F05032" },
        { name: "Figma",        Icon: Icon.Figma,  color: "#1ABCFE" },
        { name: "Postman",      Icon: Icon.Postman, color: "#FF6C37" },
        { name: "Claude API",   Icon: Icon.Claude, color: "#CC785C" },
      ],
    },
  ];

  const marqueeItems1 = ["JavaScript ✦", "TypeScript ✦", "Java ✦", "Dart ✦", "HTML5/CSS3 ✦", "SQL ✦", "Bash ✦", "C / C++ ✦", "Python ✦"];
  const marqueeItems2 = ["Git/GitHub ✦", "Postman ✦", "Figma ✦", "Draw.io ✦", "UML ✦", "Agile/Scrum ✦", "Helm ✦", "Heat Templates ✦", "JWT/BCrypt ✦"];

  return (
    <section id="skills" className="relative z-10 px-4 sm:px-8 md:px-14 pt-10 pb-24 overflow-hidden">
      <div className="absolute right-[5%] top-[5%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: C.gold, filter: "blur(160px)", opacity: 0.06 }} />
      <div className="relative max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-2">
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(48px,8vw,96px)", color: C.text, lineHeight: 1 }}>Skills</h2>
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: 28, color: C.gold, display: "inline-block" }}>☸</motion.span>
        </motion.div>
        <p className="mb-14 text-[10px] tracking-[0.22em] uppercase" style={{ color: C.textSub }}>
          Tools I build with every day ✦
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
                <div className="flex-1 h-px ml-1" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
                {group.skills.map((skill, si) => <SkillPill key={skill.name} skill={skill} index={gi * 10 + si} />)}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 space-y-5">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: C.cyan }}>Languages</p>
            <Marquee items={marqueeItems1} color={C.cyan} />
          </div>
          <div>
            <p className="mb-3 text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: C.ember }}>Tools & Methods</p>
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
  const { dark, C } = useTheme();
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
        <span style={{ fontFamily: "monospace", fontSize: 10, color: `${C.gold}77`, letterSpacing: "0.1em" }}>kubectl deploy --prod</span>
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
          <span style={{ fontSize: 9, color: `${C.gold}88`, fontFamily: "monospace", letterSpacing: "0.1em" }}>DEPLOYMENT PROGRESS</span>
          <span style={{ fontSize: 9, color: C.sage, fontFamily: "monospace", fontWeight: 700 }}>100%</span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.06)" }}>
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
          <p style={{ fontFamily: "monospace", fontSize: 11, color: C.sage, fontWeight: 700, letterSpacing: "0.06em" }}>LIVE IN PRODUCTION</p>
          <p style={{ fontFamily: "monospace", fontSize: 9, color: C.textMuted, marginTop: 2 }}>uptime: 99.97% · latency: 12ms</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────── */
function Experience() {
  const { C } = useTheme();

  const experiences = [
    {
      year: "2025", period: "Jul – Aug", tag: "Professional Experience",
      title: "Intern — Full-Stack Developer", subtitle: "Catalyze Tech · FitLife Platform",
      text: "Designed and delivered a full sports & nutrition coaching app in 6 weeks. Built a multi-role React Native mobile app, React.js admin dashboard, and secure Node.js/Express REST API. Deployed full stack on Azure Linux VM with Docker & Nginx.",
      accent: C.gold,
    },
  ];

  const education = [
    {
      year: "2023", period: "– Present", tag: "Engineering Degree",
      title: "Cloud Computing Engineering (2nd year)", subtitle: "ESPRIT, Tunis",
      text: "Hands-on curriculum in cloud-native infrastructure, DevOps automation, full-stack development, AI integrations, and systems programming. Building real-world projects every semester.",
      accent: C.cyan,
    },
    {
      year: "2021", period: "– 2022", tag: "Secondary Education",
      title: "Scientific Baccalaureate", subtitle: "",
      text: "Graduated with a scientific baccalaureate — the foundation for engineering studies.",
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
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text, lineHeight: 1 }}>Experience</h2>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M8 11h.01M12 11h.01M16 11h.01"/>
              </svg>
            </motion.div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-8" style={{ color: C.textSub }}>Real-world work</p>
            <div className="relative">
              <div className="absolute left-[72px] sm:left-[87px] top-3 bottom-2 w-[2px] rounded-full"
                style={{ background: `linear-gradient(to bottom, ${C.gold}, ${C.gold}22)`, boxShadow: `0 0 10px ${C.gold}44` }} />
              <div className="space-y-8">
                {experiences.map((item, i) => <TimelineItem key={item.title} item={item} index={i} />)}
              </div>
            </div>
          </div>

          <div>
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(36px,6vw,72px)", color: C.text, lineHeight: 1 }}>Education</h2>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/>
              </svg>
            </motion.div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-8" style={{ color: C.textSub }}>Academic background</p>
            <div className="relative">
              <div className="absolute left-[72px] sm:left-[87px] top-3 bottom-2 w-[2px] rounded-full"
                style={{ background: `linear-gradient(to bottom, ${C.cyan}, ${C.champagne}55)`, boxShadow: `0 0 10px ${C.cyan}44` }} />
              <div className="space-y-8">
                {education.map((item, i) => <TimelineItem key={item.title} item={item} index={i} />)}
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
            <p style={{ fontSize: 9, color: C.textMuted, textAlign: "center", letterSpacing: "0.12em", marginTop: 2 }}>PROJECTS</p>
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0], rotate: [-4, -2, -4] }} transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
            className="absolute bottom-4 right-0 z-20 px-4 py-3 rounded-2xl"
            style={{ background: `${C.sage}15`, border: `1.5px solid ${C.sage}55`, boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${C.sage}18` }}>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: C.sage, lineHeight: 1, textAlign: "center" }}>∞</p>
            <p style={{ fontSize: 9, color: C.textMuted, textAlign: "center", letterSpacing: "0.12em", marginTop: 2 }}>CURIOSITY</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  const { dark, C } = useTheme();
  const [cursorColor, setCursorColor] = useState(C.gold);
  const [cursorVisible, setCursorVisible] = useState(false);

  const socials = [
    { IconComp: Icon.GitHub,   label: "GitHub",   handle: "github.com/yomnabouallegue",             href: "https://github.com/yum19",                       color: C.gold      },
    { IconComp: Icon.LinkedIn, label: "LinkedIn", handle: "yomna-bouallegue-787731273",              href: "https://www.linkedin.com/in/yomna-bouallegue-788731273/",   color: C.cyan      },
    { IconComp: Icon.Email,    label: "Email",    handle: "yomna.bouallegue@esprit.tn",              href: "mailto:yomna.bouallegue@esprit.tn",                        color: C.sage      },
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
              Let's Connect{" "}
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ color: C.gold, display: "inline-block" }}>♡</motion.span>
            </h2>
            <p className="text-[11px] tracking-[0.22em] uppercase mt-2 mb-8" style={{ color: C.textSub }}>
              Let's build something amazing together.
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
              Don't be a stranger ⌁♡
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
                    background: `linear-gradient(120deg, ${C.gold}, ${C.champagne}, ${C.cyan}, ${C.gold})`,
                    backgroundSize: "200% 200%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    textShadow: `0 0 20px ${C.gold}33`, marginBottom: 6 }}>
                  Let's build<br />something<br />remarkable.
                </motion.p>
                <p style={{ fontSize: 11, color: C.textSub, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 28, fontFamily: "'Inter', sans-serif" }}>
                  open to opportunities · 2026
                </p>
                <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                  {[
                    { val: "9+", label: "Projects",   color: C.gold  },
                    { val: "1",  label: "Internship",  color: C.ember },
                    { val: "∞",  label: "Drive",       color: C.sage  },
                  ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.06, y: -3 }}
                      style={{ flex: 1, borderRadius: 14, padding: "12px 8px", textAlign: "center",
                        background: `${stat.color}08`, border: `1px solid ${stat.color}28` }}>
                      <p style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: stat.color, lineHeight: 1, fontWeight: 700 }}>{stat.val}</p>
                      <p style={{ fontSize: 9, color: C.textSub, letterSpacing: "0.12em", marginTop: 4 }}>{stat.label.toUpperCase()}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.a href="mailto:yomna.bouallegue@esprit.tn"
                  whileHover={{ scale: 1.03, boxShadow: `0 0 32px ${C.gold}44` }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "14px 0", borderRadius: 14, textDecoration: "none",
                    background: `linear-gradient(135deg, ${C.gold}22, ${C.cyan}11)`,
                    border: `1.5px solid ${C.gold}55`,
                    color: C.gold, fontFamily: "'Inter', sans-serif", fontWeight: 800,
                    fontSize: 13, letterSpacing: "0.1em", transition: "all 0.3s" }}>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                  yomna.bouallegue@esprit.tn
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
  const { C } = useTheme();
  return (
    <footer className="relative z-10 mt-24 pb-12 pt-8">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${C.gold}0a, transparent 65%)` }} />
      <div className="relative flex flex-col items-center text-center">
        <div className="w-40 h-px mb-8"
          style={{ background: `linear-gradient(to right, transparent, ${C.gold}66, transparent)` }} />
        <motion.p animate={{ opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 4, repeat: Infinity }}
          style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(26px,5vw,46px)", color: `${C.gold}88` }}>
          Build. Deploy. Impact. ♡
        </motion.p>
        <p className="mt-4 text-sm tracking-wide" style={{ color: C.textSub }}>Thanks for stopping by ✦</p>
        <p style={{ fontFamily: "'Caveat', cursive", marginTop: 24, fontSize: 24, color: C.textMuted }}>— Yomna</p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: C.textSub }}>© 2026 Yomna Bouallegue</p>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);
  const C = dark ? DARK : LIGHT;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  const gridLine = C.gridLine;

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d), C }}>
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