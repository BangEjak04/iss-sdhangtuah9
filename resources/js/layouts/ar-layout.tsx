import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { ARHeader } from "@/components/ar-header";
import { PropsWithChildren } from "react";

export function ARLayout({ children }: PropsWithChildren) {
  return (
    <AppShell>
      <ARHeader />
      <AppContent>{children}</AppContent>
    </AppShell>
  )
}