"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"

export default function PatternsPage() {
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const patterns = [
    {
      sequence: ["🔴", "🔵", "🔴", "🔵", "?"],
      options: ["🔴", "🔵", "🟢", "🟡"],
      correctAnswer: 1,
    },
    {
      sequence: ["🔺", "🔺", "🔸", "🔺", "🔺", "🔸", "?"],
      options: ["🔺", "🔸", "🔹", "🔻"],
      correctAnswer: 0,
    },
    {
      sequence: ["🐶", "🐱", "🐶", "🐱", "🐶", "?"],
      options: ["🐶", "🐱", "🐭", "🐰"],
      correctAnswer: 1,
    },
  ]

  const [currentPattern, setCurrentPattern] = useState(0)

  const checkAnswer = (optionIndex: number) => {
    setSelectedPattern(optionIndex)
    const correct = optionIndex === patterns[currentPattern].correctAnswer
    setIsCorrect(correct)

    if (!correct) {
      setAttempts(attempts + 1)
    } else {
      // Move to next pattern after a short delay
      setTimeout(() => {
        if (currentPattern < patterns.length - 1) {
          setCurrentPattern(currentPattern + 1)
          setSelectedPattern(null)
          setIsCorrect(null)
        }
      }, 1500)
    }
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/memory">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-yellow-600">Pattern Recognition</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-yellow-200">
            <CardHeader className="bg-yellow-100">
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <span className="text-2xl">📚</span> Understanding Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">
                Patterns are things that repeat in a logical way. Finding patterns helps us predict what comes next!
              </p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Repeating Patterns</h3>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <div className="text-4xl">🔴</div>
                      <div className="text-4xl">🔵</div>
                      <div className="text-4xl">🟢</div>
                      <div className="text-4xl">🔴</div>
                      <div className="text-4xl">🔵</div>
                      <div className="text-4xl">🟢</div>
                      <div className="text-4xl">🔴</div>
                      <div className="text-4xl">🔵</div>
                      <div className="text-4xl">🟢</div>
                    </div>
                    <p className="mt-2 text-center text-slate-600">This pattern repeats: red, blue, green</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Growing Patterns</h3>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <div className="flex">
                        <div className="text-4xl">🌟</div>
                      </div>
                      <div className="flex">
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                      </div>
                      <div className="flex">
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                      </div>
                      <div className="flex">
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                        <div className="text-4xl">🌟</div>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-slate-600">This pattern grows: 1, 2, 3, 4 stars</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Number Patterns</h3>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-xl font-bold">
                        2
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-xl font-bold">
                        4
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-xl font-bold">
                        6
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-xl font-bold">
                        8
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 text-xl font-bold">
                        10
                      </div>
                    </div>
                    <p className="mt-2 text-center text-slate-600">This pattern counts by 2s: 2, 4, 6, 8, 10</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Why Patterns Matter:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Patterns help us make predictions</li>
                  <li>Patterns are the foundation of math and science</li>
                  <li>Recognizing patterns improves memory and problem-solving</li>
                  <li>Patterns help us understand the world around us</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">What comes next in the pattern?</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
                  {patterns[currentPattern].sequence.map((item, index) => (
                    <div
                      key={index}
                      className="flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-100 text-4xl"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {patterns[currentPattern].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(index)}
                      className={`flex h-16 items-center justify-center rounded-lg text-4xl transition-all ${
                        selectedPattern === index
                          ? isCorrect
                            ? "bg-green-100 ring-2 ring-green-500"
                            : "bg-red-100 ring-2 ring-red-500"
                          : "bg-yellow-50 hover:bg-yellow-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {isCorrect !== null && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${
                      isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Correct! You found the pattern!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Look for what repeats in the pattern.</span>
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
                    <span className="text-sm font-medium">Memory Basics</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <ProgressBar value={100} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Visual Memory</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <ProgressBar value={90} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Pattern Recognition</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <ProgressBar value={60} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Working Memory</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <ProgressBar value={30} color="bg-orange-500" />
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
                  <span className="text-3xl">🧮</span>
                </div>
                <div>
                  <h3 className="font-bold">Working Memory</h3>
                  <p className="text-sm text-slate-600">Learn how to hold and use information in your mind!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/memory">Back to Memory</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
