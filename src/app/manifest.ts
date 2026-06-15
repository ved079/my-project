import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Newmi Care — Women's Health Platform",
    short_name: "Newmi Care",
    description:
      "India's trusted women's health platform — book appointments, consult specialists, manage your health journey.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#BB2026",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/newmi/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["health", "medical", "lifestyle"],
    lang: "en-IN",
  };
}
