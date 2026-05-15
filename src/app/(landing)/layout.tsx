import type { ReactNode } from "react";
import { Madimi_One, Monda, Monoton } from "next/font/google";
import "../globals.css";

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const madimiOne = Madimi_One({
  variable: "--font-madimi-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function LandingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={`${monoton.variable} ${monda.variable} ${madimiOne.variable}`}>{children}</div>;
}
