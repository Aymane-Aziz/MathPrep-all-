import { NextRequest, NextResponse } from "next/server"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import clientPromise from "@/lib/mongodb"

export async function PUT(
  request: NextRequest,
  context: { params: { gameId: string } }
) {
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
    const progress = await db.collection("progress").findOne({ user_id: userId })

    // If progress doesn't exist, create it
    if (!progress) {
      const newProgress = {
        user_id: userId,
        game1: 0,
        game2: 0,
        game3: 0,
        game4: 0,
        game5: 0,
        game6: 0,
        overallStar: 0
      }
      await db.collection("progress").insertOne(newProgress)
    }

    // Get the latest progress (either existing or newly created)
    const currentProgress = await db.collection("progress").findOne({ user_id: userId })
    if (!currentProgress) {
      return NextResponse.json({ error: "Failed to create progress" }, { status: 500 })
    }

    // Update game score
    const gameKey = `game${context.params.gameId}`
    const currentScore = currentProgress[gameKey] || 0
    const newScore = Math.max(currentScore, stars) // Keep the highest score

    // Update the specific game's score and overall stars
    const result = await db.collection("progress").updateOne(
      { user_id: userId },
      {
        $set: {
          [gameKey]: newScore,
          overallStar: (currentProgress.overallStar || 0) + (newScore - currentScore) // Add the difference to overall stars
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
