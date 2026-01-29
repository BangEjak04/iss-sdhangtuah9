import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { HomeIcon, InfoIcon, LibraryIcon, MenuIcon, SchoolIcon } from "lucide-react"
import AppLogo from "./app-logo"
import AppLogoIcon from "./app-logo-icon"
import { Link } from "@inertiajs/react"
import { about, home } from "@/routes"
import { type BreadcrumbItem, type NavItem } from "@/types"
import { useInitials } from "@/hooks/use-initials"
import { Breadcrumbs } from "./breadcrumbs"
import library from "@/routes/library"

const navItems: NavItem[] = [
  {
    title: "Home",
    description: "Latest announcements and activities",
    href: home(),
    icon: HomeIcon,
  },
  {
    title: "About Us",
    description: "Our school's profile and history",
    href: about(),
    icon: SchoolIcon,
  },
  {
    title: "Library",
    description: "Digital resources and book catalogs",
    href: library.index(),
    icon: LibraryIcon,
  },
]

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const getInitials = useInitials()
  return (
    <header className="sticky top-0 z-40 transform">
      <div className="relative z-40 border-default border-b backdrop-blur-sm transition-opacity">
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
            <div className="flex items-center">
              <div className="flex items-center shrink-0">
                <Link href={home()}>
                  <AppLogo />
                </Link>
              </div>
              <NavigationMenu className="pl-8">
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-2 animate-fade-in scale-100! delay-300">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-10 rounded-full p-1">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                      <AvatarImage src="" />
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials("Reza")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  {/* <UserMenuContent user={auth.user} /> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className="inset-y-0 flex mr-2 items-center px-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader>
                  <div className="flex">
                    <AppLogoIcon className="h-10" />
                  </div>
                </SheetHeader>
                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                  <div className="flex h-full flex-col justify-between text-sm">
                    <div className="flex flex-col">
                      {navItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group/menu-item flex text-foreground text-sm hover:text-foreground select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter focus-visible:text-foreground items-center"
                        >
                          {item.icon && (
                            <div className="shrink-0 border bg-muted min-w-10 w-10 h-10 flex items-center justify-center rounded-lg">
                              <item.icon className="h-5 w-5" />
                            </div>
                          )}
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-foreground">{item.title}</p>
                            </div>
                            <p className="line-clamp-2 leading-snug text-foreground-lighter group-hover/menu-item:text-foreground-light group-focus-visible/menu-item:text-foreground-light text-xs">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* End Mobile Menu */}
        </div>
        {breadcrumbs.length > 1 && (
          <div className="flex w-full border-b border-sidebar-border/70">
            <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}