"use client"

import { useState, useEffect } from "react"
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  Eye, 
  ShoppingCart, 
  TrendingUp, 
  Euro, 
  Tag, 
  Calendar,
  BarChart3,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock product data - in een echte app zou dit uit een API komen
const mockProducts = [
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
    description: "Prachtige vintage stoel van massief eikenhout, perfect voor elke woonkamer. Deze stoel is handgemaakt en heeft een unieke patina die alleen door de tijd kan worden gecreëerd.",
    image: "/api/placeholder/300/300?text=Vintage+Stoel",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 125, views: 23, sales: 1 },
      { name: "Bol.com", status: "active", price: 135, views: 12, sales: 0 },
      { name: "eBay", status: "inactive", price: 120, views: 10, sales: 1 }
    ]
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
    description: "Elegante moderne tafel van walnoot hout met strak design. Perfect voor moderne interieurs en geschikt voor 4-6 personen.",
    image: "/api/placeholder/300/300?text=Moderne+Tafel",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 350, views: 15, sales: 1 },
      { name: "Bol.com", status: "pending", price: 365, views: 8, sales: 0 }
    ]
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
    description: "Antieke kast van mahonie hout uit de jaren 1920. Deze kast heeft een rijke geschiedenis en is perfect gerestaureerd.",
    image: "/api/placeholder/300/300?text=Antieke+Kast",
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-12",
    marketplaces: [
      { name: "Marktplaats", status: "pending", price: 750, views: 5, sales: 0 }
    ]
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
    description: "Moderne design lamp van messing met warme gloed. Perfect voor sfeervolle verlichting in elke ruimte.",
    image: "/api/placeholder/300/300?text=Design+Lamp",
    createdAt: "2024-01-08",
    lastUpdated: "2024-01-22",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 89, views: 35, sales: 2 },
      { name: "Bol.com", status: "active", price: 95, views: 20, sales: 1 },
      { name: "eBay", status: "active", price: 85, views: 12, sales: 0 }
    ]
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
    description: "Vintage spiegel met gouden lijst, perfect voor het toevoegen van elegantie aan elke ruimte.",
    image: "/api/placeholder/300/300?text=Vintage+Spiegel",
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-19",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 180, views: 20, sales: 1 },
      { name: "Bol.com", status: "inactive", price: 190, views: 14, sales: 0 }
    ]
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
    description: "Comfortabele eetkamerstoel van beukenhout, perfect voor dagelijks gebruik en duurzaam.",
    image: "/api/placeholder/300/300?text=Eetkamerstoel",
    createdAt: "2024-01-14",
    lastUpdated: "2024-01-21",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 95, views: 18, sales: 1 },
      { name: "Bol.com", status: "active", price: 105, views: 10, sales: 0 }
    ]
  },
  {
    id: 7,
    name: "Koffietafel - Glas & Staal",
    price: 220,
    purchasePrice: 140,
    status: "active",
    category: "Tafels",
    stock: 2,
    views: 19,
    sales: 0,
    description: "Moderne koffietafel van glas en staal, perfect voor een strakke uitstraling.",
    image: "/api/placeholder/300/300?text=Koffietafel",
    createdAt: "2024-01-16",
    lastUpdated: "2024-01-23",
    marketplaces: [
      { name: "Marktplaats", status: "active", price: 220, views: 12, sales: 0 },
      { name: "Bol.com", status: "pending", price: 235, views: 7, sales: 0 }
    ]
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  
  const [showApiKey, setShowApiKey] = useState(false)
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === productId)

  const calculateProfit = (price: number, purchasePrice: number) => {
    return price - purchasePrice
  }

  const calculateProfitMargin = (price: number, purchasePrice: number) => {
    if (purchasePrice === 0) return "0"
    return (((price - purchasePrice) / purchasePrice) * 100).toFixed(1)
  }

  const handleEditProduct = () => {
    router.push(`/dashboard/products/${productId}/edit`)
  }

  const handleManageMarketplaces = () => {
    router.push('/dashboard/marketplaces')
  }

  const handleViewAnalytics = () => {
    router.push('/dashboard/analytics')
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product niet gevonden
            </h1>
          </div>
        </div>
      </div>
    )
  }

  const profit = calculateProfit(product.price, product.purchasePrice)
  const margin = calculateProfitMargin(product.price, product.purchasePrice)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
              {product.category} • Product ID: {product.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-3">
          <Button variant="outline" onClick={handleViewAnalytics} size="sm" className="lg:text-base">
            <BarChart3 className="h-4 w-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
          <Button onClick={handleEditProduct} size="sm" className="lg:text-base">
            <Edit className="h-4 w-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Bewerken</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Product Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Product Overzicht</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {product.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {product.status === 'active' ? 'Actief' : 'In behandeling'}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                      Voorraad: {product.stock}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Aangemaakt:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(product.createdAt).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Laatste update:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(product.lastUpdated).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Views:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{product.views}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Verkopen:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{product.sales}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Prijzen & Winstmarge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Euro className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Verkoopprijs</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    €{product.price}
                  </p>
                </div>

                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Tag className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Inkoopprijs</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    €{product.purchasePrice}
                  </p>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Winst</span>
                  </div>
                  <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    €{profit}
                  </p>
                  <p className={`text-sm ${parseFloat(margin) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(margin) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                    {margin}% marge
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Marktplaats Prestaties</CardTitle>
              <CardDescription>
                Hoe presteert dit product op verschillende marktplaatsen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.marketplaces.map((marketplace, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        marketplace.status === 'active' ? 'bg-green-500' : 
                        marketplace.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {marketplace.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          €{marketplace.price} • {marketplace.views} views • {marketplace.sales} verkopen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        marketplace.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        marketplace.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {marketplace.status === 'active' ? 'Actief' : 
                         marketplace.status === 'pending' ? 'In behandeling' : 'Inactief'}
                      </span>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Prestatie Statistieken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Totaal Views</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{product.views}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Totaal Verkopen</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{product.sales}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Huidige Voorraad</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{product.stock}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Conversie Rate</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product.views > 0 ? ((product.sales / product.views) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleEditProduct} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Product Bewerken
              </Button>
              <Button variant="outline" onClick={handleManageMarketplaces} className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Marktplaatsen Beheren
              </Button>
              <Button variant="outline" onClick={handleViewAnalytics} className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics Bekijken
              </Button>
            </CardContent>
          </Card>

          {/* Product Status */}
          <Card>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                {product.status === 'active' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status: {product.status === 'active' ? 'Actief' : 'In behandeling'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Categorie: {product.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Laatste update: {new Date(product.lastUpdated).toLocaleDateString('nl-NL')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
