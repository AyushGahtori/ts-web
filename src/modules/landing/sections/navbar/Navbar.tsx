"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About\u00A0Us", href: "/about-us" },
  { id: "why", label: "Why\u00A0Us?", href: "/why-us" },
  { id: "services", label: "Services", href: "/services" },
  { id: "hub", label: "Intelligence\u00A0Hub", href: "/intelligence-hub" },
  { id: "innovations", label: "Innovations", href: "/innovations" },
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
            <NavItem key={item.id} label={item.label} href={item.href} active={pathname === item.href} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
