"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main className="min-h-screen lg:pl-64">
          <div className="h-full px-4 py-16 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}