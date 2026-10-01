"use client";

import { useState } from "react";
import { useToast } from "../ToastProvider";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const ALL_CHIPS = [
  { label: "SLACK", on: true },
  { label: "GITHUB", on: true },
  { label: "NOTION", on: true },
  { label: "STRIPE", on: false },
  { label: "LINEAR", on: false },
  { label: "ZOOM", on: false },
  { label: "FIGMA", on: false },
  { label: "JIRA", on: false },
  { label: "GMAIL", on: false },
  { label: "SALESFORCE", on: false },
];

export default function MeshPanel() {
  const { toast } = useToast();
  const [chips, setChips] = useState(ALL_CHIPS);
  const [popped, setPopped] = useState<string | null>(null);

  function toggle(label: string) {
    setChips((prev) =>
      prev.map((c) => (c.label === label ? { ...c, on: !c.on } : c))
    );
    const wasOn = chips.find((c) => c.label === label)?.on;
    toast(
      wasOn
        ? `${label} unlinked.`
        : `${label} linked — every module inherited it instantly.`
    );
    setPopped(label);
    setTimeout(() => setPopped(null), 400);
  }

  const linkedCount = 174 + chips.filter((c) => c.on).length;

  return (
    <article className={`${styles.bpanel} ${styles.bMesh}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>MOD·05</span>
        <BentoArrow />
      </div>
      <div className={styles.meshFlex}>
        <div>
          <h3 className={styles.bName}>
            EKTAZECT <b>Mesh</b>
          </h3>
          <p className={styles.bDesc}>
            The integration fabric. Connect a source once — every module
            inherits it instantly. Tap a chip to link it.
          </p>
          <p className={`${styles.meshCount} mono`}>
            <b>{linkedCount}</b> / 240 SOURCES LINKED
          </p>
        </div>
        <div className={styles.chips}>
          {chips.map((chip) => (
            <button
              key={chip.label}
              className={`${styles.chip}${chip.on ? " " + styles.chipOn : ""}${popped === chip.label ? " " + styles.chipPop : ""}`}
              onClick={() => toggle(chip.label)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
