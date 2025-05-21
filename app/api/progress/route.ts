import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")

    // Find user progress
    const progress = await db.collection("progress").findOne({
      userId: new ObjectId(userId),
    })

    if (!progress) {
      // Create initial progress if not found
      const now = new Date()
      const initialProgress = {
        userId: new ObjectId(userId),
        topics: [],
        games: [],
        totalStars: 0,
        totalScore: 0,
        streakDays: 0,
        lastLoginDate: now,
        createdAt: now,
        updatedAt: now,
      }

      await db.collection("progress").insertOne(initialProgress)

      return NextResponse.json({
        ...initialProgress,
        userId: userId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        lastLoginDate: now.toISOString(),
      })
    }

    // Format dates for JSON response
    const formattedProgress = {
      ...progress,
      userId: progress.userId.toString(),
      createdAt: progress.createdAt.toISOString(),
      updatedAt: progress.updatedAt.toISOString(),
      lastLoginDate: progress.lastLoginDate.toISOString(),
      topics: progress.topics.map((topic: any) => ({
        ...topic,
        lastAccessed: topic.lastAccessed ? topic.lastAccessed.toISOString() : null,
      })),
      games: progress.games.map((game: any) => ({
        ...game,
        lastPlayed: game.lastPlayed ? game.lastPlayed.toISOString() : null,
      })),
    }

    // Return progress data
    return NextResponse.json(formattedProgress)
  } catch (error) {
    console.error("Get progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
