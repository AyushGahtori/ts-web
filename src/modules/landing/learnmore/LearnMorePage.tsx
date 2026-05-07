"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LearnMorePageData } from "./learnMoreData";
import styles from "./learnMore.module.css";

interface LearnMorePageProps {
  page: LearnMorePageData;
}

export function LearnMorePage({ page }: LearnMorePageProps) {
  const firstLetter = page.title.charAt(0);
  const restTitle = page.title.slice(1);

  return (
    <main className={styles.root}>
      <section className={styles.night}>
        <div className={styles.navRow}>
          <Link href="/services" className={styles.backLink}>
            <span aria-hidden>‹</span>
            Services
          </Link>
          <span className={styles.brand}>TechSnitch</span>
        </div>

        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>{page.eyebrow}</p>
          <h1 className={styles.title}>
            <span className={styles.dropcap}>{firstLetter}</span>
            <span className={styles.titleRest}>{restTitle}</span>
          </h1>
          <p className={styles.summary}>{page.summary}</p>
        </motion.div>

        <div className={styles.wave} aria-hidden />
      </section>

      <section className={styles.moonlight}>
        <div className={styles.content}>
          <motion.div
            className={styles.leadPanel}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            {page.lead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <div className={styles.sectionGrid}>
            {page.sections.map((section, index) => (
              <motion.article
                className={styles.detailSection}
                key={section.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.table ? (
                  <div className={styles.tableWrap}>
                    <table>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell) => (
                              <td key={cell}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>

          <motion.section
            className={styles.outcomes}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.outcomesLabel}>Strategic business outcomes</p>
            <div className={styles.outcomeGrid}>
              {page.outcomes.map((outcome) => (
                <div className={styles.outcome} key={outcome}>
                  {outcome}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className={styles.cta}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2>{page.cta.heading}</h2>
              <p>{page.cta.body}</p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/services#wall-of-love">{page.cta.primary}</Link>
              <Link href="/services#services-grid">{page.cta.secondary}</Link>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
