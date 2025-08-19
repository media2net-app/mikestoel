"use client"

import { Bell, Search, User, Settings, LogOut, X, Package, ShoppingCart, BarChart3, Settings as SettingsIcon, Car, Clock, TrendingUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
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

  // Comprehensive search data
  const searchData = [
    // Products
    {
      id: 1,
      type: 'product',
      category: 'Producten',
      title: 'Vintage Stoel - Eikenhout',
      description: 'Product • Stoelen • €125',
      icon: Package,
      href: '/dashboard/products/1',
      tags: ['stoel', 'vintage', 'eikenhout', 'meubels']
    },
    {
      id: 2,
      type: 'product',
      category: 'Producten',
      title: 'Moderne Tafel - Walnoot',
      description: 'Product • Tafels • €350',
      icon: Package,
      href: '/dashboard/products/2',
      tags: ['tafel', 'modern', 'walnoot', 'meubels']
    },
    {
      id: 3,
      type: 'product',
      category: 'Producten',
      title: 'Design Lamp - Staal',
      description: 'Product • Verlichting • €89',
      icon: Package,
      href: '/dashboard/products/3',
      tags: ['lamp', 'design', 'staal', 'verlichting']
    },
    {
      id: 4,
      type: 'product',
      category: 'Producten',
      title: 'Antieke Spiegel - Goud',
      description: 'Product • Decoratie • €245',
      icon: Package,
      href: '/dashboard/products/4',
      tags: ['spiegel', 'antiek', 'goud', 'decoratie']
    },
    {
      id: 5,
      type: 'product',
      category: 'Producten',
      title: 'Industriële Kruk - Metaal',
      description: 'Product • Stoelen • €75',
      icon: Package,
      href: '/dashboard/products/5',
      tags: ['kruk', 'industrieel', 'metaal', 'stoelen']
    },
    // Cars
    {
      id: 6,
      type: 'car',
      category: 'Auto\'s',
      title: 'BMW 320i - 2019',
      description: 'Auto • BMW • €28,500',
      icon: Car,
      href: '/dashboard/cars/1',
      tags: ['bmw', '320i', '2019', 'sedan', 'benzine']
    },
    {
      id: 7,
      type: 'car',
      category: 'Auto\'s',
      title: 'Audi A4 - 2020',
      description: 'Auto • Audi • €32,000',
      icon: Car,
      href: '/dashboard/cars/2',
      tags: ['audi', 'a4', '2020', 'sedan', 'diesel']
    },
    {
      id: 8,
      type: 'car',
      category: 'Auto\'s',
      title: 'Volkswagen Golf - 2018',
      description: 'Auto • Volkswagen • €18,500',
      icon: Car,
      href: '/dashboard/cars/3',
      tags: ['volkswagen', 'golf', '2018', 'hatchback', 'benzine']
    },
    // Marketplaces
    {
      id: 9,
      type: 'marketplace',
      category: 'Marktplaatsen',
      title: 'Marktplaats',
      description: 'Marktplaats • 18 producten • Verbonden',
      icon: ShoppingCart,
      href: '/dashboard/marketplaces/marktplaats',
      tags: ['marktplaats', 'nederland', 'verbonden']
    },
    {
      id: 10,
      type: 'marketplace',
      category: 'Marktplaatsen',
      title: 'Bol.com',
      description: 'Marktplaats • 12 producten • Verbonden',
      icon: ShoppingCart,
      href: '/dashboard/marketplaces/bol',
      tags: ['bol.com', 'nederland', 'verbonden']
    },
    {
      id: 11,
      type: 'marketplace',
      category: 'Marktplaatsen',
      title: 'eBay',
      description: 'Marktplaats • 15 producten • Verbonden',
      icon: ShoppingCart,
      href: '/dashboard/marketplaces/ebay',
      tags: ['ebay', 'internationaal', 'verbonden']
    },
    // Auto Marketplaces
    {
      id: 12,
      type: 'auto-marketplace',
      category: 'Auto Platforms',
      title: 'AutoScout24',
      description: 'Auto Platform • 42 auto\'s • Verbonden',
      icon: Car,
      href: '/dashboard/marketplaces/autoscout24',
      tags: ['autoscout24', 'auto', 'europa', 'verbonden']
    },
    {
      id: 13,
      type: 'auto-marketplace',
      category: 'Auto Platforms',
      title: 'Mobile.de',
      description: 'Auto Platform • 28 auto\'s • Verbonden',
      icon: Car,
      href: '/dashboard/marketplaces/mobile',
      tags: ['mobile.de', 'auto', 'duitsland', 'verbonden']
    },
    {
      id: 14,
      type: 'auto-marketplace',
      category: 'Auto Platforms',
      title: 'Gaspedaal',
      description: 'Auto Platform • 31 auto\'s • Verbonden',
      icon: Car,
      href: '/dashboard/marketplaces/gaspedaal',
      tags: ['gaspedaal', 'auto', 'nederland', 'verbonden']
    },
    // Pages
    {
      id: 15,
      type: 'page',
      category: 'Pagina\'s',
      title: 'Analytics',
      description: 'Pagina • Verkoop statistieken',
      icon: BarChart3,
      href: '/dashboard/analytics',
      tags: ['analytics', 'statistieken', 'verkopen']
    },
    {
      id: 16,
      type: 'page',
      category: 'Pagina\'s',
      title: 'Instellingen',
      description: 'Pagina • Platform configuratie',
      icon: SettingsIcon,
      href: '/dashboard/settings',
      tags: ['instellingen', 'configuratie', 'platform']
    }
  ]

  // Filter search results with improved matching
  const filteredResults = searchData.filter(item => {
    const query = searchQuery.toLowerCase()
    const titleMatch = item.title.toLowerCase().includes(query)
    const descriptionMatch = item.description.toLowerCase().includes(query)
    const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(query))
    const categoryMatch = item.category.toLowerCase().includes(query)
    
    return titleMatch || descriptionMatch || tagMatch || categoryMatch
  })

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof filteredResults>)

  const handleSearchClick = () => {
    setShowSearchModal(true)
    setSelectedIndex(-1)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const handleSearchResultClick = (href: string) => {
    // Add to recent searches
    if (searchQuery.trim()) {
      const newRecentSearches = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 5)
      setRecentSearches(newRecentSearches)
    }
    
    setShowSearchModal(false)
    setSearchQuery("")
    setSelectedIndex(-1)
    router.push(href)
  }

  const closeSearchModal = () => {
    setShowSearchModal(false)
    setSearchQuery("")
    setSelectedIndex(-1)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = filteredResults.length
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => prev < totalResults - 1 ? prev + 1 : prev)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < totalResults) {
          handleSearchResultClick(filteredResults[selectedIndex].href)
        }
        break
      case 'Escape':
        closeSearchModal()
        break
    }
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        handleSearchClick()
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [])

  // Highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 font-medium">
          {part}
        </span>
      ) : part
    )
  }

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
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] lg:max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200 dark:border-gray-700">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Zoek producten, auto's, marktplaatsen, pagina's..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSelectedIndex(-1)
                }}
                onKeyDown={handleKeyDown}
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
                <div className="p-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Recente Zoekopdrachten
                      </h4>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 flex items-center space-x-3"
                          >
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Snelle Acties
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <button
                        onClick={() => handleSearchResultClick('/dashboard/products/new')}
                        className="p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Plus className="h-4 w-4 text-blue-500" />
                          <Package className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Nieuw Product</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Product toevoegen</p>
                      </button>
                      <button
                        onClick={() => handleSearchResultClick('/dashboard/cars/new')}
                        className="p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Plus className="h-4 w-4 text-green-500" />
                          <Car className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Nieuwe Auto</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Auto toevoegen</p>
                      </button>
                      <button
                        onClick={() => handleSearchResultClick('/dashboard/analytics')}
                        className="p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Analytics</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bekijk statistieken</p>
                      </button>
                      <button
                        onClick={() => handleSearchResultClick('/dashboard/settings')}
                        className="p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <SettingsIcon className="h-4 w-4 text-orange-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Instellingen</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Platform configuratie</p>
                      </button>
                    </div>
                  </div>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Geen resultaten gevonden voor &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Probeer andere zoektermen of bekijk de snelle acties
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {Object.entries(groupedResults).map(([category, results]) => (
                    <div key={category} className="mb-4">
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
                        {category}
                      </h3>
                      {results.map((result) => {
                        const Icon = result.icon
                        const globalIndex = filteredResults.findIndex(r => r.id === result.id)
                        const isSelected = globalIndex === selectedIndex
                        
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleSearchResultClick(result.href)}
                            className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 flex items-center space-x-3 ${
                              isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              <Icon className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {highlightText(result.title, searchQuery)}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {highlightText(result.description, searchQuery)}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigeren</span>
                  <span>↵ Selecteren</span>
                  <span>Esc Sluiten</span>
                </div>
                <span>{filteredResults.length} resultaten</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
