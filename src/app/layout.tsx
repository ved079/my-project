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
    icon: "/logo.svg",
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
        <Script id="dark-mode-init" strategy="beforeInteractive">{`(function(){try{var d=localStorage.getItem('newmi-dark');if(d==='true')document.documentElement.classList.add('dark')}catch(e){}})()`}</Script>
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
