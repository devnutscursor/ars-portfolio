"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Note: `initial` / `whileInView` stay identical on server and client, and only
 * the transition duration reacts to prefers-reduced-motion. Branching on the
 * media query instead would desync hydration and strand the SSR `opacity: 0`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.95,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Tag>
  );
}

/** Splits a sentence into words that rise into place one after another. */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.018,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      data-reveal
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
            transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
