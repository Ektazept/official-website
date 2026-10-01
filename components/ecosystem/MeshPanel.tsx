"use client";

import { useState } from "react";
import data from "@/util/data.json";
import { useToast } from "../ToastProvider";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const mod = data.modules.find((m) => m.id === "mesh")!;

export default function MeshPanel() {
  const { toast } = useToast();
  const [chips, setChips] = useState(data.meshChips);
  const [popped, setPopped] = useState<string | null>(null);

  function toggle(label: string) {
    const wasOn = chips.find((c) => c.label === label)?.on;
    setChips((prev) =>
      prev.map((c) => (c.label === label ? { ...c, on: !c.on } : c))
    );
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
        <span className={`${styles.bIdx} mono`}>{mod.idx}</span>
        <BentoArrow />
      </div>
      <div className={styles.meshFlex}>
        <div>
          <h3 className={styles.bName}>
            EKTAZECT <b>{mod.name}</b>
          </h3>
          <p className={styles.bDesc}>{mod.desc}</p>
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
