"use client";

import { useState } from "react";
import BentoArrow from "./BentoArrow";
import styles from "./Ecosystem.module.css";

export default function IDPanel() {
  const [ssoOn, setSsoOn] = useState(false);

  return (
    <article className={`${styles.bpanel} ${styles.bId}`}>
      <div className={styles.bTop}>
        <span className={`${styles.bIdx} mono`}>MOD·04</span>
        <BentoArrow />
      </div>
      <h3 className={styles.bName}>
        EKTAZECT <b>ID</b>
      </h3>
      <p className={styles.bDesc}>
        Identity and access, unified across the entire ecosystem.
      </p>

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
