"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SkipCountingPage() {
  const [answers, setAnswers] = useState(["", "", "", ""])
  const [isCorrect, setIsCorrect] = useState<boolean[]>([null, null, null, null])
  const [selectedTab, setSelectedTab] = useState("2")

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const checkAnswers = () => {
    const skipValue = Number(selectedTab)
    const startValue = skipValue * 5

    const correctAnswers = [
      startValue + skipValue,
      startValue + skipValue * 2,
      startValue + skipValue * 3,
      startValue + skipValue * 4,
    ]

    const newIsCorrect = answers.map((answer, index) => Number.parseInt(answer) === correctAnswers[index])

    setIsCorrect(newIsCorrect)
  }

  const resetAnswers = () => {
    setAnswers(["", "", "", ""])
    setIsCorrect([null, null, null, null])
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    resetAnswers()
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/counting">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-pink-600">Skip Counting</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-pink-200">
            <CardHeader className="bg-pink-100">
              <CardTitle className="flex items-center gap-2 text-pink-700">
                <span className="text-2xl">📚</span> Skip Counting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Skip counting means counting by numbers other than 1!</p>

              <Tabs defaultValue={selectedTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="2">By 2s</TabsTrigger>
                  <TabsTrigger value="5">By 5s</TabsTrigger>
                  <TabsTrigger value="10">By 10s</TabsTrigger>
                  <TabsTrigger value="3">By 3s</TabsTrigger>
                  <TabsTrigger value="4">By 4s</TabsTrigger>
                </TabsList>

                <TabsContent value="2" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h3 className="mb-4 text-center text-xl font-bold text-pink-700">Counting by 2s</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold"
                        >
                          {(i + 1) * 2}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center">2, 4, 6, 8, 10, 12, 14, 16, 18, 20</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Fun Fact:</h3>
                    <p>When you count by 2s, you're counting all the even numbers!</p>
                  </div>
                </TabsContent>

                <TabsContent value="5" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h3 className="mb-4 text-center text-xl font-bold text-pink-700">Counting by 5s</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold"
                        >
                          {(i + 1) * 5}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center">5, 10, 15, 20, 25, 30, 35, 40, 45, 50</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Fun Fact:</h3>
                    <p>When you count by 5s, all numbers end in either 0 or 5!</p>
                  </div>
                </TabsContent>

                <TabsContent value="10" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h3 className="mb-4 text-center text-xl font-bold text-pink-700">Counting by 10s</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold"
                        >
                          {(i + 1) * 10}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center">10, 20, 30, 40, 50, 60, 70, 80, 90, 100</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Fun Fact:</h3>
                    <p>When you count by 10s, all numbers end in 0!</p>
                  </div>
                </TabsContent>

                <TabsContent value="3" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h3 className="mb-4 text-center text-xl font-bold text-pink-700">Counting by 3s</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold"
                        >
                          {(i + 1) * 3}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center">3, 6, 9, 12, 15, 18, 21, 24, 27, 30</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Fun Fact:</h3>
                    <p>Counting by 3s helps you learn your multiplication tables!</p>
                  </div>
                </TabsContent>

                <TabsContent value="4" className="space-y-4 pt-4">
                  <div className="rounded-lg bg-pink-50 p-4">
                    <h3 className="mb-4 text-center text-xl font-bold text-pink-700">Counting by 4s</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold"
                        >
                          {(i + 1) * 4}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-center">4, 8, 12, 16, 20, 24, 28, 32, 36, 40</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-yellow-700">Fun Fact:</h3>
                    <p>When you count by 4s, you're counting how many legs 1, 2, 3... dogs have!</p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Why Skip Count?</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Skip counting helps us count large groups quickly</li>
                  <li>It's a foundation for learning multiplication</li>
                  <li>It helps us see patterns in numbers</li>
                  <li>It's useful for counting money and telling time</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">Complete the pattern counting by {selectedTab}s:</h3>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-700 text-xl font-bold">
                    {Number(selectedTab) * 5}
                  </div>
                  <div className="text-xl font-bold">,</div>

                  <Input
                    type="number"
                    value={answers[0]}
                    onChange={(e) => updateAnswer(0, e.target.value)}
                    className="h-12 w-16 text-center text-xl font-bold"
                    placeholder="?"
                  />
                  {isCorrect[0] !== null && (
                    <div>
                      {isCorrect[0] ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                  <div className="text-xl font-bold">,</div>

                  <Input
                    type="number"
                    value={answers[1]}
                    onChange={(e) => updateAnswer(1, e.target.value)}
                    className="h-12 w-16 text-center text-xl font-bold"
                    placeholder="?"
                  />
                  {isCorrect[1] !== null && (
                    <div>
                      {isCorrect[1] ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                  <div className="text-xl font-bold">,</div>

                  <Input
                    type="number"
                    value={answers[2]}
                    onChange={(e) => updateAnswer(2, e.target.value)}
                    className="h-12 w-16 text-center text-xl font-bold"
                    placeholder="?"
                  />
                  {isCorrect[2] !== null && (
                    <div>
                      {isCorrect[2] ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                  <div className="text-xl font-bold">,</div>

                  <Input
                    type="number"
                    value={answers[3]}
                    onChange={(e) => updateAnswer(3, e.target.value)}
                    className="h-12 w-16 text-center text-xl font-bold"
                    placeholder="?"
                  />
                  {isCorrect[3] !== null && (
                    <div>
                      {isCorrect[3] ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={checkAnswers}
                    className="rounded-full bg-green-500 px-8 py-2 text-white hover:bg-green-600"
                    disabled={answers.some((answer) => answer === "")}
                  >
                    Check Answers
                  </Button>

                  <Button onClick={resetAnswers} variant="outline" className="rounded-full">
                    Reset
                  </Button>
                </div>

                {isCorrect.every((correct) => correct === true) && (
                  <div className="mt-4 flex items-center justify-center rounded-lg bg-green-100 p-3 text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Great job! You've mastered counting by {selectedTab}s!</span>
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
                    <span className="text-sm font-medium">Counting by 2s</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <ProgressBar value={90} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting by 5s</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <ProgressBar value={85} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting by 10s</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <ProgressBar value={95} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Counting by 3s</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <ProgressBar value={60} color="bg-blue-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 45 Stars Earned
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
                  <p className="text-sm text-slate-600">Test your skip counting skills!</p>
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
                  <span className="text-3xl">➕</span>
                </div>
                <div>
                  <h3 className="font-bold">Addition</h3>
                  <p className="text-sm text-slate-600">Learn how to add numbers together!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/addition">Go to Addition</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
