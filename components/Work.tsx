import { work } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export default function Work() {
  return (
    <section id="work" className="pt-24 md:pt-36">
      <SectionHead
        index="02"
        title="Selected Work"
        aside="Three teams, three problem shapes"
      />

      <div className="shell">
        {work.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.04}>
            <article className="group relative border-t border-[var(--rule)]">
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-ember transition-[width] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full"
              />

              <div className="grid grid-cols-12 gap-y-8 py-10 md:gap-x-10 md:py-16">
                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-baseline gap-5">
                    <span className="label tnum transition-colors duration-500 group-hover:text-ember">
                      {item.index}
                    </span>
                    <div>
                      <h3 className="display text-[2.1rem] leading-[0.95] md:text-[2.6rem]">
                        {item.company}
                      </h3>
                      {item.place ? (
                        <p className="label mt-2">{item.place}</p>
                      ) : null}
                      <p className="mt-3 text-sm text-bone">{item.role}</p>
                      <p className="label mt-2 tnum">{item.period}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-7 md:col-start-6">
                  <p className="max-w-[52ch] text-lg leading-snug text-bone md:text-xl">
                    {item.summary}
                  </p>

                  <ul className="mt-7 max-w-[62ch] space-y-3.5">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="label tnum mt-1.5 shrink-0 text-ash-dim">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.95rem] leading-relaxed text-ash">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="label border border-[var(--rule)] px-2.5 py-1.5 text-ash transition-colors duration-500 group-hover:border-[var(--rule-strong)] group-hover:text-bone"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="hr" />
      </div>
    </section>
  );
}
