"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Car } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewCarPage() {
  const router = useRouter()
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
    router.push("/dashboard/cars")
  }

  const profit = calculateProfit()
  const margin = calculateProfitMargin()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/cars">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Nieuwe Auto
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Voeg een nieuwe auto toe aan je voorraad
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
                Vul de basisgegevens van de auto in
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
                Stel de verkoop- en inkoopprijs in
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
                Voeg een afbeelding van de auto toe
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
                {isLoading ? "Opslaan..." : "Auto Opslaan"}
              </Button>
              <Link href="/dashboard/cars">
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
