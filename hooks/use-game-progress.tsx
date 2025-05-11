"use client"

import { useState, useEffect } from "react"
import { useProgress } from "@/contexts/progress-context"
import { useAuth } from "@/contexts/auth-context"

export function useGameProgress(gameId: string) {
  const { isAuthenticated } = useAuth()
  const { getGameProgress, updateGameProgress } = useProgress()
  const [localHighScore, setLocalHighScore] = useState<number>(0)
  const [localStars, setLocalStars] = useState<number>(0)
  const [localLevelsUnlocked, setLocalLevelsUnlocked] = useState<number>(1)

  // Initialize from progress context or localStorage
  useEffect(() => {
    const gameProgress = getGameProgress(gameId)

    if (gameProgress) {
      // Use server data if available
      setLocalHighScore(gameProgress.highScore)
      setLocalStars(gameProgress.starsEarned)
      setLocalLevelsUnlocked(gameProgress.levelsUnlocked)
    } else {
      // Otherwise try to get from localStorage
      try {
        const savedHighScore = localStorage.getItem(`${gameId}_highScore`)
        const savedStars = localStorage.getItem(`${gameId}_stars`)
        const savedLevels = localStorage.getItem(`${gameId}_levels`)

        if (savedHighScore) setLocalHighScore(Number.parseInt(savedHighScore, 10))
        if (savedStars) setLocalStars(Number.parseInt(savedStars, 10))
        if (savedLevels) setLocalLevelsUnlocked(Number.parseInt(savedLevels, 10))
      } catch (error) {
        console.error("Error loading game progress from localStorage:", error)
      }
    }
  }, [gameId, getGameProgress])

  // Update high score
  const updateHighScore = (newScore: number) => {
    if (newScore > localHighScore) {
      setLocalHighScore(newScore)

      // Save to localStorage as backup
      try {
        localStorage.setItem(`${gameId}_highScore`, newScore.toString())
      } catch (error) {
        console.error("Error saving high score to localStorage:", error)
      }

      // If authenticated, update server
      if (isAuthenticated) {
        updateGameProgress(gameId, {
          highScore: newScore,
          lastPlayed: new Date().toISOString(),
        })
      }
    }
  }

  // Update stars
  const updateStars = (newStars: number) => {
    const totalStars = localStars + newStars
    setLocalStars(totalStars)

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
    if (level > localLevelsUnlocked) {
      setLocalLevelsUnlocked(level)

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
    highScore: localHighScore,
    stars: localStars,
    levelsUnlocked: localLevelsUnlocked,
    updateHighScore,
    updateStars,
    unlockLevel,
  }
}
