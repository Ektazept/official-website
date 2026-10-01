"use client";

import { useEffect, useRef } from "react";
import styles from "./BackgroundFX.module.css";

/**
 * Full-page fixed background effect:
 * – neural particle network (canvas)
 * – aurora gradient blobs
 * – film-grain noise overlay
 * – radial vignette
 */
export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const ctx = cv.getContext("2d")!;
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const LINK = 130;
    const mouse = { x: -1e4, y: -1e4 };

    interface Pt {
      x: number; y: number;
      vx: number; vy: number;
      r: number; c: string;
    }

    let W = 0, H = 0, pts: Pt[] = [], rafId: number | null = null;

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv!.width  = W * dpr;
      cv!.height = H * dpr;
      cv!.style.width  = `${W}px`;
      cv!.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.min(110, Math.round((W * H) / 15000));
      pts = Array.from({ length: n }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r:  Math.random() * 1.4 + 0.7,
        c:  Math.random() < 0.55 ? "110,165,255" : "150,130,255",
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

        // mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 0.6;
          p.y += (dy / d) * 0.6;
        }
      }

      // links between particles
      for (let a = 0; a < pts.length; a++) {
        const p = pts[a];
        for (let b = a + 1; b < pts.length; b++) {
          const q = pts[b];
          const dx = p.x - q.x, dy = p.y - q.y;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(105,155,255,${((1 - d / LINK) * 0.26).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }

        // mouse tether
        const md = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        if (md < 170) {
          ctx.strokeStyle = `rgba(80,220,200,${((1 - md / 170) * 0.45).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }

        ctx.fillStyle = `rgba(${p.c},.85)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop); }

    const onPointerMove  = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onPointerLeave = () => { mouse.x = mouse.y = -1e4; };
    const onResize       = () => resize();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    resize();
    if (RM) draw(); else loop();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      {/* Neural particle canvas */}
      <canvas ref={canvasRef} className={styles.net} />

      {/* Aurora gradient blobs */}
      <div className={styles.aurora}>
        <span className={`${styles.b} ${styles.b1}`} />
        <span className={`${styles.b} ${styles.b2}`} />
        <span className={`${styles.b} ${styles.b3}`} />
      </div>

      {/* Film-grain noise */}
      <div className={styles.noise} />

      {/* Radial vignette */}
      <div className={styles.vignette} />
    </div>
  );
}
