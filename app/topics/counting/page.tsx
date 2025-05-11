"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default function CountingPage() {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = 7

    if (userAnswer === correctAnswer) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pink-600">Counting</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> 95 Stars
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-pink-200">
            <CardHeader className="bg-pink-100">
              <CardTitle className="flex items-center gap-2 text-pink-700">
                <span className="text-2xl">📚</span> Let's Learn Counting!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Counting helps us know how many things we have!</p>

              <div className="rounded-lg bg-pink-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">We count from 1 to 10!</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">When we count objects, we assign one number to each object in order.</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>We always start counting from 1</li>
                  <li>Each object gets exactly one number</li>
                  <li>The last number tells us how many objects there are in total</li>
                  <li>Numbers always follow the same order: 1, 2, 3, 4, 5...</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">How many apples are there?</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="text-4xl">
                      🍎
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="h-12 w-20 text-center text-xl font-bold"
                    placeholder="?"
                  />
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={checkAnswer}
                    className="rounded-full bg-green-500 px-8 py-2 text-white hover:bg-green-600"
                    disabled={!answer}
                  >
                    Check Answer
                  </Button>
                </div>

                {isCorrect !== null && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {isCorrect ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Correct! There are 7 apples!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Try again! Count each apple one by one.</span>
                      </div>
                    )}
                  </div>
                )}
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
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting to 10</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <ProgressBar value={100} color="bg-purple-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting to 20</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <ProgressBar value={90} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting to 50</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <ProgressBar value={60} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting to 100</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <ProgressBar value={30} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 40 Stars Earned
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Card */}
          <Card className="overflow-hidden border-2 border-pink-200">
            <CardHeader className="bg-pink-100">
              <CardTitle className="text-pink-700">Challenge</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <span className="text-3xl">🥷</span>
                </div>
                <div>
                  <h3 className="font-bold">Number Ninja</h3>
                  <p className="text-sm text-slate-600">Count objects and select the right number!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-pink-500 text-white hover:bg-pink-600">
                <Link href="/games/number-ninja">Start Challenge</Link>
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
                  <span className="text-3xl">🔢</span>
                </div>
                <div>
                  <h3 className="font-bold">Skip Counting</h3>
                  <p className="text-sm text-slate-600">Learn to count by 2s, 5s, and 10s!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/counting/skip-counting">Continue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
