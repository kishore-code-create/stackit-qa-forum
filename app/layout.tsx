import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/common/navbar"
import { AuthProvider } from "@/components/providers/auth-provider"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "StackIt - Q&A Platform",
  description: "A modern Q&A platform for developers and tech enthusiasts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable}`}>
      <body className="min-h-screen bg-stack-gray font-work-sans">
        <AuthProvider>
          <NotificationProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Toaster />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
