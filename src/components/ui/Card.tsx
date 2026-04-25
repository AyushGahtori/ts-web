import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "light" | "dark";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: CardVariant;
  cornerAccent?: boolean;
}

export function Card({ children, className, variant = "dark", cornerAccent = false, ...props }: CardProps) {
  return (
    <article className={cn("stat-card", variant === "light" ? "stat-card--light" : "stat-card--dark", className)} {...props}>
      {cornerAccent ? <span className="stat-corner-accent" aria-hidden /> : null}
      {children}
    </article>
  );
}

