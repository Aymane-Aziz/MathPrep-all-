import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    const gameId = params.gameId

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")

    // Find user progress
    const progress = await db.collection("progress").findOne({
      userId: new ObjectId(userId),
    })

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    // Find game progress
    const gameProgress = progress.games.find((g: any) => g.gameId === gameId)

    if (!gameProgress) {
      return NextResponse.json({ error: "Game progress not found" }, { status: 404 })
    }

    // Format dates for JSON response
    const formattedGameProgress = {
      ...gameProgress,
      lastPlayed: gameProgress.lastPlayed ? gameProgress.lastPlayed.toISOString() : null,
    }

    // Return game progress
    return NextResponse.json({ gameProgress: formattedGameProgress })
  } catch (error) {
    console.error("Get game progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    const gameId = params.gameId
    const data = await req.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")

    // Find user progress
    const progress = await db.collection("progress").findOne({
      userId: new ObjectId(userId),
    })

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 })
    }

    // Update game progress
    const now = new Date()
    const games = progress.games || []
    const gameIndex = games.findIndex((g: any) => g.gameId === gameId)

    if (gameIndex >= 0) {
      // Update existing game progress
      games[gameIndex] = {
        ...games[gameIndex],
        ...data,
        lastPlayed: now,
      }
    } else {
      // Add new game progress
      games.push({
        gameId,
        level: 0,
        starsEarned: 0,
        levelsUnlocked: 1,
        lastPlayed: now,
        achievements: [],
        ...data,
      })
    }

    // Update progress document
    await db.collection("progress").updateOne(
      { userId: new ObjectId(userId) },
      {
        $set: {
          games,
          updatedAt: now,
        },
      },
    )

    // Return updated game progress
    const updatedGameProgress = games.find((g: any) => g.gameId === gameId)
    const formattedGameProgress = {
      ...updatedGameProgress,
      lastPlayed: updatedGameProgress.lastPlayed.toISOString(),
    }

    return NextResponse.json({ gameProgress: formattedGameProgress })
  } catch (error) {
    console.error("Update game progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
