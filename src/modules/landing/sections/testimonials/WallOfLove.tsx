import Image from "next/image";
import { TestimonialCard } from "@/modules/landing/sections/testimonials/TestimonialCard";
import styles from "./wallOfLove.module.css";

const testimonials = [
  {
    slot: "john",
    name: "John Smith",
    role: "Operations Manager",
    quote:
      "TechSnitch changed how we do business. We have benefited greatly from the increased insight into our supply chain and IT assets. Our operational efficiency has never been higher, and we can now act swiftly on well-informed decisions.",
  },
  {
    slot: "michael",
    name: "Michael Thompson",
    role: "Chief Technology Officer",
    quote:
      "TechSnitch has completely revolutionized our approach to network management and customer service. The enhancements in reliability and responsiveness have made a significant impact on our customer satisfaction and operational efficiency.",
  },
  {
    slot: "emily",
    name: "Emily Johnson",
    role: "Customer Experience Director",
    quote:
      "The way we handle inventories and customer service has been completely transformed by ServiceNow. Our clients are happier than ever, and we've achieved amazing efficiency. We are now better able to satisfy their demands and adjust to shifting market conditions.",
  },
  {
    slot: "lisa",
    name: "Lisa Johnson",
    role: "Operations Manager",
    quote:
      "TechSnitch has revolutionized our operations beyond expectations. Its capability to streamline asset tracking and automate compliance processes has significantly enhanced our efficiency and elevated our safety standards.",
  },
  {
    slot: "sarah",
    name: "Dr. Sarah Thompson",
    role: "Vice President of Student Affairs",
    quote:
      "For us, TechSnitch has changed the game. The opportunity to simplify IT support and student services has revolutionized our campus life. We can concentrate more on education, which is what really counts, and our faculty and students are happier as a result.",
  },
  {
    slot: "carter",
    name: "Dr. Emily Carter",
    role: "Director of Regulatory Affairs",
    quote:
      "TechSnitch has redefined our approach to quality management and clinical trials. By enhancing efficiency and ensuring compliance, it has greatly accelerated our efforts to deliver innovative therapies to market.",
  },
  {
    slot: "david",
    name: "David Rodriguez",
    role: "Chief Operating Officer",
    quote:
      "Our interactions with our citizens have been radically altered by TechSnitch. Our community's trust in us has grown as a result of our enhanced response and effective case management and service request automation.",
  },
  {
    slot: "jennifer",
    name: "Jennifer Lee",
    role: "Executive Director",
    quote:
      "The way we handle our beneficiary cases and donor relationships has been completely changed by TechSnitch. We have been able to concentrate more on our goal and truly impact our community because to the improved efficiency and accountability.",
  },
  {
    slot: "mark",
    name: "Mark Wilson",
    role: "Director of Operations",
    quote:
      "Our operations and guest services management has been completely transformed with TechSnitch. Our brand's image and financial performance have been greatly impacted by the increases in productivity and guest happiness.",
  },
];

export function WallOfLove() {
  return (
    <section id="wall-of-love" className={styles.section}>
      <div className={styles.curveTop} aria-hidden />
      <div className={styles.panel}>
        <h2 className={styles.title}>Wall of Love</h2>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <TestimonialCard key={`${item.name}-${item.role}`} {...item} className={styles[item.slot]} />
          ))}
        </div>

        <div className={styles.charactersWrap} aria-hidden>
          <div className={styles.shadow} />
          <Image
            src="/image 54.png"
            alt=""
            width={811}
            height={811}
            sizes="(max-width: 768px) 56vw, (max-width: 1180px) 30vw, 360px"
            className={styles.charactersImage}
          />
        </div>
      </div>
    </section>
  );
}
