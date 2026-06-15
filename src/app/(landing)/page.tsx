import { LandingPage } from "@/components/pages/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newmi Care — Expert Women's Healthcare in Gurugram",
  description:
    "India's leading women's health platform. Expert care for PCOS, PCOD, fertility, IVF, pregnancy, and menopause. Book a consultation with top specialists in Gurugram.",
  openGraph: {
    title: "Newmi Care — Expert Women's Healthcare in Gurugram",
    description:
      "India's leading women's health platform. Expert PCOS, fertility, IVF, pregnancy & menopause care.",
    url: "https://newmi.in",
    siteName: "Newmi Care",
    images: [{ url: "/images/newmi/why-section.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newmi Care — Expert Women's Healthcare in Gurugram",
    description:
      "India's leading women's health platform. Expert PCOS, fertility, IVF, pregnancy & menopause care.",
  },
};

export default function Landing() {
  return (
    <>
      <LandingPage />
      <JsonLd />
    </>
  );
}
