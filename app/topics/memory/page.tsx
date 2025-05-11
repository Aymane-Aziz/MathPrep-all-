"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Badge } from "@/components/ui/badge"

export default function FractionsPage() {
  const [selectedFraction, setSelectedFraction] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    if (selectedFraction === "1/2") {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-600">Memory Skills</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> 55 Stars
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-yellow-200">
            <CardHeader className="bg-yellow-100">
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <span className="text-2xl">📚</span> Let's Learn About Memory Skills!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Memory skills help us remember and recall information!</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 h-32 w-32 flex items-center justify-center">
                      <div className="text-6xl">🧠</div>
                    </div>
                    <div className="text-lg font-medium">Working Memory</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 h-32 w-32 flex items-center justify-center">
                      <div className="text-6xl">📝</div>
                    </div>
                    <div className="text-lg font-medium">Visual Memory</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 h-32 w-32 flex items-center justify-center">
                      <div className="text-6xl">🔄</div>
                    </div>
                    <div className="text-lg font-medium">Pattern Recognition</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">Memory has different components that help us learn and solve problems.</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Working memory helps us hold information temporarily</li>
                  <li>Visual memory helps us remember what we see</li>
                  <li>Pattern recognition helps us identify similarities</li>
                  <li>Memory games improve our ability to learn and recall information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Try It Section */}
          <Card className="overflow-hidden border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">🎮</span> Try It!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="rounded-lg bg-white p-6 shadow-inner">
                <h3 className="mb-4 text-center text-xl font-bold">Test your memory with this quick exercise:</h3>

                <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:bg-green-50">
                    <div className="relative h-24 w-24 flex items-center justify-center bg-green-100 rounded-lg">
                      <div className="text-4xl">🍎</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:bg-green-50">
                    <div className="relative h-24 w-24 flex items-center justify-center bg-green-100 rounded-lg">
                      <div className="text-4xl">🍌</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:bg-green-50">
                    <div className="relative h-24 w-24 flex items-center justify-center bg-green-100 rounded-lg">
                      <div className="text-4xl">🍊</div>
                    </div>
                  </div>
                </div>

                <p className="text-center font-medium mb-4">
                  Look at these fruits for 5 seconds, then try to remember them!
                </p>

                <div className="flex justify-center">
                  <Button className="rounded-full bg-green-500 px-8 py-2 text-white hover:bg-green-600">
                    Test My Memory
                  </Button>
                </div>

                <div className="mt-4 text-center text-green-700">
                  <p>Memory games help improve focus, attention, and recall abilities!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <CardTitle className="text-purple-700">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {/* Update the progress card to show memory skills progress */}
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Memory Basics</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <ProgressBar value={70} color="bg-purple-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Visual Memory</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <ProgressBar value={85} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Pattern Recognition</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <ProgressBar value={40} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Working Memory</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <ProgressBar value={15} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 22 Stars Earned
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Card */}
          <Card className="overflow-hidden border-2 border-yellow-200">
            <CardHeader className="bg-yellow-100">
              <CardTitle className="text-yellow-700">Challenge</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <span className="text-3xl">🧠</span>
                </div>
                <div>
                  <h3 className="font-bold">Memory Match</h3>
                  <p className="text-sm text-slate-600">Test your memory by matching pairs of cards!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
                <Link href="/games/memory-match">Start Challenge</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Next Lesson Card */}
          <Card className="overflow-hidden border-2 border-blue-200">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-blue-700">Next Lesson</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="text-3xl">🧩</span>
                </div>
                <div>
                  <h3 className="font-bold">Pattern Recognition</h3>
                  <p className="text-sm text-slate-600">Learn how to identify and remember patterns!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/memory/patterns">Continue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
