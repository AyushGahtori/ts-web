import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      <Image src="/Hands.png" alt="" fill priority className="object-cover" />
    </div>
  );
}
