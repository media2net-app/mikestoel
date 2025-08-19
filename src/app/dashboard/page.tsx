"use client"

import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Star,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const stats = [
  {
    title: "Totale Omzet",
    value: "€12,450",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Actieve Producten",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: Package,
  },
  {
    title: "Verkocht Deze Maand",
    value: "156",
    change: "+8.2%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Gemiddelde Rating",
    value: "4.8",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
  },
]

const recentProducts = [
  {
    id: 1,
    name: "Vintage Stoel - Eikenhout",
    price: "€125",
    status: "active",
    views: 45,
    sales: 2,
  },
  {
    id: 2,
    name: "Moderne Tafel - Walnoot",
    price: "€350",
    status: "active",
    views: 23,
    sales: 1,
  },
  {
    id: 3,
    name: "Antieke Kast - Mahonie",
    price: "€750",
    status: "pending",
    views: 12,
    sales: 0,
  },
]

const marketplaceStatus = [
  {
    name: "Marktplaats",
    status: "connected",
    products: 18,
    sales: 8,
  },
  {
    name: "eBay",
    status: "connected",
    products: 15,
    sales: 5,
  },
  {
    name: "Amazon",
    status: "disconnected",
    products: 0,
    sales: 0,
  },
]

export default function DashboardPage() {
  const router = useRouter()

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-product':
        router.push('/dashboard/products/new')
        break
      case 'analytics':
        router.push('/dashboard/analytics')
        break
      case 'marketplaces':
        router.push('/dashboard/marketplaces')
        break
      default:
        break
    }
  }

  const handleViewAllProducts = () => {
    router.push('/dashboard/products')
  }

  const handleManageMarketplace = (marketplace: string) => {
    const marketplaceMapping: { [key: string]: string } = {
      'Marktplaats': 'marktplaats',
      'eBay': 'ebay',
      'Amazon': 'amazon'
    }
    const id = marketplaceMapping[marketplace]
    if (id) {
      router.push(`/dashboard/marketplaces/${id}`)
    }
  }

  const handleMarketplaceSettings = () => {
    router.push('/dashboard/marketplaces')
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welkom terug, Mike!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hier is een overzicht van je product management platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change} van vorige maand
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recente Producten</CardTitle>
            <CardDescription>
              Je laatst toegevoegde en best presterende producten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <ShoppingCart className="h-4 w-4" />
                      <span>{product.sales}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {product.status === 'active' ? 'Actief' : 'In behandeling'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={handleViewAllProducts}
            >
              Bekijk alle producten
            </Button>
          </CardContent>
        </Card>

        {/* Marketplace Status */}
        <Card>
          <CardHeader>
            <CardTitle>Marktplaats Integraties</CardTitle>
            <CardDescription>
              Status van je verbonden verkoopkanalen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketplaceStatus.map((marketplace) => (
                <div key={marketplace.name} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {marketplace.status === 'connected' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {marketplace.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {marketplace.products} producten • {marketplace.sales} verkopen
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={marketplace.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => handleManageMarketplace(marketplace.name)}
                  >
                    {marketplace.status === 'connected' ? 'Beheren' : 'Verbinden'}
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={handleMarketplaceSettings}
            >
              Instellingen beheren
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Snelle Acties</CardTitle>
          <CardDescription>
            Veelgebruikte functies voor je product management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleQuickAction('new-product')}
            >
              <Package className="h-6 w-6" />
              <span>Nieuw Product Toevoegen</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleQuickAction('analytics')}
            >
              <TrendingUp className="h-6 w-6" />
              <span>Analytics Bekijken</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleQuickAction('marketplaces')}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Marktplaatsen Beheren</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
