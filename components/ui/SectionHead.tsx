import { Reveal } from "./Reveal";

/** The rule + numbered label that opens every section. */
export default function SectionHead({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: string;
}) {
  return (
    <Reveal className="shell">
      <div className="hr" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-10 pt-4 md:pb-16">
        <div className="flex items-baseline gap-4">
          <span className="label label-em tnum">[ {index} ]</span>
          <span className="label text-bone">{title}</span>
        </div>
        {aside ? <span className="label max-w-xs">{aside}</span> : null}
      </div>
    </Reveal>
  );
}
