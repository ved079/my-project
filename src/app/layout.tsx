import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Newmi Care — Marketing Operations Dashboard",
  description:
    "Marketing operations dashboard for Newmi Care — India's leading women's health platform. Track leads, revenue, channel performance, and team productivity.",
  icons: {
    icon: "/images/newmi/favicon.ico",
    shortcut: "/images/newmi/favicon-32.png",
  },
  openGraph: {
    title: "Newmi Care — Women's Health Clinic in Gurugram",
    description: "India's leading women's health platform. Expert care for PCOS, IVF, pregnancy, and menopause.",
    url: "https://www.newmicare.com",
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
  metadataBase: new URL("https://www.newmicare.com"),
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
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
