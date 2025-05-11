"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MultiplicationTablesPage() {
  const [selectedTable, setSelectedTable] = useState("2")
  const [quizTable, setQuizTable] = useState(2)
  const [quizQuestion, setQuizQuestion] = useState(1)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const generateQuestion = () => {
    const randomMultiplier = Math.floor(Math.random() * 10) + 1
    setQuizQuestion(randomMultiplier)
    setUserAnswer("")
    setIsCorrect(null)
  }

  const checkAnswer = () => {
    const correctAnswer = quizTable * quizQuestion
    const isAnswerCorrect = Number(userAnswer) === correctAnswer

    setIsCorrect(isAnswerCorrect)
    setTotalQuestions(totalQuestions + 1)

    if (isAnswerCorrect) {
      setScore(score + 1)
      setTimeout(() => {
        generateQuestion()
      }, 1500)
    }
  }

  const startQuiz = (table: number) => {
    setQuizTable(table)
    setScore(0)
    setTotalQuestions(0)
    generateQuestion()
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/multiplication">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-orange-600">Multiplication Tables</h1>
      </div>

      <Tabs defaultValue="learn" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="learn">Learn Tables</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <Card className="overflow-hidden border-2 border-orange-200">
            <CardHeader className="bg-orange-100">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <span className="text-2xl">📚</span> Multiplication Tables
                </CardTitle>
                <Badge variant="outline" className="bg-white text-orange-700">
                  Table of {selectedTable}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {tables.map((table) => (
                  <Button
                    key={table}
                    onClick={() => setSelectedTable(table.toString())}
                    variant={selectedTable === table.toString() ? "default" : "outline"}
                    className={`h-10 w-10 rounded-full p-0 ${
                      selectedTable === table.toString() ? "bg-orange-500 hover:bg-orange-600" : ""
                    }`}
                  >
                    {table}
                  </Button>
                ))}
              </div>

              <div className="rounded-lg bg-orange-50 p-6">
                <h2 className="mb-4 text-center text-xl font-bold text-orange-700">{selectedTable} Times Table</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">
                          {selectedTable} × {i + 1} = {Number(selectedTable) * (i + 1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Tips for Learning:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Practice saying the table out loud</li>
                  <li>Look for patterns in the numbers</li>
                  <li>Try to memorize a few at a time</li>
                  <li>Use the practice tab to test yourself</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-2 border-blue-200">
              <CardHeader className="bg-blue-100">
                <CardTitle className="text-blue-700">Patterns in Tables</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <h3 className="font-bold text-blue-700">Table of 2</h3>
                    <p className="text-sm text-slate-600">All numbers are even: 2, 4, 6, 8, 10...</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <h3 className="font-bold text-blue-700">Table of 5</h3>
                    <p className="text-sm text-slate-600">All numbers end in 0 or 5: 5, 10, 15, 20...</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <h3 className="font-bold text-blue-700">Table of 10</h3>
                    <p className="text-sm text-slate-600">All numbers end in 0: 10, 20, 30, 40...</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-green-200">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-700">Multiplication Tricks</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <h3 className="font-bold text-green-700">Multiplying by 9</h3>
                    <p className="text-sm text-slate-600">
                      Hold up 10 fingers. To find 9×3, put down your 3rd finger. You have 2 fingers before it and 7
                      after it. So 9×3 = 27!
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <h3 className="font-bold text-green-700">Multiplying by 11</h3>
                    <p className="text-sm text-slate-600">For 11×3, just write 3 twice: 33. For 11×7, write 77!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card className="overflow-hidden border-2 border-purple-200">
            <CardHeader className="bg-purple-100">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <span className="text-2xl">🎮</span> Practice Your Tables
                </CardTitle>
                {totalQuestions > 0 && (
                  <Badge variant="outline" className="bg-white text-purple-700">
                    Score: {score}/{totalQuestions}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {totalQuestions === 0 ? (
                <div className="space-y-6 text-center">
                  <h2 className="text-xl font-bold text-purple-700">Choose a table to practice:</h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {tables.map((table) => (
                      <Button
                        key={table}
                        onClick={() => startQuiz(table)}
                        className="h-16 w-16 rounded-lg bg-purple-500 text-xl font-bold text-white hover:bg-purple-600"
                      >
                        {table}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg bg-white p-6 shadow-inner">
                    <h3 className="mb-6 text-center text-2xl font-bold text-purple-700">
                      {quizTable} × {quizQuestion} = ?
                    </h3>

                    <div className="mb-6 flex justify-center">
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                          <Button
                            key={num}
                            onClick={() => setUserAnswer(userAnswer + num.toString())}
                            className="h-12 w-12 rounded-lg bg-purple-100 text-xl font-bold text-purple-700 hover:bg-purple-200"
                          >
                            {num}
                          </Button>
                        ))}
                        <Button
                          onClick={() => setUserAnswer(userAnswer.slice(0, -1))}
                          className="col-span-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>

                    <div className="mb-6 flex justify-center">
                      <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-purple-100 text-3xl font-bold text-purple-700">
                        {userAnswer || "?"}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={checkAnswer}
                        className="rounded-full bg-purple-500 px-8 py-2 text-white hover:bg-purple-600"
                        disabled={!userAnswer}
                      >
                        Check Answer
                      </Button>
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
                            <span>
                              Correct! {quizTable} × {quizQuestion} = {quizTable * quizQuestion}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5" />
                            <span>
                              Not quite. {quizTable} × {quizQuestion} = {quizTable * quizQuestion}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => startQuiz(quizTable)}
                      className="rounded-full bg-purple-500 px-6 py-2 text-white hover:bg-purple-600"
                    >
                      Restart
                    </Button>
                    <Button
                      onClick={() => {
                        setTotalQuestions(0)
                        setScore(0)
                      }}
                      variant="outline"
                      className="rounded-full"
                    >
                      Choose Different Table
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
        </TabsContent>
      </Tabs>
    </div>
  )
}
