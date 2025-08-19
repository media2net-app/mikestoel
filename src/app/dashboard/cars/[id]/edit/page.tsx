"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Car } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

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
    description: "Prachtige BMW 320i M Sport in uitstekende staat. Volledig onderhouden met alle papieren in orde. Deze auto is uitgerust met alle moderne veiligheidsvoorzieningen en comfort opties. De M Sport uitvoering biedt een sportieve uitstraling en uitstekende rijeigenschappen."
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
    description: "Ruime Audi A4 Avant met veel opties. Ideaal voor familie en zakelijk gebruik. Deze stationwagen biedt uitstekende ruimte en comfort. De 2.0 TDI motor is zuinig en krachtig, perfect voor lange ritten."
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
    description: "Luxueuze Mercedes C200 met AMG styling. Zeer goed onderhouden met uitgebreide garantie. Deze auto combineert luxe met sportiviteit. De AMG Line uitvoering biedt een exclusieve uitstraling en uitstekende rijeigenschappen."
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
    description: "Sportieve Golf GTI met uitstekende prestaties. Perfect voor de enthousiaste bestuurder. Deze iconische hot hatch biedt een perfecte balans tussen praktijk en plezier. De GTI uitvoering staat bekend om zijn uitstekende handling en krachtige motor."
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
    description: "Moderne Tesla Model 3 met lange actieradius. Volledig elektrisch en milieuvriendelijk. Deze auto biedt uitstekende prestaties en geavanceerde technologie. De elektrische aandrijving zorgt voor een stille en soepele rit."
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
    description: "Betrouwbare Toyota Prius met uitstekende brandstofefficiëntie. Ideaal voor dagelijks gebruik. Deze hybride auto combineert de voordelen van elektrisch en benzine rijden. Uitstekend voor woon-werkverkeer en lange ritten."
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
    description: "Iconische Porsche 911 Carrera in perfecte staat. Een echte sportwagen voor de kenner. Deze legendarische auto biedt ongeëvenaarde prestaties en uitstekende rijeigenschappen. De 911 staat bekend om zijn perfecte balans en precisie."
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
    description: "Sportieve Ford Focus ST met uitstekende handling. Perfect voor de sportieve bestuurder. Deze hot hatch biedt uitstekende prestaties en een sportieve uitstraling. De ST uitvoering staat bekend om zijn uitstekende rijeigenschappen."
  }
]

export default function EditCarPage() {
  const params = useParams()
  const router = useRouter()
  const carId = parseInt(params.id as string)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    price: "",
    purchasePrice: "",
    location: "",
    description: "",
    image: ""
  })

  // Load car data
  useEffect(() => {
    const car = mockCars.find(c => c.id === carId)
    if (car) {
      setFormData({
        title: car.title,
        brand: car.brand,
        model: car.model,
        year: car.year.toString(),
        mileage: car.mileage.toString(),
        fuelType: car.fuelType,
        transmission: car.transmission,
        price: car.price.toString(),
        purchasePrice: car.purchasePrice.toString(),
        location: car.location,
        description: car.description,
        image: car.image
      })
    }
  }, [carId])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateProfit = () => {
    const price = parseFloat(formData.price) || 0
    const purchasePrice = parseFloat(formData.purchasePrice) || 0
    return price - purchasePrice
  }

  const calculateProfitMargin = () => {
    const price = parseFloat(formData.price) || 0
    const purchasePrice = parseFloat(formData.purchasePrice) || 0
    if (purchasePrice === 0) return 0
    return ((price - purchasePrice) / purchasePrice) * 100
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    router.push(`/dashboard/cars/${carId}`)
  }

  const profit = calculateProfit()
  const margin = calculateProfitMargin()

  const car = mockCars.find(c => c.id === carId)

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href={`/dashboard/cars/${carId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Auto Bewerken
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Bewerk de gegevens van {car.title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Basis Informatie</span>
              </CardTitle>
              <CardDescription>
                Bewerk de basisgegevens van de auto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titel *</Label>
                  <Input
                    id="title"
                    placeholder="Bijv. BMW 320i M Sport"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Merk *</Label>
                  <Input
                    id="brand"
                    placeholder="Bijv. BMW"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="Bijv. 320i"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="year">Bouwjaar *</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="Bijv. 2020"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Kilometerstand *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="Bijv. 45000"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange("mileage", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fuelType">Brandstof *</Label>
                  <select
                    id="fuelType"
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange("fuelType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecteer brandstof</option>
                    <option value="Benzine">Benzine</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elektrisch">Elektrisch</option>
                    <option value="Hybride">Hybride</option>
                    <option value="LPG">LPG</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="transmission">Transmissie *</Label>
                  <select
                    id="transmission"
                    value={formData.transmission}
                    onChange={(e) => handleInputChange("transmission", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecteer transmissie</option>
                    <option value="Handgeschakeld">Handgeschakeld</option>
                    <option value="Automaat">Automaat</option>
                    <option value="Semi-automaat">Semi-automaat</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">Locatie *</Label>
                  <Input
                    id="location"
                    placeholder="Bijv. Amsterdam"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  placeholder="Beschrijf de auto, opties, onderhoudshistorie, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Prijzen</CardTitle>
              <CardDescription>
                Bewerk de verkoop- en inkoopprijs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchasePrice">Inkoopprijs (€) *</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    placeholder="0.00"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Verkoopprijs (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>Afbeelding</CardTitle>
              <CardDescription>
                Bewerk de afbeelding van de auto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="image">Afbeelding URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profit Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Winstmarge Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Inkoopprijs:</span>
                  <div className="font-semibold">€{parseFloat(formData.purchasePrice) || 0}</div>
                </div>
                <div>
                  <span className="text-gray-500">Verkoopprijs:</span>
                  <div className="font-semibold">€{parseFloat(formData.price) || 0}</div>
                </div>
                <div>
                  <span className="text-gray-500">Winst:</span>
                  <div className={`font-semibold ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    €{profit.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Marge:</span>
                  <div className={`font-semibold ${margin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {margin.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Opslaan..." : "Wijzigingen Opslaan"}
              </Button>
              <Link href={`/dashboard/cars/${carId}`}>
                <Button variant="outline" className="w-full">
                  Annuleren
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
