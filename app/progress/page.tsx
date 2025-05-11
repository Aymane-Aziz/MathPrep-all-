"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useProgress } from "@/contexts/progress-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Calendar, BarChart3, PieChart, Activity, Award, Clock, Trophy, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import { ProgressChart } from "@/components/progress-chart"
import { TopicProgressChart } from "@/components/topic-progress-chart"
import { TimeSpentChart } from "@/components/time-spent-chart"
import { StrengthsChart } from "@/components/strengths-chart"
import { ActivityFeed } from "@/components/activity-feed"
import { AchievementTimeline } from "@/components/achievement-timeline"

export default function ProgressAnalyticsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { progress, isLoading: progressLoading } = useProgress()
  const [timeRange, setTimeRange] = useState("month")

  if (authLoading || progressLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-lg">Loading your progress data...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12">
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-center text-2xl text-blue-700">Sign In Required</CardTitle>
            <CardDescription className="text-center">Please sign in to view your progress analytics</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Button asChild className="mt-4 bg-blue-500 hover:bg-blue-600">
              <Link href="/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-3xl font-bold text-blue-600">My Learning Progress</h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past 3 Months</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Stars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{progress?.totalStars || 0}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {timeRange === "week" ? "+12 this week" : timeRange === "month" ? "+45 this month" : "+120 all time"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{progress?.totalScore || 0}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {timeRange === "week" ? "+250 this week" : timeRange === "month" ? "+980 this month" : "+2450 all time"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">
                {progress?.topics.reduce((sum, topic) => sum + topic.completed, 0) || 0}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {timeRange === "week" ? "+5 this week" : timeRange === "month" ? "+18 this month" : "+42 all time"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Daily Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">{progress?.streakDays || 0} days</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Best streak: 14 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Progress Over Time */}
            <Card className="border-blue-100 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <BarChart3 className="mr-2 h-5 w-5" /> Progress Over Time
                </CardTitle>
                <CardDescription>Your learning progress across all topics</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ProgressChart timeRange={timeRange} />
              </CardContent>
            </Card>

            {/* Topic Progress */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <PieChart className="mr-2 h-5 w-5" /> Topic Progress
                </CardTitle>
                <CardDescription>Completion percentage by topic</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <TopicProgressChart />
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Activity className="mr-2 h-5 w-5" /> Strengths & Weaknesses
                </CardTitle>
                <CardDescription>Your performance across different skills</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <StrengthsChart />
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Award className="mr-2 h-5 w-5" /> Recent Achievements
                </CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-yellow-100 p-2 text-yellow-600">🏆</div>
                      <div>
                        <h4 className="font-medium">Math Explorer</h4>
                        <p className="text-sm text-gray-500">Visited all topic areas</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">3 days ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600">⭐</div>
                      <div>
                        <h4 className="font-medium">Perfect Score</h4>
                        <p className="text-sm text-gray-500">Got 100% on Addition quiz</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">1 week ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-purple-100 p-2 text-purple-600">🎮</div>
                      <div>
                        <h4 className="font-medium">Game Master</h4>
                        <p className="text-sm text-gray-500">Completed all levels in Shape Sorter</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">2 weeks ago</Badge>
                  </div>
                </div>
                <Button variant="link" className="mt-2 w-full text-blue-600">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Time Spent */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Clock className="mr-2 h-5 w-5" /> Time Spent
                </CardTitle>
                <CardDescription>Distribution of your learning time</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <TimeSpentChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Topic Progress</CardTitle>
              <CardDescription>Your progress across all math topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Addition Topic */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-blue-100 p-1.5 text-blue-700">➕</div>
                      <h3 className="font-medium">Addition</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 12
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 320
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last activity: 2 days ago</span>
                    <span className="ml-4">Completed: 6/7 lessons</span>
                  </div>
                </div>

                {/* Subtraction Topic */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-red-100 p-1.5 text-red-700">➖</div>
                      <h3 className="font-medium">Subtraction</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 8
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 240
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last activity: 5 days ago</span>
                    <span className="ml-4">Completed: 3/5 lessons</span>
                  </div>
                </div>

                {/* Multiplication Topic */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-green-100 p-1.5 text-green-700">✖️</div>
                      <h3 className="font-medium">Multiplication</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 15
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 380
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last activity: 1 day ago</span>
                    <span className="ml-4">Completed: 6/8 lessons</span>
                  </div>
                </div>

                {/* Shapes Topic */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-purple-100 p-1.5 text-purple-700">🔷</div>
                      <h3 className="font-medium">Shapes</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 10
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 290
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last activity: 3 days ago</span>
                    <span className="ml-4">Completed: 2/5 lessons</span>
                  </div>
                </div>

                {/* Counting Topic */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-orange-100 p-1.5 text-orange-700">🔢</div>
                      <h3 className="font-medium">Counting</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 5
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 150
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last activity: 1 week ago</span>
                    <span className="ml-4">Completed: 4/4 lessons</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Games Tab */}
        <TabsContent value="games" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Game Performance</CardTitle>
              <CardDescription>Your progress and scores in math games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Addition Race Game */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-blue-100 p-1.5 text-blue-700">🏎️</div>
                      <h3 className="font-medium">Addition Race</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 8
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 520
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Levels Unlocked</span>
                    <span className="text-xs font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last played: 1 day ago</span>
                    <span className="ml-4">Best time: 45 seconds</span>
                  </div>
                </div>

                {/* Subtraction Submarine Game */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-cyan-100 p-1.5 text-cyan-700">🚢</div>
                      <h3 className="font-medium">Subtraction Submarine</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 6
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 380
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Levels Unlocked</span>
                    <span className="text-xs font-medium">2/5</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last played: 3 days ago</span>
                    <span className="ml-4">Highest depth: 250m</span>
                  </div>
                </div>

                {/* Multiplication Mountain Game */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-green-100 p-1.5 text-green-700">⛰️</div>
                      <h3 className="font-medium">Multiplication Mountain</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 12
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 640
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Levels Unlocked</span>
                    <span className="text-xs font-medium">4/5</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last played: 2 days ago</span>
                    <span className="ml-4">Highest altitude: 8000m</span>
                  </div>
                </div>

                {/* Shape Sorter Game */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-purple-100 p-1.5 text-purple-700">🧩</div>
                      <h3 className="font-medium">Shape Sorter</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 15
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 720
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Levels Unlocked</span>
                    <span className="text-xs font-medium">5/5</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last played: Today</span>
                    <span className="ml-4">Perfect sorts: 12</span>
                  </div>
                </div>

                {/* Memory Match Game */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-pink-100 p-1.5 text-pink-700">🧠</div>
                      <h3 className="font-medium">Memory Match</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <Star className="mr-1 h-3 w-3" /> 9
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Trophy className="mr-1 h-3 w-3" /> 450
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium">Levels Unlocked</span>
                    <span className="text-xs font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Last played: 4 days ago</span>
                    <span className="ml-4">Best time: 32 seconds</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Achievement Timeline</CardTitle>
              <CardDescription>Your learning milestones over time</CardDescription>
            </CardHeader>
            <CardContent>
              <AchievementTimeline />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Recent Activity</CardTitle>
              <CardDescription>Your learning activities in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
