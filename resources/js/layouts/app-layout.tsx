import { AppContent } from "@/components/app-content";
import { AppHeader } from "@/components/app-header";
import { AppShell } from "@/components/app-shell";
import { type BreadcrumbItem } from "@/types";
import { PropsWithChildren } from "react";

export function AppLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  )
}