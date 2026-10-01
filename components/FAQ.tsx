"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const ITEMS = [
  {
    q: "What exactly is EKTAZECT?",
    a: "EKTAZECT is a unified SaaS ecosystem: one platform where your apps, data, workflows, and identity live together instead of in separate tools. Start with one module — Flow, Pulse, Vault, Mesh, or ID — and the rest connect automatically through a shared data layer.",
  },
  {
    q: "Do I need to migrate my existing tools?",
    a: "No. Mesh links 240+ sources in a tap, and every connection is inherited by all modules instantly. Most teams converge in an afternoon — and nothing gets moved, copied, or locked in.",
  },
  {
    q: "How does pricing scale with my team?",
    a: "Modular, like the product. It's free up to 5 seats, then you pay per active module — not per integration, not per workflow. As you grow, unit costs go down, never up. A small business and an enterprise run the exact same platform.",
  },
  {
    q: "Is EKTAZECT enterprise-ready?",
    a: "Yes — SSO and SCIM through EKTAZECT ID, streaming audit logs, a 99.99% uptime SLA, and SOC 2 compliance. The same infrastructure carries 4.8 billion workflows a day for teams of every size.",
  },
  {
    q: "I'm a team of one. Is this overkill?",
    a: "Not at all — EKTAZECT is built to be powerful enough for enterprise developers and accessible enough for a first-time user. Many of our best workflows were designed by solo founders. You'll never outgrow it, because growth is the whole point.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className="sec-head" data-reveal style={{ textAlign: "center" }}>
          <p className="eyebrow">
            <span className="eb-dot" />
            Questions, answered
          </p>
          <h2>
            Everything you&apos;d ask<br />before you converge.
          </h2>
        </div>

        <div className={styles.faqList} data-reveal>
          {ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`${styles.faqItem}${isOpen ? " " + styles.open : ""}`}
              >
                <button
                  className={styles.faqQ}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  {item.q}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div className={styles.faqA}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
