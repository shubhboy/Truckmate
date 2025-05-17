"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Command, UserRoundSearch, CalendarDays, Truck, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Command, label: "Dashboard", href: "/" },
  { icon: UserRoundSearch, label: "Player Info", href: "/playerinfo" },
  { icon: CalendarDays, label: "Events", href: "/events" },
  { icon: Truck, label: "VTC", href: "/vtc" },
]

// NavItems component
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) {

  const pathname = usePathname();
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-slate-900/90 border-r border-slate-700/50 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:col-span-3 lg:col-span-2 md:translate-x-0 md:w-auto md:h-auto md:bg-transparent md:border-none
        `}
      >
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {navItems.map(({ icon, label, href }) => (
                <Link href={href} key={label} passHref legacyBehavior>
                  <a onClick={() => setSidebarOpen(false)}>
                    <NavItem
                      icon={icon}
                      label={label}
                      active={pathname === href}
                    />
                  </a>
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              {/* ...status items or other sidebar content... */}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
 
}