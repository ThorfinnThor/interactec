import HeroStage from "./HeroStage";
import MotionToggle from "./MotionToggle";
import { CellDefs, ContactZone, EffectorCell, TargetCell, touching, type CellSpec } from "./cells";

const ID = "hero";
const TGT: CellSpec = { cx: 372, cy: 356, r: 168, seed: 21 };
const EFF = touching(TGT, 108, 218, 34, 5);

/** Contact point roughly on the line between centres, used for the annotation. */
const a = (218 * Math.PI) / 180;
const CONTACT = { x: TGT.cx + Math.cos(a) * (TGT.r - 16), y: TGT.cy + Math.sin(a) * (TGT.r - 16) };

export default function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[640px]">
      <HeroStage poster={<HeroPoster />} />
      <figcaption className="mt-2 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
        <MotionToggle />
        <span className="ml-auto">Schematic visualization</span>
      </figcaption>
    </figure>
  );
}

function HeroPoster() {
  return (
      <svg
        viewBox="0 0 640 640"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="hero-visual-title"
      >
        <title id="hero-visual-title">
          Schematic: an effector cell (teal, dotted membrane) in contact with a larger target cell (violet, dashed
          envelope). The contact zone between them is highlighted with a hatched lens.
        </title>
        <defs>
          <CellDefs id={ID} />
          <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#68E4D4" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#68E4D4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* instrument reticle — sparse orientation, not decoration */}
        <g stroke="#F4F7F4" strokeOpacity="0.09" fill="none">
          <circle cx="320" cy="320" r="300" />
          <circle cx="320" cy="320" r="226" strokeDasharray="1 7" />
          <line x1="320" y1="0" x2="320" y2="40" />
          <line x1="320" y1="600" x2="320" y2="640" />
          <line x1="0" y1="320" x2="40" y2="320" />
          <line x1="600" y1="320" x2="640" y2="320" />
        </g>
        <circle cx={CONTACT.x} cy={CONTACT.y} r="150" fill="url(#hero-halo)" />

        <TargetCell id={ID} c={TGT} />
        <EffectorCell id={ID} c={EFF} />
        <ContactZone id={ID} eff={EFF} tgt={TGT} />

        {/* annotations */}
        <g fontFamily="var(--font-plex-mono), ui-monospace, monospace" fontSize="12" letterSpacing="0.08em">
          <line
            x1={CONTACT.x + 6}
            y1={CONTACT.y - 6}
            x2={CONTACT.x + 96}
            y2={CONTACT.y - 96}
            stroke="#F4F7F4"
            strokeOpacity="0.6"
          />
          <circle cx={CONTACT.x} cy={CONTACT.y} r="4" fill="none" stroke="#F4F7F4" />
          <text x={CONTACT.x + 102} y={CONTACT.y - 100} fill="#F4F7F4">
            CONTACT ZONE
          </text>

          <line x1={EFF.cx - 40} y1={EFF.cy - EFF.r - 8} x2={EFF.cx - 40} y2={EFF.cy - EFF.r - 40} stroke="#68E4D4" strokeOpacity="0.7" />
          <text x={EFF.cx - 40} y={EFF.cy - EFF.r - 48} fill="#68E4D4" textAnchor="middle">
            EFFECTOR
          </text>

          <line x1={TGT.cx + 120} y1={TGT.cy + TGT.r - 30} x2={TGT.cx + 150} y2={TGT.cy + TGT.r + 10} stroke="#A49BE8" strokeOpacity="0.7" />
          <text x={TGT.cx + 150} y={TGT.cy + TGT.r + 28} fill="#A49BE8" textAnchor="middle">
            TARGET
          </text>
        </g>
      </svg>
  );
}
