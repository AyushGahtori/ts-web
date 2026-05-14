import Link from "next/link";
import { cn } from "@/lib/cn";

interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const navClass =
  "premium-nav__link bg-transparent px-0 whitespace-nowrap text-[16px] leading-[19px] font-bold";

const activeNavClass =
  "premium-nav__link premium-nav__link--active relative inline-flex h-[39px] items-center whitespace-nowrap rounded-[16px] border px-3.5 text-[20px] leading-6 font-bold";

export function NavItem({ label, href, active = false }: NavItemProps) {
  return (
    <li className="relative">
      <Link href={href} className={cn(active ? activeNavClass : navClass)}>
        {label}
      </Link>
      {active ? <span className="nav-item-glow" aria-hidden /> : null}
    </li>
  );
}

