"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"

export default function AddingThreeNumbersPage() {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = 3 + 4 + 2

    if (userAnswer === correctAnswer) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/addition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-blue-600">Adding Three Numbers</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-blue-200">
            <CardHeader className="bg-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <span className="text-2xl">📚</span> Adding Three Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Now let's learn how to add three numbers together!</p>

              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">2</div>
                  </div>

                  <div className="text-3xl font-bold text-blue-500">+</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">3</div>
                  </div>

                  <div className="text-3xl font-bold text-blue-500">+</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="mx-1 h-8 w-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">4</div>
                  </div>

                  <div className="text-3xl font-bold text-blue-500">=</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="m-1 h-8 w-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">9</div>
                  </div>
                </div>
              </div>

              <p className="text-lg">When we add 2 + 3 + 4, we get 9!</p>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">How to add three numbers:</h3>
                <ol className="list-inside list-decimal space-y-2">
                  <li>First, add the first two numbers (2 + 3 = 5)</li>
                  <li>Then, add the third number to that sum (5 + 4 = 9)</li>
                  <li>You can also group numbers differently: (2 + 3) + 4 = 9 or 2 + (3 + 4) = 9</li>
                  <li>The answer will be the same no matter which way you group them!</li>
                </ol>
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
                <h3 className="mb-4 text-center text-xl font-bold">What is 3 + 4 + 2?</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="m-1 h-8 w-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">3</div>
                  </div>

                  <div className="text-3xl font-bold text-green-500">+</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="m-1 h-8 w-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">4</div>
                  </div>

                  <div className="text-3xl font-bold text-green-500">+</div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex flex-wrap justify-center">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="m-1 h-8 w-8 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-lg font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg font-medium">2</div>
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
                        <span>Correct! Great job! 3 + 4 + 2 = 9</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Try again! Count all the circles or add step by step.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Tips Card */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <CardTitle className="text-purple-700">Helpful Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="rounded-lg bg-purple-50 p-3">
                  <h3 className="font-bold text-purple-700">Tip #1: Group Numbers</h3>
                  <p className="text-sm text-slate-600">
                    Try grouping numbers that make 10 or 5 to make adding easier!
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h3 className="font-bold text-purple-700">Tip #2: Count All</h3>
                  <p className="text-sm text-slate-600">You can count all objects together if that's easier for you.</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <h3 className="font-bold text-purple-700">Tip #3: Use Your Fingers</h3>
                  <p className="text-sm text-slate-600">It's okay to use your fingers to help you count!</p>
                </div>
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
                  <span className="text-3xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold">Triple Trouble</h3>
                  <p className="text-sm text-slate-600">Try adding three numbers as fast as you can!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600">
                <Link href="/games/addition-race">Start Challenge</Link>
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
                  <h3 className="font-bold">Adding to 20</h3>
                  <p className="text-sm text-slate-600">Learn how to add numbers up to 20!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/addition">Back to Addition</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
