'use client'

import { cn } from "@/lib/utils"
import { Header } from "./header"
import { useIsMobile } from "@/hooks/use-mobile"
import { ClientOnly } from "./client-only"

interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="relative flex min-h-screen">
      {/* Main content */}
      <main className="flex-1">
        <ClientOnly>
          {isMobile && <Header />}
        </ClientOnly>
        <div className={cn(
          "container mx-auto p-4 lg:p-8",
          isMobile && "pt-20",
          className
        )}>
          {children}
        </div>
      </main>
    </div>
  )
}
