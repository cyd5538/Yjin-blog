"use client"

import * as React from "react"
import { Moon, MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex gap-2 border-[1px] p-1 rounded-xl border-black dark:border-white cursor-pointer"
    >
      <div
      >
        {theme === "dark" ? (
          <MoonStar className="text-yellow-500 font-bold h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className="text-purple-900 font-bold h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}
      </div>
    </div>
  )
}

