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
  Copy,
  Eye,
  EyeOff,
  X
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useParams } from "next/navigation"

// Beschikbare platform velden
const platformFields = [
  { value: "title", label: "Titel", description: "Product titel" },
  { value: "description", label: "Beschrijving", description: "Product beschrijving" },
  { value: "price", label: "Prijs", description: "Verkoopprijs" },
  { value: "purchasePrice", label: "Inkoopprijs", description: "Aankoopprijs" },
  { value: "category", label: "Categorie", description: "Product categorie" },
  { value: "condition", label: "Staat", description: "Product conditie" },
  { value: "brand", label: "Merk", description: "Product merk" },
  { value: "model", label: "Model", description: "Product model" },
  { value: "sku", label: "SKU", description: "Stock Keeping Unit" },
  { value: "ean", label: "EAN", description: "European Article Number" },
  { value: "weight", label: "Gewicht", description: "Product gewicht" },
  { value: "dimensions", label: "Afmetingen", description: "Product afmetingen" },
  { value: "color", label: "Kleur", description: "Product kleur" },
  { value: "material", label: "Materiaal", description: "Product materiaal" },
  { value: "location", label: "Locatie", description: "Product locatie" },
  { value: "stock", label: "Voorraad", description: "Beschikbare voorraad" },
  { value: "images", label: "Afbeeldingen", description: "Product afbeeldingen" },
  { value: "tags", label: "Tags", description: "Product tags" },
  { value: "custom1", label: "Custom Veld 1", description: "Aangepast veld 1" },
  { value: "custom2", label: "Custom Veld 2", description: "Aangepast veld 2" },
  { value: "custom3", label: "Custom Veld 3", description: "Aangepast veld 3" }
]

// Marketplace-specifieke velden
const marketplaceFields = {
  marktplaats: [
    { value: "titel", label: "Titel", description: "Product titel" },
    { value: "beschrijving", label: "Beschrijving", description: "Product beschrijving" },
    { value: "prijs", label: "Prijs", description: "Verkoopprijs" },
    { value: "categorie", label: "Categorie", description: "Product categorie" },
    { value: "staat", label: "Staat", description: "Product conditie" },
    { value: "locatie", label: "Locatie", description: "Product locatie" },
    { value: "merk", label: "Merk", description: "Product merk" },
    { value: "model", label: "Model", description: "Product model" },
    { value: "kleur", label: "Kleur", description: "Product kleur" },
    { value: "materiaal", label: "Materiaal", description: "Product materiaal" },
    { value: "afmetingen", label: "Afmetingen", description: "Product afmetingen" },
    { value: "gewicht", label: "Gewicht", description: "Product gewicht" },
    { value: "voorraad", label: "Voorraad", description: "Beschikbare voorraad" },
    { value: "verzendkosten", label: "Verzendkosten", description: "Verzendkosten" },
    { value: "verzendmethode", label: "Verzendmethode", description: "Verzendmethode" }
  ],
  bol: [
    { value: "product_title", label: "Product Titel", description: "Product titel" },
    { value: "product_description", label: "Product Beschrijving", description: "Product beschrijving" },
    { value: "selling_price", label: "Verkoopprijs", description: "Verkoopprijs" },
    { value: "product_category", label: "Product Categorie", description: "Product categorie" },
    { value: "product_condition", label: "Product Conditie", description: "Product conditie" },
    { value: "brand_name", label: "Merk Naam", description: "Product merk" },
    { value: "model_name", label: "Model Naam", description: "Product model" },
    { value: "ean_code", label: "EAN Code", description: "European Article Number" },
    { value: "package_weight", label: "Pakket Gewicht", description: "Product gewicht" },
    { value: "package_dimensions", label: "Pakket Afmetingen", description: "Product afmetingen" },
    { value: "stock_quantity", label: "Voorraad Aantal", description: "Beschikbare voorraad" },
    { value: "shipping_cost", label: "Verzendkosten", description: "Verzendkosten" },
    { value: "shipping_method", label: "Verzendmethode", description: "Verzendmethode" },
    { value: "fulfillment_type", label: "Fulfillment Type", description: "Fulfillment type" }
  ],
  ebay: [
    { value: "item_title", label: "Item Titel", description: "Product titel" },
    { value: "item_description", label: "Item Beschrijving", description: "Product beschrijving" },
    { value: "start_price", label: "Start Prijs", description: "Start prijs voor veiling" },
    { value: "buy_it_now_price", label: "Koop Nu Prijs", description: "Koop nu prijs" },
    { value: "primary_category", label: "Primaire Categorie", description: "Product categorie" },
    { value: "condition", label: "Conditie", description: "Product conditie" },
    { value: "brand", label: "Merk", description: "Product merk" },
    { value: "model", label: "Model", description: "Product model" },
    { value: "item_weight", label: "Item Gewicht", description: "Product gewicht" },
    { value: "shipping_type", label: "Verzend Type", description: "Verzend type" },
    { value: "shipping_cost", label: "Verzendkosten", description: "Verzendkosten" },
    { value: "listing_type", label: "Listing Type", description: "Type listing" },
    { value: "duration", label: "Duur", description: "Listing duur" }
  ],
  amazon: [
    { value: "product_title", label: "Product Titel", description: "Product titel" },
    { value: "product_description", label: "Product Beschrijving", description: "Product beschrijving" },
    { value: "standard_price", label: "Standaard Prijs", description: "Standaard verkoopprijs" },
    { value: "product_category", label: "Product Categorie", description: "Product categorie" },
    { value: "condition_type", label: "Conditie Type", description: "Product conditie" },
    { value: "brand_name", label: "Merk Naam", description: "Product merk" },
    { value: "model_name", label: "Model Naam", description: "Product model" },
    { value: "asin", label: "ASIN", description: "Amazon Standard Identification Number" },
    { value: "package_weight", label: "Pakket Gewicht", description: "Product gewicht" },
    { value: "package_dimensions", label: "Pakket Afmetingen", description: "Product afmetingen" },
    { value: "stock_quantity", label: "Voorraad Aantal", description: "Beschikbare voorraad" },
    { value: "shipping_weight", label: "Verzend Gewicht", description: "Verzend gewicht" },
    { value: "fulfillment_channel", label: "Fulfillment Kanaal", description: "Fulfillment kanaal" }
  ]
}

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

  const [settings, setSettings] = useState<Record<string, string | number | boolean>>(marketplace?.settings || {})
  const [fieldMappings, setFieldMappings] = useState(marketplace?.fields || [])
  const [showFieldMapping, setShowFieldMapping] = useState(false)

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



  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Saving marketplace configuration:", { settings, fieldMappings })
    setIsLoading(false)
  }

  const handleFieldMappingToggle = (index: number) => {
    const updatedMappings = [...fieldMappings]
    updatedMappings[index].mapped = !updatedMappings[index].mapped
    setFieldMappings(updatedMappings)
  }

  const handleFieldMappingChange = (index: number, field: string, value: string) => {
    const updatedMappings = [...fieldMappings]
    updatedMappings[index] = { ...updatedMappings[index], [field]: value }
    
    // Auto-generate example value when both platform and marketplace fields are selected
    if (field === 'platform' || field === 'marketplace') {
      const currentField = updatedMappings[index]
      if (currentField.platform && currentField.marketplace) {
        const platformField = platformFields.find(pf => pf.value === currentField.platform)
        const marketplaceField = marketplaceFields[marketplace.id as keyof typeof marketplaceFields]?.find(mf => mf.value === currentField.marketplace)
        
        if (platformField && marketplaceField) {
          // Generate example based on field type
          let example = ""
          switch (currentField.platform) {
            case "title":
              example = "Vintage Stoel - Eikenhout"
              break
            case "description":
              example = "Prachtige vintage stoel van massief eikenhout..."
              break
            case "price":
              example = "125.00"
              break
            case "purchasePrice":
              example = "85.00"
              break
            case "category":
              example = "Wonen & Tuin > Meubels > Stoelen"
              break
            case "condition":
              example = "Gebruikt"
              break
            case "brand":
              example = "Vintage"
              break
            case "model":
              example = "Classic Chair"
              break
            case "sku":
              example = "VS-001"
              break
            case "ean":
              example = "8712345678901"
              break
            case "weight":
              example = "2.5 kg"
              break
            case "dimensions":
              example = "80x60x45 cm"
              break
            case "color":
              example = "Bruin"
              break
            case "material":
              example = "Eikenhout"
              break
            case "location":
              example = "Amsterdam"
              break
            case "stock":
              example = "5"
              break
            default:
              example = "Voorbeeld waarde"
          }
          updatedMappings[index].example = example
        }
      }
    }
    
    setFieldMappings(updatedMappings)
  }

  const resetFieldMappings = () => {
    setFieldMappings(marketplace?.fields || [])
  }

  const addNewFieldMapping = () => {
    const newField = {
      platform: "",
      marketplace: "",
      required: false,
      mapped: true,
      example: "Voorbeeld waarde"
    }
    setFieldMappings([...fieldMappings, newField])
  }

  const removeFieldMapping = (index: number) => {
    const updatedMappings = fieldMappings.filter((_, i) => i !== index)
    setFieldMappings(updatedMappings)
  }

  const isValidFieldMapping = (field: { platform: string; marketplace: string; required: boolean; mapped: boolean; example: string }) => {
    return field.platform && field.marketplace && field.platform.trim() !== "" && field.marketplace.trim() !== ""
  }

  const getMappedFieldsCount = () => {
    return fieldMappings.filter(f => f.mapped && isValidFieldMapping(f)).length
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Veld Mapping</CardTitle>
                  <CardDescription>
                    Configureer hoe je productvelden worden gemapt naar {marketplace.name} velden
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFieldMapping(!showFieldMapping)}
                  >
                    {showFieldMapping ? 'Bekijken' : 'Bewerken'}
                  </Button>
                  {showFieldMapping && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={addNewFieldMapping}
                    >
                      + Nieuw Veld
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetFieldMappings}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldMappings.map((field, index) => (
                  <div key={index} className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all ${
                    field.mapped ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-800/50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {field.platform}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {field.marketplace}
                        </span>
                        {field.required && (
                          <span className="text-red-500 text-xs font-bold">*</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          field.mapped ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {field.mapped ? 'Gemapt' : 'Niet gemapt'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFieldMappingToggle(index)}
                          className="h-6 w-6 p-0"
                        >
                          {field.mapped ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                        {showFieldMapping && !field.required && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFieldMapping(index)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {showFieldMapping && (
                      <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                              Platform Veld
                            </label>
                            <select
                              value={field.platform}
                              onChange={(e) => handleFieldMappingChange(index, 'platform', e.target.value)}
                              className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="">Selecteer platform veld</option>
                              {platformFields.map((platformField) => (
                                <option key={platformField.value} value={platformField.value}>
                                  {platformField.label} - {platformField.description}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                              {marketplace.name} Veld
                            </label>
                            <select
                              value={field.marketplace}
                              onChange={(e) => handleFieldMappingChange(index, 'marketplace', e.target.value)}
                              className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="">Selecteer {marketplace.name} veld</option>
                              {marketplaceFields[marketplace.id as keyof typeof marketplaceFields]?.map((marketplaceField) => (
                                <option key={marketplaceField.value} value={marketplaceField.value}>
                                  {marketplaceField.label} - {marketplaceField.description}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Voorbeeld Waarde
                          </label>
                          <Input
                            value={field.example}
                            onChange={(e) => handleFieldMappingChange(index, 'example', e.target.value)}
                            className="text-sm"
                            placeholder="Voorbeeld waarde"
                          />
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Voorbeeld: {field.example}
                    </p>
                  </div>
                ))}
              </div>
              
              {showFieldMapping && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {getMappedFieldsCount()} van {fieldMappings.length} velden gemapt
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={resetFieldMappings}>
                        Reset Alle
                      </Button>
                      <Button size="sm" onClick={() => setShowFieldMapping(false)}>
                        Klaar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Field Mapping Preview */}
          {showFieldMapping && (
            <Card>
              <CardHeader>
                <CardTitle>Mapping Preview</CardTitle>
                <CardDescription>
                  Voorbeeld van hoe je productdata wordt gemapt naar {marketplace.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">Platform Veld</div>
                    <div className="font-medium text-gray-900 dark:text-white">{marketplace.name} Veld</div>
                    <div className="font-medium text-gray-900 dark:text-white">Voorbeeld Waarde</div>
                  </div>
                  {fieldMappings.filter(f => f.mapped && isValidFieldMapping(f)).map((field, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{field.platform}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{field.marketplace}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{field.example}</div>
                    </div>
                  ))}
                  {getMappedFieldsCount() === 0 && (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      Geen velden gemapt. Klik op &quot;Bewerken&quot; om velden te mappen.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
                    value={settings.syncInterval as string}
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
                    value={settings.priceMarkup as number}
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
                    value={settings.defaultLocation as string}
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
                        value={(settings.fulfillmentType as string) || "FBR"}
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
                        value={(settings.listingType as string) || "FixedPrice"}
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
                        value={(settings.marketplace as string) || "EU"}
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
