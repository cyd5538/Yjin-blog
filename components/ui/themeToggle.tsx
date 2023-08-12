"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="cursor-pointer">
      <Moon onClick={() => setTheme("dark")} className="rounded-full bg-zinc-900 text-yellow-400 w-10 h-10 p-2 dark:hidden rotate-0 hover:rotate-12  scale-100 transition-all" />
      <Sun onClick={() => setTheme("light")} className="rounded-full bg-yellow-400 text-zinc-900 w-10 h-10 p-2 hidden dark:block hover:rotate-12 rotate-0 transition-all" />
    </div>
  )
}
