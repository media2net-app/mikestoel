"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Plus, 
  Car, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  MapPin,
  Fuel,
  Settings,
  Eye
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock car data
const cars = [
  {
    id: 1,
    title: "BMW 320i M Sport",
    brand: "BMW",
    model: "320i",
    year: 2020,
    mileage: 45000,
    fuelType: "Benzine",
    transmission: "Automaat",
    price: 28500,
    purchasePrice: 25000,
    location: "Amsterdam",
    status: "active",
    marketplaces: ["autoscout24", "mobile", "autotrack"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    description: "Prachtige BMW 320i M Sport in uitstekende staat. Volledig onderhouden met alle papieren in orde."
  },
  {
    id: 2,
    title: "Audi A4 Avant 2.0 TDI",
    brand: "Audi",
    model: "A4 Avant",
    year: 2019,
    mileage: 62000,
    fuelType: "Diesel",
    transmission: "Handgeschakeld",
    price: 26500,
    purchasePrice: 22000,
    location: "Rotterdam",
    status: "active",
    marketplaces: ["autoscout24", "gaspedaal"],
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    description: "Ruime Audi A4 Avant met veel opties. Ideaal voor familie en zakelijk gebruik."
  },
  {
    id: 3,
    title: "Mercedes C200 AMG Line",
    brand: "Mercedes",
    model: "C200",
    year: 2021,
    mileage: 32000,
    fuelType: "Benzine",
    transmission: "Automaat",
    price: 38500,
    purchasePrice: 32000,
    location: "Utrecht",
    status: "active",
    marketplaces: ["autoscout24", "mobile", "autotrack", "gaspedaal"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    description: "Luxueuze Mercedes C200 met AMG styling. Zeer goed onderhouden met uitgebreide garantie."
  },
  {
    id: 4,
    title: "Volkswagen Golf GTI",
    brand: "Volkswagen",
    model: "Golf GTI",
    year: 2018,
    mileage: 78000,
    fuelType: "Benzine",
    transmission: "Handgeschakeld",
    price: 22500,
    purchasePrice: 18000,
    location: "Den Haag",
    status: "active",
    marketplaces: ["autotrack", "gaspedaal"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    description: "Sportieve Golf GTI met uitstekende prestaties. Perfect voor de enthousiaste bestuurder."
  },
  {
    id: 5,
    title: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    mileage: 15000,
    fuelType: "Elektrisch",
    transmission: "Automaat",
    price: 45000,
    purchasePrice: 38000,
    location: "Amsterdam",
    status: "active",
    marketplaces: ["autoscout24", "mobile"],
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=400&h=300&fit=crop",
    description: "Moderne Tesla Model 3 met lange actieradius. Volledig elektrisch en milieuvriendelijk."
  },
  {
    id: 6,
    title: "Toyota Prius Hybrid",
    brand: "Toyota",
    model: "Prius",
    year: 2020,
    mileage: 55000,
    fuelType: "Hybride",
    transmission: "Automaat",
    price: 24500,
    purchasePrice: 20000,
    location: "Eindhoven",
    status: "active",
    marketplaces: ["autotrack", "gaspedaal"],
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop",
    description: "Betrouwbare Toyota Prius met uitstekende brandstofefficiëntie. Ideaal voor dagelijks gebruik."
  },
  {
    id: 7,
    title: "Porsche 911 Carrera",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2019,
    mileage: 28000,
    fuelType: "Benzine",
    transmission: "Automaat",
    price: 85000,
    purchasePrice: 72000,
    location: "Amsterdam",
    status: "active",
    marketplaces: ["autoscout24", "mobile"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    description: "Iconische Porsche 911 Carrera in perfecte staat. Een echte sportwagen voor de kenner."
  },
  {
    id: 8,
    title: "Ford Focus ST",
    brand: "Ford",
    model: "Focus ST",
    year: 2021,
    mileage: 35000,
    fuelType: "Benzine",
    transmission: "Handgeschakeld",
    price: 28500,
    purchasePrice: 24000,
    location: "Rotterdam",
    status: "active",
    marketplaces: ["autotrack", "gaspedaal"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    description: "Sportieve Ford Focus ST met uitstekende handling. Perfect voor de sportieve bestuurder."
  }
]

export default function CarsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [marketplaceFilter, setMarketplaceFilter] = useState<string[]>([])
  const [showMarketplaceDropdown, setShowMarketplaceDropdown] = useState(false)
  const router = useRouter()

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = cars.reduce((sum, car) => sum + car.price, 0)
    const totalCost = cars.reduce((sum, car) => sum + car.purchasePrice, 0)
    const totalProfit = totalRevenue - totalCost
    const averageMargin = totalCost > 0 ? ((totalProfit / totalCost) * 100) : 0

    return {
      totalRevenue,
      totalCost,
      totalProfit,
      averageMargin
    }
  }, [])

  // Filter cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || car.status === statusFilter
      const matchesBrand = brandFilter === "all" || car.brand === brandFilter
      
      const matchesMarketplace = marketplaceFilter.length === 0 || 
                                marketplaceFilter.some(mp => car.marketplaces.includes(mp))

      return matchesSearch && matchesStatus && matchesBrand && matchesMarketplace
    })
  }, [searchQuery, statusFilter, brandFilter, marketplaceFilter])

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(cars.map(car => car.brand))]
    return uniqueBrands.sort()
  }, [])

  // Get unique marketplaces
  const marketplaces = useMemo(() => {
    const allMarketplaces = cars.flatMap(car => car.marketplaces)
    const uniqueMarketplaces = [...new Set(allMarketplaces)]
    return uniqueMarketplaces.sort()
  }, [])

  const calculateProfit = (price: number, purchasePrice: number) => {
    return price - purchasePrice
  }

  const calculateProfitMargin = (price: number, purchasePrice: number) => {
    return purchasePrice > 0 ? ((price - purchasePrice) / purchasePrice) * 100 : 0
  }

  const handleCarClick = (car: typeof cars[0]) => {
    router.push(`/dashboard/cars/${car.id}`)
  }

  const handleEditCar = (e: React.MouseEvent, car: typeof cars[0]) => {
    e.stopPropagation()
    router.push(`/dashboard/cars/${car.id}/edit`)
  }

  const handleMarketplaceFilterToggle = (marketplace: string) => {
    setMarketplaceFilter(prev => 
      prev.includes(marketplace) 
        ? prev.filter(mp => mp !== marketplace)
        : [...prev, marketplace]
    )
  }

  const clearMarketplaceFilters = () => {
    setMarketplaceFilter([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Auto's
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Beheer je auto voorraad en verkoopkanalen
          </p>
        </div>
        <Link href="/dashboard/cars/new">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nieuwe Auto</span>
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Omzet</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              van alle auto's
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Kosten</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              inkoopwaarde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Winst</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              €{stats.totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              gemiddelde marge {stats.averageMargin.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aantal Auto's</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cars.length}</div>
            <p className="text-xs text-muted-foreground">
              in voorraad
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Zoek auto's..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Alle Statussen</option>
                <option value="active">Actief</option>
                <option value="sold">Verkocht</option>
                <option value="inactive">Inactief</option>
              </select>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Alle Merken</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            {/* Marketplace Filter */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowMarketplaceDropdown(!showMarketplaceDropdown)}
                className="w-full sm:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                Marktplaatsen ({marketplaceFilter.length})
              </Button>
              
              {showMarketplaceDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
                  <div className="p-2">
                    {marketplaces.map(marketplace => (
                      <label key={marketplace} className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={marketplaceFilter.includes(marketplace)}
                          onChange={() => handleMarketplaceFilterToggle(marketplace)}
                          className="rounded"
                        />
                        <span className="text-sm capitalize">{marketplace}</span>
                      </label>
                    ))}
                    {marketplaceFilter.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearMarketplaceFilters}
                        className="w-full mt-2"
                      >
                        Filters wissen
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => {
          const profit = calculateProfit(car.price, car.purchasePrice)
          const margin = calculateProfitMargin(car.price, car.purchasePrice)
          
          return (
            <Card 
              key={car.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCarClick(car)}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={car.status === "active" ? "default" : "secondary"}>
                    {car.status === "active" ? "Actief" : "Inactief"}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-3 lg:p-4">
                <div className="space-y-2 lg:space-y-3">
                  <div>
                    <h3 className="font-semibold text-base lg:text-lg line-clamp-1">
                      {car.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                      {car.brand} {car.model} • {car.year}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs lg:text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500" />
                      <span>{car.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="h-3 w-3 lg:h-4 lg:w-4 text-gray-500" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Kilometerstand:</span>
                      <div className="font-medium">{car.mileage.toLocaleString()} km</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Transmissie:</span>
                      <div className="font-medium">{car.transmission}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs lg:text-sm">
                    <div>
                      <span className="text-gray-500">Verkoopprijs:</span>
                      <div className="font-semibold text-green-600 dark:text-green-400">
                        €{car.price.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Inkoop:</span>
                      <div className="font-medium">€{car.purchasePrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Winst:</span>
                      <div className={`font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        €{profit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs lg:text-sm">
                      <span className="text-gray-500">Marge: </span>
                      <span className={`font-semibold ${margin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {margin.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex gap-1 lg:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs lg:text-sm"
                        onClick={(e) => handleEditCar(e, car)}
                      >
                        <Settings className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                        <span className="hidden sm:inline">Bewerken</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs lg:text-sm"
                      >
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                        <span className="hidden sm:inline">Details</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
