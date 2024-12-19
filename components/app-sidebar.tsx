'use client'

import { Sidebar } from "@/components/ui/sidebar"
import { navItems } from "./nav-items"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ClientOnly } from "./client-only"

function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="fixed left-0 top-0 z-30 hidden h-screen w-48 border-r bg-background lg:block">
      <NavContent pathname={pathname} />
    </Sidebar>
  )
}

function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 h-10 w-10 rounded-full border bg-background shadow-sm lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-48 p-0">
        <NavContent pathname={pathname} />
      </SheetContent>
    </Sheet>
  )
}

function NavContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-lg">AIPG Art</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 px-3 py-2",
                  pathname === item.href && "bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function AppSidebar() {
  const isMobile = useIsMobile()

  return (
    <ClientOnly>
      {isMobile ? <MobileSidebar /> : <DesktopSidebar />}
    </ClientOnly>
  )
}
