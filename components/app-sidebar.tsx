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
    <Sidebar className="fixed top-0 left-0 z-40 hidden h-screen border-r lg:block">
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
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <NavContent pathname={pathname} />
      </SheetContent>
    </Sheet>
  )
}

function NavContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[60px] items-center px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">AIPG Art</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href && "bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
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
