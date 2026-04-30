import { cn } from "@/lib/cn";

interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const navClass = "bg-transparent px-0 whitespace-nowrap text-[16px] leading-[19px] font-bold text-white transition-colors hover:text-white/85";

const activeNavClass =
  "relative inline-flex h-[39px] items-center whitespace-nowrap rounded-[16px] border border-white bg-white/10 px-3.5 text-[20px] leading-6 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_rgba(110,10,241,0.25)]";

export function NavItem({ label, href, active = false }: NavItemProps) {
  return (
    <li className="relative">
      <a href={href} className={cn(active ? activeNavClass : navClass)}>
        {label}
      </a>
      {active ? <span className="nav-item-glow" aria-hidden /> : null}
    </li>
  );
}

