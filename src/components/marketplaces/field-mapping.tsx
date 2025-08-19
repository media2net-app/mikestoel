"use client"

import { useState } from "react"
import { 
  ArrowRight, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  GripVertical,
  Plus,
  Trash2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FieldMapping {
  platform: string
  marketplace: string
  required: boolean
  mapped: boolean
  example: string
  customMapping?: string
}

interface FieldMappingProps {
  platformFields: string[]
  marketplaceFields: string[]
  mappings: FieldMapping[]
  onMappingChange: (mappings: FieldMapping[]) => void
  marketplaceName: string
}

export function FieldMappingComponent({
  platformFields,
  marketplaceFields,
  mappings,
  onMappingChange,
  marketplaceName
}: FieldMappingProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const addMapping = () => {
    const newMapping: FieldMapping = {
      platform: "",
      marketplace: "",
      required: false,
      mapped: false,
      example: ""
    }
    onMappingChange([...mappings, newMapping])
  }

  const removeMapping = (index: number) => {
    const newMappings = mappings.filter((_, i) => i !== index)
    onMappingChange(newMappings)
  }

  const updateMapping = (index: number, field: keyof FieldMapping, value: any) => {
    const newMappings = [...mappings]
    newMappings[index] = { ...newMappings[index], [field]: value }
    onMappingChange(newMappings)
  }

  const getMappingStatus = (mapping: FieldMapping) => {
    if (!mapping.platform || !mapping.marketplace) return "incomplete"
    if (mapping.required && !mapping.mapped) return "required"
    if (mapping.mapped) return "mapped"
    return "optional"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mapped":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "required":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "incomplete":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "mapped":
        return "Gemapt"
      case "required":
        return "Verplicht"
      case "incomplete":
        return "Onvolledig"
      default:
        return "Optioneel"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Veld Mapping</CardTitle>
            <CardDescription>
              Configureer hoe je productvelden worden gemapt naar {marketplaceName} velden
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Geavanceerd
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mapping Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Platform Velden
            </h4>
            <div className="space-y-1">
              {platformFields.map((field) => (
                <div key={field} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                  {field}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {marketplaceName} Velden
            </h4>
            <div className="space-y-1">
              {marketplaceFields.map((field) => (
                <div key={field} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mappings */}
        <div className="space-y-3">
          {mappings.map((mapping, index) => {
            const status = getMappingStatus(mapping)
            return (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Platform Veld
                      </label>
                      <select
                        value={mapping.platform}
                        onChange={(e) => updateMapping(index, "platform", e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Selecteer veld</option>
                        {platformFields.map((field) => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {marketplaceName} Veld
                        </label>
                        <select
                          value={mapping.marketplace}
                          onChange={(e) => updateMapping(index, "marketplace", e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                        >
                          <option value="">Selecteer veld</option>
                          {marketplaceFields.map((field) => (
                            <option key={field} value={field}>{field}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {getStatusText(status)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMapping(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Advanced Options */}
                {showAdvanced && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Voorbeeld Waarde
                        </label>
                        <Input
                          value={mapping.example}
                          onChange={(e) => updateMapping(index, "example", e.target.value)}
                          placeholder="Voorbeeld waarde..."
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          Aangepaste Mapping
                        </label>
                        <Input
                          value={mapping.customMapping || ""}
                          onChange={(e) => updateMapping(index, "customMapping", e.target.value)}
                          placeholder="Aangepaste transformatie..."
                          className="mt-1 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={mapping.required}
                        onChange={(e) => updateMapping(index, "required", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Verplicht veld
                      </span>
                      <input
                        type="checkbox"
                        checked={mapping.mapped}
                        onChange={(e) => updateMapping(index, "mapped", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Actief gemapt
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Add Mapping Button */}
        <Button
          variant="outline"
          onClick={addMapping}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Mapping Toevoegen
        </Button>

        {/* Mapping Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Mapping Overzicht
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {mappings.filter(m => getMappingStatus(m) === "mapped").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Gemapt</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                {mappings.filter(m => getMappingStatus(m) === "required").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verplicht</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {mappings.filter(m => getMappingStatus(m) === "incomplete").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Onvolledig</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                {mappings.filter(m => getMappingStatus(m) === "optional").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Optioneel</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
