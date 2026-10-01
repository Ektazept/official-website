import styles from "./Marquee.module.css";

const ITEMS = [
  "SLACK","GITHUB","NOTION","SALESFORCE","STRIPE","LINEAR",
  "FIGMA","JIRA","GMAIL","ZOOM","HUBSPOT","SNOWFLAKE",
  "POSTGRES","S3","ZENDESK","ASANA",
];

export default function Marquee() {
  // duplicate the track for seamless loop
  const track = [...ITEMS, ...ITEMS];

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
