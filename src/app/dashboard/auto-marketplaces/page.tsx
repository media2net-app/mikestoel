"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Settings, TrendingUp, Users, Package } from "lucide-react"
import Link from "next/link"

// Auto marketplace data
const autoMarketplaces = [
  {
    id: "autoscout24",
    name: "AutoScout24",
    logo: "https://www.autoscout24.com/favicon.ico",
    status: "connected",
    description: "Europese marktleider voor auto advertenties met focus op kwaliteit",
    products: 42,
    sales: 18,
    lastSync: "45 min geleden",
    monthlyVisitors: "12.5M",
    conversionRate: "2.8%",
    avgPrice: "€28,500",
    fields: [
      { platform: "title", marketplace: "make", required: true },
      { platform: "description", marketplace: "description", required: true },
      { platform: "price", marketplace: "price", required: true },
      { platform: "brand", marketplace: "make", required: true },
      { platform: "model", marketplace: "model", required: true },
      { platform: "year", marketplace: "year", required: true },
      { platform: "mileage", marketplace: "mileage", required: true },
      { platform: "fuel_type", marketplace: "fuel_type", required: true },
      { platform: "transmission", marketplace: "transmission", required: true },
    ]
  },
  {
    id: "mobile",
    name: "Mobile.de",
    logo: "https://www.mobile.de/favicon.ico",
    status: "connected",
    description: "Duitslands grootste auto marktplaats met uitgebreide zoekfuncties",
    products: 38,
    sales: 15,
    lastSync: "1 uur geleden",
    monthlyVisitors: "8.2M",
    conversionRate: "3.1%",
    avgPrice: "€32,100",
    fields: [
      { platform: "title", marketplace: "marke", required: true },
      { platform: "description", marketplace: "beschreibung", required: true },
      { platform: "price", marketplace: "preis", required: true },
      { platform: "brand", marketplace: "marke", required: true },
      { platform: "model", marketplace: "modell", required: true },
      { platform: "year", marketplace: "baujahr", required: true },
      { platform: "mileage", marketplace: "kilometerstand", required: true },
      { platform: "fuel_type", marketplace: "kraftstoff", required: true },
      { platform: "transmission", marketplace: "getriebe", required: true },
    ]
  },
  {
    id: "autotrack",
    name: "Autotrack",
    logo: "https://www.autotrack.nl/favicon.ico",
    status: "connected",
    description: "Nederlandse auto marktplaats met uitgebreide prijsvergelijking",
    products: 25,
    sales: 12,
    lastSync: "30 min geleden",
    monthlyVisitors: "2.1M",
    conversionRate: "4.2%",
    avgPrice: "€24,800",
    fields: [
      { platform: "title", marketplace: "merk", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
      { platform: "year", marketplace: "bouwjaar", required: true },
      { platform: "mileage", marketplace: "kilometerstand", required: true },
      { platform: "fuel_type", marketplace: "brandstof", required: true },
      { platform: "transmission", marketplace: "transmissie", required: true },
    ]
  },
  {
    id: "gaspedaal",
    name: "Gaspedaal",
    logo: "https://www.gaspedaal.nl/favicon.ico",
    status: "connected",
    description: "Nederlandse auto marktplaats met focus op prijsvergelijking",
    products: 31,
    sales: 14,
    lastSync: "1 uur geleden",
    monthlyVisitors: "1.8M",
    conversionRate: "3.8%",
    avgPrice: "€26,200",
    fields: [
      { platform: "title", marketplace: "merk", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
      { platform: "year", marketplace: "bouwjaar", required: true },
      { platform: "mileage", marketplace: "kilometerstand", required: true },
      { platform: "fuel_type", marketplace: "brandstof", required: true },
      { platform: "transmission", marketplace: "transmissie", required: true },
    ]
  },
  {
    id: "autoblog",
    name: "Autoblog",
    logo: "https://www.autoblog.nl/favicon.ico",
    status: "pending",
    description: "Auto nieuws en reviews platform met verkoop mogelijkheden",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "3.5M",
    conversionRate: "1.2%",
    avgPrice: "€22,500",
    fields: [
      { platform: "title", marketplace: "title", required: true },
      { platform: "description", marketplace: "description", required: true },
      { platform: "price", marketplace: "price", required: true },
      { platform: "brand", marketplace: "brand", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  },
  {
    id: "autovandaag",
    name: "Autovandaag",
    logo: "https://www.autovandaag.nl/favicon.ico",
    status: "pending",
    description: "Nederlandse auto website met uitgebreide informatie",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "2.8M",
    conversionRate: "1.5%",
    avgPrice: "€25,000",
    fields: [
      { platform: "title", marketplace: "titel", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  },
  {
    id: "autoweek",
    name: "Autoweek",
    logo: "https://www.autoweek.nl/favicon.ico",
    status: "pending",
    description: "Auto magazine platform met verkoop sectie",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "1.9M",
    conversionRate: "1.8%",
    avgPrice: "€27,300",
    fields: [
      { platform: "title", marketplace: "title", required: true },
      { platform: "description", marketplace: "description", required: true },
      { platform: "price", marketplace: "price", required: true },
      { platform: "brand", marketplace: "brand", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  },
  {
    id: "autozine",
    name: "Autozine",
    logo: "https://www.autozine.nl/favicon.ico",
    status: "pending",
    description: "Auto informatie platform met verkoop mogelijkheden",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "1.2M",
    conversionRate: "1.1%",
    avgPrice: "€23,700",
    fields: [
      { platform: "title", marketplace: "titel", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  },
  {
    id: "autokopen",
    name: "Autokopen",
    logo: "https://www.autokopen.nl/favicon.ico",
    status: "pending",
    description: "Auto aankoop platform met uitgebreide vergelijking",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "0.8M",
    conversionRate: "2.3%",
    avgPrice: "€21,900",
    fields: [
      { platform: "title", marketplace: "titel", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  },
  {
    id: "autos-nl",
    name: "Autos.nl",
    logo: "https://www.autos.nl/favicon.ico",
    status: "pending",
    description: "Nederlandse auto portal met verkoop sectie",
    products: 0,
    sales: 0,
    lastSync: "Nooit",
    monthlyVisitors: "1.5M",
    conversionRate: "1.9%",
    avgPrice: "€24,100",
    fields: [
      { platform: "title", marketplace: "titel", required: true },
      { platform: "description", marketplace: "beschrijving", required: true },
      { platform: "price", marketplace: "prijs", required: true },
      { platform: "brand", marketplace: "merk", required: true },
      { platform: "model", marketplace: "model", required: true },
    ]
  }
]

export default function AutoMarketplacesPage() {
  const connectedMarketplaces = autoMarketplaces.filter(m => m.status === "connected")
  
  const totalProducts = connectedMarketplaces.reduce((sum, m) => sum + m.products, 0)
  const totalSales = connectedMarketplaces.reduce((sum, m) => sum + m.sales, 0)
  const totalVisitors = autoMarketplaces.reduce((sum, m) => sum + parseInt(m.monthlyVisitors.replace('M', '000')), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/marketplaces">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Auto Platforms
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Beheer je auto-specifieke verkoopkanalen en integraties
              </p>
            </div>
          </div>
        </div>
        <Button className="flex items-center space-x-2">
          <ExternalLink className="h-4 w-4" />
          <span>Nieuwe Auto Platform</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Platforms</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autoMarketplaces.length}</div>
            <p className="text-xs text-muted-foreground">
              {connectedMarketplaces.length} verbonden
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Producten</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              actief op auto platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Verkopen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              via auto platforms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maandelijkse Bezoekers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalVisitors / 1000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              gecombineerde reach
            </p>
          </CardContent>
        </Card>
      </div>

      {/* All Auto Marketplaces */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Alle Auto Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autoMarketplaces.map((marketplace) => (
            <Card key={marketplace.id} className={`overflow-hidden ${marketplace.status === "pending" ? "opacity-75" : ""}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={marketplace.logo}
                        alt={marketplace.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const nextElement = target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold" style={{display: 'none'}}>
                        {marketplace.name.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{marketplace.name}</CardTitle>
                      <Badge 
                        variant={marketplace.status === "connected" ? "default" : "secondary"}
                        className={marketplace.status === "connected" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                      >
                        {marketplace.status === "connected" ? "Verbonden" : "Niet verbonden"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {marketplace.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {marketplace.status === "connected" ? (
                    <>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Producten:</span>
                        <div className="font-semibold">{marketplace.products}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Verkopen:</span>
                        <div className="font-semibold text-green-600 dark:text-green-400">{marketplace.sales}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Gem. Prijs:</span>
                        <div className="font-semibold">{marketplace.avgPrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Status:</span>
                        <div className="font-semibold text-orange-600 dark:text-orange-400">In behandeling</div>
                      </div>
                    </>
                  )}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Bezoekers:</span>
                    <div className="font-semibold">{marketplace.monthlyVisitors}</div>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Conversie:</span>
                    <div className="font-semibold">{marketplace.conversionRate}</div>
                  </div>
                </div>
                
                {marketplace.status === "connected" && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Laatste sync: {marketplace.lastSync}
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {marketplace.status === "connected" ? (
                    <>
                      <Link href={`/dashboard/marketplaces/${marketplace.id}`}>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Instellingen
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Verbinden
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
