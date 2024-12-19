'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppLayout } from "@/components/app-layout"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <AppLayout>{children}</AppLayout>
      </SidebarProvider>
    </QueryClientProvider>
  )
}