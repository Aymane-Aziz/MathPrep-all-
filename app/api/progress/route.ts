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
        game1: 0,
        game2: 0,
        game3: 0,
        game4: 0,
        game5: 0,
        game6: 0,
        overallStar: 0,
        createdAt: now,
        updatedAt: now,
      }

      await db.collection("progress").insertOne(initialProgress)

      return NextResponse.json({
        ...initialProgress,
        userId: userId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      })
    }

    // Format dates for JSON response
    const formattedProgress = {
      ...progress,
      userId: progress.userId.toString(),
      createdAt: progress.createdAt.toISOString(),
      updatedAt: progress.updatedAt.toISOString(),
    }

    return NextResponse.json(formattedProgress)
  } catch (error) {
    console.error("Get progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
