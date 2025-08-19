"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { useDarkMode } from "@/hooks/use-dark-mode"

export function DarkModeToggle() {
  const { isDark, toggleDarkMode, mounted } = useDarkMode()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="w-10 h-10"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </Button>
  )
}
