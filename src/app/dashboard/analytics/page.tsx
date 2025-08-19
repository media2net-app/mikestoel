"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useCountUp } from "@/hooks/use-count-up"

// Sample data for analytics
const salesData = [
  { date: "2024-01-01", sales: 2, revenue: 250, profit: 85 },
  { date: "2024-01-02", sales: 1, revenue: 125, profit: 40 },
  { date: "2024-01-03", sales: 3, revenue: 445, profit: 155 },
  { date: "2024-01-04", sales: 0, revenue: 0, profit: 0 },
  { date: "2024-01-05", sales: 2, revenue: 320, profit: 110 },
  { date: "2024-01-06", sales: 4, revenue: 580, profit: 200 },
  { date: "2024-01-07", sales: 1, revenue: 180, profit: 60 },
  { date: "2024-01-08", sales: 3, revenue: 420, profit: 145 },
  { date: "2024-01-09", sales: 2, revenue: 295, profit: 100 },
  { date: "2024-01-10", sales: 5, revenue: 725, profit: 250 },
  { date: "2024-01-11", sales: 2, revenue: 310, profit: 105 },
  { date: "2024-01-12", sales: 3, revenue: 445, profit: 155 },
  { date: "2024-01-13", sales: 1, revenue: 145, profit: 50 },
  { date: "2024-01-14", sales: 4, revenue: 620, profit: 215 },
]

const productPerformance = [
  { name: "Vintage Stoel - Eikenhout", sales: 8, revenue: 1000, profit: 320, margin: 32.0, views: 156 },
  { name: "Moderne Tafel - Walnoot", sales: 5, revenue: 1750, profit: 650, margin: 37.1, views: 89 },
  { name: "Design Lamp - Messing", sales: 12, revenue: 1068, profit: 408, margin: 38.2, views: 234 },
  { name: "Vintage Spiegel - Goud", sales: 3, revenue: 540, profit: 180, margin: 33.3, views: 67 },
  { name: "Eetkamerstoel - Beukenhout", sales: 6, revenue: 570, profit: 180, margin: 31.6, views: 98 },
  { name: "Koffietafel - Glas & Staal", sales: 4, revenue: 880, profit: 320, margin: 36.4, views: 123 },
  { name: "Boekenkast - Wit", sales: 2, revenue: 640, profit: 240, margin: 37.5, views: 45 },
  { name: "Hanglamp - Industrieel", sales: 7, revenue: 1015, profit: 385, margin: 37.9, views: 178 },
  { name: "Wanddecoratie - Canvas", sales: 9, revenue: 675, profit: 270, margin: 40.0, views: 145 },
]

const categoryPerformance = [
  { category: "Stoelen", sales: 14, revenue: 1570, profit: 500, margin: 31.8 },
  { category: "Tafels", sales: 9, revenue: 2630, profit: 970, margin: 36.9 },
  { category: "Verlichting", sales: 19, revenue: 2083, profit: 793, margin: 38.1 },
  { category: "Decoratie", sales: 12, revenue: 1215, profit: 450, margin: 37.0 },
  { category: "Kasten", sales: 3, revenue: 1070, profit: 390, margin: 36.4 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Calculate analytics from data
  const analytics = useMemo(() => {
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0)
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
    const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0)
    const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
    
    // Calculate trends (comparing first half vs second half of period)
    const midPoint = Math.floor(salesData.length / 2)
    const firstHalfSales = salesData.slice(0, midPoint).reduce((sum, day) => sum + day.sales, 0)
    const secondHalfSales = salesData.slice(midPoint).reduce((sum, day) => sum + day.sales, 0)
    const salesTrend = secondHalfSales > firstHalfSales ? "up" : "down"
    const salesChange = firstHalfSales > 0 ? ((secondHalfSales - firstHalfSales) / firstHalfSales) * 100 : 0

    const firstHalfRevenue = salesData.slice(0, midPoint).reduce((sum, day) => sum + day.revenue, 0)
    const secondHalfRevenue = salesData.slice(midPoint).reduce((sum, day) => sum + day.revenue, 0)
    const revenueTrend = secondHalfRevenue > firstHalfRevenue ? "up" : "down"
    const revenueChange = firstHalfRevenue > 0 ? ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100 : 0

    return {
      totalSales,
      totalRevenue,
      totalProfit,
      averageMargin,
      salesTrend,
      salesChange,
      revenueTrend,
      revenueChange,
      averageDailySales: totalSales / salesData.length,
      averageDailyRevenue: totalRevenue / salesData.length,
    }
  }, [])

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return productPerformance
    return productPerformance.filter(product => 
      product.name.toLowerCase().includes(selectedCategory.toLowerCase())
    )
  }, [selectedCategory])

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(productPerformance.map(product => {
      const categoryMatch = product.name.match(/^([^-]+)/)
      return categoryMatch ? categoryMatch[1].trim() : "Overig"
    })))
  }, [])

  // Count up animations
  const totalSalesCount = useCountUp({ end: analytics.totalSales, enabled: isVisible, delay: 200 })
  const totalRevenueCount = useCountUp({ end: analytics.totalRevenue, enabled: isVisible, delay: 400 })
  const totalProfitCount = useCountUp({ end: analytics.totalProfit, enabled: isVisible, delay: 600 })
  const avgDailySalesCount = useCountUp({ end: analytics.averageDailySales, decimals: 1, enabled: isVisible, delay: 800 })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Inzichten in je verkoopprestaties en trends
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Vernieuwen
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Laatste 7 dagen</option>
                <option value="30">Laatste 30 dagen</option>
                <option value="90">Laatste 90 dagen</option>
                <option value="365">Laatste jaar</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Alle Categorieën</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale verkopen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSalesCount.count}</p>
                <div className="flex items-center mt-2">
                  {analytics.salesTrend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${analytics.salesTrend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {Math.abs(analytics.salesChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale omzet</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">€{totalRevenueCount.count}</p>
                <div className="flex items-center mt-2">
                  {analytics.revenueTrend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${analytics.revenueTrend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {Math.abs(analytics.revenueChange).toFixed(1)}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Totale winst</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">€{totalProfitCount.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {analytics.averageMargin.toFixed(1)}% gemiddelde marge
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gem. dagelijkse verkopen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgDailySalesCount.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  €{analytics.averageDailyRevenue.toFixed(0)} gem. dagelijkse omzet
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Sales Trend Chart */}
        <Card className="transform transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Verkoop Trend</CardTitle>
            <CardDescription>Dagelijkse verkopen over de laatste periode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox={`0 0 ${salesData.length * 40} 200`} preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    y1={40 + line * 32}
                    x2={salesData.length * 40}
                    y2={40 + line * 32}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    className="dark:stroke-gray-700"
                  />
                ))}
                
                {/* Sales line chart */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 hover:stroke-blue-600"
                  points={salesData.map((day, index) => {
                    const maxSales = Math.max(...salesData.map(d => d.sales))
                    const y = maxSales > 0 ? 200 - ((day.sales / maxSales) * 160) : 200
                    return `${20 + index * 40},${y}`
                  }).join(' ')}
                />
                
                {/* Data points with hover effects */}
                {salesData.map((day, index) => {
                  const maxSales = Math.max(...salesData.map(d => d.sales))
                  const y = maxSales > 0 ? 200 - ((day.sales / maxSales) * 160) : 200
                  return (
                    <g key={index}>
                      {/* Hover area */}
                      <rect
                        x={16 + index * 40}
                        y={0}
                        width="8"
                        height="200"
                        fill="transparent"
                        className="cursor-pointer hover:fill-blue-100 dark:hover:fill-blue-900/20 transition-colors duration-200"
                      />
                      {/* Data point */}
                      <circle
                        cx={20 + index * 40}
                        cy={y}
                        r="4"
                        fill="#3b82f6"
                        className="transition-all duration-200 cursor-pointer hover:r-6 hover:fill-blue-600"
                      />
                      {/* Tooltip background */}
                      <rect
                        x={25 + index * 40}
                        y={y - 30}
                        width="60"
                        height="25"
                        fill="#1f2937"
                        className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        rx="4"
                      />
                      {/* Tooltip text */}
                      <text
                        x={55 + index * 40}
                        y={y - 15}
                        textAnchor="middle"
                        className="text-xs fill-white opacity-0 hover:opacity-100 transition-opacity duration-200"
                      >
                        {day.sales} verkopen
                      </text>
                    </g>
                  )
                })}
                
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4, 5].map((label) => (
                  <text
                    key={label}
                    x="-5"
                    y={200 - label * 32}
                    textAnchor="end"
                    className="text-xs fill-gray-500 dark:fill-gray-400"
                  >
                    {Math.round((Math.max(...salesData.map(d => d.sales)) / 5) * label)}
                  </text>
                ))}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                {salesData.map((day, index) => (
                  <span key={index} className="text-center transition-colors duration-200 hover:text-blue-600 cursor-pointer">
                    {new Date(day.date).getDate()}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Dagelijkse verkopen
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend Chart */}
        <Card className="transform transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Omzet Trend</CardTitle>
            <CardDescription>Dagelijkse omzet over de laatste periode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox={`0 0 ${salesData.length * 40} 200`} preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    y1={40 + line * 32}
                    x2={salesData.length * 40}
                    y2={40 + line * 32}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    className="dark:stroke-gray-700"
                  />
                ))}
                
                {/* Revenue line chart */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 hover:stroke-green-600"
                  points={salesData.map((day, index) => {
                    const maxRevenue = Math.max(...salesData.map(d => d.revenue))
                    const y = maxRevenue > 0 ? 200 - ((day.revenue / maxRevenue) * 160) : 200
                    return `${20 + index * 40},${y}`
                  }).join(' ')}
                />
                
                {/* Data points with hover effects */}
                {salesData.map((day, index) => {
                  const maxRevenue = Math.max(...salesData.map(d => d.revenue))
                  const y = maxRevenue > 0 ? 200 - ((day.revenue / maxRevenue) * 160) : 200
                  return (
                    <g key={index}>
                      {/* Hover area */}
                      <rect
                        x={16 + index * 40}
                        y={0}
                        width="8"
                        height="200"
                        fill="transparent"
                        className="cursor-pointer hover:fill-green-100 dark:hover:fill-green-900/20 transition-colors duration-200"
                      />
                      {/* Data point */}
                      <circle
                        cx={20 + index * 40}
                        cy={y}
                        r="4"
                        fill="#10b981"
                        className="transition-all duration-200 cursor-pointer hover:r-6 hover:fill-green-600"
                      />
                      {/* Tooltip background */}
                      <rect
                        x={25 + index * 40}
                        y={y - 30}
                        width="70"
                        height="25"
                        fill="#1f2937"
                        className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        rx="4"
                      />
                      {/* Tooltip text */}
                      <text
                        x={60 + index * 40}
                        y={y - 15}
                        textAnchor="middle"
                        className="text-xs fill-white opacity-0 hover:opacity-100 transition-opacity duration-200"
                      >
                        €{day.revenue}
                      </text>
                    </g>
                  )
                })}
                
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4, 5].map((label) => (
                  <text
                    key={label}
                    x="-5"
                    y={200 - label * 32}
                    textAnchor="end"
                    className="text-xs fill-gray-500 dark:fill-gray-400"
                  >
                    €{Math.round((Math.max(...salesData.map(d => d.revenue)) / 5) * label)}
                  </text>
                ))}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                {salesData.map((day, index) => (
                  <span key={index} className="text-center transition-colors duration-200 hover:text-green-600 cursor-pointer">
                    {new Date(day.date).getDate()}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Dagelijkse omzet (€)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Product Prestaties</CardTitle>
          <CardDescription>Top producten op basis van verkopen en winstmarge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Product</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Verkopen</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Omzet</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Winst</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Marge</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Views</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 10)
                  .map((product, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{product.sales}</td>
                      <td className="text-center py-3 px-4 text-gray-900 dark:text-white">€{product.revenue}</td>
                      <td className="text-center py-3 px-4 text-green-600 dark:text-green-400 font-medium">€{product.profit}</td>
                      <td className="text-center py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.margin >= 40 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          product.margin >= 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {product.margin}%
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">{product.views}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Categorie Prestaties</CardTitle>
            <CardDescription>Verkopen per categorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance
                .sort((a, b) => b.sales - a.sales)
                .map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium text-gray-900 dark:text-white">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">{category.sales} verkopen</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">€{category.revenue} omzet</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Winstmarge per Categorie</CardTitle>
            <CardDescription>Gemiddelde winstmarge per categorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance
                .sort((a, b) => b.margin - a.margin)
                .map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(category.margin, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{category.margin}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
