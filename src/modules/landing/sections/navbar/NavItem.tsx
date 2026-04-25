import { Button } from "@/components/ui/Button";

interface NavItemProps {
  label: string;
  active?: boolean;
}

export function NavItem({ label, active = false }: NavItemProps) {
  return (
    <li className="relative">
      <Button variant={active ? "active-nav" : "nav"}>{label}</Button>
      {active ? <span className="nav-item-glow" aria-hidden /> : null}
    </li>
  );
}

