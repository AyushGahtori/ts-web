import type { ReactNode } from "react";
import { Navbar } from "../sections/navbar/Navbar";

interface LandingPageShellProps {
  children: ReactNode;
}

export function LandingPageShell({ children }: LandingPageShellProps) {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <div style={{ paddingTop: 140 }}>{children}</div>
      </section>
    </main>
  );
}
