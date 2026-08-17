import { about, education } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="index" className="pt-20 md:pt-28">
      <SectionHead index="01" title="Index" aside="The short version" />

      <div className="shell grid grid-cols-12 gap-y-14 md:gap-x-10">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <p className="max-w-[54ch] text-xl leading-[1.55] text-bone md:text-[1.6rem] md:leading-[1.45]">
              {lead}
            </p>
          </Reveal>

          <div className="mt-9 max-w-[58ch] space-y-6">
            {rest.map((paragraph, i) => (
              <Reveal key={i} delay={0.06 * (i + 1)}>
                <p className="text-base leading-relaxed text-ash">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <Reveal delay={0.1}>
            <dl className="border-t border-[var(--rule)]">
              {about.facts.map((fact) => (
                <div
                  key={fact.k}
                  className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-3.5"
                >
                  <dt className="label">{fact.k}</dt>
                  <dd className="text-right text-sm text-bone">{fact.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-10 space-y-6">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="text-sm text-bone">{item.title}</p>
                  <p className="mt-1 text-sm text-ash">{item.org}</p>
                  {item.note ? (
                    <p className="label mt-2 leading-relaxed">{item.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
