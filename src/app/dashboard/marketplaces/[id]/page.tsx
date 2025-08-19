"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Settings, 
  Save, 
  RefreshCw,
  BarChart3,
  ExternalLink,
  Unlink,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useParams } from "next/navigation"

const marketplaceData = {
  marktplaats: {
    id: "marktplaats",
    name: "Marktplaats",
    logo: "/png-clipart-marktplaats-nl-sales-marktplaats-b-v-service-advertising-others-text-service.png",
    status: "connected",
    description: "Nederlands grootste online marktplaats voor tweedehands en nieuwe producten",
    apiKey: "mp_********_********",
    lastSync: "2 uur geleden",
    products: 18,
    sales: 8,
    fields: [
      { platform: "title", marketplace: "titel", required: true, mapped: true, example: "Vintage Stoel - Eikenhout" },
      { platform: "description", marketplace: "beschrijving", required: true, mapped: true, example: "Prachtige vintage stoel van massief eikenhout..." },
      { platform: "price", marketplace: "prijs", required: true, mapped: true, example: "125.00" },
      { platform: "category", marketplace: "categorie", required: true, mapped: true, example: "Wonen & Tuin > Meubels > Stoelen" },
      { platform: "condition", marketplace: "staat", required: true, mapped: true, example: "Gebruikt" },
      { platform: "location", marketplace: "locatie", required: false, mapped: false, example: "Amsterdam" },
      { platform: "brand", marketplace: "merk", required: false, mapped: false, example: "Vintage" },
      { platform: "model", marketplace: "model", required: false, mapped: false, example: "Classic Chair" },
    ],
    settings: {
      autoSync: true,
      syncInterval: "2h",
      priceMarkup: 0,
      includeShipping: true,
      defaultLocation: "Amsterdam",
      defaultCondition: "Gebruikt"
    }
  },
  bol: {
    id: "bol",
    name: "Bol.com",
    logo: "/png-transparent-bol-com-hd-logo.png",
    status: "connected",
    description: "Nederlands grootste online retailer met uitgebreide productcatalogus",
    apiKey: "bol_********_********",
    lastSync: "4 uur geleden",
    products: 12,
    sales: 6,
    fields: [
      { platform: "title", marketplace: "product_title", required: true, mapped: true, example: "Vintage Stoel - Eikenhout" },
      { platform: "description", marketplace: "product_description", required: true, mapped: true, example: "Prachtige vintage stoel van massief eikenhout..." },
      { platform: "price", marketplace: "selling_price", required: true, mapped: true, example: "125.00" },
      { platform: "category", marketplace: "product_category", required: true, mapped: true, example: "Wonen & Tuin > Meubels > Stoelen" },
      { platform: "condition", marketplace: "product_condition", required: true, mapped: true, example: "Gebruikt" },
      { platform: "brand", marketplace: "brand_name", required: false, mapped: true, example: "Vintage" },
      { platform: "model", marketplace: "model_name", required: false, mapped: false, example: "Classic Chair" },
      { platform: "ean", marketplace: "ean_code", required: false, mapped: false, example: "8712345678901" },
      { platform: "weight", marketplace: "package_weight", required: false, mapped: false, example: "2.5 kg" },
    ],
    settings: {
      autoSync: true,
      syncInterval: "3h",
      priceMarkup: 3,
      includeShipping: true,
      defaultLocation: "Netherlands",
      defaultCondition: "Gebruikt",
      fulfillmentType: "FBR"
    }
  },
  ebay: {
    id: "ebay",
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png",
    status: "connected",
    description: "Internationale online veiling en shopping website",
    apiKey: "eb_********_********",
    lastSync: "1 dag geleden",
    products: 15,
    sales: 5,
    fields: [
      { platform: "title", marketplace: "item_title", required: true, mapped: true, example: "Vintage Wooden Chair - Oak" },
      { platform: "description", marketplace: "item_description", required: true, mapped: true, example: "Beautiful vintage chair made of solid oak..." },
      { platform: "price", marketplace: "start_price", required: true, mapped: true, example: "125.00" },
      { platform: "category", marketplace: "primary_category", required: true, mapped: true, example: "Home & Garden > Furniture > Chairs" },
      { platform: "condition", marketplace: "condition", required: true, mapped: true, example: "Used" },
      { platform: "brand", marketplace: "brand", required: false, mapped: true, example: "Vintage" },
      { platform: "model", marketplace: "model", required: false, mapped: false, example: "Classic Chair" },
      { platform: "weight", marketplace: "item_weight", required: false, mapped: false, example: "2.5 kg" },
      { platform: "shipping", marketplace: "shipping_type", required: false, mapped: false, example: "Flat" },
    ],
    settings: {
      autoSync: true,
      syncInterval: "4h",
      priceMarkup: 5,
      includeShipping: true,
      defaultLocation: "Netherlands",
      defaultCondition: "Used",
      listingType: "FixedPrice"
    }
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    status: "disconnected",
    description: "Wereldwijd e-commerce platform met uitgebreide marktplaats functionaliteit",
    apiKey: "amz_********_********",
    lastSync: "Nooit",
    products: 0,
    sales: 0,
    fields: [
      { platform: "title", marketplace: "product_title", required: true, mapped: false, example: "Vintage Wooden Chair - Oak" },
      { platform: "description", marketplace: "product_description", required: true, mapped: false, example: "Beautiful vintage chair made of solid oak..." },
      { platform: "price", marketplace: "standard_price", required: true, mapped: false, example: "125.00" },
      { platform: "category", marketplace: "product_category", required: true, mapped: false, example: "Home & Garden > Furniture > Chairs" },
      { platform: "condition", marketplace: "condition_type", required: true, mapped: false, example: "Used" },
      { platform: "brand", marketplace: "brand_name", required: true, mapped: false, example: "Vintage" },
      { platform: "model", marketplace: "model_name", required: false, mapped: false, example: "Classic Chair" },
      { platform: "asin", marketplace: "asin", required: false, mapped: false, example: "B08N5WRWNW" },
      { platform: "weight", marketplace: "package_weight", required: false, mapped: false, example: "2.5 kg" },
      { platform: "dimensions", marketplace: "package_dimensions", required: false, mapped: false, example: "80x60x45 cm" },
    ],
    settings: {
      autoSync: false,
      syncInterval: "6h",
      priceMarkup: 8,
      includeShipping: true,
      defaultLocation: "Netherlands",
      defaultCondition: "Used",
      marketplace: "EU"
    }
  }
}

export default function MarketplaceDetailPage() {
  const params = useParams()
  const marketplaceId = params.id as string
  const marketplace = marketplaceData[marketplaceId as keyof typeof marketplaceData]
  
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [fieldMappings, setFieldMappings] = useState(marketplace?.fields || [])
  const [settings, setSettings] = useState(marketplace?.settings || {})

  if (!marketplace) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/marketplaces">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Marktplaats niet gevonden
            </h1>
          </div>
        </div>
      </div>
    )
  }

  const handleFieldMappingChange = (index: number, field: string, value: string) => {
    const newMappings = [...fieldMappings]
    newMappings[index] = { ...newMappings[index], [field]: value }
    setFieldMappings(newMappings)
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Saving marketplace configuration:", { fieldMappings, settings })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/marketplaces">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-lg p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <img
                src={marketplace.logo}
                alt={marketplace.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="text-sm font-bold text-gray-900 dark:text-white">${marketplace.name}</span>`
                  }
                }}
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {marketplace.name} Configuratie
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                {marketplace.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {marketplace.status === 'connected' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm font-medium">
            {marketplace.status === 'connected' ? 'Verbonden' : 'Niet verbonden'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Verbinding Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    API Sleutel
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={marketplace.apiKey}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Laatste Synchronisatie
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {marketplace.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Nu Synchroniseren
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Statistieken
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <Unlink className="h-4 w-4 mr-2" />
                  Verbinding Verbreken
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Field Mapping */}
          <Card>
            <CardHeader>
              <CardTitle>Veld Mapping</CardTitle>
              <CardDescription>
                Configureer hoe je productvelden worden gemapt naar {marketplace.name} velden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldMappings.map((field, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {field.platform}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {field.marketplace}
                        </span>
                        {field.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Voorbeeld: {field.example}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        field.mapped ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {field.mapped ? 'Gemapt' : 'Niet gemapt'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Instellingen</CardTitle>
              <CardDescription>
                Configureer de synchronisatie en export instellingen voor {marketplace.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Automatische Synchronisatie
                  </label>
                  <select
                    value={settings.autoSync ? "true" : "false"}
                    onChange={(e) => setSettings({...settings, autoSync: e.target.value === "true"})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="true">Aan</option>
                    <option value="false">Uit</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Synchronisatie Interval
                  </label>
                  <select
                    value={settings.syncInterval}
                    onChange={(e) => setSettings({...settings, syncInterval: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="30m">30 minuten</option>
                    <option value="1h">1 uur</option>
                    <option value="2h">2 uur</option>
                    <option value="3h">3 uur</option>
                    <option value="4h">4 uur</option>
                    <option value="6h">6 uur</option>
                    <option value="1d">1 dag</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prijs Markup (%)
                  </label>
                  <Input
                    type="number"
                    value={settings.priceMarkup}
                    onChange={(e) => setSettings({...settings, priceMarkup: parseInt(e.target.value)})}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Standaard Locatie
                  </label>
                  <Input
                    value={settings.defaultLocation}
                    onChange={(e) => setSettings({...settings, defaultLocation: e.target.value})}
                    placeholder="Amsterdam"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Marketplace-specific settings */}
              {marketplace.id === "bol" && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Bol.com Specifieke Instellingen</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fulfillment Type
                      </label>
                      <select
                        value={settings.fulfillmentType || "FBR"}
                        onChange={(e) => setSettings({...settings, fulfillmentType: e.target.value})}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="FBR">Fulfillment by Bol.com</option>
                        <option value="FBM">Fulfillment by Merchant</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {marketplace.id === "ebay" && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">eBay Specifieke Instellingen</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Listing Type
                      </label>
                      <select
                        value={settings.listingType || "FixedPrice"}
                        onChange={(e) => setSettings({...settings, listingType: e.target.value})}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="FixedPrice">Vaste Prijs</option>
                        <option value="Auction">Veiling</option>
                        <option value="AuctionWithBIN">Veiling met Koop Nu</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {marketplace.id === "amazon" && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Amazon Specifieke Instellingen</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Marketplace
                      </label>
                      <select
                        value={settings.marketplace || "EU"}
                        onChange={(e) => setSettings({...settings, marketplace: e.target.value})}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="EU">Europese Unie</option>
                        <option value="DE">Duitsland</option>
                        <option value="FR">Frankrijk</option>
                        <option value="IT">Italië</option>
                        <option value="ES">Spanje</option>
                        <option value="UK">Verenigd Koninkrijk</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistieken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {marketplace.products}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actieve Producten</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {marketplace.sales}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verkopen</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {marketplace.lastSync}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Laatste Sync</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Nu Synchroniseren
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistieken Bekijken
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                {marketplace.name} Bezoeken
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Instellingen Opslaan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
