 "use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

const navItems = [
  { id: "home", href: "/home#home", label: "Home", match: ["/", "/home"] },
  { id: "about", href: "/home#about", label: "About\u00A0Us", match: [] as string[] },
  { id: "why", href: "/whyus", label: "Why\u00A0Us?", match: ["/whyus"] },
  { id: "services", href: "/services", label: "Services", match: ["/services"] },
  { id: "hub", href: "/home#hub", label: "Intelligence\u00A0Hub", match: [] as string[] },
  { id: "innovations", href: "/innovations", label: "Innovations", match: ["/innovations"] },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="premium-nav">
      <div className="premium-nav__logo-wrap">
        <Image
          src="/techsnitch%20logo.png"
          alt="TechSnitch logo"
          width={86}
          height={52}
          preload
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <nav className="premium-nav__center" aria-label="Primary">
        <ul className="premium-nav__list">
          {navItems.map((item) => (
            <NavItem key={item.id} href={item.href} label={item.label} active={item.match.includes(pathname)} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
