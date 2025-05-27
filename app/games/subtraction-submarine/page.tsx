"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"
import { useProgress } from "@/contexts/progress-context"

export default function SubtractionSubmarinePage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 })
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [depth, setDepth] = useState(0)
  const [maxDepth, setMaxDepth] = useState(0)
  const [oxygen, setOxygen] = useState(100)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [bestScore, setBestScore] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(1)
  const [showDifficultyUp, setShowDifficultyUp] = useState(false)
  const { updateGameProgress, progress } = useProgress()

  // Determine initial difficulty level based on previous high score
  useEffect(() => {
    if (progress?.game3) {
      const previousHighScore = progress.game3
      if (previousHighScore >= 500) {
        setDifficultyLevel(3)
      } else if (previousHighScore >= 100) {
        setDifficultyLevel(2)
      }
    }
  }, [progress])

  // Generate a new subtraction problem
  const generateProblem = () => {
    let maxNum: number
    
    // Use the current difficulty level to determine the number range
    switch (difficultyLevel) {
      case 3:
        maxNum = 1000
        break
      case 2:
        maxNum = 100
        break
      default:
        maxNum = 10
    }
    
    const num1 = Math.floor(Math.random() * maxNum) + 1
    const num2 = Math.floor(Math.random() * num1) // Ensure num2 is always less than num1
    
    setCurrentProblem({ num1, num2 })
    setAnswer("")
    setFeedback(null)
  }

  // Start the game
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setDepth(0)
    setMaxDepth(0)
    setOxygen(100)
    generateProblem()
  }

  // Check the user's answer
  const checkAnswer = () => {
    const userAnswer = Number.parseInt(answer)
    const correctAnswer = currentProblem.num1 - currentProblem.num2

    if (userAnswer === correctAnswer) {
      const newScore = score + 10
      setScore(newScore)
      setDepth(depth + 50)
      setMaxDepth(Math.max(maxDepth, depth + 50))
      setFeedback("correct")

      // Check if we need to increase difficulty level
      if (difficultyLevel === 1 && newScore >= 100) {
        setDifficultyLevel(2)
        setShowDifficultyUp(true)
        setTimeout(() => setShowDifficultyUp(false), 2000)
      } else if (difficultyLevel === 2 && newScore >= 500) {
        setDifficultyLevel(3)
        setShowDifficultyUp(true)
        setTimeout(() => setShowDifficultyUp(false), 2000)
      }

      setTimeout(() => {
        generateProblem()
      }, 500)
    } else {
      setFeedback("incorrect")
      setOxygen(Math.max(0, oxygen - 20))
    }
  }

  // Oxygen timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState === "playing" && oxygen > 0) {
      timer = setTimeout(() => {
        setOxygen(oxygen - 1)
      }, 1000)
    } else if (oxygen === 0 && gameState === "playing") {
      setGameState("finished")
      
      // Update best score if needed
      if (score > bestScore) {
        setBestScore(score)
        localStorage.setItem("subtractionSubmarineBestScore", score.toString())
      }

      // Update progress with actual score
      if (score > 0) {
        updateGameProgress("3", score) // Subtraction Submarine is game3
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [oxygen, gameState, score, bestScore, updateGameProgress])

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/subtraction">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-purple-600">Subtraction Submarine</h1>
      </div>

      <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="bg-purple-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <span className="text-2xl">🚢</span> Subtraction Submarine
            </CardTitle>
            <Badge variant="outline" className="bg-white text-purple-700">
              {gameState === "playing" ? `${oxygen}% oxygen` : "100% oxygen"}
            </Badge>
          </div>
          <CardDescription>Dive deep by solving subtraction problems!</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {gameState === "ready" && (
            <div className="space-y-6 text-center">
              <div className="rounded-lg bg-purple-50 p-6">
                <h2 className="mb-4 text-xl font-bold text-purple-700">How to Play:</h2>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>Solve subtraction problems to dive deeper</span>
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
                    <span>Watch your oxygen level - wrong answers reduce it!</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-purple-500 px-8 py-6 text-xl font-bold text-white hover:bg-purple-600"
                >
                  Start Game!
                </Button>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                  Score: {score}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                  Depth: {depth}m
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                  Level: {difficultyLevel}
                </Badge>
              </div>

              {showDifficultyUp && (
                <div className="animate-bounce rounded-lg bg-yellow-100 p-2 text-center text-yellow-700">
                  🎉 Difficulty Increased! Numbers up to {difficultyLevel === 2 ? "100" : "1000"} now! 🎉
                </div>
              )}

              <div className="mb-4">
                <ProgressBar value={oxygen} color="bg-purple-500" />
              </div>

              <div className="rounded-lg bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-center gap-6 text-center">
                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-purple-100 text-4xl font-bold text-purple-700">
                      {currentProblem.num1}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-purple-500">-</div>

                  <div className="text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-purple-100 text-4xl font-bold text-purple-700">
                      {currentProblem.num2}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-purple-500">=</div>

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
                    className="rounded-full bg-purple-500 px-8 py-2 text-white hover:bg-purple-600"
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

              <h2 className="text-2xl font-bold text-purple-700">Game Over!</h2>

              <div className="rounded-lg bg-purple-50 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-700">Final Score</h3>
                    <p className="text-4xl font-bold text-purple-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-700">Max Depth</h3>
                    <p className="text-4xl font-bold text-purple-600">{maxDepth}m</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={startGame}
                  className="rounded-full bg-purple-500 px-6 py-2 text-white hover:bg-purple-600"
                >
                  Play Again
                </Button>

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/topics/subtraction">Back to Lessons</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
