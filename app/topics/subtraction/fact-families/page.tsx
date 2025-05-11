"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"

export default function FactFamiliesPage() {
  const [answers, setAnswers] = useState(["", "", "", ""])
  const [isCorrect, setIsCorrect] = useState<boolean[]>([null, null, null, null])
  const [attempts, setAttempts] = useState(0)
  const [allCorrect, setAllCorrect] = useState(false)

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const checkAnswers = () => {
    const correctAnswers = [10, 7, 3, 3]
    const newIsCorrect = answers.map((answer, index) => Number.parseInt(answer) === correctAnswers[index])

    setIsCorrect(newIsCorrect)
    setAttempts(attempts + 1)
    setAllCorrect(newIsCorrect.every((correct) => correct === true))
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/subtraction">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-purple-600">Fact Families</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <span className="text-2xl">📚</span> Understanding Fact Families
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Fact families show how addition and subtraction are related!</p>

              <div className="rounded-lg bg-purple-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 h-32 w-32 flex items-center justify-center">
                      <div className="absolute top-0 left-0 h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700">
                        7
                      </div>
                      <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-pink-200 flex items-center justify-center text-2xl font-bold text-pink-700">
                        3
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center text-2xl font-bold text-purple-700">
                        10
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 border-2 border-dashed border-purple-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-lg font-medium">Fact Family: 7, 3, and 10</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">
                A fact family is a group of related addition and subtraction facts using the same numbers.
              </p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">For the numbers 7, 3, and 10:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>7 + 3 = 10</li>
                  <li>3 + 7 = 10</li>
                  <li>10 - 3 = 7</li>
                  <li>10 - 7 = 3</li>
                </ul>
              </div>

              <p className="text-lg">
                Understanding fact families helps you see the connection between addition and subtraction!
              </p>
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
                <h3 className="mb-4 text-center text-xl font-bold">Complete the fact family for 7 and 3:</h3>

                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xl font-bold">
                      7
                    </div>
                    <div className="text-xl font-bold">+</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold">
                      3
                    </div>
                    <div className="text-xl font-bold">=</div>
                    <Input
                      type="number"
                      value={answers[0]}
                      onChange={(e) => updateAnswer(0, e.target.value)}
                      className="h-10 w-16 text-center text-xl font-bold"
                      placeholder="?"
                    />
                    {isCorrect[0] !== null && (
                      <div className="ml-2">
                        {isCorrect[0] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-200 text-purple-700 text-xl font-bold">
                      10
                    </div>
                    <div className="text-xl font-bold">-</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold">
                      3
                    </div>
                    <div className="text-xl font-bold">=</div>
                    <Input
                      type="number"
                      value={answers[1]}
                      onChange={(e) => updateAnswer(1, e.target.value)}
                      className="h-10 w-16 text-center text-xl font-bold"
                      placeholder="?"
                    />
                    {isCorrect[1] !== null && (
                      <div className="ml-2">
                        {isCorrect[1] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-200 text-purple-700 text-xl font-bold">
                      10
                    </div>
                    <div className="text-xl font-bold">-</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xl font-bold">
                      7
                    </div>
                    <div className="text-xl font-bold">=</div>
                    <Input
                      type="number"
                      value={answers[2]}
                      onChange={(e) => updateAnswer(2, e.target.value)}
                      className="h-10 w-16 text-center text-xl font-bold"
                      placeholder="?"
                    />
                    {isCorrect[2] !== null && (
                      <div className="ml-2">
                        {isCorrect[2] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold">
                      3
                    </div>
                    <div className="text-xl font-bold">+</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xl font-bold">
                      7
                    </div>
                    <div className="text-xl font-bold">=</div>
                    <Input
                      type="number"
                      value={answers[3]}
                      onChange={(e) => updateAnswer(3, e.target.value)}
                      className="h-10 w-16 text-center text-xl font-bold"
                      placeholder="?"
                    />
                    {isCorrect[3] !== null && (
                      <div className="ml-2">
                        {isCorrect[3] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkAnswers}
                    className="rounded-full bg-green-500 px-8 py-2 text-white hover:bg-green-600"
                    disabled={answers.some((answer) => answer === "")}
                  >
                    Check Answers
                  </Button>
                </div>

                {allCorrect && (
                  <div className="mt-4 flex items-center justify-center rounded-lg bg-green-100 p-3 text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Great job! You've completed the fact family!</span>
                    </div>
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
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <ProgressBar value={100} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Subtracting from 10</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <ProgressBar value={85} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Fact Families</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <ProgressBar value={50} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Word Problems</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <ProgressBar value={25} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 32 Stars Earned
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
                  <span className="text-3xl">🧩</span>
                </div>
                <div>
                  <h3 className="font-bold">Fact Family Puzzle</h3>
                  <p className="text-sm text-slate-600">Create fact families with different numbers!</p>
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
                  <span className="text-3xl">📝</span>
                </div>
                <div>
                  <h3 className="font-bold">Word Problems</h3>
                  <p className="text-sm text-slate-600">Learn how to solve subtraction word problems!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/subtraction">Back to Subtraction</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
