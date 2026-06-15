import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = "https://newmi.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#BB2026",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Newmi Care — India's Trusted Women's Health Platform",
    template: "%s | Newmi Care",
  },
  description:
    "India's leading women's health platform. Expert gynecologists for PCOS, fertility, pregnancy, and menopause care in Gurugram. Book your consultation today.",
  keywords: [
    "women's health",
    "gynecology",
    "fertility clinic",
    "PCOS treatment",
    "pregnancy care",
    "menopause support",
    "gynecologist gurgaon",
    "Newmi Care",
    "best gynecologist gurgaon",
    "fertility specialist gurgaon",
    "PCOS doctor gurgaon",
    "obstetrician gurgaon",
    "reproductive health india",
  ],
  authors: [{ name: "Newmi Care", url: BASE_URL }],
  creator: "Newmi Care",
  publisher: "Newmi Care",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/newmi/favicon.ico",
    shortcut: "/images/newmi/favicon-32.png",
    apple: "/images/newmi/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Newmi Care",
    title: "Newmi Care — India's Trusted Women's Health Platform",
    description:
      "Expert gynecology, fertility, PCOS management, pregnancy care & menopause support. Book appointments at our Gurugram clinics. Call +91-8929345355.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Newmi Care — Women's Health Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newmi Care — India's Trusted Women's Health Platform",
    description:
      "Expert gynecology, fertility, PCOS management, pregnancy care & menopause support in Gurugram.",
    images: ["/opengraph-image"],
    site: "@newmicare",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="dark-mode-init" strategy="beforeInteractive">{`(function(){try{var d=localStorage.getItem('newmi-dark');if(d==='true')document.documentElement.classList.add('dark')}catch(e){}})()`}</Script>
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
