import { capabilities } from "@/lib/content";
import SectionHead from "./ui/SectionHead";
import { Reveal } from "./ui/Reveal";

export default function Capabilities() {
  return (
    <section id="stack" className="pt-24 md:pt-36">
      <SectionHead
        index="03"
        title="Stack"
        aside="What I reach for, roughly in order"
      />

      <div className="shell">
        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.06}>
              <div className="h-full bg-ink p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="label text-bone">{group.title}</h3>
                  <span className="label tnum text-ash-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {group.items.map((entry) => (
                    <li
                      key={entry}
                      className="text-[0.95rem] leading-snug text-ash transition-colors duration-300 hover:text-bone"
                    >
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
