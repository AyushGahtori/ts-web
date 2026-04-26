import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlowFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlowFrame({ children, className, ...props }: GlowFrameProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}
