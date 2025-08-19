"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Eye,
  ShoppingCart,
  Package,
  TrendingUp,
  Euro,
  X,
  Calendar,
  Tag,
  BarChart3,
  ChevronDown,
  Check
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Vintage Stoel - Eikenhout",
    price: 125,
    purchasePrice: 85,
    status: "active",
    category: "Stoelen",
    stock: 3,
    views: 45,
    sales: 2,
    image: "/api/placeholder/300/300?text=Vintage+Stoel",
    marketplaces: ["Marktplaats", "Bol.com", "eBay"]
  },
  {
    id: 2,
    name: "Moderne Tafel - Walnoot",
    price: 350,
    purchasePrice: 220,
    status: "active",
    category: "Tafels",
    stock: 1,
    views: 23,
    sales: 1,
    image: "/api/placeholder/300/300?text=Moderne+Tafel",
    marketplaces: ["Marktplaats", "Bol.com"]
  },
  {
    id: 3,
    name: "Antieke Kast - Mahonie",
    price: 750,
    purchasePrice: 450,
    status: "pending",
    category: "Kasten",
    stock: 1,
    views: 12,
    sales: 0,
    image: "/api/placeholder/300/300?text=Antieke+Kast",
    marketplaces: ["Marktplaats"]
  },
  {
    id: 4,
    name: "Design Lamp - Messing",
    price: 89,
    purchasePrice: 55,
    status: "active",
    category: "Verlichting",
    stock: 5,
    views: 67,
    sales: 3,
    image: "/api/placeholder/300/300?text=Design+Lamp",
    marketplaces: ["Marktplaats", "Bol.com", "eBay", "Amazon"]
  },
  {
    id: 5,
    name: "Vintage Spiegel - Goud",
    price: 180,
    purchasePrice: 120,
    status: "active",
    category: "Decoratie",
    stock: 2,
    views: 34,
    sales: 1,
    image: "/api/placeholder/300/300?text=Vintage+Spiegel",
    marketplaces: ["Marktplaats", "Bol.com"]
  },
  {
    id: 6,
    name: "Eetkamerstoel - Beukenhout",
    price: 95,
    purchasePrice: 65,
    status: "active",
    category: "Stoelen",
    stock: 4,
    views: 28,
    sales: 1,
    image: "/api/placeholder/300/300?text=Eetkamerstoel",
    marketplaces: ["Marktplaats", "Bol.com"]
  },
  {
    id: 7,
    name: "Koffietafel - Glas & Staal",
    price: 220,
    purchasePrice: 140,
    status: "active",
    category: "Tafels",
    stock: 2,
    views: 41,
    sales: 2,
    image: "/api/placeholder/300/300?text=Koffietafel",
    marketplaces: ["Marktplaats", "Bol.com"]
  },
  {
    id: 8,
    name: "Boekenkast - Wit",
    price: 320,
    purchasePrice: 200,
    status: "active",
    category: "Kasten",
    stock: 3,
    views: 19,
    sales: 1,
    image: "/api/placeholder/300/300?text=Boekenkast",
  },
  {
    id: 9,
    name: "Hanglamp - Industrieel",
    price: 145,
    purchasePrice: 90,
    status: "active",
    category: "Verlichting",
    stock: 6,
    views: 52,
    sales: 3,
    image: "/api/placeholder/300/300?text=Hanglamp",
  },
  {
    id: 10,
    name: "Wanddecoratie - Canvas",
    price: 75,
    purchasePrice: 45,
    status: "active",
    category: "Decoratie",
    stock: 8,
    views: 38,
    sales: 2,
    image: "/api/placeholder/300/300?text=Wanddecoratie",
  },
]

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [marketplaceFilter, setMarketplaceFilter] = useState<string[]>([])
  const [showMarketplaceDropdown, setShowMarketplaceDropdown] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.price.toString().includes(searchQuery)
      
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      
      const matchesMarketplace = marketplaceFilter.length === 0 || 
        marketplaceFilter.some(marketplace => product.marketplaces?.includes(marketplace))
      
      return matchesSearch && matchesStatus && matchesCategory && matchesMarketplace
    })
  }, [searchQuery, statusFilter, categoryFilter, marketplaceFilter])

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)))
  }, [])

  // Get unique marketplaces
  const marketplaces = useMemo(() => {
    const allMarketplaces = products.flatMap(product => product.marketplaces || [])
    const uniqueMarketplaces = [...new Set(allMarketplaces)]
    return uniqueMarketplaces.sort()
  }, [])

  // Calculate stats from filtered products
  const stats = useMemo(() => {
    const totalRevenue = filteredProducts.reduce((sum, product) => sum + (product.price * product.sales), 0)
    const totalCost = filteredProducts.reduce((sum, product) => sum + (product.purchasePrice * product.sales), 0)
    const totalProfit = totalRevenue - totalCost
    const averageMargin = filteredProducts.length > 0 
      ? filteredProducts.reduce((sum, product) => sum + ((product.price - product.purchasePrice) / product.price * 100), 0) / filteredProducts.length
      : 0

    return {
      total: filteredProducts.length,
      views: filteredProducts.reduce((sum, product) => sum + product.views, 0),
      sales: filteredProducts.reduce((sum, product) => sum + product.sales, 0),
      active: filteredProducts.filter(product => product.status === "active").length,
      totalRevenue,
      totalProfit,
      averageMargin
    }
  }, [filteredProducts])

  // Helper function to calculate profit margin
  const calculateProfitMargin = (price: number, purchasePrice: number) => {
    return ((price - purchasePrice) / price * 100).toFixed(1)
  }

  // Helper function to calculate profit
  const calculateProfit = (price: number, purchasePrice: number) => {
    return price - purchasePrice
  }

  const handleProductClick = (product: typeof products[0]) => {
    // Navigate to product detail page instead of opening modal
    router.push(`/dashboard/products/${product.id}`)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleEditProduct = () => {
    if (selectedProduct) {
      closeModal()
      router.push(`/dashboard/products/${selectedProduct.id}/edit`)
    }
  }

  const handleManageMarketplaces = () => {
    closeModal()
    router.push('/dashboard/marketplaces')
  }

  const handleViewAnalytics = () => {
    closeModal()
    router.push('/dashboard/analytics')
  }

  const handleMarketplaceFilterToggle = (marketplace: string) => {
    setMarketplaceFilter(prev => {
      if (prev.includes(marketplace)) {
        return prev.filter(m => m !== marketplace)
      } else {
        return [...prev, marketplace]
      }
    })
  }

  const clearMarketplaceFilters = () => {
    setMarketplaceFilter([])
  }

  // Close dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMarketplaceDropdown(false)
      }
    }

    if (showMarketplaceDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMarketplaceDropdown])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Producten
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Beheer je producten en hun verkoopkanalen
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nieuw Product</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Zoek producten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">Alle Status</option>
                <option value="active">Actief</option>
                <option value="pending">In behandeling</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">Alle Categorieën</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              {/* Marketplace Filter */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="outline"
                  onClick={() => setShowMarketplaceDropdown(!showMarketplaceDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 w-full sm:w-auto"
                >
                  <Package className="h-4 w-4" />
                  <span className="text-sm">
                    {marketplaceFilter.length === 0 
                      ? "Alle Marktplaatsen" 
                      : marketplaceFilter.length === 1 
                        ? marketplaceFilter[0]
                        : `${marketplaceFilter.length} Marktplaatsen`
                    }
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {showMarketplaceDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Marktplaatsen
                        </span>
                        {marketplaceFilter.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearMarketplaceFilters}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700"
                          >
                            Wissen
                          </Button>
                        )}
                      </div>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {marketplaces.map(marketplace => (
                          <label
                            key={marketplace}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={marketplaceFilter.includes(marketplace)}
                              onChange={() => handleMarketplaceFilterToggle(marketplace)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {marketplace}
                            </span>
                            {marketplaceFilter.includes(marketplace) && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
          {filteredProducts.map((product) => {
            const profit = calculateProfit(product.price, product.purchasePrice)
            const margin = calculateProfitMargin(product.price, product.purchasePrice)
            
            return (
              <Card 
                key={product.id} 
                className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {product.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 dark:bg-gray-800/80">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {product.status === 'active' ? 'Actief' : 'In behandeling'}
                  </div>
                </div>
                <CardContent className="p-3 lg:p-4">
                  <div className="space-y-2 lg:space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                        {product.category}
                      </p>
                    </div>
                    
                    {/* Pricing Information */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
                          €{product.price}
                        </span>
                        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                          Voorraad: {product.stock}
                        </span>
                      </div>
                      
                      {/* Purchase Price */}
                      <div className="flex items-center justify-between text-xs lg:text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Inkoop:</span>
                        <span className="text-gray-700 dark:text-gray-300">€{product.purchasePrice}</span>
                      </div>
                      
                      {/* Profit and Margin */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 space-y-1">
                        <div className="flex items-center justify-between text-xs lg:text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Winst:</span>
                          <span className={`font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            €{profit}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs lg:text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Marge:</span>
                          <span className={`font-semibold ${parseFloat(margin) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(margin) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                            {margin}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{product.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ShoppingCart className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{product.sales}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 lg:gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs lg:text-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/dashboard/products/${product.id}`)
                        }}
                      >
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                        <span className="hidden sm:inline">Details</span>
                        <span className="sm:hidden">Bekijk</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs lg:text-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/dashboard/products/${product.id}/edit`)
                        }}
                      >
                        <Edit className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                        <span className="hidden sm:inline">Bewerken</span>
                        <span className="sm:hidden">Edit</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Geen producten gevonden
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Probeer je zoekopdracht aan te passen of voeg een nieuw product toe.
            </p>
            <Link href="/dashboard/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nieuw Product Toevoegen
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal producten</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal views</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.views}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal verkopen</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.sales}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actieve producten</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-green-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale omzet</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">€{stats.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale winst</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">€{stats.totalProfit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gem. marge</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageMargin.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with 50% opacity */}
          <div 
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Product Details
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Product Image and Basic Info */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {selectedProduct.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProduct.category}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      selectedProduct.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {selectedProduct.status === 'active' ? 'Actief' : 'In behandeling'}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                      Voorraad: {selectedProduct.stock}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Euro className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Verkoopprijs</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      €{selectedProduct.price}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Inkoopprijs</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      €{selectedProduct.purchasePrice}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Winst</span>
                    </div>
                    <p className={`text-2xl font-bold ${calculateProfit(selectedProduct.price, selectedProduct.purchasePrice) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      €{calculateProfit(selectedProduct.price, selectedProduct.purchasePrice)}
                    </p>
                    <p className={`text-sm ${parseFloat(calculateProfitMargin(selectedProduct.price, selectedProduct.purchasePrice)) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(calculateProfitMargin(selectedProduct.price, selectedProduct.purchasePrice)) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {calculateProfitMargin(selectedProduct.price, selectedProduct.purchasePrice)}% marge
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Stats */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Prestaties</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedProduct.views}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <ShoppingCart className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Verkopen</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedProduct.sales}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Voorraad</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedProduct.stock}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Conversie</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedProduct.views > 0 ? ((selectedProduct.sales / selectedProduct.views) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button className="flex-1" onClick={handleEditProduct}>
                  <Edit className="h-4 w-4 mr-2" />
                  Product Bewerken
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleManageMarketplaces}>
                  <Package className="h-4 w-4 mr-2" />
                  Marktplaatsen Beheren
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleViewAnalytics}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics Bekijken
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
