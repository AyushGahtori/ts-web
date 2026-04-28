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
          <span className={styles.socialIcon} aria-label="X">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 4h3.4l4.4 5.9L17.5 4h2l-6.2 7.2L20 20h-3.4l-4.8-6.4L6.3 20h-2.1l6.5-7.5L4.5 4Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className={styles.socialIcon} aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3.2a8.8 8.8 0 0 0-2.78 17.15c.44.08.6-.19.6-.42v-1.5c-2.46.54-2.98-1.05-2.98-1.05-.4-1.02-.98-1.3-.98-1.3-.8-.55.06-.54.06-.54.89.06 1.36.91 1.36.91.78 1.35 2.05.96 2.55.73.08-.57.3-.96.55-1.18-1.97-.22-4.05-.98-4.05-4.38 0-.96.34-1.75.9-2.37-.1-.22-.39-1.12.08-2.33 0 0 .74-.24 2.42.9a8.4 8.4 0 0 1 4.4 0c1.68-1.14 2.42-.9 2.42-.9.47 1.2.18 2.1.09 2.33.56.62.9 1.41.9 2.37 0 3.4-2.08 4.16-4.07 4.38.31.27.59.8.59 1.6v2.38c0 .24.16.51.6.42A8.8 8.8 0 0 0 12 3.2Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className={styles.socialIcon} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.3 8.2A1.55 1.55 0 1 1 6.3 5.1a1.55 1.55 0 0 1 0 3.1ZM4.9 9.7h2.8V19H4.9V9.7Zm4.6 0h2.7V11h.04c.38-.7 1.3-1.45 2.68-1.45 2.87 0 3.4 1.88 3.4 4.32V19h-2.8v-4.55c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.18-1.73 2.39V19H9.5V9.7Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
