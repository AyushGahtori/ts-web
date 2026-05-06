"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./innovation.module.css";

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.026,
      delayChildren: 0.04,
    },
  },
};

const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headingWordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: -42,
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.64,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const listItemReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.46,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function renderAnimatedWords(text: string, variant: Variants = wordReveal) {
  return text.split(/(\s+)/).map((token, index) => {
    if (/^\s+$/.test(token)) {
      return <span key={`${token}-${index}`}>{token}</span>;
    }

    return (
      <motion.span key={`${token}-${index}`} className={styles.animatedWord} variants={variant}>
        {token}
      </motion.span>
    );
  });
}

interface WordRevealTextProps {
  as?: "p" | "span";
  className?: string;
  text: string;
}

export function WordRevealText({ as = "p", className, text }: WordRevealTextProps) {
  const props = {
    className: cn(styles.kineticText, className),
    variants: textContainer,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.42, margin: "0px 0px -12% 0px" },
  };

  if (as === "span") {
    return <motion.span {...props}>{renderAnimatedWords(text)}</motion.span>;
  }

  return <motion.p {...props}>{renderAnimatedWords(text)}</motion.p>;
}

interface KineticHeadingProps {
  as?: "h3" | "h4";
  className?: string;
  children: string;
}

export function KineticHeading({ as = "h3", className, children }: KineticHeadingProps) {
  const props = {
    className: cn(styles.kineticHeading, className),
    variants: textContainer,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.5, margin: "0px 0px -12% 0px" },
  };
  const content = renderAnimatedWords(children, headingWordReveal);

  if (as === "h4") {
    return <motion.h4 {...props}>{content}</motion.h4>;
  }

  return <motion.h3 {...props}>{content}</motion.h3>;
}

interface AnimatedListProps {
  as?: "ul" | "ol";
  className?: string;
  children: ReactNode;
}

export function AnimatedList({ as = "ul", className, children }: AnimatedListProps) {
  const props = {
    className: cn(styles.kineticList, className),
    variants: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.08,
        },
      },
    },
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.35, margin: "0px 0px -12% 0px" },
  };

  if (as === "ol") {
    return <motion.ol {...props}>{children}</motion.ol>;
  }

  return <motion.ul {...props}>{children}</motion.ul>;
}

interface AnimatedListItemProps {
  children: ReactNode;
}

export function AnimatedListItem({ children }: AnimatedListItemProps) {
  return (
    <motion.li className={styles.kineticListItem} variants={listItemReveal}>
      <motion.span
        className={styles.kineticListScan}
        aria-hidden
        variants={{
          hidden: { x: "-110%", opacity: 0 },
          show: {
            x: "110%",
            opacity: [0, 1, 0],
            transition: { duration: 0.72, delay: 0.06, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
      {children}
    </motion.li>
  );
}
