import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Newmi Care — Expert Women's Healthcare in Gurugram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #BB2026 0%, #8B0000 60%, #111827 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, textAlign: "center", lineHeight: 1.2 }}>
          Newmi Care
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            textAlign: "center",
            opacity: 0.9,
            marginTop: 16,
            maxWidth: 800,
          }}
        >
          India&apos;s Leading Women&apos;s Health Platform
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 300,
            textAlign: "center",
            opacity: 0.7,
            marginTop: 40,
          }}
        >
          PCOS · Fertility · IVF · Pregnancy · Menopause
        </div>
      </div>
    ),
    { ...size },
  );
}
