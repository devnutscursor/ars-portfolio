"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { metrics } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

// useLayoutEffect is a no-op (and noisy) during prerender.
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const reduce = useReducedMotion();

  // Starts at the real figure so the server-rendered HTML (and anyone without
  // JS) reads correctly; the reset to 0 happens before the first paint.
  const [value, setValue] = useState(to);

  useBeforePaint(() => {
    setValue(0);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tnum">
      {value}
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="pt-24 md:pt-32">
      <div className="shell">
        <Reveal>
          <p className="label mb-10 md:mb-14">
            Measured, not claimed — numbers from shipped production work
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08}>
              <div className="h-full bg-ink px-0 py-8 md:px-8 md:py-10">
                <p className="display flex items-baseline text-[clamp(4rem,10vw,7.5rem)] leading-none text-bone">
                  <CountUp to={Number(metric.value)} />
                  <span className="ml-1 text-[0.42em] text-ember">
                    {metric.unit}
                  </span>
                </p>
                <p className="mt-5 text-base text-bone">{metric.label}</p>
                <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-ash">
                  {metric.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
