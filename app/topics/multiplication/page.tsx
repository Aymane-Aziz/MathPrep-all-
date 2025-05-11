"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default function MultiplicationPage() {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = 4 * 3

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
        <h1 className="text-3xl font-bold text-orange-600">Multiplication</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> 85 Stars
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-orange-200">
            <CardHeader className="bg-orange-100">
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <span className="text-2xl">📚</span> Let's Learn Multiplication!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Multiplication is a faster way to add the same number multiple times!</p>

              <div className="rounded-lg bg-orange-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-col gap-2">
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="mx-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="mx-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 4}
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="mx-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 7}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-medium">3 groups of 3 = 9</div>
                  </div>

                  <div className="text-3xl font-bold text-orange-500">=</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-5xl font-bold text-orange-600">3 × 3</div>
                    <div className="text-lg font-medium">3 multiplied by 3 = 9</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">When we multiply 3 × 3, we're adding 3 three times: 3 + 3 + 3 = 9!</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>The × sign means we're multiplying numbers</li>
                  <li>Multiplication is repeated addition</li>
                  <li>We can arrange objects in rows and columns to help us multiply!</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">What is 4 × 3?</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-col gap-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="m-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="m-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 5}
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="m-1 h-8 w-8 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-lg font-bold"
                          >
                            {i + 9}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-medium">3 rows of 4</div>
                  </div>

                  <div className="text-3xl font-bold text-green-500">=</div>

                  <div className="flex items-center">
                    <Input
                      type="number"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="h-12 w-20 text-center text-xl font-bold"
                      placeholder="?"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
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
                        <span>Correct! Great job! 4 × 3 = 12</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Try again! Count all the circles or add 4 + 4 + 4.</span>
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
                    <span className="text-sm font-medium">Multiplication Basics</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <ProgressBar value={60} color="bg-purple-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Multiplying by 2</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <ProgressBar value={100} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Multiplying by 3</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <ProgressBar value={75} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Multiplication Tables</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <ProgressBar value={25} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 30 Stars Earned
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Card */}
          <Card className="overflow-hidden border-2 border-orange-200">
            <CardHeader className="bg-orange-100">
              <CardTitle className="text-orange-700">Challenge</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <span className="text-3xl">⛰️</span>
                </div>
                <div>
                  <h3 className="font-bold">Multiplication Mountain</h3>
                  <p className="text-sm text-slate-600">Climb the mountain by solving multiplication problems!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600">
                <Link href="/games/multiplication-mountain">Start Challenge</Link>
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
                  <h3 className="font-bold">Multiplication Tables</h3>
                  <p className="text-sm text-slate-600">Learn the multiplication tables from 1 to 10!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/multiplication/tables">Continue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
