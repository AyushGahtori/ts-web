import styles from "./brandFooter.module.css";

const docsLinks = ["Getting Started", "API Reference", "Integrations", "Examples", "SDKs"];
const legalLinks = ["Privacy Policy", "Terms of Service"];

export function FooterLinks() {
  return (
    <div className={styles.footerMeta}>
      <div className={styles.footerColumn}>
        <h4>Documentation</h4>
        <ul>
          {docsLinks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.footerColumn}>
        <h4>Legal</h4>
        <ul>
          {legalLinks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.footerColumnRight}>
        <div className={styles.addressBlock}>
          <p>2261 Balcones Drive</p>
          <p>Austin, TX, United States</p>
        </div>

        <div className={styles.statusRow}>
          <span>All systems normal</span>
          <span className={styles.statusDot} aria-hidden />
        </div>

        <div className={styles.socialRow} aria-label="Social links">
          <a
            className={styles.socialIcon}
            href="https://www.linkedin.com/company/techsnitch/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open TechSnitch on LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.3 8.2A1.55 1.55 0 1 1 6.3 5.1a1.55 1.55 0 0 1 0 3.1ZM4.9 9.7h2.8V19H4.9V9.7Zm4.6 0h2.7V11h.04c.38-.7 1.3-1.45 2.68-1.45 2.87 0 3.4 1.88 3.4 4.32V19h-2.8v-4.55c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.18-1.73 2.39V19H9.5V9.7Z"
                fill="currentColor"
              />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
