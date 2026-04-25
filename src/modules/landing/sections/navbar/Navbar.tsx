import Image from "next/image";
import { NavItem } from "./NavItem";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About\u00A0Us" },
  { id: "why", label: "Why\u00A0Us?" },
  { id: "services", label: "Services" },
  { id: "hub", label: "Intelligence\u00A0Hub" },
  { id: "innovations", label: "Innovations" },
];

export function Navbar() {
  return (
    <header className="premium-nav">
      <div className="premium-nav__logo-wrap">
        <Image src="/techsnitch%20logo.png" alt="TechSnitch logo" width={86} height={52} priority />
      </div>
      <nav className="premium-nav__center" aria-label="Primary">
        <ul className="premium-nav__list">
          {navItems.map((item) => (
            <NavItem key={item.id} label={item.label} active={item.id === "home"} />
          ))}
        </ul>
      </nav>
    </header>
  );
}
