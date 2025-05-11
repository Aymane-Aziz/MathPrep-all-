"use client"

import { useState, useEffect } from "react"
import { useProgress } from "@/contexts/progress-context"
import { useAuth } from "@/contexts/auth-context"

export function useTopicProgress(topicId: string) {
  const { isAuthenticated } = useAuth()
  const { getTopicProgress, updateTopicProgress } = useProgress()
  const [localCompleted, setLocalCompleted] = useState<number>(0)
  const [localTotalLessons, setLocalTotalLessons] = useState<number>(0)
  const [localScore, setLocalScore] = useState<number>(0)
  const [localStars, setLocalStars] = useState<number>(0)

  // Initialize from progress context or localStorage
  useEffect(() => {
    const topicProgress = getTopicProgress(topicId)

    if (topicProgress) {
      // Use server data if available
      setLocalCompleted(topicProgress.completed)
      setLocalTotalLessons(topicProgress.totalLessons)
      setLocalScore(topicProgress.score)
      setLocalStars(topicProgress.stars)
    } else {
      // Otherwise try to get from localStorage
      try {
        const savedCompleted = localStorage.getItem(`${topicId}_completed`)
        const savedTotal = localStorage.getItem(`${topicId}_total`)
        const savedScore = localStorage.getItem(`${topicId}_score`)
        const savedStars = localStorage.getItem(`${topicId}_stars`)

        if (savedCompleted) setLocalCompleted(Number.parseInt(savedCompleted, 10))
        if (savedTotal) setLocalTotalLessons(Number.parseInt(savedTotal, 10))
        if (savedScore) setLocalScore(Number.parseInt(savedScore, 10))
        if (savedStars) setLocalStars(Number.parseInt(savedStars, 10))
      } catch (error) {
        console.error("Error loading topic progress from localStorage:", error)
      }
    }
  }, [topicId, getTopicProgress])

  // Mark a lesson as completed
  const completeLesson = (lessonId: string, earnedScore = 0, earnedStars = 0) => {
    // Update local state
    setLocalCompleted((prev) => prev + 1)
    setLocalScore((prev) => prev + earnedScore)
    setLocalStars((prev) => prev + earnedStars)

    // Save to localStorage as backup
    try {
      localStorage.setItem(`${topicId}_completed`, (localCompleted + 1).toString())
      localStorage.setItem(`${topicId}_score`, (localScore + earnedScore).toString())
      localStorage.setItem(`${topicId}_stars`, (localStars + earnedStars).toString())
    } catch (error) {
      console.error("Error saving topic progress to localStorage:", error)
    }

    // If authenticated, update server
    if (isAuthenticated) {
      updateTopicProgress(topicId, {
        completed: localCompleted + 1,
        score: localScore + earnedScore,
        stars: localStars + earnedStars,
        lastAccessed: new Date().toISOString(),
      })
    }
  }

  // Set total lessons for a topic
  const setTotalLessons = (total: number) => {
    if (total !== localTotalLessons) {
      setLocalTotalLessons(total)

      // Save to localStorage as backup
      try {
        localStorage.setItem(`${topicId}_total`, total.toString())
      } catch (error) {
        console.error("Error saving total lessons to localStorage:", error)
      }

      // If authenticated, update server
      if (isAuthenticated) {
        updateTopicProgress(topicId, {
          totalLessons: total,
        })
      }
    }
  }

  // Calculate progress percentage
  const progressPercentage = localTotalLessons > 0 ? Math.round((localCompleted / localTotalLessons) * 100) : 0

  return {
    completed: localCompleted,
    totalLessons: localTotalLessons,
    score: localScore,
    stars: localStars,
    progressPercentage,
    completeLesson,
    setTotalLessons,
  }
}
