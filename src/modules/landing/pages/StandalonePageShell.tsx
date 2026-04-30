import type { ReactNode } from "react";
import { Navbar } from "../sections/navbar/Navbar";

interface StandalonePageShellProps {
  children: ReactNode;
}

export function StandalonePageShell({ children }: StandalonePageShellProps) {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <div style={{ paddingTop: 140 }}>{children}</div>
      </section>
    </main>
  );
}
