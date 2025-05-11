import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { signJWT } from "@/lib/jwt"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")
    const usersCollection = db.collection("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const now = new Date()
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      createdAt: now,
      updatedAt: now,
    })

    // Create initial progress document
    await db.collection("progress").insertOne({
      userId: result.insertedId,
      topics: [],
      games: [],
      totalStars: 0,
      totalScore: 0,
      streakDays: 0,
      lastLoginDate: now,
      createdAt: now,
      updatedAt: now,
    })

    // Create JWT token
    const token = await signJWT({
      userId: result.insertedId.toString(),
      email,
    })

    // Return user data and token
    return NextResponse.json(
      {
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
          createdAt: now.toISOString(),
        },
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
