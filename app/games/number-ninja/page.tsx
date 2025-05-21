"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

interface Problem {
  count: number;
  options: number[];
}

export default function NumberNinjaPage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [currentProblem, setCurrentProblem] = useState<Problem>({ count: 0, options: [] })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [problems, setProblems] = useState(0)

  // Generate a new counting problem
  const generateProblem = () => {
    // Adjust difficulty based on level
    const maxCount = Math.min(5 + level * 2, 20)
    const count = Math.floor(Math.random() * maxCount) + 1

    // Generate answer options (including the correct one)
    let options = [count]
    while (options.length < 3) {
      const option = Math.max(1, count + Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1))
      if (!options.includes(option)) {
        options.push(option)
      }
    }

    // Shuffle options
    options = options.sort(() => Math.random() - 0.5)

    setCurrentProblem({ count, options })
    setFeedback(null)
  }

  // Start the game
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setLevel(1)
    setLives(3)
    setProblems(0)
    generateProblem()
  }

  // Check the user's answer
  const checkAnswer = (answer: number) => {
    if (answer === currentProblem.count) {
      setScore(score + 10)
      setFeedback("correct")
      setProblems(problems + 1)

      // Level up every 5 correct answers
      if (problems > 0 && problems % 5 === 0) {
        setLevel(Math.min(level + 1, 5))
      }

      setTimeout(() => {
        generateProblem()
      }, 1000)
    } else {
      setLives(lives - 1)
      setFeedback("incorrect")

      if (lives <= 1) {
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

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/games">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-pink-600">Number Ninja</h1>
      </div>

      <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
        <CardHeader className="bg-pink-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <span className="text-2xl">🥷</span> Number Ninja
            </CardTitle>
            {gameState === "playing" && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white text-pink-700">
                  Level {level}
                </Badge>
                <div className="flex">
                  {[...Array(lives)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <CardDescription>Count the objects and select the correct number!</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {gameState === "ready" && (
            <div className="space-y-6 text-center">
              <div className="rounded-lg bg-pink-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-pink-700">How to Play:</h2>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>Count the objects shown on the screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2️⃣</span>
                    <span>Click on the correct number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3️⃣</span>
                    <span>Each correct answer gives you 10 points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4️⃣</span>
                    <span>You have 3 lives - be careful!</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-pink-500 px-8 py-6 text-xl font-bold text-white hover:bg-pink-600"
                >
                  Start Game!
                </Button>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-pink-100 text-pink-700">
                  Score: {score}
                </Badge>
                <Badge variant="outline" className="bg-pink-100 text-pink-700">
                  Problems: {problems}
                </Badge>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-inner">
                <h3 className="mb-6 text-center text-xl font-bold text-pink-700">Count the objects:</h3>

                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  {[...Array(currentProblem.count)].map((_, i) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-2xl"
                    >
                      {["🍎", "🍌", "🍊", "🍇", "🍓"][Math.floor(Math.random() * 5)]}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {currentProblem.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      className="h-16 rounded-lg bg-pink-500 text-2xl font-bold text-white hover:bg-pink-600"
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {feedback && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${
                      feedback === "correct" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feedback === "correct" ? (
                      <span>Correct! Great counting! ✅</span>
                    ) : (
                      <span>Not quite. Try counting again! ❌</span>
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

              <h2 className="text-2xl font-bold text-pink-700">Game Over!</h2>

              <div className="rounded-lg bg-pink-50 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-pink-700">Final Score</h3>
                    <p className="text-4xl font-bold text-pink-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-pink-700">Level Reached</h3>
                    <p className="text-4xl font-bold text-pink-600">{level}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={startGame} className="rounded-full bg-pink-500 px-6 py-2 text-white hover:bg-pink-600">
                  Play Again
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
