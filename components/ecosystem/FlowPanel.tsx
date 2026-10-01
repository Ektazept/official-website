"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/util/data.json";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const mod = data.modules.find((m) => m.id === "flow")!;

export default function FlowPanel() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [status, setStatus] = useState<"ready" | "running" | "done">("ready");
  const [activeNodes, setActiveNodes] = useState([false, false, false]);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const RM = useRef(false);

  useEffect(() => {
    RM.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function run() {
    if (busyRef.current) return;
    busyRef.current = true;
    setActiveNodes([true, false, false]);
    setStatus("running");
    const dot = dotRef.current;
    const path = pathRef.current;
    if (!dot || !path) return;
    const L = path.getTotalLength();
    dot.setAttribute("opacity", "1");
    const t0 = performance.now();
    const dur = RM.current ? 1 : 1500;
    const tick = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pt = path.getPointAtLength(e * L);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      setActiveNodes([true, e > 0.45, e > 0.97]);
      if (t < 1) { requestAnimationFrame(tick); }
      else {
        setStatus("done");
        setTimeout(() => {
          dot.setAttribute("opacity", "0");
          setActiveNodes([false, false, false]);
          setStatus("ready");
          busyRef.current = false;
        }, 1600);
      }
    };
    requestAnimationFrame(tick);
  }

  useEffect(() => {
    const svgEl = document.getElementById("flowSvg");
    if (!svgEl) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!timerRef.current && !RM.current) timerRef.current = setInterval(run, 4600);
        } else {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(svgEl);
    return () => { obs.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusText =
    status === "ready" ? "STATUS · READY"
    : status === "running" ? "STATUS · RUNNING…"
    : "✓ COMPLETE";

  return (
    <article className={`${styles.bpanel} ${styles.bFlow}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>{mod.idx}</span>
        <BentoArrow />
      </div>
      <h3 className={styles.bName}>EKTAZECT <b>{mod.name}</b></h3>
      <p className={styles.bDesc}>{mod.desc}</p>
      <svg id="flowSvg" viewBox="0 0 340 130" fill="none" aria-hidden="true" style={{ minHeight: 110, width: "100%" }}>
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1D4ED8" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path ref={pathRef} id="flowPath" d="M62 62 C 108 14, 132 14, 170 62 S 232 110, 278 62" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
        <g className={`${styles.fnode}${activeNodes[0] ? " " + styles.fnodeActive : ""}`}><circle cx="40" cy="62" r="20" /><text x="40" y="65.5">TRG</text></g>
        <g className={`${styles.fnode}${activeNodes[1] ? " " + styles.fnodeActive : ""}`}><circle cx="170" cy="62" r="20" /><text x="170" y="65.5">MAP</text></g>
        <g className={`${styles.fnode}${activeNodes[2] ? " " + styles.fnodeActive : ""}`}><circle cx="300" cy="62" r="20" /><text x="300" y="65.5">ACT</text></g>
        <circle ref={dotRef} r="5" fill="url(#fg)" opacity="0" />
      </svg>
      <div className={styles.flowFoot}>
        <span className={`${styles.flowStatus} mono${status === "running" ? " " + styles.flowRun : status === "done" ? " " + styles.flowDone : ""}`}>
          {statusText}
        </span>
        <button className={`${styles.btnMini} mono`} onClick={run}>RUN FLOW</button>
      </div>
    </article>
  );
}
