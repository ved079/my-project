import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Newmi Care",
  robots: { index: true, follow: true },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
