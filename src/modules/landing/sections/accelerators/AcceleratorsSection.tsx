import Image from "next/image";

export function AcceleratorsSection() {
  return (
    <section id="innovations" className="accelerators-section">
      <article className="accelerators-panel">
        <div className="accelerators-spiral" aria-hidden>
          <span />
          <span />
        </div>
        <div className="accelerators-spiral-bg" aria-hidden>
          <Image src="/Purple%20spiral%201.png" alt="" fill className="accelerators-spiral-bg-image" />
        </div>
        <div className="accelerators-content">
          <p className="accelerators-copy">
            Our proprietary accelerators - <strong>SNADA (ServiceNow AI Digital Assistant)</strong> and{" "}
            <strong>SAOS (ServiceNow Autonomous Operating System)</strong> - are not afterthoughts.
            <br />
            They are precision instruments engineered to compress <span className="accelerators-highlight">time-to-value</span>, eliminate
            operational drag, and permanently shift enterprises <span className="accelerators-highlight">from reactive</span> firefighting to
            autonomous, intelligence-led operations.
          </p>
        </div>
        <span className="accelerators-quote" aria-hidden>
          &rdquo;
        </span>
      </article>
    </section>
  );
}
