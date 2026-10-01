"use client";

import { useRef, useState } from "react";
import data from "@/util/data.json";
import { useToast } from "./ToastProvider";
import styles from "./Footer.module.css";

const { organization: org } = data;

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
            <p>{org.description}</p>
          </div>

          {/* Product */}
          <div className={styles.footCol}>
            <h4>PRODUCT</h4>
            {data.footerProduct.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>

          {/* Company */}
          <div className={styles.footCol}>
            <h4>COMPANY</h4>
            {data.footerCompany.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={l.toast ? (e) => { e.preventDefault(); toast(l.toast!); } : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Resources */}
          <div className={styles.footCol}>
            <h4>RESOURCES</h4>
            {data.footerResources.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={l.toast ? (e) => { e.preventDefault(); toast(l.toast!); } : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <div>
            <h4>{org.newsletterTitle}</h4>
            <p className={styles.nlSub}>{org.newsletterSub}</p>
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
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>

        {/* Bottom */}
        <div className={`${styles.footBottom} mono`}>
          <span>{org.copyright}</span>
          <span className={styles.status}>
            <span className="pulse-dot" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
