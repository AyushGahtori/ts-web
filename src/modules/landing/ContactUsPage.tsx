import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { ContactUsSection } from "@/modules/landing/sections/contact-us/ContactUsSection";

export function ContactUsPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <ContactUsSection standalone />
      </section>
    </main>
  );
}
