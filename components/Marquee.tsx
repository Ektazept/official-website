import data from "@/util/data.json";
import styles from "./Marquee.module.css";

export default function Marquee() {
  const track = [...data.integrations, ...data.integrations];

  return (
    <div className={styles.marqueeSec} id="proof">
      <p className={`${styles.marqueeLabel} mono`}>
        CONVERGING WITH THE TOOLS YOU ALREADY USE
      </p>
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {track.map((item, i) => (
            <span key={i} className={styles.item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
