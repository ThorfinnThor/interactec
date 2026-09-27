"use client";

import type { ReactNode } from "react";
import WebGLSlot from "@/components/three/WebGLSlot";

const loadHero = () => import("@/components/three/scenes").then((m) => ({ default: m.HeroScene }));

export default function HeroStage({ poster }: { poster: ReactNode }) {
  return <WebGLSlot poster={poster} load={loadHero} className="story-canvas aspect-square w-full" />;
}
