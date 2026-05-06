"use client";

import { motion } from "framer-motion";
import styles from "./innovation.module.css";

const rows = [
  {
    pillar: "Model Selection",
    approach: "Integration with Azure OpenAI, Google Gemini, AWS Bedrock, and open-source models.",
    impact: "Access to best-in-class technology at all times.",
  },
  {
    pillar: "Deployment Speed",
    approach: 'Use of pre-built "Rapid" templates and accelerators.',
    impact: "3x faster time-to-value compared to traditional consulting.",
  },
  {
    pillar: "Data Governance",
    approach: 'Built-in "Compliance Shield" and Responsible AI frameworks.',
    impact: "Secure, ethical AI adoption that meets global regulatory standards.",
  },
];

export function InnovationTable() {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <motion.tr
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <th>Innovation Pillar</th>
            <th>TechSnitch Approach</th>
            <th>Business Impact</th>
          </motion.tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <motion.tr
              key={row.pillar}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.16)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0)" }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.56, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <td>{row.pillar}</td>
              <td>{row.approach}</td>
              <td>{row.impact}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
