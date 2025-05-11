import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")
    const usersCollection = db.collection("users")

    // Check if user exists
    const user = await usersCollection.findOne({ email })

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json({ message: "If your email is registered, you will receive a password reset link" })
    }

    // In a real application, you would:
    // 1. Generate a password reset token
    // 2. Store it in the database with an expiration
    // 3. Send an email with a link containing the token

    // For this demo, we'll just return a success message
    return NextResponse.json({ message: "If your email is registered, you will receive a password reset link" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
