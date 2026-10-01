"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that adds `rv-in` to every
 * [data-reveal] element when it enters the viewport.
 * Rendered once at the top of the page tree.
 */
export default function RevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("rv-in");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe all current and future [data-reveal] elements.
    // A MutationObserver picks up anything added after first paint.
    function observe() {
      document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    }

    observe();

    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
