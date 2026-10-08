import { ImageResponse } from "next/og";

export const alt = "InterAcTec — Compare candidates by the cell interactions they create.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#080d15",
          color: "#f4f7f4",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760 }}>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>InterAcTec</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 56, lineHeight: 1.08, letterSpacing: -1.5 }}>
            <span>Compare candidates by the</span>
            <span style={{ color: "#68e4d4" }}>cell interactions</span>
            <span>they create.</span>
          </div>
          <div style={{ fontSize: 22, color: "#b5c0ca" }}>Cell-cell engagement pilot · Nature Methods 2025</div>
        </div>
        <svg width="420" height="420" viewBox="0 0 420 420" style={{ position: "absolute", right: 40, top: 110 }}>
          <circle cx="250" cy="240" r="130" fill="#1a1838" stroke="#a49be8" strokeWidth="3" />
          <circle cx="250" cy="240" r="142" fill="none" stroke="#a49be8" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="4 10" />
          <circle cx="118" cy="128" r="84" fill="#0d2a2d" stroke="#68e4d4" strokeWidth="3" />
        </svg>
      </div>
    ),
    size,
  );
}
