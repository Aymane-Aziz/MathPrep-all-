import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest, { params }: { params: { achievementId: string } }) {
  try {
    const achievementId = params.achievementId

    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    // Get progress data from request body
    const { progress } = await req.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")

    // Check if achievement already exists for user
    const existingAchievement = await db.collection("achievements").findOne({
      userId: new ObjectId(userId),
      achievementId,
    })

    const now = new Date()

    if (existingAchievement) {
      // Update existing achievement
      await db.collection("achievements").updateOne(
        { _id: existingAchievement._id },
        {
          $set: {
            progress: progress,
            unlocked: true,
            unlockedAt: now,
            updatedAt: now,
          },
        },
      )
    } else {
      // Create new achievement
      await db.collection("achievements").insertOne({
        userId: new ObjectId(userId),
        achievementId,
        progress: progress,
        unlocked: true,
        unlockedAt: now,
        createdAt: now,
        updatedAt: now,
      })
    }

    // Update user's total stars in progress collection
    const achievement = await db.collection("achievements").findOne({
      achievementId,
    })

    if (achievement && achievement.reward) {
      await db
        .collection("progress")
        .updateOne({ userId: new ObjectId(userId) }, { $inc: { totalStars: achievement.reward } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unlock achievement error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
