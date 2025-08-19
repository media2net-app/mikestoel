"use client"

import { useState, useMemo } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  Package
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Vintage Stoel - Eikenhout",
    price: "€125",
    status: "active",
    category: "Stoelen",
    stock: 3,
    views: 45,
    sales: 2,
    image: "/api/placeholder/300/300?text=Vintage+Stoel",
  },
  {
    id: 2,
    name: "Moderne Tafel - Walnoot",
    price: "€350",
    status: "active",
    category: "Tafels",
    stock: 1,
    views: 23,
    sales: 1,
    image: "/api/placeholder/300/300?text=Moderne+Tafel",
  },
  {
    id: 3,
    name: "Antieke Kast - Mahonie",
    price: "€750",
    status: "pending",
    category: "Kasten",
    stock: 1,
    views: 12,
    sales: 0,
    image: "/api/placeholder/300/300?text=Antieke+Kast",
  },
  {
    id: 4,
    name: "Design Lamp - Messing",
    price: "€89",
    status: "active",
    category: "Verlichting",
    stock: 5,
    views: 67,
    sales: 3,
    image: "/api/placeholder/300/300?text=Design+Lamp",
  },
  {
    id: 5,
    name: "Vintage Spiegel - Goud",
    price: "€180",
    status: "active",
    category: "Decoratie",
    stock: 2,
    views: 34,
    sales: 1,
    image: "/api/placeholder/300/300?text=Vintage+Spiegel",
  },
  {
    id: 6,
    name: "Eetkamerstoel - Beukenhout",
    price: "€95",
    status: "active",
    category: "Stoelen",
    stock: 4,
    views: 28,
    sales: 1,
    image: "/api/placeholder/300/300?text=Eetkamerstoel",
  },
  {
    id: 7,
    name: "Koffietafel - Glas & Staal",
    price: "€220",
    status: "active",
    category: "Tafels",
    stock: 2,
    views: 41,
    sales: 2,
    image: "/api/placeholder/300/300?text=Koffietafel",
  },
  {
    id: 8,
    name: "Boekenkast - Wit",
    price: "€320",
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
    price: "€145",
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
    price: "€75",
    status: "active",
    category: "Decoratie",
    stock: 8,
    views: 38,
    sales: 2,
    image: "/api/placeholder/300/300?text=Wanddecoratie",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.price.includes(searchQuery)
      
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [searchQuery, statusFilter, categoryFilter])

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)))
  }, [])

  // Calculate stats from filtered products
  const stats = useMemo(() => {
    return {
      total: filteredProducts.length,
      views: filteredProducts.reduce((sum, product) => sum + product.views, 0),
      sales: filteredProducts.reduce((sum, product) => sum + product.sales, 0),
      active: filteredProducts.filter(product => product.status === "active").length
    }
  }, [filteredProducts])

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
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Alle Status</option>
                <option value="active">Actief</option>
                <option value="pending">In behandeling</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Alle Categorieën</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
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
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Voorraad: {product.stock}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ShoppingCart className="h-4 w-4" />
                      <span>{product.sales}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Bewerken
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Package className="h-4 w-4 mr-1" />
                      Marktplaatsen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal Producten</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal Views</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.views}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal Verkopen</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.sales}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actieve Producten</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
