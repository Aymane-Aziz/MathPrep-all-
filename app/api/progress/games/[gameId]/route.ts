import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

export async function PUT(req: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId) {
      return unauthorized()
    }

    const { gameId } = params
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

    // Check if game already exists in progress
    const now = new Date()
    const gameIndex = progress.games.findIndex((g: any) => g.id === gameId)

    if (gameIndex === -1) {
      // Add new game progress
      await progressCollection.updateOne(
        { userId: new ObjectId(userId) },
        {
          $push: {
            games: {
              id: gameId,
              ...progressData,
              lastPlayed: now,
            },
          },
          $set: { updatedAt: now },
        },
      )
    } else {
      // Update existing game progress
      await progressCollection.updateOne(
        { userId: new ObjectId(userId), "games.id": gameId },
        {
          $set: {
            "games.$": {
              id: gameId,
              ...progressData,
              lastPlayed: now,
            },
            updatedAt: now,
          },
        },
      )
    }

    // Update total score if provided
    if (progressData.score !== undefined) {
      // Calculate total score
      const updatedProgress = await progressCollection.findOne({
        userId: new ObjectId(userId),
      })

      const totalScore = updatedProgress.games.reduce((sum: number, game: any) => sum + (game.score || 0), 0)

      await progressCollection.updateOne({ userId: new ObjectId(userId) }, { $set: { totalScore, updatedAt: now } })
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
    console.error("Update game progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
