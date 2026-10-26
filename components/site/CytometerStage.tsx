"use client";

import type { ReactNode } from "react";
import WebGLSlot from "@/components/three/WebGLSlot";

const loadCytometer = () => import("@/components/three/CytometerScene").then((m) => ({ default: m.default }));

export default function CytometerStage({ poster }: { poster: ReactNode }) {
  return <WebGLSlot poster={poster} load={loadCytometer} className="aspect-[12/7] w-full [container-type:inline-size]" />;
}
