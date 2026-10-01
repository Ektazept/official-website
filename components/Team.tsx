"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/util/data.json";
import { useToast } from "./ToastProvider";
import styles from "./Team.module.css";

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

        <div className={styles.teamList} data-reveal>
          {data.members.map((m, i) => (
            <article
              key={m.id}
              className={`${styles.teamItem}${openIdx === i ? " " + styles.open : ""}`}
            >
              <button
                className={styles.teamHead}
                aria-expanded={openIdx === i}
                onClick={() => toggle(i)}
              >
                <span className={`${styles.tIdx} mono`}>
                  {String(m.id).padStart(2, "0")}
                </span>
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
