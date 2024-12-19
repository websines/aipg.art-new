'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items"

interface NavContentProps {
  pathname: string
}

export function NavContent({ pathname }: NavContentProps) {
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
