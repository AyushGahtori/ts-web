import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { Navbar } from "../sections/navbar/Navbar";

interface StandalonePageShellProps {
  children: ReactNode;
}

export function StandalonePageShell({ children }: StandalonePageShellProps) {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <MotionSection className="standalone-page-content" direction="none">
          {children}
        </MotionSection>
      </section>
    </main>
  );
}
