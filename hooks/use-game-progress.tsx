"use client"

import { useState, useEffect } from "react"
import { useProgress } from "@/contexts/progress-context"
import { useAuth } from "@/contexts/auth-context"

export function useGameProgress(gameId: string, maxLevel = 10) {
  const { isAuthenticated } = useAuth()
  const { getGameProgress, updateGameProgress, getGameLevel } = useProgress()
  const [level, setLevel] = useState<number>(0)
  const [completionPercentage, setCompletionPercentage] = useState<number>(0)
  const [starsEarned, setStarsEarned] = useState<number>(0)
  const [levelsUnlocked, setLevelsUnlocked] = useState<number>(1)

  // Initialize from progress context or localStorage
  useEffect(() => {
    // Try to get from server first
    const gameProgress = getGameProgress(gameId)
    const savedLevel = getGameLevel(gameId)

    if (gameProgress) {
      // Use server data if available
      setLevel(savedLevel)
      setStarsEarned(gameProgress.starsEarned)
      setLevelsUnlocked(gameProgress.levelsUnlocked)
    } else {
      // Otherwise try to get from localStorage
      try {
        const savedLocalLevel = localStorage.getItem(`${gameId}_level`)
        const savedStars = localStorage.getItem(`${gameId}_stars`)
        const savedLevelsUnlocked = localStorage.getItem(`${gameId}_levels`)

        if (savedLocalLevel) setLevel(Number.parseInt(savedLocalLevel, 10))
        if (savedStars) setStarsEarned(Number.parseInt(savedStars, 10))
        if (savedLevelsUnlocked) setLevelsUnlocked(Number.parseInt(savedLevelsUnlocked, 10))
      } catch (error) {
        console.error("Error loading game progress from localStorage:", error)
      }
    }

    // Calculate completion percentage
    const percentage = Math.min((savedLevel / maxLevel) * 100, 100)
    setCompletionPercentage(percentage)
  }, [gameId, getGameProgress, getGameLevel, maxLevel])

  // Update level
  const updateLevel = (newLevel: number) => {
    if (newLevel > level) {
      setLevel(newLevel)

      // Calculate new completion percentage
      const percentage = Math.min((newLevel / maxLevel) * 100, 100)
      setCompletionPercentage(percentage)

      // Save to localStorage as backup
      try {
        localStorage.setItem(`${gameId}_level`, newLevel.toString())
      } catch (error) {
        console.error("Error saving level to localStorage:", error)
      }

      // If authenticated, update server
      if (isAuthenticated) {
        updateGameProgress(gameId, {
          level: newLevel,
          lastPlayed: new Date().toISOString(),
        })
      }
    }
  }

  // Update stars
  const updateStars = (newStars: number) => {
    const totalStars = starsEarned + newStars
    setStarsEarned(totalStars)

    // Save to localStorage as backup
    try {
      localStorage.setItem(`${gameId}_stars`, totalStars.toString())
    } catch (error) {
      console.error("Error saving stars to localStorage:", error)
    }

    // If authenticated, update server
    if (isAuthenticated) {
      updateGameProgress(gameId, {
        starsEarned: totalStars,
        lastPlayed: new Date().toISOString(),
      })
    }
  }

  // Unlock a new level
  const unlockLevel = (level: number) => {
    if (level > levelsUnlocked) {
      setLevelsUnlocked(level)

      // Save to localStorage as backup
      try {
        localStorage.setItem(`${gameId}_levels`, level.toString())
      } catch (error) {
        console.error("Error saving unlocked levels to localStorage:", error)
      }

      // If authenticated, update server
      if (isAuthenticated) {
        updateGameProgress(gameId, {
          levelsUnlocked: level,
          lastPlayed: new Date().toISOString(),
        })
      }
    }
  }

  return {
    level,
    completionPercentage,
    starsEarned,
    levelsUnlocked,
    updateLevel,
    updateStars,
    unlockLevel,
  }
}
