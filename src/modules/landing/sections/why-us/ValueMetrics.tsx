import styles from "./whyUs.module.css";

const metrics = [
  {
    value: "40-60%",
    label: "reduction in incident resolution time",
  },
  {
    value: "30-50%",
    label: "improvement in operational efficiency",
  },
  {
    value: "3X",
    label: "faster ServiceNow deployments",
  },
  {
    value: "25-35%",
    label: "reduction in operational costs",
  },
];

export function ValueMetrics() {
  return (
    <section className={styles.metricsBlock} aria-labelledby="why-us-metrics-title">
      <h3 id="why-us-metrics-title" className={styles.metricsTitle}>
        Value metrics
      </h3>

      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <article key={metric.value} className={styles.metricCard}>
            <span className={styles.metricAccent} aria-hidden />
            <strong className={styles.metricValue}>{metric.value}</strong>
            <p className={styles.metricLabel}>{metric.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
