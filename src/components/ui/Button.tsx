import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "nav" | "active-nav" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  nav: "bg-transparent px-0 whitespace-nowrap text-[16px] leading-[19px] font-bold text-white transition-colors hover:text-white/85",
  "active-nav":
    "relative h-[39px] whitespace-nowrap rounded-[16px] border border-white bg-white/10 px-3.5 text-[20px] leading-6 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_rgba(110,10,241,0.25)]",
  pill: "rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] leading-4 tracking-[0.08em] font-semibold text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]",
};

export function Button({ className, variant = "nav", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(variantClasses[variant], className)} {...props} />;
}
