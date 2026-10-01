import styles from "./EcosystemSection.module.css";
import FlowPanel from "./FlowPanel";
import PulsePanel from "./PulsePanel";
import VaultPanel from "./VaultPanel";
import IDPanel from "./IDPanel";
import MeshPanel from "./MeshPanel";

export default function Ecosystem() {
  return (
    <section className={styles.ecosystem} id="ecosystem">
      <div className="container">
        <div className="sec-head split" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eb-dot" />
              The ecosystem
            </p>
            <h2>
              Modular by design.<br />United by default.
            </h2>
          </div>
          <p className="sec-lede">
            Five modules, one nervous system. Everything below runs on the same
            data layer — turn one on, and the rest get smarter. Try the demos:
            they&apos;re live.
          </p>
        </div>

        <div className={styles.bento} data-reveal>
          <FlowPanel />
          <PulsePanel />
          <VaultPanel />
          <IDPanel />
          <MeshPanel />
        </div>
      </div>
    </section>
  );
}
