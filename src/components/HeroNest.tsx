"use client";

import { useEffect, useState } from "react";

/**
 * A woven nest drawn as loose pen strokes: the home page's one illustration.
 * Strokes are generated deterministically (no Math.random) so the server and
 * the browser render the same SVG.
 */

const INK = "#1E2944";
const PEN = "#2D47A8";
const ROSE = "#B84F68";

/** Stable pseudo-random number in [0, 1) for a given seed. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Part of a rotated ellipse, sampled into a smooth polyline path. */
function arc(cx: number, cy: number, rx: number, ry: number, rotDeg: number, fromDeg: number, toDeg: number) {
  const rot = (rotDeg * Math.PI) / 180;
  const steps = 36;
  let d = "";
  for (let s = 0; s <= steps; s++) {
    const a = ((fromDeg + ((toDeg - fromDeg) * s) / steps) * Math.PI) / 180;
    const x = rx * Math.cos(a);
    const y = ry * Math.sin(a);
    const px = cx + x * Math.cos(rot) - y * Math.sin(rot);
    const py = cy + x * Math.sin(rot) + y * Math.cos(rot);
    d += `${s === 0 ? "M" : "L"}${r1(px)} ${r1(py)}`;
  }
  return d;
}

type Stroke = { d: string; color: string; width: number; opacity: number; delay: number };

function buildStrokes(): Stroke[] {
  const strokes: Stroke[] = [];
  // The bowl: short twig-like arcs of different lengths, tilted and offset so
  // they cross each other instead of stacking into neat hoops.
  const BOWL = 44;
  for (let i = 0; i < BOWL; i++) {
    const depth = rand(i + 3); // 0 = near the rim, 1 = bottom of the bowl
    const rx = 120 + rand(i + 1) * 70;
    const ry = 70 + depth * 70;
    const rot = (rand(i + 13) - 0.5) * 48;
    const start = -20 + rand(i + 19) * 110; // each twig covers only part of the curve
    const span = 70 + rand(i + 23) * 110;
    const color = i % 11 === 5 ? ROSE : i % 6 === 2 ? PEN : INK;
    strokes.push({
      d: arc(210 + (rand(i + 31) - 0.5) * 34, 118 + rand(i + 29) * 22, rx, ry, rot, start, Math.min(start + span, 205)),
      color,
      width: 1 + rand(i + 37) * 1.1,
      opacity: color === INK ? 0.4 + depth * 0.3 : 0.8,
      delay: i * 32,
    });
  }
  // The rim: flatter arcs across the top that close the hollow.
  for (let i = 0; i < 8; i++) {
    strokes.push({
      d: arc(210 + (rand(i + 53) - 0.5) * 20, 122, 150 + rand(i + 41) * 40, 18 + rand(i + 43) * 16, (rand(i + 47) - 0.5) * 16, 180 + rand(i + 59) * 20, 340 + rand(i + 61) * 22),
      color: INK,
      width: 1,
      opacity: 0.3,
      delay: 1300 + i * 55,
    });
  }
  // Loose twigs poking out past the rim on both sides.
  const twigs: [number, number, number, number][] = [
    [44, 112, 8, 82], [62, 128, 18, 96], [368, 104, 414, 74], [352, 126, 404, 108], [88, 96, 40, 60], [330, 92, 380, 52],
  ];
  twigs.forEach(([x1, y1, x2, y2], i) => {
    const mx = (x1 + x2) / 2 + (rand(i + 71) - 0.5) * 14;
    const my = (y1 + y2) / 2 - 6;
    strokes.push({
      d: `M${x1} ${y1}Q${r1(mx)} ${r1(my)} ${x2} ${y2}`,
      color: INK,
      width: 1.2,
      opacity: 0.45,
      delay: 1700 + i * 70,
    });
  });
  return strokes;
}

export default function HeroNest({ className = "" }: { className?: string }) {
  // Floating-point trig can differ by a last digit between the build machine
  // and a browser, which would break hydration. The drawing is decorative, so
  // it is generated in the browser only; the empty SVG keeps its space.
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  useEffect(() => setStrokes(buildStrokes()), []);

  return (
    <svg aria-hidden viewBox="0 0 420 300" fill="none" className={className}>
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          stroke={s.color}
          strokeWidth={s.width}
          strokeOpacity={s.opacity}
          strokeLinecap="round"
          className="nest-stroke"
          style={{ animationDelay: `${s.delay}ms` }}
        />
      ))}
    </svg>
  );
}
