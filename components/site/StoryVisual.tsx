import type { CSSProperties } from "react";
import { scatter, normal } from "@/lib/blob";
import { CellDefs, ContactZone, EffectorCell, TargetCell, touching, type CellSpec } from "./cells";

/**
 * One scene, four states. The same graphic objects carry the story:
 * the engaged pair shrinks into the double-positive quadrant (state 2), and the
 * interacting events re-order into comparable columns (state 3).
 *
 * Renders statically for any `step`; transitions are pure CSS and are disabled
 * under prefers-reduced-motion (see globals.css `.story-anim`).
 */

export const STORY_STEPS = ["Encounter", "Engage", "Read out", "Compare"] as const;

const TGT: CellSpec = { cx: 330, cy: 320, r: 120, seed: 21 };
const EFF = touching(TGT, 78, 215, 26, 5);
const EFF_APART = { dx: -44, dy: -32 };

// field cells (context in "Encounter")
const FIELD = scatter(16, 7, (rand, i) => {
  const ring = 190 + rand() * 90;
  const t = (i / 16) * Math.PI * 2 + rand() * 0.3;
  return [300 + Math.cos(t) * ring, 300 + Math.sin(t) * ring * 0.9];
}).map((p, i) => ({ ...p, kind: i % 3 === 0 ? "tgt" : "eff", seed: 100 + i }));

// plot geometry (state 2)
const PLOT = { x0: 110, y0: 490, x1: 510, y1: 110 };
const Q = { x: 400, y: 200 }; // double-positive quadrant centre

const EFF_SINGLETS = scatter(46, 11, (rand) => [normal(rand, 400, 36), normal(rand, 430, 22)]);
const TGT_SINGLETS = scatter(40, 13, (rand) => [normal(rand, 180, 24), normal(rand, 210, 34)]);

// interacting events: position in the quadrant (state 2) and in comparison columns (state 3)
const CONDITIONS = ["Control", "A", "B", "C"];
const LEVELS = [0.18, 0.52, 0.86, 0.38]; // illustrative only
const COL_X = [170, 270, 370, 470];
const BASE_Y = 470;
const TOP_Y = 150;
const EVENTS = scatter(24, 17, (rand) => [normal(rand, Q.x, 28), normal(rand, Q.y, 24)]).map((p, i) => {
  const col = i % 4;
  const rep = Math.floor(i / 4);
  const jitter = [0.04, -0.05, 0.015, -0.02, 0.06, -0.035][rep];
  const level = LEVELS[col] + jitter;
  return {
    q: p,
    c: { x: COL_X[col] + (rep - 2.5) * 9, y: BASE_Y - level * (BASE_Y - TOP_Y) },
  };
});

const fade = (on: boolean, delay = 0): CSSProperties => ({
  opacity: on ? 1 : 0,
  transitionDelay: on ? `${delay}ms` : "0ms",
});

export default function StoryVisual({ step, idPrefix = "story" }: { step: number; idPrefix?: string }) {
  const id = idPrefix;
  const pairTransform =
    step === 0
      ? "translate(10px, 10px) scale(0.55)"
      : step === 1
        ? "translate(0px, 0px) scale(1)"
        : "translate(100px, -100px) scale(0.16)";
  const effTransform = step === 0 ? `translate(${EFF_APART.dx}px, ${EFF_APART.dy}px)` : "translate(0px, 0px)";

  return (
    <svg viewBox="0 0 600 600" className="h-auto w-full" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{DESCRIPTIONS[step]}</title>
      <defs>
        <CellDefs id={id} />
      </defs>

      {/* field of cells — context in Encounter */}
      <g className="story-anim" style={{ opacity: step === 0 ? 1 : step === 1 ? 0.12 : 0 }}>
        {FIELD.map((f, i) =>
          f.kind === "eff" ? (
            <EffectorCell key={i} id={id} c={{ cx: f.x, cy: f.y, r: 20, seed: f.seed }} detail={false} />
          ) : (
            <TargetCell key={i} id={id} c={{ cx: f.x, cy: f.y, r: 30, seed: f.seed }} detail={false} />
          ),
        )}
      </g>

      {/* "proximity only" pair, shown in Engage as a contrast */}
      <g className="story-anim" style={fade(step === 1, 250)}>
        <EffectorCell id={id} c={{ cx: 478, cy: 92, r: 26, seed: 41 }} detail={false} />
        <TargetCell id={id} c={{ cx: 536, cy: 128, r: 34, seed: 43 }} detail={false} />
        <text x="508" y="190" className="story-label" textAnchor="middle" fill="#B5C0CA">
          PROXIMITY ONLY
        </text>
      </g>

      {/* the focal pair */}
      <g className="story-anim" style={{ transform: pairTransform, transformOrigin: "300px 300px", opacity: step === 3 ? 0 : 1 }}>
        <TargetCell id={id} c={TGT} />
        <g className="story-anim" style={{ transform: effTransform }}>
          <EffectorCell id={id} c={EFF} />
        </g>
        <g className="story-anim" style={fade(step === 1, 350)}>
          <ContactZone id={id} eff={EFF} tgt={TGT} />
        </g>
      </g>
      <g className="story-anim" style={fade(step === 1, 450)}>
        <line x1="232" y1="262" x2="120" y2="470" stroke="#F4F7F4" strokeOpacity="0.55" />
        <text x="120" y="492" className="story-label" textAnchor="middle" fill="#F4F7F4">
          ENGAGED · CONTACT ZONE
        </text>
      </g>

      {/* read-out plot */}
      <g className="story-anim" style={fade(step === 2, 250)}>
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} stroke="#F4F7F4" strokeOpacity="0.5" />
        <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1} stroke="#F4F7F4" strokeOpacity="0.5" />
        <line x1="300" y1={PLOT.y0} x2="300" y2={PLOT.y1} stroke="#F4F7F4" strokeOpacity="0.14" strokeDasharray="3 5" />
        <line x1={PLOT.x0} y1="320" x2={PLOT.x1} y2="320" stroke="#F4F7F4" strokeOpacity="0.14" strokeDasharray="3 5" />
        <text x={PLOT.x1} y={PLOT.y0 + 26} className="story-label" textAnchor="end" fill="#68E4D4">
          EFFECTOR MARKER →
        </text>
        <text
          x={PLOT.x0 - 16}
          y={PLOT.y1}
          className="story-label"
          textAnchor="end"
          fill="#A49BE8"
          transform={`rotate(-90 ${PLOT.x0 - 16} ${PLOT.y1})`}
        >
          TARGET MARKER →
        </text>
        {EFF_SINGLETS.map((p, i) => (
          <circle key={`e${i}`} cx={p.x} cy={p.y} r="2.6" fill="#68E4D4" opacity="0.55" />
        ))}
        {TGT_SINGLETS.map((p, i) => (
          <rect key={`t${i}`} x={p.x - 2.4} y={p.y - 2.4} width="4.8" height="4.8" fill="#A49BE8" opacity="0.55" />
        ))}
        <text x="512" y="124" className="story-label" textAnchor="end" fill="#F4F7F4">
          BOTH MARKERS · ONE EVENT
        </text>
      </g>

      {/* comparison frame */}
      <g className="story-anim" style={fade(step === 3, 250)}>
        <text x="110" y="92" className="story-label" fill="#F4F7F4">
          INTERACTION FREQUENCY BY CONDITION
        </text>
        <text x="110" y="112" className="story-label" fill="#F4F7F4" fontWeight="500">
          ILLUSTRATIVE DATA — NOT EXPERIMENTAL RESULTS
        </text>
        <line x1="120" y1={BASE_Y + 10} x2="520" y2={BASE_Y + 10} stroke="#F4F7F4" strokeOpacity="0.5" />
        <line x1="120" y1={BASE_Y + 10} x2="120" y2={TOP_Y - 10} stroke="#F4F7F4" strokeOpacity="0.5" />
        <text x="112" y={TOP_Y} className="story-label" textAnchor="end" fill="#B5C0CA">
          HIGH
        </text>
        <text x="112" y={BASE_Y} className="story-label" textAnchor="end" fill="#B5C0CA">
          LOW
        </text>
        {CONDITIONS.map((c, i) => {
          const y = BASE_Y - LEVELS[i] * (BASE_Y - TOP_Y);
          return (
            <g key={c}>
              <line x1={COL_X[i] - 30} x2={COL_X[i] + 30} y1={y} y2={y} stroke="#F4F7F4" strokeWidth="1.5" />
              <text x={COL_X[i]} y={BASE_Y + 34} className="story-label" textAnchor="middle" fill="#F4F7F4">
                {c === "Control" ? "CONTROL" : `CAND. ${c}`}
              </text>
            </g>
          );
        })}
      </g>

      {/* interacting events — the objects that travel from quadrant to columns */}
      <g>
        {EVENTS.map((e, i) => {
          const pos = step === 3 ? e.c : e.q;
          const visible = step >= 2;
          return (
            <g
              key={i}
              className="story-anim"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: visible ? 1 : 0,
                transitionDelay: visible ? `${step === 2 ? 300 + i * 12 : i * 14}ms` : "0ms",
              }}
            >
              <circle r="5.5" fill="#A49BE8" />
              <circle r="5.5" fill="none" stroke="#68E4D4" strokeWidth="2" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

const DESCRIPTIONS = [
  "Schematic: a field of effector cells (teal) and target cells (violet); one effector–target pair in the centre is about to meet.",
  "Schematic: the central pair is in contact and the contact zone is highlighted, while a second pair elsewhere is merely adjacent without a contact zone.",
  "Schematic: the engaged pair becomes a single event in a two-marker plot. Effector-only and target-only events lie along the axes; interacting events carry both markers.",
  "Illustrative chart, not experimental results: interacting-event frequencies arranged in columns for a control and three candidates.",
];
