import Image from "next/image";
import { InfoCard } from "@/modules/landing/sections/careers-info/InfoCard";
import styles from "./careersInfo.module.css";

const whyJoinItems = [
  "Work at the bleeding edge of ServiceNow, AI, and enterprise automation",
  "Be a named contributor on transformations that affect tens of thousands of end users",
  "Collaborate with global enterprises across BFSI, Pharma, Telecom, and Manufacturing",
  "Accelerate your career with certifications, mentorship, and real leadership runway",
  "Competitive compensation, flexible work environment, and a culture of ownership",
];

const openRoleItems = [
  "ServiceNow Architects & Senior Developers",
  "AI/ML Engineers & GenAI Specialists",
  "Engagement Managers & Delivery Leads",
  "BFSI Domain Consultants",
  "Business Analysts & Solution Designers",
  "Managed Services & Platform Operations Specialists",
];

export function CareersInfoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.topDots} aria-hidden>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>

        <div className={styles.topRule} aria-hidden />
        <div className={styles.gradientBlob} aria-hidden>
          <Image
            src="/Purple%20spiral%201.png"
            alt=""
            fill
            sizes="(max-width: 768px) 80vw, 56vw"
            className={styles.gradientBlobImage}
          />
        </div>

        <div className={styles.cardStack}>
          <InfoCard variant="intro">
            <strong>TechSnitch</strong> is not for everyone. We are building a team of elite architects, strategists, and engineers who are
            uncomfortable with the ordinary people who want to work on problems that actually matter, with technology that is genuinely changing
            how enterprises operate.
          </InfoCard>

          <InfoCard title="Why Join TechSnitch" items={whyJoinItems} />

          <InfoCard title="Open Roles" items={openRoleItems} />
        </div>
      </div>
    </section>
  );
}
