import { cn } from "@/lib/cn";

interface PhotoFrameProps {
  className?: string;
  emphasis?: "center" | "side" | "hero";
  label?: string;
}

export function PhotoFrame({ className, emphasis = "side", label }: PhotoFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[23px] border border-[#353333] bg-[#121212] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        emphasis === "center" && "border-[5px] border-[#444343] rounded-[31px] bg-[#0f0f0f]",
        emphasis === "hero" && "rounded-[34px] border border-white/8 bg-[#0a0a0a]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)]" />
      <div className="absolute inset-[10px] rounded-[18px] border border-white/6" />
      {label ? (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/8 bg-black/30 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white/45 uppercase">
          {label}
        </span>
      ) : null}
    </div>
  );
}
