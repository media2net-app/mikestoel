import { 
  ExternalLink, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  RefreshCw,
  BarChart3,
  Link as LinkIcon,
  Unlink
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const marketplaces = [
  {
    id: "marktplaats",
    name: "Marktplaats",
    logo: "https://via.placeholder.com/120x40/FF6B35/FFFFFF?text=Marktplaats",
    status: "connected",
    products: 18,
    sales: 8,
    lastSync: "2 uur geleden",
    description: "Nederlands grootste online marktplaats voor tweedehands en nieuwe producten",
    fields: [
      { platform: "title", marketplace: "titel", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "category", marketplace: "categorie", required: true },
      { platform: "condition", marketplace: "staat", required: true },
      { platform: "location", marketplace: "locatie", required: false },
    ]
  },
  {
    id: "ebay",
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png",
    status: "connected",
    products: 15,
    sales: 5,
    lastSync: "1 dag geleden",
    description: "Internationale online veiling en shopping website",
    fields: [
      { platform: "title", marketplace: "item_title", required: true },
      { platform: "description", marketplace: "item_description", required: true },
      { platform: "price", marketplace: "start_price", required: true },
      { platform: "category", marketplace: "primary_category", required: true },
      { platform: "condition", marketplace: "condition", required: true },
      { platform: "brand", marketplace: "brand", required: false },
      { platform: "model", marketplace: "model", required: false },
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    status: "disconnected",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    description: "Wereldwijd e-commerce platform voor diverse producten",
    fields: [
      { platform: "title", marketplace: "product_title", required: true },
      { platform: "description", marketplace: "product_description", required: true },
      { platform: "price", marketplace: "standard_price", required: true },
      { platform: "category", marketplace: "product_category", required: true },
      { platform: "brand", marketplace: "brand_name", required: true },
      { platform: "model", marketplace: "model_number", required: false },
      { platform: "weight", marketplace: "item_weight", required: false },
      { platform: "dimensions", marketplace: "item_dimensions", required: false },
    ]
  },
  {
    id: "bol",
    name: "Bol.com",
    logo: "https://via.placeholder.com/120x40/003087/FFFFFF?text=Bol.com",
    status: "pending",
    products: 0,
    sales: 0,
    lastSync: "In behandeling",
    description: "Nederlandse online retailer voor boeken en meer",
    fields: [
      { platform: "title", marketplace: "product_name", required: true },
      { platform: "description", marketplace: "product_description", required: true },
      { platform: "price", marketplace: "selling_price", required: true },
      { platform: "category", marketplace: "product_category", required: true },
      { platform: "brand", marketplace: "brand", required: false },
      { platform: "ean", marketplace: "ean_code", required: false },
    ]
  }
]

export default function MarketplacesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Marktplaats Integraties
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Beheer je verbindingen met verschillende verkoopkanalen
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nieuwe Integratie</span>
        </Button>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketplaces.map((marketplace) => (
          <Card key={marketplace.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
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
                          parent.innerHTML = `<span class="text-xs font-bold text-gray-900 dark:text-white">${marketplace.name}</span>`
                        }
                      }}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{marketplace.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {marketplace.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {marketplace.status === 'connected' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : marketplace.status === 'pending' ? (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status & Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {marketplace.products}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Producten</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {marketplace.sales}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Verkopen</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {marketplace.lastSync}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Laatste Sync</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  marketplace.status === 'connected' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : marketplace.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {marketplace.status === 'connected' ? 'Verbonden' : 
                   marketplace.status === 'pending' ? 'In behandeling' : 'Niet verbonden'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {marketplace.status === 'connected' ? (
                  <>
                    <Link href={`/dashboard/marketplaces/${marketplace.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Beheren
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="flex-1">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Verbinden
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Field Mapping Preview */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Veld Mapping
                </h4>
                <div className="space-y-1">
                  {marketplace.fields.slice(0, 3).map((field, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        {field.platform}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-900 dark:text-white">
                        {field.marketplace}
                      </span>
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </div>
                  ))}
                  {marketplace.fields.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{marketplace.fields.length - 3} meer velden
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verbonden Platformen</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal Producten</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">33</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totaal Verkopen</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">13</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Laatste Sync</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">2u</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
