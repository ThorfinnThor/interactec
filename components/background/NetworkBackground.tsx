import React from "react";

type Props = {
  className?: string;
};

export default function NetworkBackground({ className }: Props) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className ?? "",
      ].join(" ")}
      aria-hidden="true"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[1.0]"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="white" stopOpacity="0.65" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fade">
            <rect width="1200" height="900" fill="url(#fadeMask)" />
          </mask>

          <radialGradient id="membrane" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgb(56 189 248)" stopOpacity="0.22" />
            <stop offset="0.55" stopColor="rgb(99 102 241)" stopOpacity="0.14" />
            <stop offset="1" stopColor="rgb(99 102 241)" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cellFill" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="rgb(15 23 42)" stopOpacity="0.24" />
            <stop offset="1" stopColor="rgb(15 23 42)" stopOpacity="0.06" />
          </radialGradient>

          <radialGradient id="nucleus" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="rgb(15 23 42)" stopOpacity="0.38" />
            <stop offset="1" stopColor="rgb(15 23 42)" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bridge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgb(15 23 42)" stopOpacity="0.30" />
            <stop offset="1" stopColor="rgb(15 23 42)" stopOpacity="0.10" />
          </linearGradient>

          <filter id="softBlur" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter id="tinyBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <g mask="url(#fade)">
          {/* membranes (cluster halos) */}
          <circle cx="260" cy="210" r="210" fill="url(#membrane)" filter="url(#softBlur)" />
          <circle cx="870" cy="220" r="230" fill="url(#membrane)" filter="url(#softBlur)" />
          <circle cx="520" cy="520" r="260" fill="url(#membrane)" filter="url(#softBlur)" />
          <circle cx="1020" cy="560" r="210" fill="url(#membrane)" filter="url(#softBlur)" />

          {/* short interaction bridges */}
          <path
            d="M360 215 C 420 245, 470 260, 520 275"
            fill="none"
            stroke="url(#bridge)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M690 265 C 740 250, 780 240, 825 225"
            fill="none"
            stroke="url(#bridge)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M620 480 C 690 485, 760 510, 820 545"
            fill="none"
            stroke="url(#bridge)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M900 520 C 940 505, 980 495, 1030 505"
            fill="none"
            stroke="url(#bridge)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* synapse dots */}
          {[
            [420, 242],
            [475, 263],
            [760, 242],
            [700, 492],
            [985, 498],
          ].map(([x, y], i) => (
            <circle key={`s-${i}`} cx={x} cy={y} r="3.2" fill="rgb(15 23 42)" fillOpacity="0.22" />
          ))}

          {/* cells */}
          <Cell x={200} y={170} r={44} />
          <Cell x={270} y={150} r={34} />
          <Cell x={315} y={215} r={40} />
          <Cell x={230} y={250} r={36} />
          <Cell x={170} y={235} r={28} />

          <Cell x={820} y={160} r={46} />
          <Cell x={900} y={145} r={30} />
          <Cell x={940} y={215} r={42} />
          <Cell x={860} y={235} r={34} />
          <Cell x={760} y={225} r={28} />

          <Cell x={470} y={500} r={52} />
          <Cell x={545} y={470} r={34} />
          <Cell x={600} y={535} r={40} />
          <Cell x={510} y={565} r={36} />
          <Cell x={410} y={545} r={30} />
          <Cell x={585} y={600} r={28} />

          <Cell x={980} y={540} r={50} />
          <Cell x={1045} y={520} r={30} />
          <Cell x={1090} y={585} r={38} />
          <Cell x={1015} y={610} r={32} />
          <Cell x={930} y={600} r={28} />
        </g>
      </svg>

      {/* gentle extra color air */}
      <div className="absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-sky-200/24 blur-3xl" />
      <div className="absolute top-28 left-1/3 h-[22rem] w-[44rem] -translate-x-1/2 rounded-full bg-indigo-200/16 blur-3xl" />
    </div>
  );
}

function Cell({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r + 10}
        fill="none"
        stroke="rgb(56 189 248)"
        strokeOpacity="0.14"
        strokeWidth="1.6"
      />
      <circle cx={x} cy={y} r={r + 18} fill="url(#membrane)" filter="url(#tinyBlur)" />
      <circle cx={x} cy={y} r={r} fill="url(#cellFill)" />
      <circle cx={x - r * 0.18} cy={y - r * 0.18} r={r * 0.45} fill="url(#nucleus)" />
      <circle
        cx={x - r * 0.35}
        cy={y - r * 0.35}
        r={Math.max(3, r * 0.16)}
        fill="white"
        fillOpacity="0.20"
      />
    </g>
  );
}
