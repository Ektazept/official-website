import data from "@/util/data.json";
import styles from "./Vision.module.css";

const { organization: org } = data;

export default function Vision() {
  return (
    <section className={styles.vision} id="vision">
      <div className={`container ${styles.visionGrid}`}>
        <div className={styles.visionLeft} data-reveal>
          <p className="eyebrow">
            <span className="eb-dot" />
            Who we are
          </p>
          <h2>
            Built on unity.<br />Engineered for scale.
          </h2>
          <p className="sec-lede" style={{ marginTop: "20px" }}>
            Software fragmentation is the silent tax on every team.{" "}
            {org.name} exists to remove it — permanently.
          </p>
        </div>

        <div>
          <div className={styles.vmBlock} data-reveal>
            <span className={`${styles.vmIdx} mono`}>01 · OUR VISION</span>
            <p className={styles.vmText}>{org.vision}</p>
          </div>

          <div className={styles.vmBlock} data-reveal>
            <span className={`${styles.vmIdx} mono`}>02 · OUR MISSION</span>
            <p className={styles.vmText}>{org.mission}</p>
          </div>

          <div className={styles.essence} data-reveal>
            <p className={`${styles.essenceLabel} mono`}>BRAND ESSENCE</p>
            <p className={styles.essenceLine}>
              {org.brandEssence.split("absolute unity.")[0]}
              <span className="grad-text">absolute unity.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
