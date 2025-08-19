"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Package, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center",
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
    description: "Elegante vintage spiegel met gouden lijst. Deze spiegel is perfect voor het toevoegen van een vleugje luxe aan elke ruimte.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
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
    description: "Comfortabele eetkamerstoel van beukenhout. Deze stoel is duurzaam en perfect voor dagelijks gebruik.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center",
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
    description: "Moderne koffietafel van glas en staal. Deze tafel is elegant en praktisch voor elke woonkamer.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
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
    description: "Praktische boekenkast in wit. Deze kast biedt veel opslagruimte en past in elke ruimte.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
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
    description: "Industriële hanglamp met vintage uitstraling. Deze lamp is perfect voor het creëren van sfeer.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&crop=center",
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
    description: "Moderne wanddecoratie op canvas. Deze decoratie voegt kleur en stijl toe aan elke muur.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
  }
]

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    purchasePrice: 0,
    category: "",
    stock: 0,
    status: "active"
  })

  // Find product by ID
  const product = mockProducts.find(p => p.id === productId)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        purchasePrice: product.purchasePrice,
        category: product.category,
        stock: product.stock,
        status: product.status
      })
    }
  }, [product])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateProfit = (price: number, purchasePrice: number) => {
    return price - purchasePrice
  }

  const calculateProfitMargin = (price: number, purchasePrice: number) => {
    if (purchasePrice === 0) return "0"
    return (((price - purchasePrice) / purchasePrice) * 100).toFixed(1)
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Saving product:", formData)
    setIsLoading(false)
    router.push('/dashboard/products')
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

  const profit = calculateProfit(formData.price, formData.purchasePrice)
  const margin = calculateProfitMargin(formData.price, formData.purchasePrice)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Bewerken
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Bewerk de details van {product.name}
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isLoading ? 'Opslaan...' : 'Wijzigingen Opslaan'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Informatie</CardTitle>
              <CardDescription>
                Bewerk de basis informatie van het product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Naam *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Voer product naam in"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Beschrijving
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Beschrijf het product..."
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Categorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Selecteer categorie</option>
                    <option value="Stoelen">Stoelen</option>
                    <option value="Tafels">Tafels</option>
                    <option value="Kasten">Kasten</option>
                    <option value="Verlichting">Verlichting</option>
                    <option value="Decoratie">Decoratie</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="active">Actief</option>
                    <option value="pending">In behandeling</option>
                    <option value="inactive">Inactief</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prijzen & Voorraad</CardTitle>
              <CardDescription>
                Stel de verkoop- en inkoopprijzen in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Verkoopprijs (€) *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inkoopprijs (€) *
                  </label>
                  <Input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Voorraad *
                  </label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Profit Preview */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Winstmarge Preview
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Winst:</span>
                    <span className={`ml-2 font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      €{profit}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Marge:</span>
                    <span className={`ml-2 font-semibold ${parseFloat(margin) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(margin) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {margin}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                    <span className={`ml-2 font-semibold ${parseFloat(margin) >= 20 ? 'text-green-600 dark:text-green-400' : parseFloat(margin) >= 10 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formData.purchasePrice > 0 ? ((profit / formData.purchasePrice) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Statistieken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.views}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Verkopen</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.sales}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Conversie</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product.views > 0 ? ((product.sales / product.views) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Marktplaatsen Beheren
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Voorvertoning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
