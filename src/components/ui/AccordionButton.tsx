import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface AccordionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  isOpen: boolean;
  title: string;
}

export function AccordionButton({ className, isOpen, title, type = "button", ...props }: AccordionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex w-full items-center justify-between gap-6 rounded-[27px] px-6 py-7 text-left text-white transition-[background-color,color] duration-300 ease-out sm:px-7",
        className,
      )}
      aria-expanded={isOpen}
      {...props}
    >
      <span className="font-[var(--font-monda)] text-[1.7rem] leading-[1.15] font-bold tracking-[-0.02em] sm:text-[2.05rem]">
        {title}
      </span>

      <span
        className={cn(
          "flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 ease-out",
          isOpen ? "rotate-180" : "rotate-0",
        )}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5.25 7.75L10 12.5L14.75 7.75"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
