"use client";

import { useEffect, useRef } from "react";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const LINES = [
  { c: 'vault.query("unified.orders · 240 sources")' },
  { ok: "✓ 4,812,903 rows · 12ms · seamless" },
  { c: 'vault.sync(workspace: "all")' },
  { ok: "✓ schema converged · zero migration" },
  { c: 'vault.scale(tenant: "you")' },
  { ok: "✓ infinite headroom · always up-to-date" },
];

export default function VaultPanel() {
  const textRef = useRef<HTMLSpanElement>(null);
  const visibleRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let stopped = false;

    function play() {
      let li = 0;

      function nextLine() {
        if (stopped) return;
        if (!visibleRef.current) { timerRef.current = setTimeout(nextLine, 800); return; }
        if (li >= LINES.length) {
          el!.innerHTML = "";
          li = 0;
          timerRef.current = setTimeout(nextLine, 2400);
          return;
        }
        const line = LINES[li++];
        const span = document.createElement("span");
        span.className = line.c ? "" : styles.typerOk;
        el!.appendChild(span);
        const text = line.c ?? line.ok!;
        let ci = 0;

        function typeChar() {
          if (stopped) return;
          if (!visibleRef.current) { timerRef.current = setTimeout(typeChar, 400); return; }
          span.textContent = text.slice(0, ++ci);
          if (ci < text.length) {
            timerRef.current = setTimeout(typeChar, line.c ? 26 : 12);
          } else {
            el!.appendChild(document.createTextNode("\n"));
            timerRef.current = setTimeout(nextLine, line.c ? 450 : 800);
          }
        }
        typeChar();
      }
      nextLine();
    }

    const obs = new IntersectionObserver(
      (en) => { visibleRef.current = en[0].isIntersecting; },
      { threshold: 0.2 }
    );
    const typerEl = el.closest("[data-typer]") as HTMLElement | null;
    if (typerEl) obs.observe(typerEl);

    play();

    return () => {
      stopped = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <article className={`${styles.bpanel} ${styles.bVault}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>MOD·03</span>
        <BentoArrow />
      </div>
      <h3 className={styles.bName}>
        EKTAZECT <b>Vault</b>
      </h3>
      <p className={styles.bDesc}>
        One data layer for every source. Query it all as if it were one
        database.
      </p>
      <div className={`${styles.typer} mono`} data-typer>
        <span ref={textRef} />
        <span className={styles.caret} />
      </div>
    </article>
  );
}
