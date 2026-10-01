"use client";

import { useRef, useState } from "react";
import { useToast } from "./ToastProvider";
import styles from "./Footer.module.css";

const PRODUCT_LINKS = [
  "EKTAZECT Flow",
  "EKTAZECT Pulse",
  "EKTAZECT Vault",
  "EKTAZECT Mesh",
  "EKTAZECT ID",
];

const COMPANY_LINKS = [
  { label: "Vision & Mission", href: "#vision", toast: null },
  { label: "Team", href: "#team", toast: null },
  { label: "Pricing", href: "#pricing", toast: null },
  { label: "Careers", href: "#", toast: "Careers page isn't part of this demo — but we're hiring in spirit." },
  { label: "Press kit", href: "#", toast: "Press kit isn't part of this demo." },
];

const RESOURCE_LINKS = [
  { label: "Documentation", toast: "Documentation isn't part of this demo." },
  { label: "API Reference", toast: "API reference isn't part of this demo." },
  { label: "Changelog", toast: "Changelog isn't part of this demo." },
  { label: "FAQ", href: "#faq", toast: null },
];

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const val = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      toast("That email doesn\u2019t look quite right — try again.", "err");
      const el = inputRef.current;
      if (el) {
        el.classList.add(styles.shake);
        setTimeout(() => el.classList.remove(styles.shake), 450);
      }
      return;
    }
    toast("You\u2019re on the list. Welcome to the ecosystem.");
    setEmail("");
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footGrid}>
          {/* Brand */}
          <div className={styles.footBrand}>
            <span className={styles.logo}>
              <span className={styles.logoMark}>E</span>
              <span className={styles.logoWord}>
                EKTA<span className={styles.z}>ZECT</span>
              </span>
            </span>
            <p>
              The Unified SaaS Ecosystem. All your workflows, data, and tools —
              one intelligent platform.
            </p>
          </div>

          {/* Product */}
          <div className={styles.footCol}>
            <h4>PRODUCT</h4>
            {PRODUCT_LINKS.map((l) => (
              <a key={l} href="#ecosystem">
                {l}
              </a>
            ))}
          </div>

          {/* Company */}
          <div className={styles.footCol}>
            <h4>COMPANY</h4>
            {COMPANY_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={
                  l.toast
                    ? (e) => {
                        e.preventDefault();
                        toast(l.toast!);
                      }
                    : undefined
                }
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Resources */}
          <div className={styles.footCol}>
            <h4>RESOURCES</h4>
            {RESOURCE_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href ?? "#"}
                onClick={
                  l.toast
                    ? (e) => {
                        e.preventDefault();
                        toast(l.toast!);
                      }
                    : undefined
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <div>
            <h4>The Convergence Brief</h4>
            <p className={styles.nlSub}>
              One email a month on unifying your stack. No noise, ever.
            </p>
          </div>
          <form className={styles.nlForm} onSubmit={handleSubscribe} noValidate>
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              autoComplete="email"
              inputMode="email"
            />
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className={`${styles.footBottom} mono`}>
          <span>© 2025 EKTAZECT, INC. — THE UNIFIED SAAS ECOSYSTEM</span>
          <span className={styles.status}>
            <span className="pulse-dot" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
