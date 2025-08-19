"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Edit, 
  Settings, 
  BarChart3, 
  MapPin, 
  Fuel, 
  Calendar,
  Gauge,
  Car,
  TrendingUp,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

// Mock car data (same as in cars page)
const mockCars = [
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
    description: "Prachtige BMW 320i M Sport in uitstekende staat. Volledig onderhouden met alle papieren in orde. Deze auto is uitgerust met alle moderne veiligheidsvoorzieningen en comfort opties. De M Sport uitvoering biedt een sportieve uitstraling en uitstekende rijeigenschappen.",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20"
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
    description: "Ruime Audi A4 Avant met veel opties. Ideaal voor familie en zakelijk gebruik. Deze stationwagen biedt uitstekende ruimte en comfort. De 2.0 TDI motor is zuinig en krachtig, perfect voor lange ritten.",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18"
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
    description: "Luxueuze Mercedes C200 met AMG styling. Zeer goed onderhouden met uitgebreide garantie. Deze auto combineert luxe met sportiviteit. De AMG Line uitvoering biedt een exclusieve uitstraling en uitstekende rijeigenschappen.",
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-15"
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
    description: "Sportieve Golf GTI met uitstekende prestaties. Perfect voor de enthousiaste bestuurder. Deze iconische hot hatch biedt een perfecte balans tussen praktijk en plezier. De GTI uitvoering staat bekend om zijn uitstekende handling en krachtige motor.",
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-19"
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
    description: "Moderne Tesla Model 3 met lange actieradius. Volledig elektrisch en milieuvriendelijk. Deze auto biedt uitstekende prestaties en geavanceerde technologie. De elektrische aandrijving zorgt voor een stille en soepele rit.",
    createdAt: "2024-01-08",
    lastUpdated: "2024-01-16"
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
    description: "Betrouwbare Toyota Prius met uitstekende brandstofefficiëntie. Ideaal voor dagelijks gebruik. Deze hybride auto combineert de voordelen van elektrisch en benzine rijden. Uitstekend voor woon-werkverkeer en lange ritten.",
    createdAt: "2024-01-14",
    lastUpdated: "2024-01-21"
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
    description: "Iconische Porsche 911 Carrera in perfecte staat. Een echte sportwagen voor de kenner. Deze legendarische auto biedt ongeëvenaarde prestaties en uitstekende rijeigenschappen. De 911 staat bekend om zijn perfecte balans en precisie.",
    createdAt: "2024-01-03",
    lastUpdated: "2024-01-12"
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
    description: "Sportieve Ford Focus ST met uitstekende handling. Perfect voor de sportieve bestuurder. Deze hot hatch biedt uitstekende prestaties en een sportieve uitstraling. De ST uitvoering staat bekend om zijn uitstekende rijeigenschappen.",
    createdAt: "2024-01-11",
    lastUpdated: "2024-01-17"
  }
]

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const carId = parseInt(params.id as string)

  const car = useMemo(() => {
    return mockCars.find(c => c.id === carId)
  }, [carId])

  const calculateProfit = (price: number, purchasePrice: number) => {
    return price - purchasePrice
  }

  const calculateProfitMargin = (price: number, purchasePrice: number) => {
    return purchasePrice > 0 ? ((price - purchasePrice) / purchasePrice) * 100 : 0
  }

  const handleEditCar = () => {
    router.push(`/dashboard/cars/${carId}/edit`)
  }

  const handleManageMarketplaces = () => {
    router.push(`/dashboard/marketplaces`)
  }

  const handleViewAnalytics = () => {
    router.push(`/dashboard/analytics`)
  }

  // Navigation functions
  const getPreviousCar = () => {
    const currentIndex = mockCars.findIndex(c => c.id === carId)
    return currentIndex > 0 ? mockCars[currentIndex - 1] : null
  }

  const getNextCar = () => {
    const currentIndex = mockCars.findIndex(c => c.id === carId)
    return currentIndex < mockCars.length - 1 ? mockCars[currentIndex + 1] : null
  }

  const handlePreviousCar = () => {
    const previousCar = getPreviousCar()
    if (previousCar) {
      router.push(`/dashboard/cars/${previousCar.id}`)
    }
  }

  const handleNextCar = () => {
    const nextCar = getNextCar()
    if (nextCar) {
      router.push(`/dashboard/cars/${nextCar.id}`)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousCar()
      } else if (event.key === 'ArrowRight') {
        handleNextCar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [carId])

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Auto niet gevonden
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            De opgevraagde auto bestaat niet of is niet beschikbaar.
          </p>
          <Link href="/dashboard/cars">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar Auto's
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const profit = calculateProfit(car.price, car.purchasePrice)
  const margin = calculateProfitMargin(car.price, car.purchasePrice)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/cars">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {car.title}
            </h1>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
              {car.brand} {car.model} • ID: {car.id}
            </p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="lg:text-base"
            onClick={handlePreviousCar}
            disabled={!getPreviousCar()}
            title={getPreviousCar() ? `Vorige: ${getPreviousCar()?.title}` : "Geen vorige auto"}
          >
            <ChevronLeft className="h-4 w-4 lg:mr-2" />
            <span className="hidden sm:inline">Vorige</span>
          </Button>
          
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            {carId} van {mockCars.length}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="lg:text-base"
            onClick={handleNextCar}
            disabled={!getNextCar()}
            title={getNextCar() ? `Volgende: ${getNextCar()?.title}` : "Geen volgende auto"}
          >
            <span className="hidden sm:inline">Volgende</span>
            <ChevronRight className="h-4 w-4 lg:ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Car Image */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={car.status === "active" ? "default" : "secondary"}>
                    {car.status === "active" ? "Actief" : "Inactief"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Car Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Auto Overzicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Car className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Merk & Model</p>
                    <p className="font-semibold">{car.brand} {car.model}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bouwjaar</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kilometerstand</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Brandstof</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Transmissie</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Locatie</p>
                    <p className="font-semibold">{car.location}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Beschrijving</p>
                <p className="text-gray-900 dark:text-white">{car.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Prijzen & Winst</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verkoopprijs</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    €{car.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inkoopprijs</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    €{car.purchasePrice.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Winst</p>
                  <p className={`text-2xl font-bold ${profit >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`}>
                    €{profit.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Winstmarge</p>
                <p className={`text-3xl font-bold ${margin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {margin.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Marktplaats Prestaties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {car.marketplaces.map((marketplace, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-sm font-semibold capitalize">{marketplace.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{marketplace}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Actief sinds {car.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Views</p>
                        <p className="font-semibold">{Math.floor(Math.random() * 1000) + 100}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Favorieten</p>
                        <p className="font-semibold">{Math.floor(Math.random() * 50) + 5}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Contacten</p>
                        <p className="font-semibold">{Math.floor(Math.random() * 20) + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:space-y-6">
          {/* Performance Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Prestatie Statistieken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(Math.random() * 1000) + 500}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Totaal Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.floor(Math.random() * 100) + 20}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Favorieten</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.floor(Math.random() * 50) + 10}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Contacten</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.floor(Math.random() * 10) + 1}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Offertes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleEditCar} className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Auto Bewerken
              </Button>
              <Button variant="outline" onClick={handleManageMarketplaces} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Marktplaatsen Beheren
              </Button>
              <Button variant="outline" onClick={handleViewAnalytics} className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics Bekijken
              </Button>
            </CardContent>
          </Card>

          {/* Car Details */}
          <Card>
            <CardHeader>
              <CardTitle>Auto Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <Badge variant={car.status === "active" ? "default" : "secondary"}>
                  {car.status === "active" ? "Actief" : "Inactief"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Aangemaakt:</span>
                <span>{new Date(car.createdAt).toLocaleDateString('nl-NL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Laatst bijgewerkt:</span>
                <span>{new Date(car.lastUpdated).toLocaleDateString('nl-NL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Marktplaatsen:</span>
                <span>{car.marketplaces.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
