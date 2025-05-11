"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default function SubtractionPage() {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = 8 - 3

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
        <h1 className="text-3xl font-bold text-purple-600">Subtraction</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> 75 Stars
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <span className="text-2xl">📚</span> Let's Learn Subtraction!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Subtraction means taking away numbers to find what's left!</p>

              <div className="rounded-lg bg-purple-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">5</div>
                  </div>

                  <div className="text-3xl font-bold text-purple-500">-</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">2</div>
                  </div>

                  <div className="text-3xl font-bold text-purple-500">=</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">3</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">When we subtract 2 from 5, we get 3!</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>The - sign means we're taking away numbers</li>
                  <li>The = sign shows the answer (or difference)</li>
                  <li>We can cross out objects to help us subtract!</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">What is 8 - 3?</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`m-1 h-8 w-8 rounded-full ${
                            i < 5
                              ? "bg-purple-200 text-purple-700"
                              : "bg-purple-200 text-purple-700 line-through opacity-50"
                          } flex items-center justify-center text-lg font-bold`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">8</div>
                  </div>

                  <div className="text-3xl font-bold text-green-500">-</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="m-1 h-8 w-8 rounded-full bg-pink-200 text-pink-700 line-through opacity-50 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">3</div>
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
                        <span>Correct! Great job! 8 - 3 = 5</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Try again! Count the circles that aren't crossed out.</span>
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
                    <span className="text-sm font-medium">Subtraction Basics</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <ProgressBar value={85} color="bg-purple-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Subtracting from 10</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <ProgressBar value={70} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Subtracting from 20</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <ProgressBar value={45} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Word Problems</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <ProgressBar value={20} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 28 Stars Earned
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Card */}
          <Card className="overflow-hidden border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <CardTitle className="text-purple-700">Challenge</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <span className="text-3xl">🚢</span>
                </div>
                <div>
                  <h3 className="font-bold">Subtraction Submarine</h3>
                  <p className="text-sm text-slate-600">Dive deep by solving subtraction problems!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-purple-500 text-white hover:bg-purple-600">
                <Link href="/games/subtraction-submarine">Start Challenge</Link>
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
                  <h3 className="font-bold">Fact Families</h3>
                  <p className="text-sm text-slate-600">Learn how addition and subtraction are related!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/subtraction/fact-families">Continue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
