import type { Metadata } from "next";
import { Inter, Monda, Monoton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});                                                                                                                                 

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "TechSnitch | Autonomous Enterprise",
  description: "Premium AI-agnostic ServiceNow transformation landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${monoton.variable} ${monda.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
