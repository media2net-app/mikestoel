"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, CheckCircle2, ExternalLink } from "lucide-react"

export default function OffertePage() {
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12 pt-6 md:pt-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Offerte</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete marketplace platform met API-koppelingen
        </p>
      </div>

      {/* Price Summary */}
      <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-900 dark:text-orange-100">
            Totaalpakket Marketplace Platform
          </CardTitle>
          <CardDescription className="text-orange-700 dark:text-orange-300">
            Wat je krijgt, voor welke prijs, en wanneer opgeleverd
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">€1.250</div>
              <div className="text-sm text-orange-800 dark:text-orange-200 mt-1">Eenmalig</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">Excl. 21% BTW</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto text-orange-600 dark:text-orange-400" />
              <div className="font-semibold text-gray-900 dark:text-white mt-1">Oplevering</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Binnen 1 week</div>
            </div>
            <div className="text-center">
              <CheckCircle2 className="h-6 w-6 mx-auto text-green-600 dark:text-green-400" />
              <div className="font-semibold text-gray-900 dark:text-white mt-1">Aanbetaling</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">50% bij akkoord</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is included */}
      <Card>
        <CardHeader>
          <CardTitle>Wat is inbegrepen</CardTitle>
          <CardDescription>Volledig pakket voor marketplaces met API-koppelingen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="font-semibold text-gray-900 dark:text-white">Technisch</div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Platform ontwikkeling en implementatie</li>
                <li>• API-koppelingen: Marktplaats, eBay, Insert Marktplaats, Duzpot</li>
                <li>• Setup, configuratie en beveiliging</li>
                <li>• Documentatie en overdracht</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="font-semibold text-gray-900 dark:text-white">Service</div>
              <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 1 week oplevering</li>
                <li>• 1 maand nazorg en support</li>
                <li>• Korte training (1 uur) voor beheer</li>
                <li>• Bugfixes binnen scope</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
            Let op: Marktplaats Pro heeft additionele kosten van €14,95 p/m. eBay API is gratis. Overige externe kosten op aanvraag. Bedragen zijn exclusief 21% BTW.
          </div>
        </CardContent>
      </Card>

      {/* Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Voorwaarden</CardTitle>
          <CardDescription>Zakelijke afspraken voor snelle en duidelijke samenwerking</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• 50% aanbetaling bij akkoord, restant bij oplevering</li>
            <li>• Oplevering binnen 5-7 werkdagen na aanbetaling</li>
            <li>• Prijzen exclusief 21% BTW</li>
            <li>• Scope: marketplace platform met API-koppelingen zoals beschreven</li>
          </ul>
        </CardContent>
      </Card>

      {/* Optional extra offering */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-base">Optioneel</CardTitle>
          <CardDescription>Uit te breiden met extra diensten</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-900 dark:text-white">Webshop ontwikkeling BORK 2e hands producten</div>
            <div className="font-semibold text-gray-900 dark:text-white">€2.500</div>
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
        Alle bedragen exclusief 21% BTW.
      </div>
    </div>
  )
}


