"use client"

import { Bell, Search, User, Settings, LogOut, X, Package, ShoppingCart, BarChart3, Settings as SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    // Close the menu first
    setShowUserMenu(false)
    
    // Clear any session data if needed
    // localStorage.removeItem('token') // if using local storage
    // sessionStorage.clear() // if using session storage
    
    // Redirect to login page
    router.push('/')
  }

  const handleSettings = () => {
    setShowUserMenu(false)
    router.push('/dashboard/settings')
  }

  // Mock search data
  const searchData = [
    {
      id: 1,
      type: 'product',
      title: 'Vintage Stoel - Eikenhout',
      description: 'Product • Stoelen • €125',
      icon: Package,
      href: '/dashboard/products/1'
    },
    {
      id: 2,
      type: 'product',
      title: 'Moderne Tafel - Walnoot',
      description: 'Product • Tafels • €350',
      icon: Package,
      href: '/dashboard/products/2'
    },
    {
      id: 3,
      type: 'marketplace',
      title: 'Marktplaats',
      description: 'Marktplaats • 18 producten • Verbonden',
      icon: ShoppingCart,
      href: '/dashboard/marketplaces/marktplaats'
    },
    {
      id: 4,
      type: 'marketplace',
      title: 'Bol.com',
      description: 'Marktplaats • 12 producten • Verbonden',
      icon: ShoppingCart,
      href: '/dashboard/marketplaces/bol'
    },
    {
      id: 5,
      type: 'page',
      title: 'Analytics',
      description: 'Pagina • Verkoop statistieken',
      icon: BarChart3,
      href: '/dashboard/analytics'
    },
    {
      id: 6,
      type: 'page',
      title: 'Instellingen',
      description: 'Pagina • Platform configuratie',
      icon: SettingsIcon,
      href: '/dashboard/settings'
    }
  ]

  // Filter search results
  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchClick = () => {
    setShowSearchModal(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const handleSearchResultClick = (href: string) => {
    setShowSearchModal(false)
    setSearchQuery("")
    router.push(href)
  }

  const closeSearchModal = () => {
    setShowSearchModal(false)
    setSearchQuery("")
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        handleSearchClick()
      }
      
      // Escape to close search modal
      if (event.key === 'Escape' && showSearchModal) {
        closeSearchModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSearchModal])

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MS</span>
          </div>
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
            Mike Stoel Dashboard
          </h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek..."
              className="w-full pl-10 pr-12 lg:pr-20 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm lg:text-base"
              onClick={handleSearchClick}
              readOnly
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:block">Mike Stoel</span>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <button 
                  onClick={handleSettings}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Instellingen</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Uitloggen</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 lg:pt-20">
          {/* Backdrop with 50% opacity */}
          <div 
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeSearchModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] lg:max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200 dark:border-gray-700">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Zoek producten, marktplaatsen, pagina's..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSearchModal}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery.length === 0 ? (
                <div className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Begin met typen om te zoeken...
                  </p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                                         Geen resultaten gevonden voor &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredResults.map((result) => {
                    const Icon = result.icon
                    return (
                      <button
                        key={result.id}
                        onClick={() => handleSearchResultClick(result.href)}
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 flex items-center space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {result.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {searchQuery.length === 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Snelle Acties
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSearchResultClick('/dashboard/products/new')}
                    className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150"
                  >
                    <Package className="h-4 w-4 text-blue-500 mb-1" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Nieuw Product</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Product toevoegen</p>
                  </button>
                  <button
                    onClick={() => handleSearchResultClick('/dashboard/analytics')}
                    className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150"
                  >
                    <BarChart3 className="h-4 w-4 text-green-500 mb-1" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Analytics</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Bekijk statistieken</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
