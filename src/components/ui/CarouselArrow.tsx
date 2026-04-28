import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CarouselArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export function CarouselArrow({ className, direction, type = "button", ...props }: CarouselArrowProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex h-[53px] w-[53px] items-center justify-center rounded-full border border-white/12 bg-[#0c0d0d] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-200 ease-out hover:scale-[1.03]",
        className,
      )}
      {...props}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={direction === "left" ? "rotate-180" : ""}
        aria-hidden
      >
        <path d="M6.25 3.75L12.5 10L6.25 16.25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
