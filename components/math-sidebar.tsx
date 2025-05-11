"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, ChevronRight, Menu, Home, BookOpen, Gamepad2, User, Settings } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function MathSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState({
    topics: true,
    games: false,
    account: false,
    settings: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const Sidebar = (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/">
            <h2 className="mb-2 flex items-center text-lg font-semibold tracking-tight text-blue-600">
              <Home className="mr-2 h-5 w-5" />
              Math World
            </h2>
          </Link>
          <div className="text-xs text-muted-foreground">Fun math learning for kids</div>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Link href="/" passHref>
              <Button variant={isActive("/") ? "secondary" : "ghost"} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Topics Section */}
        <div className="px-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              <BookOpen className="mr-2 inline-block h-5 w-5" />
              Topics
            </h2>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("topics")} className="h-7 w-7">
              {openSections.topics ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          {openSections.topics && (
            <div className="space-y-1">
              <Link href="/topics/addition" passHref>
                <Button variant={isActive("/topics/addition") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">➕</span>
                  Addition
                </Button>
              </Link>
              <Link href="/topics/subtraction" passHref>
                <Button
                  variant={isActive("/topics/subtraction") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">➖</span>
                  Subtraction
                </Button>
              </Link>
              <Link href="/topics/multiplication" passHref>
                <Button
                  variant={isActive("/topics/multiplication") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">✖️</span>
                  Multiplication
                </Button>
              </Link>
              <Link href="/topics/shapes" passHref>
                <Button variant={isActive("/topics/shapes") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">🔷</span>
                  Shapes
                </Button>
              </Link>
              <Link href="/topics/counting" passHref>
                <Button variant={isActive("/topics/counting") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">🔢</span>
                  Counting
                </Button>
              </Link>
              <Link href="/topics/memory" passHref>
                <Button variant={isActive("/topics/memory") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">🧠</span>
                  Memory
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Games Section */}
        <div className="px-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              <Gamepad2 className="mr-2 inline-block h-5 w-5" />
              Games
            </h2>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("games")} className="h-7 w-7">
              {openSections.games ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          {openSections.games && (
            <div className="space-y-1">
              <Link href="/games/addition-race" passHref>
                <Button
                  variant={isActive("/games/addition-race") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🏎️</span>
                  Addition Race
                </Button>
              </Link>
              <Link href="/games/subtraction-submarine" passHref>
                <Button
                  variant={isActive("/games/subtraction-submarine") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🚢</span>
                  Subtraction Submarine
                </Button>
              </Link>
              <Link href="/games/multiplication-mountain" passHref>
                <Button
                  variant={isActive("/games/multiplication-mountain") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">⛰️</span>
                  Multiplication Mountain
                </Button>
              </Link>
              <Link href="/games/shape-sorter" passHref>
                <Button
                  variant={isActive("/games/shape-sorter") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🧩</span>
                  Shape Sorter
                </Button>
              </Link>
              <Link href="/games/memory-match" passHref>
                <Button
                  variant={isActive("/games/memory-match") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🎴</span>
                  Memory Match
                </Button>
              </Link>
              <Link href="/games/number-ninja" passHref>
                <Button
                  variant={isActive("/games/number-ninja") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🥷</span>
                  Number Ninja
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Account Section */}
        <div className="px-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              <User className="mr-2 inline-block h-5 w-5" />
              Account
            </h2>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("account")} className="h-7 w-7">
              {openSections.account ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          {openSections.account && (
            <div className="space-y-1">
              <Link href="/profile" passHref>
                <Button variant={isActive("/profile") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">👤</span>
                  Profile
                </Button>
              </Link>
              <Link href="/achievements" passHref>
                <Button variant={isActive("/achievements") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">🏆</span>
                  Achievements
                </Button>
              </Link>
              <Link href="/progress" passHref>
                <Button variant={isActive("/progress") ? "secondary" : "ghost"} className="w-full justify-start">
                  <span className="mr-2">📊</span>
                  Progress
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="px-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              <Settings className="mr-2 inline-block h-5 w-5" />
              Settings
            </h2>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("settings")} className="h-7 w-7">
              {openSections.settings ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          {openSections.settings && (
            <div className="space-y-1">
              <Link href="/settings" passHref>
                <Button
                  variant={isActive("/settings") && !isActive("/settings/preferences") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">⚙️</span>
                  General Settings
                </Button>
              </Link>
              <Link href="/settings/preferences" passHref>
                <Button
                  variant={isActive("/settings/preferences") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <span className="mr-2">🔧</span>
                  Preferences
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 border-r md:block">
        <ScrollArea className="h-full py-6">{Sidebar}</ScrollArea>
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="ml-2 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <ScrollArea className="h-full py-6">{Sidebar}</ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}
