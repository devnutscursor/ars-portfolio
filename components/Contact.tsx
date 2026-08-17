"use client";

import { useState } from "react";
import { person } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const CHANNELS = [
  { label: "Email", value: person.email, href: `mailto:${person.email}` },
  { label: "GitHub", value: person.githubHandle, href: person.github },
  { label: "LinkedIn", value: person.linkedinHandle, href: person.linkedin },
  { label: "Phone", value: person.phone, href: `tel:${person.phone.replace(/\s/g, "")}` },
  { label: "Résumé", value: "PDF, one page", href: person.cv },
];

const field =
  "w-full border-b border-[var(--rule)] bg-transparent py-3 text-base text-bone outline-none transition-colors duration-300 placeholder:text-ash-dim focus:border-ember";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden inputs, humans don't.
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // No form key configured yet — hand the message to the mail client instead
    // of silently dropping it.
    if (!ACCESS_KEY) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(
        `Portfolio enquiry from ${name}`,
      )}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio enquiry from ${name}`,
          from_name: "Portfolio",
          name,
          email,
          message,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pt-24 md:pt-36">
      <SectionHead index="04" title="Contact" aside={person.available} />

      <div className="shell">
        <Reveal>
          <h2 className="display max-w-[16ch] text-[clamp(2.8rem,8.5vw,7rem)]">
            Let&rsquo;s build something{" "}
            <span className="italic text-sand">that ships.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-y-16 md:mt-24 md:gap-x-10">
          <div className="col-span-12 md:col-span-6">
            <Reveal>
              <form onSubmit={onSubmit} className="space-y-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div>
                  <label htmlFor="name" className="label">
                    01 — Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={`${field} mt-3`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    02 — Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={`${field} mt-3`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    03 — What are you building?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="A few lines about the role or the problem."
                    className={`${field} mt-3 resize-none`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative overflow-hidden border border-[var(--rule-strong)] px-8 py-4 disabled:opacity-50"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100"
                    />
                    <span className="label relative text-bone transition-colors duration-300 group-hover:text-ink">
                      {status === "sending" ? "Sending…" : "Send message"}
                    </span>
                  </button>

                  <p aria-live="polite" className="label max-w-[26ch]">
                    {status === "sent" && (
                      <span className="text-ember">
                        Sent — I&rsquo;ll reply within a day.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-ember">
                        Didn&rsquo;t go through. Email me directly?
                      </span>
                    )}
                    {status === "mailto" && (
                      <span>Opening your mail client…</span>
                    )}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <ul className="border-t border-[var(--rule)]">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        channel.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      download={channel.label === "Résumé" ? "" : undefined}
                      className="group flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-4"
                    >
                      <span className="label transition-colors duration-300 group-hover:text-ember">
                        {channel.label}
                      </span>
                      <span className="flex items-baseline gap-3 text-sm text-bone">
                        {channel.value}
                        <span
                          aria-hidden
                          className="inline-block translate-x-0 text-ash-dim transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 group-hover:text-ember"
                        >
                          &#8599;
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-[34ch] text-sm leading-relaxed text-ash">
                Based in {person.location} ({person.utc}). Comfortable
                overlapping with European and US-East hours, and available as a
                full-time contractor.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
