"use client";

import { useState } from "react";
import data from "@/util/data.json";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

const mod = data.modules.find((m) => m.id === "id")!;

export default function IDPanel() {
  const [ssoOn, setSsoOn] = useState(false);

  return (
    <article className={`${styles.bpanel} ${styles.bId}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>{mod.idx}</span>
        <BentoArrow />
      </div>
      <h3 className={styles.bName}>EKTAZECT <b>{mod.name}</b></h3>
      <p className={styles.bDesc}>{mod.desc}</p>

      <div className={styles.switchRow}>
        <div>
          <div className={styles.switchTitle}>Enforce SSO</div>
          <div
            className={`${styles.switchSub} mono`}
            style={ssoOn ? { color: "var(--purple)" } : {}}
          >
            {ssoOn ? "3 POLICIES ACTIVE · SOC 2 READY" : "PASSWORD AUTH ONLY"}
          </div>
        </div>
        <button
          className={styles.switch}
          role="switch"
          aria-checked={ssoOn}
          aria-label="Toggle SSO enforcement"
          onClick={() => setSsoOn((v) => !v)}
          data-on={ssoOn}
        >
          <span className={styles.knob} />
        </button>
      </div>

      <div className={`${styles.idAudit} mono`}>
        <span className="pulse-dot" />
        AUDIT LOG · STREAMING
      </div>
    </article>
  );
}
