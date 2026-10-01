"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const hero = heroRef.current;
    if (!cv || !hero) return;

    const ctx = cv.getContext("2d")!;
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };

    const LABELS = [
      "CRM","MAIL","DOCS","DB","PAY","CHAT","GIT","SHEETS",
      "CAL","FILES","API","BI","AUTH","TASKS","CDN","ERP","SSH","VAULT",
    ];
    const BLUES   = ["#60A5FA","#3B82F6","#93C5FD","#7DA9FA"];
    const PURPLES = ["#A78BFA","#8B5CF6","#C4B5FD"];
    const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

    let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, R = 150;
    let visible = true, rafId: number | null = null, last = 0;
    let labelFont = '10px "Roboto Mono", monospace';
    const pulses: { r: number }[] = [];
    let lastPulse = 0;

    interface Particle {
      state: "fly" | "orbit";
      t: number; dur: number; orb: number; life: number;
      sx: number; sy: number; baseA: number;
      c1x: number; c1y: number;
      color: string; label: string;
      wob: number; spd: number;
      px: number; py: number;
    }

    const N = window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 52 : 64;
    const P: Particle[] = [];

    function resize() {
      if (!cv || !hero) return;
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (W < 860) {
        cx = W * 0.5;
        cy = H - Math.min(W * 0.62, Math.min(380, H * 0.55));
        R = Math.max(78, Math.min(128, W * 0.34));
        labelFont = '9px "Roboto Mono", monospace';
      } else {
        cx = W * 0.66; cy = H * 0.5;
        R = Math.max(120, Math.min(190, Math.min(W, H) * 0.27));
        labelFont = '10px "Roboto Mono", monospace';
      }
    }

    function spawn(p: Particle) {
      p.state = "fly"; p.t = 0; p.dur = 1500 + Math.random() * 1500;
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { p.sx = Math.random() * W; p.sy = -30; }
      else if (side === 1) { p.sx = W + 30; p.sy = Math.random() * H; }
      else if (side === 2) { p.sx = Math.random() * W; p.sy = H + 30; }
      else { p.sx = -30; p.sy = Math.random() * H; }
      p.baseA = Math.random() * Math.PI * 2;
      p.color = Math.random() < 0.22 ? pick(PURPLES) : pick(BLUES);
      p.label = pick(LABELS);
      p.wob = Math.random() * Math.PI * 2;
      p.spd = (0.00028 + Math.random() * 0.00028) * (Math.random() < 0.88 ? 1 : -1);
      p.life = 6500 + Math.random() * 5500;
      p.px = p.sx; p.py = p.sy;
      const mx = (p.sx + cx) / 2, my = (p.sy + cy) / 2;
      const dx = cx - p.sx, dy = cy - p.sy, len = Math.hypot(dx, dy) || 1;
      const off = (Math.random() - 0.5) * 220;
      p.c1x = mx + (-dy / len) * off; p.c1y = my + (dx / len) * off;
      p.orb = 0;
    }

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 50); last = now;
      ctx.clearRect(0, 0, W, H);

      if (now - lastPulse > 2800) { pulses.push({ r: 30 }); lastPulse = now; }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].r += dt * 0.06;
        const a = 0.3 * (1 - (pulses[i].r - 30) / 260);
        if (a <= 0) { pulses.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(cx, cy, pulses[i].r, 0, 7);
        ctx.strokeStyle = `rgba(96,165,250,${a.toFixed(3)})`; ctx.lineWidth = 1; ctx.stroke();
      }

      const orbiters: { p: Particle; x: number; y: number; alpha: number }[] = [];

      for (const p of P) {
        let x = 0, y = 0, alpha = 0;
        if (p.state === "fly") {
          p.t += dt / p.dur;
          const t = Math.min(p.t, 1), e = ease(t), u = 1 - e;
          const ex = cx + Math.cos(p.baseA) * R, ey = cy + Math.sin(p.baseA) * R;
          x = u * u * p.sx + 2 * u * e * p.c1x + e * e * ex;
          y = u * u * p.sy + 2 * u * e * p.c1y + e * e * ey;
          alpha = Math.sin(t * Math.PI);
          if (p.t >= 1) { p.state = "orbit"; p.orb = now; }
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(x, y);
          ctx.strokeStyle = p.color; ctx.globalAlpha = alpha * 0.4; ctx.lineWidth = 1.2; ctx.stroke();
        } else {
          const e = now - p.orb;
          if (e > p.life) { spawn(p); continue; }
          p.baseA += p.spd * dt;
          const rr = R + Math.sin(now * 0.001 + p.wob) * 10;
          x = cx + Math.cos(p.baseA) * rr; y = cy + Math.sin(p.baseA) * rr;
          alpha = Math.min(Math.min(e / 400, 1), Math.min((p.life - e) / 1000, 1));
          orbiters.push({ p, x, y, alpha });
        }

        const md = Math.hypot(x - pointer.x, y - pointer.y);
        if (md < 120 && md > 0.01) {
          const f = (1 - md / 120) * 24;
          x += (x - pointer.x) / md * f; y += (y - pointer.y) / md * f;
        }

        ctx.globalAlpha = alpha * (p.state === "orbit" ? 1 : 0.8);
        ctx.beginPath(); ctx.arc(x, y, p.state === "orbit" ? 3 : 2.5, 0, 7);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.globalAlpha = alpha * (p.state === "orbit" ? 0.55 : 0.3);
        ctx.fillStyle = "#94A3B8"; ctx.font = labelFont; ctx.textAlign = "center";
        ctx.fillText(p.label, x, y - 9);
        ctx.globalAlpha = 1;
        p.px = x; p.py = y;
      }

      for (const o of orbiters) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(o.x, o.y);
        ctx.strokeStyle = o.p.color; ctx.globalAlpha = o.alpha * 0.13; ctx.lineWidth = 1; ctx.stroke();
      }

      for (let i = 0; i < orbiters.length; i++) {
        for (let j = i + 1; j < orbiters.length; j++) {
          let da = Math.abs(orbiters[i].p.baseA - orbiters[j].p.baseA) % (Math.PI * 2);
          if (da > Math.PI) da = Math.PI * 2 - da;
          if (da < 0.42) {
            ctx.beginPath(); ctx.moveTo(orbiters[i].x, orbiters[i].y); ctx.lineTo(orbiters[j].x, orbiters[j].y);
            ctx.strokeStyle = "#60A5FA"; ctx.globalAlpha = 0.07; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      const breathe = Math.sin(now * 0.0022) * 1.6;
      const coreR = W < 860 ? 19 : 24;
      ctx.beginPath(); ctx.arc(cx, cy, coreR + 32, 0, 7);
      ctx.strokeStyle = "rgba(96,165,250,.15)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.save();
      ctx.setLineDash([2, 7]); ctx.lineDashOffset = -now * 0.02;
      ctx.beginPath(); ctx.arc(cx, cy, coreR + 22, 0, 7);
      ctx.strokeStyle = "rgba(167,139,250,.55)"; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
      const g = ctx.createLinearGradient(cx - 24, cy - 24, cx + 24, cy + 24);
      g.addColorStop(0, "#1D4ED8"); g.addColorStop(1, "#7C3AED");
      ctx.beginPath(); ctx.arc(cx, cy, coreR + breathe, 0, 7); ctx.fillStyle = g; ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.95)";
      ctx.font = `600 ${W < 860 ? 14 : 17}px "Space Grotesk", sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("E", cx, cy + 1 + breathe * 0.3);
      ctx.textBaseline = "alphabetic";
    }

    function start() {
      if (rafId === null && visible && !document.hidden) {
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    }

    function stop() {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      for (const p of P) {
        const x = cx + Math.cos(p.baseA) * R, y = cy + Math.sin(p.baseA) * R;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
        ctx.strokeStyle = p.color; ctx.globalAlpha = 0.13; ctx.lineWidth = 1; ctx.stroke();
        ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fillStyle = p.color; ctx.fill();
      }
    }

    // Events
    const onMouseMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    };
    const onMouseLeave = () => { pointer.x = -9999; pointer.y = -9999; };
    const onTouchMove = (e: TouchEvent) => {
      const r = cv.getBoundingClientRect(), t = e.touches[0];
      pointer.x = t.clientX - r.left; pointer.y = t.clientY - r.top;
    };
    const onTouchEnd = () => { pointer.x = -9999; pointer.y = -9999; };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    hero.addEventListener("touchmove", onTouchMove, { passive: true });
    hero.addEventListener("touchend", onTouchEnd, { passive: true });

    let rszT: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rszT);
      rszT = setTimeout(() => { resize(); if (RM) drawStatic(); }, 120);
    };
    window.addEventListener("resize", onResize);

    const visObs = new IntersectionObserver(
      (en) => { visible = en[0].isIntersecting; visible ? start() : stop(); },
      { threshold: 0 }
    );
    visObs.observe(hero);

    const onVisChange = () => document.hidden ? stop() : start();
    document.addEventListener("visibilitychange", onVisChange);

    resize();
    for (let i = 0; i < N; i++) {
      const p = {} as Particle; spawn(p); P.push(p);
    }
    if (RM) {
      P.forEach((p) => { p.state = "orbit"; p.orb = 0; p.life = Infinity; });
      drawStatic();
    } else { start(); }

    return () => {
      stop();
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
      hero.removeEventListener("touchmove", onTouchMove);
      hero.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      visObs.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  return (
    <header className={styles.hero} id="top" ref={heroRef}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroInner}>
          <p className="eyebrow" style={{ color: "var(--purple-soft)" }}>
            <span className="eb-dot" />
            The Unified SaaS Ecosystem
          </p>
          <h1>
            Every tool you rely on.{" "}
            <span className="grad-text">Converged into one.</span>
          </h1>
          <p className={styles.heroSub}>
            EKTAZECT unifies your apps, your data, and your people in a single
            ecosystem — one that scales seamlessly from a team of one to the
            enterprise, and never asks you to migrate again.
          </p>
          <div className={styles.heroCta}>
            <a className="btn btn-primary" href="#cta">
              Start converging
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="btn btn-ghost-light" href="#ecosystem">
              Explore the ecosystem
            </a>
          </div>
          <p className={`${styles.heroMeta} mono`}>
            NO CREDIT CARD&nbsp;&nbsp;·&nbsp;&nbsp;240+ NATIVE
            INTEGRATIONS&nbsp;&nbsp;·&nbsp;&nbsp;FREE UP TO 5 SEATS
          </p>
        </div>
      </div>
      <a className={styles.scrollCue} href="#proof" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
