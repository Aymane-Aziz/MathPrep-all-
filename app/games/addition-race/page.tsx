"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

export default function AdditionRacePage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 })
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [problems, setProblems] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)

  // Generate a new addition problem
  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCurrentProblem({ num1, num2 })
    setAnswer("")
    setFeedback(null)
  }

  // Start the game
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setProblems(0)
    setTimeLeft(60)
    generateProblem()
  }

  // Check the user's answer
  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = currentProblem.num1 + currentProblem.num2

    if (userAnswer === correctAnswer) {
      setScore(score + 10)
      setFeedback("correct")
      setTimeout(() => {
        generateProblem()
        setProblems(problems + 1)
      }, 500)
    } else {
      setFeedback("incorrect")
    }
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished")
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeLeft, gameState])

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/addition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-orange-600">Addition Race</h1>
      </div>

      <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader className="bg-orange-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <span className="text-2xl">🏎️</span> Addition Race
            </CardTitle>
            <Badge variant="outline" className="bg-white text-orange-700">
              {gameState === "playing" ? `${timeLeft}s left` : "60s game"}
            </Badge>
          </div>
          <CardDescription>Solve as many addition problems as you can in 60 seconds!</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {gameState === "ready" && (
            <div className="space-y-6 text-center">
              <div className="rounded-lg bg-orange-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-orange-700">How to Play:</h2>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>Solve addition problems as quickly as you can</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2️⃣</span>
                    <span>Type your answer and press "Submit"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3️⃣</span>
                    <span>Each correct answer gives you 10 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4️⃣</span>
                    <span>Try to get the highest score before time runs out!</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-orange-500 px-8 py-6 text-xl font-bold text-white hover:bg-orange-600"
                >
                  Start Game!
                </Button>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-orange-100 text-orange-700">
                  Score: {score}
                </Badge>
                <Badge variant="outline" className="bg-orange-100 text-orange-700">
                  Problems: {problems}
                </Badge>
              </div>

              <div className="mb-4">
                <ProgressBar value={(timeLeft / 60) * 100} color="bg-orange-500" />
              </div>

              <div className="rounded-lg bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-center gap-6 text-center">
                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-orange-100 text-4xl font-bold text-orange-700">
                      {currentProblem.num1}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-orange-500">+</div>

                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-orange-100 text-4xl font-bold text-orange-700">
                      {currentProblem.num2}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-orange-500">=</div>

                  <div className="text-center">
                    <Input
                      type="number"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="h-20 w-20 text-center text-4xl font-bold"
                      placeholder="?"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkAnswer}
                    className="rounded-full bg-orange-500 px-8 py-2 text-white hover:bg-orange-600"
                    disabled={!answer}
                  >
                    Submit
                  </Button>
                </div>

                {feedback && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${
                      feedback === "correct" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feedback === "correct" ? (
                      <span>Correct! Great job! ✅</span>
                    ) : (
                      <span>Not quite. Try again! ❌</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {gameState === "finished" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-yellow-100 p-6">
                  <Trophy className="h-16 w-16 text-yellow-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-orange-700">Game Over!</h2>

              <div className="rounded-lg bg-orange-50 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-orange-700">Final Score</h3>
                    <p className="text-4xl font-bold text-orange-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-orange-700">Problems Solved</h3>
                    <p className="text-4xl font-bold text-orange-600">{problems}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
                >
                  Play Again
                </Button>

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/topics/addition">Back to Lessons</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
