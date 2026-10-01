"use client";

import { useToast } from "./ToastProvider";
import data from "@/util/data.json";
import styles from "./CTA.module.css";

const { organization: org } = data;

export default function CTA() {
  const { toast } = useToast();

  return (
    <section className={styles.cta} id="cta">
      <div className={styles.ctaWord} aria-hidden="true">{org.name}</div>
      <div className="container">
        <h2 data-reveal>
          {org.ctaHeadline.split("converge?")[0]}
          <span className="grad-text">converge?</span>
        </h2>
        <p data-reveal>{org.ctaSub}</p>
        <div className={styles.ctaBtns} data-reveal>
          <button
            className="btn btn-grad"
            onClick={() => toast("Sandbox requested — your invite is on its way. (Demo build)")}
          >
            Start converging — it&apos;s free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button
            className="btn btn-ghost-light"
            onClick={() => toast("Demo request noted — our team converges on you shortly. (Demo build)")}
          >
            Book a demo
          </button>
        </div>
        <p className={`${styles.ctaMicro} mono`} data-reveal>
          {org.ctaMicro}
        </p>
      </div>
    </section>
  );
}
