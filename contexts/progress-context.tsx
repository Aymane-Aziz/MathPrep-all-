"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { progressApi } from "@/lib/api"
import { useAuth } from "./auth-context"
import type { ProgressContextType, UserProgress, Progress, GameProgress } from "@/lib/auth-types"

// Create the progress context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

// Initial progress state
const initialProgress: UserProgress = {
  topics: [],
  games: [],
  totalStars: 0,
  totalScore: 0,
  streakDays: 0,
  lastLoginDate: new Date().toISOString(),
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, user } = useAuth()

  // Fetch user progress when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshProgress()
    } else {
      setProgress(null)
      setIsLoading(false)
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

      // Initialize with empty progress if we can't fetch from server
      if (!progress) {
        setProgress(initialProgress)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Update topic progress
  const updateTopicProgress = async (topicId: string, data: Partial<Progress>) => {
    if (!isAuthenticated || !progress) return

    setIsLoading(true)

    try {
      // Optimistic update
      const updatedTopics = [...progress.topics]
      const topicIndex = updatedTopics.findIndex((t) => t.topicId === topicId)

      if (topicIndex >= 0) {
        updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], ...data }
      } else {
        updatedTopics.push({
          topicId,
          completed: 0,
          totalLessons: 0,
          lastAccessed: new Date().toISOString(),
          score: 0,
          stars: 0,
          ...data,
        })
      }

      // Calculate new totals
      const totalStars = updatedTopics.reduce((sum, topic) => sum + topic.stars, 0)
      const totalScore =
        updatedTopics.reduce((sum, topic) => sum + topic.score, 0) +
        progress.games.reduce((sum, game) => sum + game.highScore, 0)

      setProgress({
        ...progress,
        topics: updatedTopics,
        totalStars,
        totalScore,
      })

      // Send to server
      await progressApi.updateTopicProgress(topicId, data)
    } catch (error: any) {
      console.error("Failed to update topic progress:", error)
      setError(error.message || "Failed to update progress")

      // Refresh to get correct state
      refreshProgress()
    } finally {
      setIsLoading(false)
    }
  }

  // Update game progress
  const updateGameProgress = async (gameId: string, data: Partial<GameProgress>) => {
    if (!isAuthenticated || !progress) return

    setIsLoading(true)

    try {
      // Optimistic update
      const updatedGames = [...progress.games]
      const gameIndex = updatedGames.findIndex((g) => g.gameId === gameId)

      if (gameIndex >= 0) {
        updatedGames[gameIndex] = { ...updatedGames[gameIndex], ...data }
      } else {
        updatedGames.push({
          gameId,
          highScore: 0,
          starsEarned: 0,
          levelsUnlocked: 1,
          lastPlayed: new Date().toISOString(),
          achievements: [],
          ...data,
        })
      }

      // Calculate new totals
      const gameStars = updatedGames.reduce((sum, game) => sum + game.starsEarned, 0)
      const topicStars = progress.topics.reduce((sum, topic) => sum + topic.stars, 0)
      const totalScore =
        progress.topics.reduce((sum, topic) => sum + topic.score, 0) +
        updatedGames.reduce((sum, game) => sum + game.highScore, 0)

      setProgress({
        ...progress,
        games: updatedGames,
        totalStars: gameStars + topicStars,
        totalScore,
      })

      // Send to server
      await progressApi.updateGameProgress(gameId, data)
    } catch (error: any) {
      console.error("Failed to update game progress:", error)
      setError(error.message || "Failed to update progress")

      // Refresh to get correct state
      refreshProgress()
    } finally {
      setIsLoading(false)
    }
  }

  // Get topic progress
  const getTopicProgress = (topicId: string): Progress | undefined => {
    if (!progress) return undefined
    return progress.topics.find((t) => t.topicId === topicId)
  }

  // Get game progress
  const getGameProgress = (gameId: string): GameProgress | undefined => {
    if (!progress) return undefined
    return progress.games.find((g) => g.gameId === gameId)
  }

  // Context value
  const value: ProgressContextType = {
    progress,
    isLoading,
    error,
    updateTopicProgress,
    updateGameProgress,
    getTopicProgress,
    getGameProgress,
    refreshProgress,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// Custom hook to use the progress context
export function useProgress() {
  const context = useContext(ProgressContext)

  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }

  return context
}
