"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "./ToastProvider";
import styles from "./Team.module.css";

const MEMBERS = [
  {
    idx: "01",
    name: "Aarav Mehta",
    role: "Founder & Chief Architect",
    tags: "DISTRIBUTED SYSTEMS · API DESIGN",
    seed: "ektazect-aarav",
    bio: "Aarav spent fourteen years building distributed platforms before concluding the real problem was never scale — it was the seams between systems. He wrote the first line of EKTAZECT's kernel and still reviews every API contract personally. His rule: if a feature can't explain itself to a first-time user, it ships again.",
  },
  {
    idx: "02",
    name: "Lena Kovač",
    role: "VP of Engineering",
    tags: "RELIABILITY · KUBERNETES",
    seed: "ektazect-lena",
    bio: "Lena keeps 4.8 billion daily workflows flowing at 99.99% uptime. She previously ran reliability for a global payments network and treats every millisecond as a promise. Her team's on-call rotation is famously, almost suspiciously, quiet.",
  },
  {
    idx: "03",
    name: "Darius Cole",
    role: "Head of Design Systems",
    tags: "DESIGN SYSTEMS · MOTION",
    seed: "ektazect-darius",
    bio: "Darius believes convergence should feel effortless, not engineered. He built EKTAZECT's design system around a single rule — one interface language for every module — and obsesses over the details most people feel but never notice.",
  },
  {
    idx: "04",
    name: "Yuki Tanaka",
    role: "Lead, Data & Intelligence",
    tags: "STREAMING · RUST · ML",
    seed: "ektazect-yuki",
    bio: "Yuki leads the data and intelligence group, turning raw event streams into answers before you finish asking the question. She's the reason Pulse renders in real time and Vault has never lost a row. Rust, streams, and strong coffee.",
  },
];

export default function Team() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { toast } = useToast();

  function toggle(i: number) {
    setOpenIdx(openIdx === i ? null : i);
  }

  return (
    <section className={styles.team} id="team">
      <div className="container">
        <div className="sec-head split" data-reveal>
          <div>
            <p className="eyebrow" style={{ color: "var(--purple-soft)" }}>
              <span className="eb-dot" />
              Lead developers
            </p>
            <h2>
              The people behind<br />the convergence.
            </h2>
          </div>
          <p className="sec-lede">
            A small, senior team with one shared obsession: making software feel
            like it was always one thing. Tap a row to meet them.
          </p>
        </div>

        <div className={`${styles.teamList} `} data-reveal>
          {MEMBERS.map((m, i) => (
            <article
              key={m.idx}
              className={`${styles.teamItem}${openIdx === i ? " " + styles.open : ""}`}
            >
              <button
                className={styles.teamHead}
                aria-expanded={openIdx === i}
                onClick={() => toggle(i)}
              >
                <span className={`${styles.tIdx} mono`}>{m.idx}</span>
                <Image
                  className={styles.tImg}
                  src={`https://picsum.photos/seed/${m.seed}/160/160.jpg`}
                  alt={`Portrait of ${m.name}`}
                  width={64}
                  height={64}
                  loading="lazy"
                />
                <span>
                  <span className={styles.tName}>{m.name}</span>
                  <span className={styles.tRole}>{m.role}</span>
                </span>
                <span className={`${styles.tTags} mono`}>{m.tags}</span>
                <span className={styles.tPlus}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              <div className={styles.teamBody}>
                <div className={styles.teamBodyIn}>
                  <p className={styles.tBio}>{m.bio}</p>
                  <div className={styles.tSocial}>
                    {["X", "GH", "IN"].map((label) => (
                      <button
                        key={label}
                        onClick={() =>
                          toast(`Demo build — ${m.name.split(" ")[0]}'s profile links aren't wired up yet.`)
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
