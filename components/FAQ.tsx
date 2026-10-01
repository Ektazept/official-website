"use client";

import { useState } from "react";
import data from "@/util/data.json";
import styles from "./FAQ.module.css";

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
          {data.faq.map((item, i) => {
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
