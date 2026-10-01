"use client";

import { useEffect, useRef } from "react";
import data from "@/util/data.json";
import styles from "./Stats.module.css";

type StatDef = {
  count: number;
  decimals?: number;
  suffix: string;
  label: string;
};

function StatItem({ stat }: { stat: StatDef }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = stat.decimals ?? 0;
    const fmt = (v: number) =>
      d > 0 ? v.toFixed(d) : Math.round(v).toLocaleString("en-US");

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || observed.current) return;
        observed.current = true;
        obs.disconnect();
        if (RM) { el.innerHTML = fmt(stat.count) + `<em>${stat.suffix}</em>`; return; }
        const t0 = performance.now(), dur = 1700;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.innerHTML = fmt(stat.count * e) + `<em>${stat.suffix}</em>`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stat]);

  return (
    <div className={styles.stat} data-reveal>
      <div className={styles.statN}>
        <span ref={numRef}>0</span>
      </div>
      <div className={`${styles.statL} mono`}>{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={`container ${styles.statsRow}`}>
        {data.stats.map((s) => (
          <StatItem key={s.label} stat={s as StatDef} />
        ))}
      </div>
    </section>
  );
}
