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
  title: "Newmi Care — Marketing Operations Dashboard",
  description:
    "Marketing operations dashboard for Newmi Care — India's leading women's health platform. Track leads, revenue, channel performance, and team productivity.",
  keywords: [
    "women's health clinic Gurugram",
    "PCOS treatment India",
    "IVF clinic Gurugram",
    "fertility specialist India",
    "pregnancy care Gurugram",
    "menopause treatment",
    "Newmi Care",
    "best gynaecologist Gurugram",
    "women healthcare India",
  ],
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
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Newmi Care — Women's Health Clinic in Gurugram",
    description: "India's leading women's health platform. Expert care for PCOS, IVF, pregnancy, and menopause.",
    url: BASE_URL,
    siteName: "Newmi Care",
    images: [{ url: "/images/newmi/why-section.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newmi Care — Women's Health Clinic in Gurugram",
    description: "India's leading women's health platform. Expert care for PCOS, IVF, pregnancy, and menopause.",
  },
  alternates: {
    canonical: BASE_URL,
  },
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
