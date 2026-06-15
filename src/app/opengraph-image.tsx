import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Newmi Care — India's Trusted Women's Health Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #BB2026 0%, #8B0000 50%, #1F2937 100%)",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 40 }}>
          Newmi Care
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", marginBottom: 16 }}>
          India&apos;s Trusted Women&apos;s Health Platform
        </div>
        <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
          Gynecology • Fertility • PCOS • Pregnancy • Menopause
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 24 }}>
          Sector 69 & Sector 57, Gurugram | +91-8929345355
        </div>
      </div>
    ),
    { ...size },
  );
}
