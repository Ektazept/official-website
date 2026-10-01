"use client";

import { useState } from "react";
import data from "@/util/data.json";
import { useToast } from "./ToastProvider";
import styles from "./Pricing.module.css";

const BTN_CLASS: Record<string, string> = {
  ghost:   "btn btn-ghost",
  grad:    "btn btn-grad",
  primary: "btn btn-primary",
};

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const { toast } = useToast();

  return (
    <section className={styles.pricing} id="pricing">
      <div className="container">
        <div className="sec-head" data-reveal style={{ textAlign: "center" }}>
          <p className="eyebrow">
            <span className="eb-dot" />
            Pricing
          </p>
          <h2>
            One ecosystem.<br />Priced to scale with you.
          </h2>
          <div className={styles.bill}>
            <span className={!yearly ? styles.billOn : ""}>Monthly</span>
            <button
              className={styles.billSw}
              role="switch"
              aria-checked={yearly}
              aria-label="Bill yearly"
              onClick={() => setYearly((v) => !v)}
              data-on={yearly}
            />
            <span className={yearly ? styles.billOn : ""}>Yearly</span>
            <span className={`${styles.save} mono`}>SAVE 20%</span>
          </div>
        </div>

        <div className={styles.plans} data-reveal>
          {data.pricing.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.plan}${plan.popular ? " " + styles.pop : ""}`}
            >
              {plan.popular && (
                <span className={`${styles.planTag} mono`}>MOST POPULAR</span>
              )}
              <h3>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.desc}</p>

              <div className={styles.price}>
                <b>
                  {plan.priceM !== null
                    ? `$${yearly ? plan.priceY : plan.priceM}`
                    : plan.priceLabel}
                </b>
                {plan.priceSub && <span>{plan.priceSub}</span>}
              </div>

              <p className={`${styles.priceNote} mono`}>
                {plan.name === "Growth"
                  ? yearly ? "Billed yearly" : "Billed monthly"
                  : plan.priceNote ?? ""}
              </p>

              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                className={BTN_CLASS[plan.btnVariant] ?? "btn btn-primary"}
                onClick={() => toast(`${plan.name} plan selected. (Demo build)`)}
              >
                {plan.btnLabel}
              </button>
            </article>
          ))}
        </div>

        <p className={styles.planFoot}>
          All plans include zero-migration upgrades. Demo pricing, for illustration only.
        </p>
      </div>
    </section>
  );
}
