"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/util/data.json";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const mod = data.modules.find((m) => m.id === "pulse")!;

export default function PulsePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [p99, setP99] = useState("P99 · 214MS");

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = 0, H = 0, DPR = 1, visible = false, raf: number | null = null;
    const dataPoints: number[] = [];
    let v = 50;
    for (let i = 0; i < 64; i++) {
      v = Math.max(12, Math.min(88, v + (Math.random() - 0.48) * 7));
      dataPoints.push(v);
    }

    function resize() {
      const r = c!.getBoundingClientRect();
      W = r.width; H = r.height;
      if (!W) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      c!.width = W * DPR; c!.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function draw(now: number) {
      raf = visible ? requestAnimationFrame(draw) : null;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(15,23,42,.06)"; ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(0, H * i / 4); ctx.lineTo(W, H * i / 4); ctx.stroke();
      }
      const px = (i: number) => (i / (dataPoints.length - 1)) * W;
      const py = (val: number) => H - (val / 100) * (H - 14) - 7;
      ctx.beginPath(); ctx.moveTo(px(0), py(dataPoints[0]));
      for (let i = 1; i < dataPoints.length - 1; i++) {
        const mx = (px(i) + px(i + 1)) / 2, my = (py(dataPoints[i]) + py(dataPoints[i + 1])) / 2;
        ctx.quadraticCurveTo(px(i), py(dataPoints[i]), mx, my);
      }
      ctx.lineTo(px(dataPoints.length - 1), py(dataPoints[dataPoints.length - 1]));
      ctx.strokeStyle = "#1D4ED8"; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.stroke();
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(29,78,216,.16)"); g.addColorStop(1, "rgba(29,78,216,0)");
      ctx.fillStyle = g; ctx.fill();
      const hx = px(dataPoints.length - 1), hy = py(dataPoints[dataPoints.length - 1]);
      ctx.beginPath(); ctx.arc(hx, hy, 3, 0, 7); ctx.fillStyle = "#7C3AED"; ctx.fill();
      ctx.beginPath(); ctx.arc(hx, hy, 6 + Math.sin(now * 0.005) * 2, 0, 7);
      ctx.strokeStyle = "rgba(124,58,237,.4)"; ctx.lineWidth = 1; ctx.stroke();
    }

    function step() {
      v = Math.max(12, Math.min(88, v + (Math.random() - 0.48) * 8));
      dataPoints.push(v); dataPoints.shift();
      setP99("P99 · " + (180 + Math.floor(Math.random() * 60)) + "MS");
    }

    const obs = new IntersectionObserver((en) => {
      visible = en[0].isIntersecting;
      if (visible && !raf) { resize(); raf = requestAnimationFrame(draw); }
      if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0.2 });
    obs.observe(c);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const stepInterval = setInterval(step, 320);
    resize();

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      clearInterval(stepInterval);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <article className={`${styles.bpanel} ${styles.bPulse}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>{mod.idx}</span>
        <BentoArrow />
      </div>
      <h3 className={styles.bName}>EKTAZECT <b>{mod.name}</b></h3>
      <p className={styles.bDesc}>{mod.desc}</p>
      <div className={styles.pulseWrap}>
        <canvas ref={canvasRef} className={styles.pulseChart} />
        <span className={`${styles.pulseVal} mono`}>{p99}</span>
      </div>
    </article>
  );
}
