"use client";

import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DIM = new THREE.Color("#241c17");
const MID = new THREE.Color("#ff5c26");
const HOT = new THREE.Color("#ffd9c4");

const BAR_W = 0.042;
const RING_GAP = 0.152;
const INNER_R = 0.34;
const STATIC_T = 2.35;

type Props = {
  rings: number;
  animate: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
  scroll: React.RefObject<number>;
};

/**
 * A radial spectrogram: concentric rings of bars whose heights are driven by
 * layered travelling waves, so the whole thing reads as a voice print rather
 * than a generic 3D prop. Matrices are written straight into the instance
 * buffer — only one float per bar changes per frame.
 */
export default function VoiceField({ rings, animate, pointer, scroll }: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  const scratch = useMemo(() => new THREE.Color(), []);
  const smoothed = useRef({ x: 0, y: 0 });

  const { xs, zs, radii, angles, count, maxRadius } = useMemo(() => {
    const xs: number[] = [];
    const zs: number[] = [];
    const radii: number[] = [];
    const angles: number[] = [];

    for (let ring = 0; ring < rings; ring++) {
      const r = INNER_R + ring * RING_GAP;
      const n = 12 + ring * 6;
      const stagger = (ring % 2) * (Math.PI / n);
      for (let j = 0; j < n; j++) {
        const a = (j / n) * Math.PI * 2 + stagger;
        xs.push(Math.cos(a) * r);
        zs.push(Math.sin(a) * r);
        radii.push(r);
        angles.push(a);
      }
    }

    return {
      xs: Float32Array.from(xs),
      zs: Float32Array.from(zs),
      radii: Float32Array.from(radii),
      angles: Float32Array.from(angles),
      count: xs.length,
      maxRadius: INNER_R + (rings - 1) * RING_GAP,
    };
  }, [rings]);

  // Bar geometry, pre-shaded bottom-to-top so every bar has internal depth.
  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(BAR_W, 1, BAR_W);
    g.translate(0, 0.5, 0); // grow upward from the floor plane

    const pos = g.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const shade = 0.32 + pos.getY(i) * 0.68;
      colors[i * 3] = shade;
      colors[i * 3 + 1] = shade;
      colors[i * 3 + 2] = shade;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        toneMapped: false,
      }),
    [],
  );

  useLayoutEffect(() => {
    const g = geometry;
    const m = material;
    return () => {
      g.dispose();
      m.dispose();
    };
  }, [geometry, material]);

  /** Writes one frame of the field into the instance buffers. */
  const writeFrame = useCallback(
    (t: number, px: number, pz: number) => {
      const target = mesh.current;
      if (!target) return;

      const matrices = target.instanceMatrix.array as Float32Array;
      const colors = target.instanceColor?.array as Float32Array | undefined;

      // Global gain — a slow swell, like someone speaking in sentences.
      const gain = 0.55 + 0.45 * Math.sin(t * 0.31) * Math.sin(t * 0.13 + 1.2);

      for (let i = 0; i < count; i++) {
        const r = radii[i];
        const a = angles[i];
        const rn = r / maxRadius;

        const wave = Math.sin(r * 2.55 - t * 1.95);
        const lobe = 0.55 + 0.45 * Math.sin(a * 3 + r * 0.9 + t * 0.72);
        const detail = Math.max(0, Math.sin(a * 7 - t * 1.35 + r * 2.1));

        let h = 0.045;
        h += Math.max(0, wave) * 0.66 * lobe * (0.45 + 0.55 * gain);
        h += detail * 0.09 * (1 - rn);
        h *= 1 - rn * rn * 0.58; // taper toward the rim

        // Pointer swell — the field leans toward the cursor.
        const dx = px - xs[i];
        const dz = pz - zs[i];
        const near = 1 - Math.min(1, Math.sqrt(dx * dx + dz * dz) / 1.9);
        h += near * near * 0.52;

        matrices[i * 16 + 5] = h;

        if (colors) {
          const n = Math.min(1, h / 0.78);
          scratch.lerpColors(DIM, MID, n * n);
          if (n > 0.62) scratch.lerp(HOT, ((n - 0.62) / 0.38) * 0.75);
          colors[i * 3] = scratch.r;
          colors[i * 3 + 1] = scratch.g;
          colors[i * 3 + 2] = scratch.b;
        }
      }

      target.instanceMatrix.needsUpdate = true;
      if (target.instanceColor) target.instanceColor.needsUpdate = true;
    },
    [angles, count, maxRadius, radii, scratch, xs, zs],
  );

  // Seed the instance buffers: identity matrix + fixed x/z per bar.
  useLayoutEffect(() => {
    const target = mesh.current;
    if (!target) return;

    const matrices = target.instanceMatrix.array as Float32Array;
    matrices.fill(0);
    for (let i = 0; i < count; i++) {
      const o = i * 16;
      matrices[o] = 1;
      matrices[o + 5] = 0.045;
      matrices[o + 10] = 1;
      matrices[o + 12] = xs[i];
      matrices[o + 14] = zs[i];
      matrices[o + 15] = 1;
    }
    target.instanceMatrix.needsUpdate = true;

    // Allocating instanceColor up front keeps the material define stable.
    scratch.copy(DIM);
    for (let i = 0; i < count; i++) target.setColorAt(i, scratch);
    if (target.instanceColor) target.instanceColor.needsUpdate = true;

    if (!animate) {
      writeFrame(STATIC_T, 0, 0);
      invalidate();
    }
  }, [animate, count, invalidate, scratch, writeFrame, xs, zs]);

  useFrame((state) => {
    if (!animate) return;

    const t = state.clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0 };

    smoothed.current.x += (p.x - smoothed.current.x) * 0.045;
    smoothed.current.y += (p.y - smoothed.current.y) * 0.045;

    writeFrame(t, smoothed.current.x * 3.1, smoothed.current.y * 2.4);

    const progress = scroll.current ?? 0;

    if (group.current) {
      group.current.rotation.y = t * 0.055 + smoothed.current.x * 0.28;
      group.current.rotation.z = smoothed.current.y * 0.05;
      group.current.position.y = -0.35 + progress * 1.4;
    }

    const cam = state.camera;
    cam.position.x += (smoothed.current.x * 0.75 - cam.position.x) * 0.05;
    cam.position.y +=
      (2.75 - smoothed.current.y * 0.55 + progress * 2.6 - cam.position.y) *
      0.05;
    cam.position.z += (7.3 + progress * 1.8 - cam.position.z) * 0.05;
    cam.lookAt(0, 0.25 - progress * 0.4, 0);
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <instancedMesh
        ref={mesh}
        args={[geometry, material, count]}
        frustumCulled={false}
        raycast={() => null}
      />

      {/* Floor rings — structure without a dev-tool grid. */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.004} raycast={() => null}>
        <ringGeometry args={[maxRadius + 0.22, maxRadius + 0.235, 160]} />
        <meshBasicMaterial color="#4a3225" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.004} raycast={() => null}>
        <ringGeometry args={[maxRadius + 0.62, maxRadius + 0.63, 160]} />
        <meshBasicMaterial
          color="#2e211a"
          toneMapped={false}
          side={THREE.DoubleSide}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.004} raycast={() => null}>
        <ringGeometry args={[INNER_R - 0.14, INNER_R - 0.13, 96]} />
        <meshBasicMaterial color="#ff5c26" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
