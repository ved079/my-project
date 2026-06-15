import { LandingPage } from "@/components/pages/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newmi Care — Expert Women's Healthcare in Gurugram",
  description:
    "Book appointments with top gynecologists, fertility specialists, and PCOS experts at Newmi Care. Clinics in Sector 69 & Sector 57, Gurugram.",
  alternates: {
    canonical: "https://newmi.in",
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
