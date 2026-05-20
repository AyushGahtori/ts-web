"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "./NavItem";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About\u00A0Us", href: "/about-us" },
  { id: "why", label: "Why\u00A0Us?", href: "/whyus" },
  { id: "services", label: "Services", href: "/services" },
  { id: "join", label: "Join\u00A0Us", href: "/join-us" },
  { id: "hub", label: "Intelligence\u00A0Hub", href: "/intelligencehub" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "innovations", label: "Innovations", href: "/innovations" },
  { id: "contact", label: "Contact\u00A0Us", href: "/contact-us" },
];

interface NavbarProps {
  hiddenItemIds?: string[];
  lockVisibleAfterIntro?: boolean;
}

type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const LIGHT_BACKGROUND_LUMINANCE = 0.58;
const CSS_RGB_PATTERN = /rgba?\(([^)]+)\)/gi;

function clampByte(value: number) {
  return Math.min(255, Math.max(0, value));
}

function parseCssChannel(token: string) {
  const value = Number.parseFloat(token);
  if (!Number.isFinite(value)) return Number.NaN;
  return token.endsWith("%") ? clampByte((value / 100) * 255) : clampByte(value);
}

function parseCssAlpha(token: string | undefined) {
  if (!token) return 1;
  const value = Number.parseFloat(token);
  if (!Number.isFinite(value)) return 1;
  return token.endsWith("%") ? Math.min(1, Math.max(0, value / 100)) : Math.min(1, Math.max(0, value));
}

function parseCssRgb(value: string) {
  if (!value || value === "transparent") return null;

  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;

  const parts = match[1]
    .replace(/\s*\/\s*/g, " ")
    .split(/[\s,]+/)
    .filter(Boolean);

  if (parts.length < 3) return null;

  const color: RgbaColor = {
    r: parseCssChannel(parts[0]),
    g: parseCssChannel(parts[1]),
    b: parseCssChannel(parts[2]),
    a: parseCssAlpha(parts[3]),
  };

  return Number.isNaN(color.r) || Number.isNaN(color.g) || Number.isNaN(color.b) ? null : color;
}

function parseBackgroundImageColors(value: string) {
  if (!value || value === "none") return [];

  const colors: RgbaColor[] = [];
  CSS_RGB_PATTERN.lastIndex = 0;

  let match = CSS_RGB_PATTERN.exec(value);
  while (match) {
    const color = parseCssRgb(match[0]);
    if (color && color.a > 0.04) {
      colors.push(color);
    }
    match = CSS_RGB_PATTERN.exec(value);
  }

  return colors;
}

function colorLuminance(color: RgbaColor) {
  const toLinear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(color.r) + 0.7152 * toLinear(color.g) + 0.0722 * toLinear(color.b);
}

function averageLuminance(colors: RgbaColor[]) {
  if (colors.length === 0) return null;

  let weightedTotal = 0;
  let weight = 0;

  for (const color of colors) {
    weightedTotal += colorLuminance(color) * color.a;
    weight += color.a;
  }

  return weight > 0 ? weightedTotal / weight : null;
}

function elementBackgroundLuminance(element: Element) {
  let current: Element | null = element;

  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const backgroundColor = parseCssRgb(style.backgroundColor);

    if (backgroundColor && backgroundColor.a >= 0.35) {
      return colorLuminance(backgroundColor);
    }

    const backgroundImageLuminance = averageLuminance(parseBackgroundImageColors(style.backgroundImage));
    if (backgroundImageLuminance !== null) {
      return backgroundImageLuminance;
    }

    current = current.parentElement;
  }

  const bodyColor = parseCssRgb(window.getComputedStyle(document.body).backgroundColor);
  return bodyColor ? colorLuminance(bodyColor) : null;
}

function backdropLuminanceAtPoint(x: number, y: number, header: HTMLElement) {
  const layers = document.elementsFromPoint(x, y);

  for (const layer of layers) {
    if (header.contains(layer)) continue;

    const luminance = elementBackgroundLuminance(layer);
    if (luminance !== null) {
      return luminance;
    }
  }

  return null;
}

export function Navbar({ hiddenItemIds = ["about", "innovations"], lockVisibleAfterIntro = false }: NavbarProps) {
  const pathname = usePathname();
  const normalizedPath =
    pathname === "/why-us"
      ? "/whyus"
      : pathname === "/intelligence-hub"
        ? "/intelligencehub"
          : pathname === "/joinus"
            ? "/join-us"
            : pathname;
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introHidden, setIntroHidden] = useState(true);
  const [isOverLightBackground, setIsOverLightBackground] = useState(false);
  const hideForHomeIntro = pathname === "/" && introHidden;
  const hiddenItemKey = hiddenItemIds.join("|");
  const visibleNavItems = navItems.filter((item) => !hiddenItemIds.includes(item.id));

  useEffect(() => {
    let frame = 0;

    const updateTheme = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.max(0, rect.top + Math.min(rect.height * 0.62, 56)),
      );
      const sampleRatios = window.innerWidth < 760 ? [0.18, 0.5, 0.82] : [0.08, 0.28, 0.45, 0.62, 0.82];
      const luminances = sampleRatios
        .map((ratio) => {
          const sampleX = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width * ratio));
          return backdropLuminanceAtPoint(sampleX, sampleY, header);
        })
        .filter((value): value is number => value !== null);

      if (luminances.length === 0) return;

      const average = luminances.reduce((total, value) => total + value, 0) / luminances.length;
      const lightHits = luminances.filter((value) => value >= LIGHT_BACKGROUND_LUMINANCE).length;
      const nextIsOverLight =
        lightHits >= Math.ceil(luminances.length / 2) || average >= LIGHT_BACKGROUND_LUMINANCE + 0.05;

      setIsOverLightBackground((current) => (current === nextIsOverLight ? current : nextIsOverLight));
    };

    const scheduleThemeUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateTheme);
    };

    scheduleThemeUpdate();
    window.addEventListener("scroll", scheduleThemeUpdate, { passive: true });
    window.addEventListener("resize", scheduleThemeUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleThemeUpdate);
      window.removeEventListener("resize", scheduleThemeUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [pathname, hiddenItemKey]);

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    const revealAfterIntro = () => {
      const hero = document.querySelector<HTMLElement>(".home-cinematic-experience");
      const sticky = hero?.querySelector<HTMLElement>(".home-cinematic-sticky");
      const stickyHeight = sticky?.offsetHeight ?? window.innerHeight;
      const revealAt = hero
        ? hero.getBoundingClientRect().top + window.scrollY + hero.offsetHeight - stickyHeight - 1
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
    <header
      ref={headerRef}
      className={`premium-nav ${isOverLightBackground ? "premium-nav--on-light" : "premium-nav--on-dark"} ${
        lockVisibleAfterIntro ? "premium-nav--locked-visible" : ""
      } ${hideForHomeIntro ? "premium-nav--intro-hidden" : ""}`}
    >
      <div className="premium-nav__logo-wrap">
        <Image
          src="/techsnitch%20logo.webp"
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
