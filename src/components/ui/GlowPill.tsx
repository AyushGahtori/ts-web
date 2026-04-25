import { cn } from "@/lib/cn";

interface GlowPillProps {
  className?: string;
}

export function GlowPill({ className }: GlowPillProps) {
  return <span className={cn("glow-pill", className)} aria-hidden />;
}

