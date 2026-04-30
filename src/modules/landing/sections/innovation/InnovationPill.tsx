import { cn } from "@/lib/cn";
import styles from "./innovation.module.css";

interface InnovationPillProps {
  children: React.ReactNode;
  className?: string;
}

export function InnovationPill({ children, className }: InnovationPillProps) {
  return <div className={cn(styles.pill, className)}>{children}</div>;
}
