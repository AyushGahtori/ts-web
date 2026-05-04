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
              <div className={styles.yellowCircle} aria-hidden />
              <Image
                src="/stary%20heart.png"
                alt=""
                aria-hidden="true"
                width={241}
                height={168}
                sizes="(max-width: 768px) 64px, 92px"
                className={styles.heartAccent}
              />
              <Image
                src="/man%20with%20a%20laptop.png"
                alt=""
                aria-hidden="true"
                width={768}
                height={1024}
                sizes="(max-width: 768px) 84vw, (max-width: 1260px) 42vw, 520px"
                className={styles.visualImage}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
