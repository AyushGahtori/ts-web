"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavItem } from "./NavItem";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About\u00A0Us", href: "/about-us" },
  { id: "why", label: "Why\u00A0Us?", href: "/whyus" },
  { id: "services", label: "Services", href: "/services" },
  { id: "join", label: "Join\u00A0Us", href: "/join-us" },
  { id: "hub", label: "Intelligence\u00A0Hub", href: "/intelligencehub" },
  { id: "innovations", label: "Innovations", href: "/innovations" },
];

interface NavbarProps {
  hiddenItemIds?: string[];
}

export function Navbar({ hiddenItemIds = ["about", "innovations"] }: NavbarProps) {
  const pathname = usePathname();
  const normalizedPath =
    pathname === "/why-us"
      ? "/whyus"
      : pathname === "/intelligence-hub"
        ? "/intelligencehub"
        : pathname === "/joinus"
          ? "/join-us"
          : pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [introHidden, setIntroHidden] = useState(true);
  const hideForHomeIntro = pathname === "/" && introHidden;
  const visibleNavItems = navItems.filter((item) => !hiddenItemIds.includes(item.id));

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    const revealAfterIntro = () => {
      const hero = document.querySelector<HTMLElement>(".home-cinematic-experience");
      const revealAt = hero
        ? hero.getBoundingClientRect().top + window.scrollY + (hero.offsetHeight - window.innerHeight) * 0.965
        : window.innerHeight * 2.55;

      setIntroHidden(window.scrollY < revealAt);
    };

    const frame = window.requestAnimationFrame(revealAfterIntro);
    window.addEventListener("scroll", revealAfterIntro, { passive: true });
    window.addEventListener("resize", revealAfterIntro);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", revealAfterIntro);
      window.removeEventListener("resize", revealAfterIntro);
    };
  }, [pathname]);

  return (
    <header className={`premium-nav ${hideForHomeIntro ? "premium-nav--intro-hidden" : ""}`}>
      <div className="premium-nav__logo-wrap">
        <Image
          src="/techsnitch%20logo.png"
          alt="TechSnitch logo"
          width={86}
          height={52}
          priority
          sizes="86px"
        />
      </div>
      <nav className="premium-nav__center" aria-label="Primary">
        <ul className="premium-nav__list">
          {visibleNavItems.map((item) => (
            <NavItem key={item.id} label={item.label} href={item.href} active={normalizedPath === item.href} />
          ))}
        </ul>
      </nav>
      <button
        type="button"
        className={`premium-nav__menu-button ${menuOpen ? "is-open" : ""}`}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-primary-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-primary-navigation"
            className="premium-nav__mobile-panel"
            aria-label="Mobile primary"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibleNavItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                className={`premium-nav__mobile-link ${normalizedPath === item.href ? "is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.035, duration: 0.24, ease: "easeOut" }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
