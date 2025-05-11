"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

export default function MultiplicationMountainPage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 })
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [altitude, setAltitude] = useState(0)
  const [maxAltitude, setMaxAltitude] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)

  // Generate a new multiplication problem
  const generateProblem = () => {
    // Adjust difficulty based on altitude
    const maxNum1 = Math.min(5 + Math.floor(altitude / 100), 12)
    const maxNum2 = Math.min(5 + Math.floor(altitude / 200), 12)

    const num1 = Math.floor(Math.random() * maxNum1) + 1
    const num2 = Math.floor(Math.random() * maxNum2) + 1

    setCurrentProblem({ num1, num2 })
    setAnswer("")
    setFeedback(null)
  }

  // Start the game
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setAltitude(0)
    setMaxAltitude(0)
    setEnergy(100)
    generateProblem()
  }

  // Check the user's answer
  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = currentProblem.num1 * currentProblem.num2

    if (userAnswer === correctAnswer) {
      const newScore = score + 10
      const newAltitude = altitude + 50

      setScore(newScore)
      setAltitude(newAltitude)
      setMaxAltitude(Math.max(maxAltitude, newAltitude))
      setFeedback("correct")

      setTimeout(() => {
        generateProblem()
      }, 1000)
    } else {
      setEnergy(Math.max(0, energy - 20))
      setFeedback("incorrect")

      if (energy <= 20) {
        setTimeout(() => {
          setGameState("finished")
        }, 1000)
      } else {
        setTimeout(() => {
          setFeedback(null)
        }, 1000)
      }
    }
  }

  // Energy effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState === "playing" && energy > 0) {
      timer = setTimeout(() => {
        setEnergy(Math.max(0, energy - 0.5))
      }, 1000)
    } else if (energy === 0 && gameState === "playing") {
      setGameState("finished")
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [energy, gameState])

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/games">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-blue-600">Multiplication Mountain</h1>
      </div>

      <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="bg-blue-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <span className="text-2xl">⛰️</span> Multiplication Mountain
            </CardTitle>
            {gameState === "playing" && (
              <Badge variant="outline" className="bg-white text-blue-700">
                Altitude: {altitude}m
              </Badge>
            )}
          </div>
          <CardDescription>Climb the mountain by solving multiplication problems!</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {gameState === "ready" && (
            <div className="space-y-6 text-center">
              <div className="rounded-lg bg-blue-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-blue-700">How to Play:</h2>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>Solve multiplication problems to climb higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2️⃣</span>
                    <span>Each correct answer takes you 50 meters higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3️⃣</span>
                    <span>Watch your energy level - it decreases over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4️⃣</span>
                    <span>Wrong answers cost you 20% energy!</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-blue-500 px-8 py-6 text-xl font-bold text-white hover:bg-blue-600"
                >
                  Start Climbing!
                </Button>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  Score: {score}
                </Badge>
                <div className="w-1/2">
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs font-medium">Energy</span>
                    <span className="text-xs font-medium">{Math.floor(energy)}%</span>
                  </div>
                  <ProgressBar
                    value={energy}
                    color={energy > 50 ? "bg-green-500" : energy > 20 ? "bg-yellow-500" : "bg-red-500"}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-center gap-6 text-center">
                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100 text-4xl font-bold text-blue-700">
                      {currentProblem.num1}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-blue-500">×</div>

                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100 text-4xl font-bold text-blue-700">
                      {currentProblem.num2}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-blue-500">=</div>

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
                    className="rounded-full bg-blue-500 px-8 py-2 text-white hover:bg-blue-600"
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
                      <span>Correct! Climbing higher! ✅</span>
                    ) : (
                      <span>Not quite. Energy depleting! ❌</span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative h-40 overflow-hidden rounded-lg bg-gradient-to-b from-blue-100 to-blue-400">
                <div
                  className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-green-300 to-green-600"
                  style={{ height: `${Math.min(100, altitude / 10)}%` }}
                ></div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 transform transition-all duration-500"
                  style={{ bottom: `${Math.min(90, altitude / 10)}%` }}
                >
                  <div className="text-4xl">🧗</div>
                </div>
                <div className="absolute top-0 left-0 w-full">
                  <div className="text-center text-4xl">⛰️</div>
                </div>
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

              <h2 className="text-2xl font-bold text-blue-700">Climb Complete!</h2>

              <div className="rounded-lg bg-blue-50 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-blue-700">Final Score</h3>
                    <p className="text-4xl font-bold text-blue-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-blue-700">Maximum Altitude</h3>
                    <p className="text-4xl font-bold text-blue-600">{maxAltitude}m</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={startGame} className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
                  Climb Again
                </Button>

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/games">Back to Games</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
