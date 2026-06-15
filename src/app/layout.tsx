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
        <Script id="dark-mode-init" strategy="beforeInteractive">{`(function(){try{var d=localStorage.getItem('newmi-dark');if(d==='true')document.documentElement.classList.add('dark')}catch(e){}})()`}</Script>
        <style>{`
          .lp-hero{background:linear-gradient(180deg,#FEF2F2 0%,#F9FAFB 100%)}
          .lp-navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #E5E7EB}
          .lp-section{padding:80px 0}
          .lp-section-alt{background:#FEF2F2}
          .lp-container{max-width:1200px;margin:0 auto;padding:0 24px}
          .lp-title{font-size:2.25rem;font-weight:700;color:#111827;text-align:center;letter-spacing:-0.01em}
          .lp-subtitle{color:#5C6670;text-align:center;max-width:600px;margin:8px auto 40px;font-size:1rem;line-height:1.6}
          .lp-card{background:white;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
          .lp-cta-primary{background:#BB2026;color:white;border-radius:12px;padding:12px 28px;font-weight:600;font-size:0.95rem;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(187,32,38,0.3)}
          .lp-cta-secondary{background:white;color:#BB2026;border:1.5px solid #BB2026;border-radius:12px;padding:12px 28px;font-weight:600;font-size:0.95rem;cursor:pointer}
          .lp-icon-circle{width:48px;height:48px;border-radius:50%;background:#FEF2F2;color:#BB2026;display:flex;align-items:center;justify-content:center;flex-shrink:0}
          @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
          @keyframes fadeInUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
          @media(max-width:768px){.lp-section{padding:48px 0}.lp-title{font-size:1.5rem}.lp-navbar .lp-nav-links{display:none}.lp-mobile-menu-btn{display:flex!important}.lp-hero h1{font-size:2rem!important}}
        `}</style>
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
