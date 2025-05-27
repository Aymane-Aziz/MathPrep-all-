"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { progressApi } from "@/lib/api"
import { useAuth } from "./auth-context"
import type { ProgressContextType, Progress } from "@/lib/auth-types"

// Create the progress context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

// Initial progress state
const initialProgress: Progress = {
  id: "",
  userId: "",
  game1: 0,
  game2: 0,
  game3: 0,
  game4: 0,
  game5: 0,
  game6: 0,
  overallStar: 0
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, user } = useAuth()

  // Fetch user progress when authenticated
  useEffect(() => {
    let mounted = true

    const initializeProgress = async () => {
      if (!isAuthenticated || !user) {
        setProgress(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const progressData = await progressApi.getProgress()
        if (mounted) {
          setProgress(progressData)
        }
      } catch (error: any) {
        console.error("Failed to fetch progress:", error)
        if (mounted) {
          setError(error.message || "Failed to load progress data")
          // Initialize with empty progress if we can't fetch from server
          if (!progress) {
            setProgress(initialProgress)
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeProgress()

    return () => {
      mounted = false
    }
  }, [isAuthenticated, user])

  // Refresh progress data
  const refreshProgress = async () => {
    if (!isAuthenticated) return

    setIsLoading(true)
    setError(null)

    try {
      const progressData = await progressApi.getProgress()
      setProgress(progressData)
    } catch (error: any) {
      console.error("Failed to fetch progress:", error)
      setError(error.message || "Failed to load progress data")
    } finally {
      setIsLoading(false)
    }
  }

  // Get game progress
  const getGameProgress = (gameId: string) => {
    if (!progress) return null
    const gameKey = `game${gameId}` as keyof Progress
    return {
      starsEarned: progress[gameKey] as number,
      levelsUnlocked: Math.floor((progress[gameKey] as number) / 10) + 1
    }
  }

  // Get game level
  const getGameLevel = (gameId: string) => {
    if (!progress) return 0
    const gameKey = `game${gameId}` as keyof Progress
    return Math.floor((progress[gameKey] as number) / 10) + 1
  }

  // Update game progress
  const updateGameProgress = async (gameId: string, stars: number) => {
    if (!isAuthenticated || !progress) return

    setIsLoading(true)

    try {
      // Optimistic update
      const gameKey = `game${gameId}` as keyof Progress
      const currentStars = progress[gameKey] as number
      const newStars = Math.max(currentStars, stars) // Keep the highest score
      const totalStars = Object.keys(progress)
        .filter(key => key.startsWith('game'))
        .reduce((sum, key) => sum + (progress[key as keyof Progress] as number), 0) + (newStars - currentStars)

      const updatedProgress = {
        ...progress,
        [gameKey]: newStars,
        overallStar: totalStars
      }

      setProgress(updatedProgress)

      // Send to server
      await progressApi.updateGameProgress(gameId, stars)
    } catch (error: any) {
      console.error("Failed to update game progress:", error)
      setError(error.message || "Failed to update progress")

      // Refresh to get correct state
      refreshProgress()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        error,
        updateGameProgress,
        refreshProgress,
        getGameProgress,
        getGameLevel,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
