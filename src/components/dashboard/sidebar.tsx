"use client"

import { 
  Home, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  ExternalLink,
  Plus,
  List,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Producten",
    href: "/dashboard/products",
    icon: Package,
    children: [
      { name: "Alle Producten", href: "/dashboard/products", icon: List },
      { name: "Nieuw Product", href: "/dashboard/products/new", icon: Plus },
    ]
  },
  {
    name: "Marktplaatsen",
    href: "/dashboard/marketplaces",
    icon: ShoppingCart,
    children: [
      { name: "Marktplaats", href: "/dashboard/marketplaces/marktplaats", icon: ExternalLink },
      { name: "Bol.com", href: "/dashboard/marketplaces/bol", icon: ExternalLink },
      { name: "eBay", href: "/dashboard/marketplaces/ebay", icon: ExternalLink },
      { name: "Amazon", href: "/dashboard/marketplaces/amazon", icon: ExternalLink },
    ]
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Instellingen",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MS</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Mike Stoel
          </span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.children && item.children.some(child => pathname === child.href))
            const isParentActive = item.children && item.children.some(child => pathname === child.href)
            const Icon = item.icon

            return (
              <div key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''}`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>

                {/* Submenu */}
                {item.children && (isActive || isParentActive) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      const isChildActive = pathname === child.href

                      return (
                        <Link key={child.name} href={child.href}>
                          <Button
                            variant={isChildActive ? "secondary" : "ghost"}
                            size="sm"
                            className={`w-full justify-start ${isChildActive ? 'bg-blue-50 dark:bg-blue-800 text-blue-600 dark:text-blue-200' : ''}`}
                          >
                            <ChildIcon className="h-3 w-3 mr-2" />
                            {child.name}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Snelle Statistieken
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Actieve Producten</span>
              <span className="font-medium text-gray-900 dark:text-white">9</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Verkocht Vandaag</span>
              <span className="font-medium text-green-600 dark:text-green-400">4</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Omzet Deze Week</span>
              <span className="font-medium text-gray-900 dark:text-white">€3,240</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Gem. Marge</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">36.2%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}
