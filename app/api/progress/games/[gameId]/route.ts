import { NextRequest, NextResponse } from "next/server"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const gameId = params.gameId // Extract the gameId parameter first
  
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(request)
    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    const { stars } = await request.json()
    if (typeof stars !== "number" || stars < 0) {
      return NextResponse.json({ error: "Invalid score value" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("mathworld")
    
    // Find the most recent progress document for this user
    const progress = await db.collection("progress").findOne(
      { userId: new ObjectId(userId) },
      { sort: { createdAt: -1 } }
    )

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    // Update game score in existing document
    const gameKey = `game${gameId}`
    const currentScore = progress[gameKey] || 0
    const newScore = Math.max(currentScore, stars) // Keep the highest score

    // Calculate new overall stars
    const totalStars = Object.keys(progress)
      .filter(key => key.startsWith('game'))
      .reduce((sum, key) => {
        if (key === gameKey) {
          return sum + newScore
        }
        return sum + (progress[key] || 0)
      }, 0)

    // Update the specific game's score and overall stars using the document's _id
    const result = await db.collection("progress").updateOne(
      { _id: progress._id },
      {
        $set: {
          [gameKey]: newScore,
          overallStar: totalStars,
          updatedAt: new Date()
        }
      }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
    }

    return NextResponse.json({ success: true, score: newScore })
  } catch (error) {
    console.error("Error updating game progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
