"use client"

import { useEffect } from "react"
import styles from "./home.module.css"

export default function Home() {
  useEffect(() => {
    const root = document.documentElement
    const hadDark = root.classList.contains("dark")
    if (hadDark) root.classList.remove("dark")
    return () => {
      if (hadDark) root.classList.add("dark")
    }
  }, [])
  return (
    <div className={`min-h-screen relative overflow-hidden ${styles.page}`}>
      {/* Subtle animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-20">
        {/* Top light bar */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between">
            <img src="/logo (1).svg" alt="BORK 2e hands" className="h-8 w-auto" />
          </div>
        </div>
        {/* Dark nav bar */}
        <div className="bg-[#1f1f1f] text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-3 flex items-center gap-6 text-sm">
            <a className="hover:text-[#E33412]" href="#categorieen">Categorieën</a>
            <a className="hover:text-[#E33412]" href="#producten">Producten</a>
            <a className="hover:text-[#E33412]" href="#stappen">Hoe het werkt</a>
            <a className="hover:text-[#E33412] ml-auto" href="#contact">Contact</a>
          </div>
        </div>
        {/* Gray info strip */}
        <div className="bg-[#3f3f3f] text-white/90 text-sm">
          <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2"><span className="text-[#E33412]">✓</span> Voor 15:00 besteld, volgende werkdag geleverd</div>
            <div className="flex items-center gap-2"><span className="text-[#E33412]">✓</span> Scherpe all-in prijzen</div>
            <div className="flex items-center gap-2"><span className="text-[#E33412]">✓</span> Levering door heel Nederland</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-4 md:px-8 lg:px-12 pt-10 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        {/* Hero background image */}
        <img src="/hero.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Tweedehands isolatiemateriaal voor de bouw
            </h1>
            <p className="mt-4 text-gray-200">
              Betaalbaar en duurzaam bouwen met gerecupereerd isolatiemateriaal. Direct beschikbaar, scherp geprijsd, en snel geleverd.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="#producten" className="inline-flex items-center justify-center rounded-md bg-[#E33412] text-white px-5 py-3 font-medium hover:bg-[#c52c0f] transition">Bekijk assortiment</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-md bg-white text-black px-5 py-3 font-medium border border-white hover:border-gray-200 hover:bg-gray-50 transition">Offerte aanvragen</a>
            </div>
            
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-inner">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                <div className="text-xs text-gray-500">Voorraad</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1.200+ m²</div>
                <div className="text-xs text-gray-500">Diverse diktes</div>
              </div>
              <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                <div className="text-xs text-gray-500">Levering</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1-3 dagen</div>
                <div className="text-xs text-gray-500">Door heel NL</div>
              </div>
              <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                <div className="text-xs text-gray-500">Besparing</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">tot 60%</div>
                <div className="text-xs text-gray-500">vs nieuwprijs</div>
              </div>
              <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                <div className="text-xs text-gray-500">Kwaliteit</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Geselecteerd</div>
                <div className="text-xs text-gray-500">Handmatig gecontroleerd</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorieen" className="relative z-10 px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Categorieën isolatiemateriaal</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              "Glaswol",
              "Steenwol",
              "PIR",
              "XPS",
              "EPS",
              "Isolatieplaten",
            ].map((label) => (
              <div key={label} className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-200 text-center hover:border-[#E33412] transition">
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="producten" className="relative z-10 px-4 md:px-8 lg:px-12 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Beschikbare producten</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Glaswol platen 120mm", info: "Restpartij – ca. 200 m²", price: "€5,50/m²" },
              { name: "PIR platen 80mm", info: "Tweedehands – ca. 150 m²", price: "€9,00/m²" },
              { name: "Steenwol rol 60mm", info: "Overproductie – ca. 300 m²", price: "€4,20/m²" },
            ].map((p, idx) => (
              <div key={idx} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <img src="/volcalis-glaswol-partij-1-scaled.webp" alt={p.name} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{p.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{p.info}</div>
                  <div className="mt-2 font-bold text-[#E33412]">{p.price}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-2 rounded-md bg-[#E33412] text-white text-sm hover:bg-[#c52c0f]">Offerte</button>
                    <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white hover:border-[#E33412]">Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="stappen" className="relative z-10 px-4 md:px-8 lg:px-12 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Zo werkt het</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {[
              { title: "Kies materiaal", text: "Selecteer type en dikte" },
              { title: "Vraag offerte", text: "Ontvang voorstel met levertijd" },
              { title: "Afhalen/leveren", text: "Snel op locatie of bezorgd" },
              { title: "Bouwen", text: "Duurzaam en voordelig isoleren" },
            ].map((s, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800 p-4">
                <div className="font-semibold text-gray-900 dark:text-white">{idx + 1}. {s.title}</div>
                <div className="text-gray-600 dark:text-gray-400">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 px-4 md:px-8 lg:px-12 pb-16">
        <div className="max-w-6xl mx-auto rounded-xl bg-white/70 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Scherpe prijzen</div>
              <div className="text-gray-600 dark:text-gray-400">All-in prijzen, snel een voorstel via e-mail.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Snel geleverd</div>
              <div className="text-gray-600 dark:text-gray-400">Besteld? In 1-3 dagen op locatie, heel Nederland.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Duurzaam</div>
              <div className="text-gray-600 dark:text-gray-400">Gecontroleerde tweedehands partijen, minder afval.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 px-4 md:px-8 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            Vragen of interesse? Stuur een bericht voor een snelle offerte.
          </div>
          <div className="mt-2">&copy; 2025 BORK 2e hands. Alle rechten voorbehouden.</div>
        </div>
      </footer>
    </div>
  )
}
