"use client";

import { useEffect, useState } from "react";
import { person } from "@/lib/content";

const LINKS = [
  { id: "#index", n: "01", label: "Index" },
  { id: "#work", n: "02", label: "Work" },
  { id: "#stack", n: "03", label: "Stack" },
  { id: "#contact", n: "04", label: "Contact" },
];

export default function Nav() {
  const [time, setTime] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: person.timezone,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ${
        scrolled ? "bg-ink/72 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between gap-6 py-4 md:py-5">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-xl leading-none">
            {person.first}{" "}
            <span className="italic text-ember">{person.last}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a href={link.id} className="group flex items-baseline gap-1.5">
                <span className="label tnum text-ash-dim transition-colors group-hover:text-ember">
                  {link.n}
                </span>
                <span className="label wipe text-bone">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="label wipe text-bone md:hidden">
          Contact &#8599;
        </a>

        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="hidden h-1.5 w-1.5 rounded-full bg-ember sm:block"
            style={{ boxShadow: "0 0 10px 2px rgba(255,92,38,.6)" }}
          />
          <span className="label tnum" suppressHydrationWarning>
            {time ? `LHR ${time}` : "LHR"}
          </span>
        </div>
      </nav>

      <div
        className={`h-px w-full origin-left transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "var(--rule)" }}
      >
        <div
          className="h-px bg-ember"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
      </div>
    </header>
  );
}
