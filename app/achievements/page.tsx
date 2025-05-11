"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

// Define achievement types
type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  category: string
  points: number
  isUnlocked: boolean
  unlockedAt?: string
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch achievements data
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockAchievements: Achievement[] = [
          {
            id: "1",
            title: "First Steps",
            description: "Complete your first lesson",
            icon: "🎯",
            category: "progress",
            points: 10,
            isUnlocked: true,
            unlockedAt: "2023-05-15T10:30:00Z",
          },
          {
            id: "2",
            title: "Perfect Score",
            description: "Get 100% on any quiz",
            icon: "🏆",
            category: "mastery",
            points: 20,
            isUnlocked: true,
            unlockedAt: "2023-05-16T14:20:00Z",
          },
          {
            id: "3",
            title: "Speed Demon",
            description: "Complete 5 exercises in under 2 minutes",
            icon: "⚡",
            category: "speed",
            points: 15,
            isUnlocked: false,
          },
          {
            id: "4",
            title: "Math Wizard",
            description: "Solve 50 math problems correctly",
            icon: "🧙‍♂️",
            category: "mastery",
            points: 30,
            isUnlocked: false,
          },
          {
            id: "5",
            title: "Explorer",
            description: "Try all available math topics",
            icon: "🧭",
            category: "exploration",
            points: 25,
            isUnlocked: false,
          },
          {
            id: "6",
            title: "Persistent",
            description: "Log in for 5 consecutive days",
            icon: "📅",
            category: "engagement",
            points: 15,
            isUnlocked: true,
            unlockedAt: "2023-05-20T09:15:00Z",
          },
          {
            id: "7",
            title: "Addition Master",
            description: "Complete all addition exercises",
            icon: "➕",
            category: "mastery",
            points: 20,
            isUnlocked: false,
          },
          {
            id: "8",
            title: "Subtraction Star",
            description: "Complete all subtraction exercises",
            icon: "➖",
            category: "mastery",
            points: 20,
            isUnlocked: false,
          },
          {
            id: "9",
            title: "Multiplication Hero",
            description: "Complete all multiplication exercises",
            icon: "✖️",
            category: "mastery",
            points: 25,
            isUnlocked: false,
          },
          {
            id: "10",
            title: "Shape Expert",
            description: "Identify all shapes correctly",
            icon: "⭐",
            category: "mastery",
            points: 15,
            isUnlocked: true,
            unlockedAt: "2023-05-18T11:45:00Z",
          },
          {
            id: "11",
            title: "Game Champion",
            description: "Win 10 math games",
            icon: "🎮",
            category: "games",
            points: 30,
            isUnlocked: false,
          },
          {
            id: "12",
            title: "Helper",
            description: "Help a friend with a math problem",
            icon: "🤝",
            category: "social",
            points: 10,
            isUnlocked: false,
          },
        ]

        setAchievements(mockAchievements)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch achievements:", error)
        setError("Failed to load achievements. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  // Calculate stats
  const totalAchievements = achievements.length
  const unlockedAchievements = achievements.filter((a) => a.isUnlocked).length
  const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0)
  const earnedPoints = achievements.filter((a) => a.isUnlocked).reduce((sum, a) => sum + a.points, 0)

  // Get unique categories
  const categories = Array.from(new Set(achievements.map((a) => a.category)))

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-lg text-gray-600">Loading achievements...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold text-blue-700">My Achievements</h1>

      {/* Achievement Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-700">Total Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {unlockedAchievements} / {totalAchievements}
            </p>
            <CardDescription>{Math.round((unlockedAchievements / totalAchievements) * 100)}% completed</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-700">Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {earnedPoints} / {totalPoints}
            </p>
            <CardDescription>Keep going to earn more!</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-700">Latest Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.filter((a) => a.isUnlocked).length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {achievements
                    .filter((a) => a.isUnlocked)
                    .sort((a, b) => {
                      if (!a.unlockedAt || !b.unlockedAt) return 0
                      return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
                    })[0]?.icon || "🏆"}
                </span>
                <div>
                  <p className="font-medium">
                    {achievements
                      .filter((a) => a.isUnlocked)
                      .sort((a, b) => {
                        if (!a.unlockedAt || !b.unlockedAt) return 0
                        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
                      })[0]?.title || "None"}
                  </p>
                  <CardDescription>
                    {achievements
                      .filter((a) => a.isUnlocked)
                      .sort((a, b) => {
                        if (!a.unlockedAt || !b.unlockedAt) return 0
                        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
                      })[0]?.unlockedAt
                      ? new Date(
                          achievements
                            .filter((a) => a.isUnlocked)
                            .sort((a, b) => {
                              if (!a.unlockedAt || !b.unlockedAt) return 0
                              return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
                            })[0]?.unlockedAt as string,
                        ).toLocaleDateString()
                      : ""}
                  </CardDescription>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No achievements yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-700">Next Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.filter((a) => !a.isUnlocked).length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl opacity-50">
                  {achievements.filter((a) => !a.isUnlocked)[0]?.icon || "🔒"}
                </span>
                <div>
                  <p className="font-medium">
                    {achievements.filter((a) => !a.isUnlocked)[0]?.title || "All completed!"}
                  </p>
                  <CardDescription>
                    {achievements.filter((a) => !a.isUnlocked)[0]?.description || "Congratulations!"}
                  </CardDescription>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">All achievements unlocked!</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievement Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
          <TabsTrigger value="locked">Locked</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {/* All Achievements */}
        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`transition-all duration-300 hover:shadow-md ${
                  achievement.isUnlocked
                    ? "border-2 border-green-200 bg-gradient-to-br from-green-50 to-white"
                    : "border border-gray-200 bg-gray-50 opacity-75"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    </div>
                    <Badge variant={achievement.isUnlocked ? "default" : "outline"}>{achievement.points} pts</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.isUnlocked && achievement.unlockedAt && (
                    <p className="mt-2 text-xs text-gray-500">
                      Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unlocked Achievements */}
        <TabsContent value="unlocked">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.filter((a) => a.isUnlocked).length > 0 ? (
              achievements
                .filter((a) => a.isUnlocked)
                .map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white transition-all duration-300 hover:shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        </div>
                        <Badge>{achievement.points} pts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="mt-2 text-xs text-gray-500">
                          Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="col-span-full rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-500">No achievements unlocked yet. Keep learning to earn achievements!</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Locked Achievements */}
        <TabsContent value="locked">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.filter((a) => !a.isUnlocked).length > 0 ? (
              achievements
                .filter((a) => !a.isUnlocked)
                .map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="border border-gray-200 bg-gray-50 opacity-75 transition-all duration-300 hover:shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl opacity-50">{achievement.icon}</span>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        </div>
                        <Badge variant="outline">{achievement.points} pts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="col-span-full rounded-lg bg-green-50 p-8 text-center">
                <p className="text-green-700">Congratulations! You've unlocked all achievements!</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories">
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-semibold capitalize text-blue-700">{category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {achievements
                    .filter((a) => a.category === category)
                    .map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`transition-all duration-300 hover:shadow-md ${
                          achievement.isUnlocked
                            ? "border-2 border-green-200 bg-gradient-to-br from-green-50 to-white"
                            : "border border-gray-200 bg-gray-50 opacity-75"
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{achievement.icon}</span>
                              <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            </div>
                            <Badge variant={achievement.isUnlocked ? "default" : "outline"}>
                              {achievement.points} pts
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.isUnlocked && achievement.unlockedAt && (
                            <p className="mt-2 text-xs text-gray-500">
                              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
