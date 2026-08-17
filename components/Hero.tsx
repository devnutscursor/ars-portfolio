"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { hero, person } from "@/lib/content";

const Scene = dynamic(() => import("./scene/Scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(46% 42% at 58% 62%, rgba(255,92,38,.16) 0%, rgba(255,92,38,.05) 45%, transparent 72%)",
      }}
    />
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  // Identical markup on server and client — only the timing reacts to the
  // reduced-motion query, so hydration never strands an `opacity: 0`.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 1,
      delay: reduce ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* 3D field — full bleed but held back on mobile, pushed right on desktop */}
      <div className="mask-fade-b absolute inset-0 z-0 opacity-40 md:left-[26%] md:opacity-100">
        <Scene />
      </div>

      {/* Legibility scrims. Horizontal on desktop where the field sits to the
          right; vertical on mobile where the copy sits directly on top of it. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(100deg, #0b0a09 0%, rgba(11,10,9,.92) 28%, rgba(11,10,9,.55) 52%, rgba(11,10,9,0) 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,10,9,.9) 0%, rgba(11,10,9,.55) 30%, rgba(11,10,9,.82) 52%, rgba(11,10,9,.92) 80%, #0b0a09 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background: "linear-gradient(to top, #0b0a09 12%, transparent 100%)",
        }}
      />

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-6 pt-24 md:pt-28">
        <motion.div
          className="flex items-baseline justify-between gap-6"
          {...rise(0.05)}
        >
          <span className="label">Portfolio — MMXXVI</span>
          <span className="label hidden sm:block">
            {person.location} · {person.utc}
          </span>
        </motion.div>

        <div className="py-10 md:py-14">
          <motion.h1
            className="display text-[clamp(3.4rem,13.2vw,12.5rem)]"
            {...rise(0.12)}
          >
            <span className="block">{person.first}</span>
            <span className="block italic text-sand">{person.last}</span>
          </motion.h1>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-9"
            {...rise(0.28)}
          >
            <span className="h-px w-10 bg-ember md:w-14" />
            <span className="label text-bone">{person.role}</span>
            <span className="label hidden text-ash-dim sm:inline">/</span>
            <span className="label w-full sm:w-auto">
              Backend · AI systems · Web performance
            </span>
          </motion.div>
        </div>

        <div>
          <motion.p
            className="max-w-[46ch] text-pretty text-base leading-relaxed text-ash md:text-lg"
            {...rise(0.4)}
          >
            {hero.lede}
          </motion.p>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-px border-t border-[var(--rule)] pt-4 md:mt-12 md:grid-cols-4"
            {...rise(0.5)}
          >
            {hero.meta.map((item) => (
              <div key={item.k} className="py-2 pr-4">
                <div className="label text-ash-dim">{item.k}</div>
                <div className="mt-2 text-sm text-bone">{item.v}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-3"
            {...rise(0.6)}
          >
            <span className="label text-ash-dim">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-[var(--rule)]">
              <motion.span
                className="absolute inset-x-0 top-0 block h-3 bg-ember"
                animate={reduce ? undefined : { y: ["-100%", "300%"] }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
