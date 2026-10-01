"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#vision", label: "Vision" },
  { href: "#team", label: "Team" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

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

  // close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // swipe down to close mobile menu
  const touchY = useRef<number | null>(null);

  // intersection observer for active section
  useEffect(() => {
    const secIds = ["ecosystem", "vision", "team", "pricing", "faq"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <nav className={`${styles.nav}${scrolled ? " " + styles.scrolled : ""}`} id="nav">
        <div className="container">
          <div className={styles.navInner}>
            <a className={styles.logo} href="#top" aria-label="EKTAZECT home">
              <span className={styles.logoMark}>E</span>
              <span className={styles.logoWord}>
                EKTA<span className={styles.z}>ZECT</span>
              </span>
            </a>

            <div className={styles.navLinks} id="navLinks">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={active === l.href ? styles.active : ""}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <a className={`btn btn-primary ${styles.navBtn}`} href="#cta">
              Get started
            </a>

            <button
              className={styles.burger}
              id="burger"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`${styles.mmenu}${menuOpen ? " " + styles.open : ""}`}
        id="mmenu"
        aria-hidden={!menuOpen}
        onTouchStart={(e) => { touchY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          if (touchY.current !== null && e.changedTouches[0].clientY - touchY.current > 110) {
            setMenuOpen(false);
          }
          touchY.current = null;
        }}
      >
        <div className={styles.mmenuTop}>
          <span className={styles.logo}>
            <span className={styles.logoMark}>E</span>
            <span className={styles.logoWord}>
              EKTA<span className={styles.z}>ZECT</span>
            </span>
          </span>
          <button
            className={styles.mmenuClose}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className={styles.mmenuLinks}>
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
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
