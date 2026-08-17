"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import VoiceField from "./VoiceField";

/** Slow drifting motes so the space around the field isn't empty black. */
function Dust({ animate }: { animate: boolean }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    // Deterministic scatter — no Math.random, so every build looks the same.
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963;
      const r = 1.4 + (i / count) * 6.2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = ((i * 37) % 100) / 100 * 3.4 - 0.3;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (!animate || !points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={points} geometry={geometry} raycast={() => null}>
      <pointsMaterial
        size={0.022}
        color="#6b5647"
        sizeAttenuation
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </points>
  );
}

export default function Scene() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const [config, setConfig] = useState<{
    rings: number;
    animate: boolean;
    dpr: [number, number];
  } | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;

    setConfig({
      rings: small ? 13 : weak ? 16 : 21,
      animate: !reduce,
      dpr: small ? [1, 1.4] : [1, 1.7],
    });

    const onPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scroll.current = Math.min(
        1,
        window.scrollY / Math.max(1, window.innerHeight),
      );
    };

    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!config) return null;

  return (
    <Canvas
      dpr={config.dpr}
      frameloop={config.animate ? "always" : "demand"}
      camera={{ position: [0, 2.75, 7.3], fov: 34, near: 0.1, far: 40 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#0b0a09"]} />
      <fog attach="fog" args={["#0b0a09", 7, 15]} />

      <VoiceField
        rings={config.rings}
        animate={config.animate}
        pointer={pointer}
        scroll={scroll}
      />
      <Dust animate={config.animate} />

      <EffectComposer enableNormalPass={false}>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          mipmapBlur
          radius={0.72}
        />
        <Vignette offset={0.22} darkness={0.78} />
      </EffectComposer>
    </Canvas>
  );
}
