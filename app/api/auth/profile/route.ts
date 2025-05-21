import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest, unauthorized } from "@/lib/auth-middleware"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

export async function PUT(req: NextRequest) {
  try {
    // Authenticate request
    const { authenticated, userId } = await authenticateRequest(req)

    if (!authenticated || !userId || typeof userId !== 'string') {
      return unauthorized()
    }

    // Get request body
    const { name, email, currentPassword, newPassword, avatar } = await req.json()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("mathworld")
    const usersCollection = db.collection("users")

    // Find user
    const user = await usersCollection.findOne({
      _id: new ObjectId(userId),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (name) updateData.name = name
    if (email) updateData.email = email
    if (avatar) updateData.avatar = avatar

    // If password change is requested
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }

      // Hash new password
      updateData.password = await bcrypt.hash(newPassword, 10)
    }

    // Update user
    await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateData })

    // Return updated user data
    const updatedUser = await usersCollection.findOne({
      _id: new ObjectId(userId),
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to retrieve updated user data" }, { status: 500 })
    }

    return NextResponse.json({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
