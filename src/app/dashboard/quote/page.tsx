"use client"

import { useState } from "react"
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ExternalLink,
  DollarSign,
  Zap,
  Database,
  Shield,
  Clock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Platform {
  name: string
  verified: boolean
  apiAvailable: boolean
  apiType: "Direct" | "Via Partner" | "Feed" | "Onbekend"
  capabilities: string[]
  costs: {
    setup?: string
    monthly?: string
    transaction?: string
    notes: string[]
  }
  requirements: string[]
  dataAccess: string[]
  limitations: string[]
  documentation?: string
  partners?: string[]
  status: "active" | "pending" | "unknown"
}

const platforms: Platform[] = [
  {
    name: "Marktplaats",
    verified: true,
    apiAvailable: true,
    apiType: "Via Partner",
    capabilities: [
      "Advertenties plaatsen en beheren",
      "Real-time voorraadsynchronisatie",
      "Prijsupdates",
      "Lead Management System (LMS)",
      "Automatische berichtenverwerking",
      "Feed-oplossing (XML/CSV)",
    ],
    costs: {
      setup: "Variabel (€500 - €2.000)",
      monthly: "€14,95",
      transaction: "Per advertentie",
      notes: [
        "Marktplaats Pro koppeling via TheShopBuilders",
        "Advertentiekosten komen bovenop API-kosten",
        "Real-time API duurder dan feed-oplossing",
        "Shopify plugin beschikbaar (alleen advertentiekosten)",
        "Bron: https://theshopbuilders.com/marktplaats-pro-koppelen/",
      ],
    },
    requirements: [
      "Zakelijk account vereist",
      "Samenwerking met gecertificeerde API-partner verplicht",
      "Webshop of inventarisbeheersysteem",
      "SSL certificaat",
    ],
    dataAccess: [
      "Advertentie management",
      "Lead notifications",
      "Berichten en communicatie",
      "Voorraadstatus",
      "Pricing updates",
    ],
    limitations: [
      "Geen directe API zonder partner",
      "Rate limiting van toepassing",
      "Categoriespecifieke velden verplicht",
      "Verificatie proces vereist",
    ],
    documentation: "https://api.marktplaats.nl/docs/v2/",
    partners: ["Channable", "ProductFlow", "EasyAds", "EffectConnect"],
    status: "active",
  },
  {
    name: "eBay Duitsland",
    verified: true,
    apiAvailable: true,
    apiType: "Direct",
    capabilities: [
      "Advertenties plaatsen (eBay Motors)",
      "Inventarisbeheer",
      "Order management",
      "Productinformatie ophalen",
      "Pricing & voorraad sync",
      "Multi-country support",
      "Automatische hernieuwing",
    ],
    costs: {
      setup: "Gratis",
      monthly: "Gratis (binnen limieten)",
      transaction: "Variabel per verkoop",
      notes: [
        "eBay API is gratis te gebruiken",
        "Transactiekosten per verkoop van toepassing",
        "Rate limits gebaseerd op API call volume",
        "Commerciële licentie mogelijk vereist bij hoog volume",
        "eBay Motors specifieke fees apart",
      ],
    },
    requirements: [
      "eBay Developer Account",
      "Zakelijk eBay account",
      "OAuth 2.0 implementatie",
      "Compliance met eBay policies",
      "KYC verificatie voor Motors categorie",
    ],
    dataAccess: [
      "Listing management (CRUD)",
      "Order processing",
      "Buyer communication",
      "Inventory tracking",
      "Pricing & shipping",
      "Analytics & reporting",
    ],
    limitations: [
      "Rate limits (5,000 calls/day standard)",
      "Category-specifieke restricties",
      "eBay Motors vereist extra verificatie",
      "Duitsland-specifieke regelgeving",
    ],
    documentation: "https://developer.ebay.com/",
    status: "active",
  },
  {
    name: "Insert Marktplaats",
    verified: true,
    apiAvailable: true,
    apiType: "Direct",
    capabilities: [
      "Circulaire bouwmaterialen plaatsen",
      "Materialen uit buitenruimte & groenobjecten",
      "API-koppeling met eigen systemen",
      "Widget voor eigen website (Pro)",
      "GIS integratie voor openbare ruimte",
      "Stabu- en RAW-coderingen",
      "Materialeninventarisatie koppeling",
      "Multi-gebruiker support",
    ],
    costs: {
      setup: "Onbekend",
      monthly: "Prijzen niet beschikbaar",
      transaction: "N.v.t.",
      notes: [
        "Prijzen zijn niet duidelijk beschikbaar",
        "API-koppeling heeft meerkosten (op aanvraag)",
        "Extra gebruikers koppelen heeft meerkosten",
        "Geen transactiekosten per verkoop",
        "Contact opnemen voor prijsinformatie",
      ],
    },
    requirements: [
      "Zakelijk account vereist",
      "Focus op circulaire bouwmaterialen",
      "Bouw-, civiel- of groensector",
      "Materialeninventarisatie aanbevolen",
    ],
    dataAccess: [
      "Materiaal plaatsing en beheer",
      "Categorie & code management",
      "Project locatie tracking",
      "Favorieten & zoekopdrachten",
      "Multi-gebruiker toegang",
      "GIS data (indien applicable)",
    ],
    limitations: [
      "Specifiek voor circulaire bouwmaterialen",
      "Niet geschikt voor reguliere handel",
      "Focus op NL markt (bouw/civiel/groen)",
      "API kosten op aanvraag",
    ],
    documentation: "https://www.insert.nl/producten/insert-marktplaats/",
    partners: ["Insert Connect partners", "GIS leveranciers"],
    status: "active",
  },
  {
    name: "Duzpot",
    verified: false,
    apiAvailable: false,
    apiType: "Onbekend",
    capabilities: [
      "Platform details moeten worden geverifieerd",
    ],
    costs: {
      setup: "Onbekend",
      monthly: "Prijzen niet beschikbaar",
      transaction: "Onbekend",
      notes: [
        "⚠️ Platform naam moet worden geverifieerd",
        "Geen bekende matches gevonden",
        "Mogelijke spellingsvariaties: Dubspot, Carspot, Autospot",
        "Kosten onbekend tot platformverificatie",
        "Prijzen zijn niet duidelijk beschikbaar",
      ],
    },
    requirements: [
      "Platform identificatie vereist",
    ],
    dataAccess: [],
    limitations: [
      "Wachtend op platformverificatie",
    ],
    status: "unknown",
  },
]

export default function QuotePage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const togglePlatform = (name: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(name) 
        ? prev.filter(p => p !== name)
        : [...prev, name]
    )
  }

  const getStatusIcon = (status: Platform["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "unknown":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getApiTypeBadge = (type: Platform["apiType"]) => {
    const colors = {
      "Direct": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Via Partner": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Feed": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Onbekend": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Marketplace Platform Offerte
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete platform met API koppelingen voor alle gevraagde marketplaces - €1.250 eenmalig
        </p>
      </div>

      {/* Alert for unverified platforms */}
      {platforms.some(p => p.status === "unknown") && (
        <Card className="border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-yellow-900 dark:text-yellow-100">
                Platform Verificatie Vereist
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-yellow-800 dark:text-yellow-200">
            <p className="mb-2">Het volgende platform kon niet worden geverifieerd:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>"Duzpot"</strong> - Geen bekende matches gevonden. Controleer de spelling of geef meer details.</li>
            </ul>
            <p className="mt-3 font-medium">
              ✅ <strong>Insert Marktplaats</strong> is succesvol geverifieerd en toegevoegd!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pricing Overview */}
      <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900 dark:text-orange-100 flex items-center space-x-2">
            <DollarSign className="h-6 w-6" />
            <span>Platform & API Koppeling - Totaalpakket</span>
          </CardTitle>
          <CardDescription className="text-orange-700 dark:text-orange-300">
            Complete oplossing voor marketplace integraties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              €1.250
            </div>
            <p className="text-lg text-orange-800 dark:text-orange-200 mb-4">
              Eenmalige investering
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-semibold text-gray-900 dark:text-white">Inclusief:</div>
                <ul className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                  <li>• Platform ontwikkeling</li>
                  <li>• API integraties</li>
                  <li>• Setup & configuratie</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-semibold text-gray-900 dark:text-white">Ondersteuning:</div>
                <ul className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                  <li>• 3 maanden support</li>
                  <li>• Updates & onderhoud</li>
                  <li>• Training & documentatie</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div className="font-semibold text-gray-900 dark:text-white">Extra kosten:</div>
                <ul className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                  <li>• Marktplaats: €14,95/maand</li>
                  <li>• eBay: Gratis</li>
                  <li>• Overige: Op aanvraag</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Geverifieerde Platformen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {platforms.filter(p => p.verified).length}/{platforms.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              API Beschikbaar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {platforms.filter(p => p.apiAvailable).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Levertijd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              4-6 weken
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Details */}
      <div className="space-y-6">
        {platforms.map((platform) => (
          <Card 
            key={platform.name}
            className={`transition-all ${
              platform.status === "unknown" 
                ? "border-yellow-300 dark:border-yellow-700" 
                : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(platform.status)}
                  <div>
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getApiTypeBadge(platform.apiType)}
                      {platform.verified && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Geverifieerd
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant={selectedPlatforms.includes(platform.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePlatform(platform.name)}
                  disabled={platform.status === "unknown"}
                >
                  {selectedPlatforms.includes(platform.name) ? "Geselecteerd" : "Selecteer"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Capabilities */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Mogelijkheden</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {platform.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Costs */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Kosten</h4>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  {platform.costs.setup && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Setup kosten:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{platform.costs.setup}</span>
                    </div>
                  )}
                  {platform.costs.monthly && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Maandelijks:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{platform.costs.monthly}</span>
                    </div>
                  )}
                  {platform.costs.transaction && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Per transactie:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{platform.costs.transaction}</span>
                    </div>
                  )}
                  {platform.costs.notes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Opmerkingen:</p>
                      <ul className="space-y-1">
                        {platform.costs.notes.map((note, idx) => (
                          <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Data Access */}
              {platform.dataAccess.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Data Toegang</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {platform.dataAccess.map((data, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {data}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {platform.requirements.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Vereisten</h4>
                  </div>
                  <ul className="space-y-1">
                    {platform.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Limitations */}
              {platform.limitations.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Beperkingen</h4>
                  </div>
                  <ul className="space-y-1">
                    {platform.limitations.map((lim, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Partners */}
              {platform.partners && platform.partners.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Gecertificeerde Partners
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {platform.partners.map((partner, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation Link */}
              {platform.documentation && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={platform.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>API Documentatie</span>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Klaar om te starten?</CardTitle>
          <CardDescription>
            Dit totaalpakket van €1.250 bevat alles wat je nodig hebt voor marketplace integraties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full h-auto py-6 flex flex-col items-center space-y-2 bg-orange-600 hover:bg-orange-700 text-white">
              <DollarSign className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Offerte Accepteren</div>
                <div className="text-sm opacity-90">€1.250 - Direct starten</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center space-y-2">
              <ExternalLink className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Vragen?</div>
                <div className="text-sm text-gray-600">Contact opnemen</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center space-y-2">
              <Database className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Aanpassen</div>
                <div className="text-sm text-gray-600">Platform toevoegen</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

