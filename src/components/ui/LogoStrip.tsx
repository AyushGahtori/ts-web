import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { cn } from "@/lib/cn";

interface LogoStripItem {
  id: string;
  widthClass: string;
  heightClass: string;
  radiusClass?: string;
}

interface LogoStripProps {
  items: LogoStripItem[];
}

export function LogoStrip({ items }: LogoStripProps) {
  return (
    <div className="flex items-center gap-4 rounded-[90px] bg-[#0c0d0d] px-8 py-4">
      <CarouselArrow direction="left" aria-label="Previous logos" />
      <div className="flex min-w-0 flex-1 items-center justify-center gap-8 overflow-hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative shrink-0 overflow-hidden border border-white/8 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
              item.widthClass,
              item.heightClass,
              item.radiusClass ?? "rounded-[20px]",
            )}
            aria-hidden
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)]" />
            <div className="absolute left-1/2 top-1/2 h-[12px] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
      <CarouselArrow direction="right" aria-label="Next logos" />
    </div>
  );
}
