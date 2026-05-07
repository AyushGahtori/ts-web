import { Card } from "@/components/ui/Card";

const stats = [
  { value: "100+", label: "Enterprise Deployments", variant: "dark" as const },
  { value: "24 X 7", label: "White-Glove Support", variant: "light" as const },
  { value: "5+", label: "Regulated Industries", variant: "light" as const },
  { value: "100%", label: "Outcome-Driven SLAs", variant: "dark" as const, className: "stat-card--sla" },
];

export function HeroStats() {
  return (
    <div className="hero-stats">
      {stats.map((item) => (
        <Card key={item.value} variant={item.variant} cornerAccent={item.variant === "light"} className={item.className}>
          <p className="stat-card-value">{item.value}</p>
          <p className="stat-card-label">{item.label}</p>
        </Card>
      ))}
    </div>
  );
}
