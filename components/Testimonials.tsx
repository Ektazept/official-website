"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    q: "We replaced six subscriptions and two integration engineers with EKTAZECT. Onboarding a new tool used to take a sprint — now it takes a click.",
    n: "Priya Raman",
    r: "COO · NORTHBEAM LOGISTICS",
    s: "ektazect-p1",
  },
  {
    q: "The first platform that scaled with us instead of against us. We started as three people; we\u2019re 400 now, and nothing ever had to be migrated.",
    n: "Jonas Weber",
    r: "CTO · HELIO LABS",
    s: "ektazect-p2",
  },
  {
    q: "Our data finally speaks one language. EKTAZECT didn\u2019t just connect our tools — it converged how our teams think.",
    n: "Amara Diallo",
    r: "HEAD OF OPS · FIELDER & CO.",
    s: "ektazect-p3",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const RM = useRef(false);

  useEffect(() => {
    RM.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(k: number) {
    setOut(true);
    setTimeout(
      () => {
        setIdx(((k % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
        setOut(false);
      },
      RM.current ? 0 : 280
    );
  }

  function restart() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!RM.current) {
      timerRef.current = setInterval(() => go(idx + 1), 6500);
    }
  }

  // swipe
  const sx = useRef<number | null>(null);
  const sy = useRef<number | null>(null);

  const t = TESTIMONIALS[idx];

  return (
    <section className={styles.quotes} id="quotes">
      <div className="container">
        <div className="sec-head" data-reveal>
          <p className="eyebrow">
            <span className="eb-dot" />
            Signal from the field
          </p>
        </div>

        <div
          className={styles.qStage}
          data-reveal
          onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
          onMouseLeave={restart}
          onTouchStart={(e) => {
            sx.current = e.touches[0].clientX;
            sy.current = e.touches[0].clientY;
            if (timerRef.current) clearInterval(timerRef.current);
          }}
          onTouchEnd={(e) => {
            if (sx.current === null) return;
            const dx = e.changedTouches[0].clientX - sx.current;
            const dy = e.changedTouches[0].clientY - (sy.current ?? 0);
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
              dx < 0 ? go(idx + 1) : go(idx - 1);
            }
            restart();
            sx.current = null;
            sy.current = null;
          }}
        >
          <div className={`${styles.tSlide}${out ? " " + styles.out : ""}`}>
            <p className={styles.tQuote}>{t.q}</p>
            <div className={styles.tAuthor}>
              <Image
                src={`https://picsum.photos/seed/${t.s}/120/120.jpg`}
                alt={`Portrait of ${t.n}`}
                width={46}
                height={46}
                className={styles.tImg}
              />
              <div>
                <div className={styles.tName}>{t.n}</div>
                <div className={`${styles.tRole} mono`}>{t.r}</div>
              </div>
            </div>
          </div>

          <div className={styles.tCtrl}>
            <button
              className={styles.tBtn}
              aria-label="Previous quote"
              onClick={() => { go(idx - 1); restart(); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={styles.tBtn}
              aria-label="Next quote"
              onClick={() => { go(idx + 1); restart(); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <div className={styles.tDots}>
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  className={`${styles.tDot}${k === idx ? " " + styles.tDotOn : ""}`}
                  aria-label={`Show quote ${k + 1}`}
                  onClick={() => { go(k); restart(); }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
