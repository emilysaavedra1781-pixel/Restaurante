/* =========================================================
   SABORÉ — Cocina Peruana
   style.css reescrito para calzar con las clases reales
   de index.html (header, hero, nosotros, menu-section,
   menu-section-dinamico, cta-banner, footer).
   Fuentes ya cargadas en el <head>: Playfair Display + Poppins.
   ========================================================= */

:root {
  --cream: #f7f2ea;
  --cream-soft: #efe6d6;
  --ink: #2b2117;
  --ink-soft: rgba(43, 33, 23, 0.72);
  --terracota: #c0622f;
  --terracota-oscuro: #9c4e24;
  --verde: #4c6b4a;
  --verde-oscuro: #3a5439;
  --oscuro: #221a13;
  --oscuro-2: #2c2117;
  --crema-oscura: rgba(247, 242, 234, 0.85);
  --dorado: #e3b273;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: var(--ink);
  background: var(--cream);
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  margin: 0;
  line-height: 1.15;
}

p { margin: 0; }

a { text-decoration: none; color: inherit; }

img { max-width: 100%; display: block; }

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

:focus-visible {
  outline: 2px solid var(--terracota);
  outline-offset: 3px;
}

.eyebrow {
  display: inline-block;
  color: var(--dorado);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

/* ===================== BOTONES ===================== */
.btn {
  display: inline-block;
  padding: 0.85rem 1.9rem;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
}
.btn-orange {
  background: var(--terracota);
  color: #fff;
}
.btn-orange:hover {
  background: var(--terracota-oscuro);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(192, 98, 47, 0.3);
}
.btn-green {
  background: var(--verde);
  color: #fff;
}
.btn-green:hover {
  background: var(--verde-oscuro);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 107, 74, 0.3);
}
.btn-outline {
  background: transparent;
  border-color: var(--terracota);
  color: var(--terracota);
}
.btn-outline:hover {
  background: var(--terracota);
  color: #fff;
  transform: translateY(-3px);
}

/* ===================== HEADER ===================== */
header {
  background: var(--cream);
  border-bottom: 1px solid rgba(43, 33, 23, 0.08);
  position: sticky;
  top: 0;
  z-index: 50;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.logo-leaf {
  color: var(--terracota);
  font-size: 1.5rem;
}
.logo span {
  display: block;
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 0.03em;
  color: var(--ink);
}
.logo small {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: var(--ink-soft);
}
nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.8rem;
  margin: 0;
  padding: 0;
}
nav a {
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--ink-soft);
  position: relative;
  padding-bottom: 4px;
  transition: color 0.2s ease;
}
nav a:hover { color: var(--terracota); }
nav a.active {
  color: var(--terracota);
}
nav a.active::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 2px;
  background: var(--terracota);
}

/* ===================== HERO ===================== */
.hero {
  position: relative;
  background: var(--oscuro);
  color: var(--cream);
  overflow: hidden;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 3rem;
  padding: 5rem 1.5rem 7rem;
}
.hero-text h1 {
  color: var(--cream);
  font-weight: 800;
  font-size: clamp(2.1rem, 4.4vw, 3.4rem);
  margin: 0.4rem 0 1.1rem;
}
.hero-text p {
  color: var(--crema-oscura);
  font-size: 1.02rem;
  max-width: 460px;
  margin-bottom: 1.6rem;
}
.hero-image { width: 100%; }
.hero-carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
}
.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: heroFade 12s infinite;
}
.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slide-1 { animation-delay: 0s; }
.slide-2 { animation-delay: 4s; }
.slide-3 { animation-delay: 8s; }
@keyframes heroFade {
  0%, 100% { opacity: 0; }
  4% { opacity: 1; }
  28% { opacity: 1; }
  33% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-slide { animation: none; opacity: 0; }
  .hero-slide.slide-1 { opacity: 1; }
}
.hero .wave {
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%;
  height: auto;
  display: block;
}

/* ===================== NOSOTROS ===================== */
.nosotros { background: var(--cream); padding: 5.5rem 0; }
.nosotros-inner {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  align-items: center;
  gap: 3rem;
}
.nosotros-img img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(43, 33, 23, 0.12);
}
.nosotros-content h2 {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  margin-bottom: 1rem;
  color: var(--ink);
}
.nosotros-content p {
  color: var(--ink-soft);
  margin-bottom: 1.6rem;
  max-width: 480px;
}

/* ===================== MENÚ (destacados + dinámico) ===================== */
.menu-section, .menu-section-dinamico {
  background: var(--cream-soft);
  padding: 5.5rem 0;
  text-align: center;
}
.menu-section h2, .menu-section-dinamico h2 {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  margin-bottom: 2.5rem;
  color: var(--ink);
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.6rem;
  text-align: left;
}
.menu-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.4rem;
  box-shadow: 0 8px 22px rgba(43, 33, 23, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(43, 33, 23, 0.14);
}
.menu-card-body img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.menu-card-body h3, .menu-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--ink);
}
.menu-card-body p {
  color: var(--ink-soft);
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
}
.price {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: var(--terracota);
  font-size: 1.15rem;
}
.menu-cta { margin-top: 2.5rem; }

/* Tag usado por las tarjetas del menú dinámico (script.js) */
.menu-tag {
  display: inline-block;
  background: var(--oscuro);
  color: var(--dorado);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  margin-bottom: 0.7rem;
}

/* Pestañas del menú dinámico */
.menu-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}
.tab-btn {
  border: 1.5px solid var(--terracota);
  background: transparent;
  color: var(--terracota);
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
}
.tab-btn:hover {
  background: rgba(192, 98, 47, 0.1);
  transform: translateY(-2px);
}
.tab-btn.active {
  background: var(--terracota);
  color: #fff;
  box-shadow: 0 10px 20px rgba(192, 98, 47, 0.25);
}
.menu-dia-fecha {
  color: var(--ink-soft);
  margin-bottom: 1.8rem;
  text-transform: capitalize;
  font-size: 0.95rem;
}
.semana-bloque { margin-bottom: 2.8rem; text-align: left; }
.semana-bloque h4 {
  font-family: 'Playfair Display', serif;
  color: var(--ink);
  text-transform: capitalize;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  position: relative;
  padding-bottom: 0.5rem;
}
.semana-bloque h4::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 36px; height: 3px;
  background: var(--terracota);
}

/* ===================== CTA BANNER ===================== */
.cta-banner { background: var(--oscuro); color: var(--cream); padding: 3.2rem 0; }
.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
}
.cta-left { display: flex; align-items: center; gap: 1.3rem; }
.cta-icon {
  flex-shrink: 0;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: rgba(227, 178, 115, 0.15);
  color: var(--dorado);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}
.cta-banner h3 { color: var(--cream); font-size: 1.4rem; margin: 0.2rem 0 0.3rem; }
.cta-banner p { color: var(--crema-oscura); font-size: 0.92rem; }

/* ===================== FOOTER ===================== */
footer { background: var(--oscuro-2); color: var(--crema-oscura); padding: 4rem 0 0; }
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 3rem;
}
footer .logo span { color: var(--cream); }
footer .logo small { color: var(--crema-oscura); }
footer .logo-leaf { color: var(--dorado); }
.footer-brand p { margin: 1rem 0 1.2rem; font-size: 0.9rem; max-width: 300px; }
.socials { display: flex; gap: 0.7rem; }
.socials a {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(247, 242, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}
.socials a:hover { background: var(--terracota); transform: translateY(-3px); }
.footer-col h4 {
  font-family: 'Playfair Display', serif;
  color: var(--dorado);
  font-size: 1rem;
  margin-bottom: 1.1rem;
  letter-spacing: 0.02em;
}
.footer-col ul { list-style: none; margin: 0; padding: 0; }
.footer-col li { margin-bottom: 0.6rem; }
.footer-col a { font-size: 0.88rem; transition: color 0.2s ease; }
.footer-col a:hover { color: var(--terracota); }
.footer-col p { font-size: 0.88rem; margin-bottom: 0.4rem; }
.footer-col i { color: var(--dorado); margin-right: 0.4rem; }
.footer-bottom {
  border-top: 1px solid rgba(247, 242, 234, 0.12);
  text-align: center;
  padding: 1.3rem 0;
  font-size: 0.8rem;
  opacity: 0.7;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; padding: 3rem 1.5rem 5rem; }
  .hero-image { order: -1; }
  .nosotros-inner { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .header-inner { flex-wrap: wrap; }
  nav ul { flex-wrap: wrap; gap: 1rem 1.2rem; justify-content: center; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
  .footer-grid { grid-template-columns: 1fr; }
}
