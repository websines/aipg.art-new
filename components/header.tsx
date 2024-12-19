'use client'

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { NavContent } from "./nav-content"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-48 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <NavContent pathname={pathname} />
          </SheetContent>
        </Sheet>
        
        <Link href="/" className="flex items-center gap-2 font-bold lg:hidden">
          <span className="text-lg">AIPG Art</span>
        </Link>

        <div className="w-9 lg:hidden" /> {/* Spacer for centering */}
      </div>
    </header>
  )
}
