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
          <tr>
            <th>Innovation Pillar</th>
            <th>TechSnitch Approach</th>
            <th>Business Impact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.pillar}>
              <td>{row.pillar}</td>
              <td>{row.approach}</td>
              <td>{row.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
