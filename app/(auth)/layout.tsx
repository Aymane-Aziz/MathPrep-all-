import type React from "react"
import { MathSidebar } from "@/components/math-sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <MathSidebar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
