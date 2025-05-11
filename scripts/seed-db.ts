import clientPromise from "../lib/mongodb"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("mathworld")

    // Clear existing collections
    await db.collection("users").deleteMany({})
    await db.collection("progress").deleteMany({})
    await db.collection("achievements").deleteMany({})
    await db.collection("user_achievements").deleteMany({})

    console.log("Creating test users...")
    // Create test users
    const now = new Date()

    // Test user 1
    const hashedPassword1 = await bcrypt.hash("password123", 10)
    const user1 = await db.collection("users").insertOne({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword1,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Test%20User",
      createdAt: now,
      updatedAt: now,
    })

    // Test user 2
    const hashedPassword2 = await bcrypt.hash("password456", 10)
    const user2 = await db.collection("users").insertOne({
      name: "Math Student",
      email: "student@example.com",
      password: hashedPassword2,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Math%20Student",
      createdAt: now,
      updatedAt: now,
    })

    console.log("Creating initial progress records...")
    // Create initial progress records
    await db.collection("progress").insertOne({
      userId: user1.insertedId,
      topics: [
        {
          id: "addition",
          completed: true,
          stars: 3,
          lastAccessed: now,
        },
        {
          id: "subtraction",
          completed: false,
          stars: 1,
          lastAccessed: now,
        },
      ],
      games: [
        {
          id: "addition-race",
          highScore: 850,
          timesPlayed: 5,
          lastPlayed: now,
        },
      ],
      totalStars: 4,
      totalScore: 850,
      streakDays: 3,
      lastLoginDate: now,
      createdAt: now,
      updatedAt: now,
    })

    await db.collection("progress").insertOne({
      userId: user2.insertedId,
      topics: [],
      games: [],
      totalStars: 0,
      totalScore: 0,
      streakDays: 0,
      lastLoginDate: now,
      createdAt: now,
      updatedAt: now,
    })

    console.log("Creating achievements...")
    // Create achievements
    const achievements = [
      {
        _id: new ObjectId(),
        name: "Math Beginner",
        description: "Complete your first topic",
        icon: "award",
        category: "progress",
      },
      {
        _id: new ObjectId(),
        name: "Star Collector",
        description: "Earn 10 stars across all topics",
        icon: "star",
        category: "progress",
      },
      {
        _id: new ObjectId(),
        name: "Game Master",
        description: "Score over 1000 points in any game",
        icon: "trophy",
        category: "games",
      },
      {
        _id: new ObjectId(),
        name: "Math Streak",
        description: "Login for 7 consecutive days",
        icon: "flame",
        category: "engagement",
      },
      {
        _id: new ObjectId(),
        name: "Shape Expert",
        description: "Complete all shape challenges",
        icon: "shapes",
        category: "topics",
      },
    ]

    await db.collection("achievements").insertMany(achievements)

    // Unlock an achievement for test user 1
    await db.collection("user_achievements").insertOne({
      userId: user1.insertedId,
      unlockedAchievements: [
        {
          id: achievements[0]._id.toString(),
          unlockedAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    })

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
