import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

// Define all possible achievements
const allAchievements = [
  {
    id: "topic-master",
    name: "Topic Master",
    description: "Complete all lessons in a topic",
    icon: "📚",
    category: "topics",
    maxProgress: 1,
    reward: 50,
  },
  {
    id: "math-explorer",
    name: "Math Explorer",
    description: "Visit all topic areas",
    icon: "🧭",
    category: "topics",
    maxProgress: 6,
    reward: 30,
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on any lesson quiz",
    icon: "🎯",
    category: "topics",
    maxProgress: 1,
    reward: 20,
  },
  {
    id: "high-scorer",
    name: "High Scorer",
    description: "Score over 500 points in any game",
    icon: "🏆",
    category: "games",
    maxProgress: 500,
    reward: 25,
  },
  {
    id: "game-master",
    name: "Game Master",
    description: "Complete all levels in any game",
    icon: "🎮",
    category: "games",
    maxProgress: 5,
    reward: 40,
  },
  {
    id: "memory-champion",
    name: "Memory Champion",
    description: "Match all pairs in the Memory Match game in under 30 seconds",
    icon: "🧠",
    category: "games",
    maxProgress: 1,
    reward: 35,
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Log in for 7 days in a row",
    icon: "🔥",
    category: "general",
    maxProgress: 7,
    reward: 50,
  },
  {
    id: "star-collector",
    name: "Star Collector",
    description: "Collect 50 stars across all activities",
    icon: "⭐",
    category: "general",
    maxProgress: 50,
    reward: 30,
  },
]

export async function GET(req: NextRequest) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId) {
      return unauthorized()
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")

    // Convert userId to ObjectId
    const userObjectId = new ObjectId(userId.toString())

    // Get user progress for calculating achievement progress
    const progress = await db.collection("progress").findOne({
      userId: userObjectId,
    })

    // Get user achievements
    const userAchievements = await db
      .collection("achievements")
      .find({
        userId: userObjectId,
      })
      .toArray()

    // Map of achievement IDs to user achievements
    const userAchievementMap = new Map(userAchievements.map((achievement) => [achievement.achievementId, achievement]))

    // Get all achievements with user progress
    const achievements = allAchievements.map((achievement) => {
      const userAchievement = userAchievementMap.get(achievement.id)
      let currentProgress = 0
      let unlocked = false

      if (userAchievement) {
        currentProgress = userAchievement.progress
        unlocked = userAchievement.unlocked
      } else {
        // Calculate progress based on user's overall progress
        switch (achievement.id) {
          case "streak-master":
            currentProgress = progress?.streakDays || 0
            break
          case "star-collector":
            currentProgress = progress?.totalStars || 0
            break
          // Add more cases for other achievements
        }
      }

      return {
        ...achievement,
        progress: currentProgress,
        unlocked: unlocked || currentProgress >= achievement.maxProgress,
      }
    })

    return NextResponse.json(achievements)
  } catch (error) {
    console.error("Get achievements error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
