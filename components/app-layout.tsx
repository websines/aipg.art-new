'use client'

import { cn } from "@/lib/utils"
import { Header } from "./header"

interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar space */}
      <div className="hidden w-48 shrink-0 lg:block" />
      {/* Main content */}
      <main className="flex-1">
        <Header />
        <div className={cn("container mx-auto p-4 pt-20 lg:p-8 lg:pt-8", className)}>
          {children}
        </div>
      </main>
    </div>
  )
}
