import clientPromise from "../lib/mongodb"
import bcrypt from "bcryptjs"

async function seedUsers() {
  try {
    const client = await clientPromise
    const db = client.db("mathworld")

    // Check if users already exist
    const existingUsers = await db
      .collection("users")
      .find({
        email: { $in: ["test@example.com", "student@example.com"] },
      })
      .toArray()

    if (existingUsers.length > 0) {
      console.log("Test users already exist. Skipping creation.")
      return
    }

    // Create test users
    const testUserPassword = await bcrypt.hash("password123", 10)
    const studentPassword = await bcrypt.hash("password456", 10)

    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: testUserPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const studentUser = {
      name: "Math Student",
      email: "student@example.com",
      password: studentPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertMany([testUser, studentUser])

    // Create initial progress documents
    const testUserProgress = {
      userId: result.insertedIds[0],
      topics: [
        { id: "addition", completed: true, stars: 3 },
        { id: "subtraction", completed: false, stars: 1 },
      ],
      games: [{ id: "addition-race", highScore: 120, timesPlayed: 5 }],
      totalStars: 4,
      totalScore: 120,
      streakDays: 2,
      lastLoginDate: new Date(),
    }

    const studentProgress = {
      userId: result.insertedIds[1],
      topics: [],
      games: [],
      totalStars: 0,
      totalScore: 0,
      streakDays: 0,
      lastLoginDate: new Date(),
    }

    await db.collection("progress").insertMany([testUserProgress, studentProgress])

    console.log("Test users created successfully!")
    console.log("Test User ID:", result.insertedIds[0])
    console.log("Student User ID:", result.insertedIds[1])
  } catch (error) {
    console.error("Error seeding users:", error)
  }
}

// Run the seed function
seedUsers()
