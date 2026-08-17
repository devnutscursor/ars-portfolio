"use client";

import { useEffect, useRef } from "react";

/**
 * A trailing ring cursor for fine pointers. Driven straight through the DOM in
 * a rAF loop so it never triggers a React render.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ringEl = ring.current;
    const dotEl = dot.current;
    if (!ringEl || !dotEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!visible) {
        visible = true;
        ringEl.style.opacity = "1";
        dotEl.style.opacity = "1";
      }

      const el = event.target as HTMLElement | null;
      targetScale = el?.closest("a, button, input, textarea, [data-cursor]")
        ? 2.4
        : 1;
    };

    const onLeave = () => {
      visible = false;
      ringEl.style.opacity = "0";
      dotEl.style.opacity = "0";
    };

    let frame = requestAnimationFrame(function loop() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      scale += (targetScale - scale) * 0.12;

      ringEl.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${scale.toFixed(3)})`;
      dotEl.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
      frame = requestAnimationFrame(loop);
    });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-bone/45 opacity-0 mix-blend-difference transition-opacity duration-300"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ember opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
