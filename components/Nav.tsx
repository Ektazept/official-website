"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/util/data.json";
import Logo from "./Logo";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const touchY = useRef<number | null>(null);

  useEffect(() => {
    const secIds = data.nav.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secIds.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const org = data.organization;

  return (
    <>
      <nav className={`${styles.nav}${scrolled ? " " + styles.scrolled : ""}`} id="nav">
        <div className="container">
          <div className={styles.navInner}>
            <a className={styles.logoLink} href="#top" aria-label={`${org.name} home`}>
              <Logo variant="light" height={32} />
            </a>

            <div className={styles.navLinks} id="navLinks">
              {data.nav.map((l) => (
                <a key={l.href} href={l.href} className={active === l.href ? styles.active : ""}>
                  {l.label}
                </a>
              ))}
            </div>

            <a className={`btn btn-primary ${styles.navBtn}`} href="#cta">
              Get started
            </a>

            <button className={styles.burger} aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.mmenu}${menuOpen ? " " + styles.open : ""}`}
        aria-hidden={!menuOpen}
        onTouchStart={(e) => { touchY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          if (touchY.current !== null && e.changedTouches[0].clientY - touchY.current > 110) setMenuOpen(false);
          touchY.current = null;
        }}
      >
        <div className={styles.mmenuTop}>
          <Logo variant="light" height={30} />
          <button className={styles.mmenuClose} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className={styles.mmenuLinks}>
          {data.nav.map((l, i) => (
            <a key={l.href} href={l.href} style={{ transitionDelay: `${0.05 + i * 0.05}s` }} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>

        <a className="btn btn-grad" href="#cta" onClick={() => setMenuOpen(false)}>
          Get started
        </a>
      </div>
    </>
  );
}
