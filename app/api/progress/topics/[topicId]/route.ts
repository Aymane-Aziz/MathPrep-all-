import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

export async function PUT(req: NextRequest, { params }: { params: { topicId: string } }) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId) {
      return unauthorized()
    }

    const { topicId } = params
    const progressData = await req.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")
    const progressCollection = db.collection("progress")

    // Find user progress
    const progress = await progressCollection.findOne({
      userId: new ObjectId(userId),
    })

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    // Check if topic already exists in progress
    const now = new Date()
    const topicIndex = progress.topics.findIndex((t: any) => t.id === topicId)

    if (topicIndex === -1) {
      // Add new topic progress
      await progressCollection.updateOne(
        { userId: new ObjectId(userId) },
        {
          $push: {
            topics: {
              id: topicId,
              ...progressData,
              lastAccessed: now,
            },
          },
          $set: { updatedAt: now },
        },
      )
    } else {
      // Update existing topic progress
      await progressCollection.updateOne(
        { userId: new ObjectId(userId), "topics.id": topicId },
        {
          $set: {
            "topics.$": {
              id: topicId,
              ...progressData,
              lastAccessed: now,
            },
            updatedAt: now,
          },
        },
      )
    }

    // Update total stars if provided
    if (progressData.stars !== undefined) {
      // Calculate total stars
      const updatedProgress = await progressCollection.findOne({
        userId: new ObjectId(userId),
      })

      const totalStars = updatedProgress.topics.reduce((sum: number, topic: any) => sum + (topic.stars || 0), 0)

      await progressCollection.updateOne({ userId: new ObjectId(userId) }, { $set: { totalStars, updatedAt: now } })
    }

    // Return updated progress
    const updatedProgress = await progressCollection.findOne({
      userId: new ObjectId(userId),
    })

    // Format dates for JSON response
    const formattedProgress = {
      ...updatedProgress,
      userId: updatedProgress.userId.toString(),
      createdAt: updatedProgress.createdAt.toISOString(),
      updatedAt: updatedProgress.updatedAt.toISOString(),
      lastLoginDate: updatedProgress.lastLoginDate.toISOString(),
      topics: updatedProgress.topics.map((topic: any) => ({
        ...topic,
        lastAccessed: topic.lastAccessed ? topic.lastAccessed.toISOString() : null,
      })),
      games: updatedProgress.games.map((game: any) => ({
        ...game,
        lastPlayed: game.lastPlayed ? game.lastPlayed.toISOString() : null,
      })),
    }

    return NextResponse.json(formattedProgress)
  } catch (error) {
    console.error("Update topic progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
