import { ThemeProvider } from "@/components/theme-provider"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      { children }
    </ThemeProvider>
  )
}