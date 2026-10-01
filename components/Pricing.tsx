"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";
import styles from "./Pricing.module.css";

const PLANS = [
  {
    name: "Starter",
    desc: "For individuals and small teams getting connected.",
    priceM: null,
    priceY: null,
    priceLabel: "$0",
    priceNote: "Up to 5 users",
    sub: "/ forever",
    features: [
      "EKTAZECT Flow & Pulse",
      "10 linked sources",
      "Community support",
    ],
    btnClass: "btn btn-ghost",
    btnLabel: "Start free",
    popular: false,
  },
  {
    name: "Growth",
    desc: "For scaling teams that need every module, unified.",
    priceM: 29,
    priceY: 23,
    priceNote: null,
    sub: "/ user / month",
    features: [
      "All five modules",
      "Up to 240 linked sources",
      "SSO & audit logs",
      "Priority support",
    ],
    btnClass: "btn btn-grad",
    btnLabel: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "For organizations with advanced security and scale needs.",
    priceM: null,
    priceY: null,
    priceLabel: "Custom",
    priceNote: "Volume pricing",
    sub: null,
    features: [
      "Unlimited sources & users",
      "SOC 2 reports & custom SLAs",
      "Dedicated success manager",
    ],
    btnClass: "btn btn-primary",
    btnLabel: "Talk to sales",
    popular: false,
  },
];

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

        <div className={`${styles.plans}`} data-reveal>
          {PLANS.map((plan) => (
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
                {plan.sub && <span>{plan.sub}</span>}
              </div>

              <p className={`${styles.priceNote} mono`}>
                {plan.name === "Growth"
                  ? yearly
                    ? "Billed yearly"
                    : "Billed monthly"
                  : plan.priceNote ?? ""}
              </p>

              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                className={plan.btnClass}
                onClick={() => toast(`${plan.name} plan selected. (Demo build)`)}
              >
                {plan.btnLabel}
              </button>
            </article>
          ))}
        </div>

        <p className={styles.planFoot}>
          All plans include zero-migration upgrades. Demo pricing, for
          illustration only.
        </p>
      </div>
    </section>
  );
}
