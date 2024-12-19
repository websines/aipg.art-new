'use client'

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Breadcrumb {
  title: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-8">
      {breadcrumbs?.length ? (
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className={cn(
                    "hover:text-foreground",
                    index === breadcrumbs.length - 1 && "text-foreground"
                  )}
                >
                  {breadcrumb.title}
                </Link>
              ) : (
                <span className="text-foreground">{breadcrumb.title}</span>
              )}
            </div>
          ))}
        </nav>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
