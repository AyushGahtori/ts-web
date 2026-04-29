import Image from "next/image";
import styles from "./whyTechsnitch.module.css";

const integrationCapabilities = [
  "ERP: SAP, Oracle",
  "CRM: Salesforce, Microsoft Dynamics",
  "Collaboration: Microsoft Teams, Slack",
  "DevOps: Jira, GitHub, Azure DevOps",
  "Security: SIEM and IAM platforms",
];

const keyBenefits = [
  "Unified digital ecosystem",
  "Real-time data synchronization",
  "Enhanced operational visibility",
  "Scalable and secure integrations",
];

export function WhyCard() {
  return (
    <div className={styles.outerLayer}>
      <div className={styles.middleLayer}>
        <article className={styles.innerLayer}>
          <div className={styles.contentGrid}>
            <div className={styles.copyColumn}>
              <header className={styles.header}>
                <h3 className={styles.cardTitle}>12. Technology &amp; Integration Ecosystem</h3>
                <p className={styles.cardSubtitle}>Seamless Integration Across the Enterprise</p>
              </header>

              <section className={styles.textBlock}>
                <h4 className={styles.blockHeading}>Integration Capabilities</h4>
                <ul className={styles.list}>
                  {integrationCapabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={styles.textBlock}>
                <h4 className={styles.blockHeading}>Key Benefits</h4>
                <ul className={styles.list}>
                  {keyBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.visualColumn}>
              <div className={styles.visualGlow} aria-hidden />
              <Image
                src="/computer.png"
                alt=""
                aria-hidden="true"
                width={642}
                height={1194}
                className={styles.visualImage}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
