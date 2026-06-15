import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Newmi Care — Women's Health Clinic in Gurugram",
    short_name: "Newmi Care",
    description:
      "India's leading women's health platform. Expert care for PCOS, IVF, pregnancy, and menopause.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#BB2026",
    icons: [
      { src: "/images/newmi/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/images/newmi/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/images/newmi/why-section.png", sizes: "1200x630", type: "image/png" },
    ],
  };
}
