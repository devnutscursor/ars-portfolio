"use client";

import { motion, useReducedMotion } from "motion/react";
import { marquee } from "@/lib/content";

export default function Marquee() {
  const reduce = useReducedMotion();
  const run = [...marquee, ...marquee];

  return (
    <div className="relative border-y border-[var(--rule)] py-4">
      <div className="mask-fade-x overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-10 pr-10"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {run.map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              <span className="label text-bone/80">{word}</span>
              <span aria-hidden className="text-ember/70">
                &#10022;
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
