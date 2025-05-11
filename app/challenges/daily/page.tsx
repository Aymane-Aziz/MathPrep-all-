"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy, Star } from "lucide-react"

type Challenge = {
  type: "addition" | "subtraction" | "multiplication" | "counting" | "shapes" | "memory"
  question: string
  options?: string[]
  answer: string | number
  difficulty: "easy" | "medium" | "hard"
  points: number
  hint?: string
}

export default function DailyChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [streakCount, setStreakCount] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Generate daily challenges
  useEffect(() => {
    // In a real app, these would come from an API
    // For now, we'll generate them here
    const dailyChallenges: Challenge[] = [
      {
        type: "addition",
        question: "What is 12 + 8?",
        answer: 20,
        difficulty: "easy",
        points: 10,
        hint: "Try breaking it down: 12 + 8 = 10 + 10 = 20",
      },
      {
        type: "shapes",
        question: "Which shape has 4 equal sides?",
        options: ["Triangle", "Square", "Rectangle", "Circle"],
        answer: 1, // Square (index 1)
        difficulty: "easy",
        points: 10,
        hint: "A square has 4 sides that are all the same length.",
      },
      {
        type: "subtraction",
        question: "What is 15 - 7?",
        answer: 8,
        difficulty: "medium",
        points: 15,
        hint: "Count backwards from 15, or think of it as: what plus 7 equals 15?",
      },
      {
        type: "memory",
        question: "What comes next in the pattern: 2, 4, 6, 8, ?",
        answer: 10,
        difficulty: "easy",
        points: 10,
        hint: "This pattern is counting by 2s.",
      },
      {
        type: "multiplication",
        question: "What is 3 × 4?",
        answer: 12,
        difficulty: "medium",
        points: 15,
        hint: "Think of it as 3 groups of 4 or 4 + 4 + 4.",
      },
    ]

    setChallenges(dailyChallenges)
  }, [])

  const checkAnswer = () => {
    const challenge = challenges[currentChallenge]
    let correct = false

    if (challenge.options) {
      // Multiple choice question
      correct = selectedOption === challenge.answer
    } else {
      // Text/number input question
      correct = Number(userAnswer) === challenge.answer || userAnswer === challenge.answer
    }

    setIsCorrect(correct)

    if (correct) {
      setScore(score + challenge.points)
      setStreakCount(streakCount + 1)
      setMaxStreak(Math.max(maxStreak, streakCount + 1))

      setTimeout(() => {
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1)
          setUserAnswer("")
          setSelectedOption(null)
          setIsCorrect(null)
          setShowHint(false)
          setCompleted(completed + 1)
        } else {
          setIsComplete(true)
          setCompleted(completed + 1)
        }
      }, 1500)
    } else {
      setStreakCount(0)
    }
  }

  const resetChallenges = () => {
    setCurrentChallenge(0)
    setUserAnswer("")
    setSelectedOption(null)
    setIsCorrect(null)
    setScore(0)
    setCompleted(0)
    setShowHint(false)
    setStreakCount(0)
    setIsComplete(false)
  }

  // If challenges haven't loaded yet
  if (challenges.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-purple-600">Daily Challenge</h1>
        </div>
        <div className="mt-8 flex justify-center">
          <p className="text-lg">Loading today's challenges...</p>
        </div>
      </div>
    )
  }

  const currentChallengeData = challenges[currentChallenge]

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-purple-600">Daily Challenge</h1>
      </div>

      <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="bg-purple-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <span className="text-2xl">🏆</span> Number Ninja Challenge
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white text-purple-700 px-3 py-1 flex items-center gap-1">
                <Star className="h-4 w-4" /> {score}
              </Badge>
              <Badge variant="outline" className="bg-white text-purple-700 px-3 py-1">
                {completed}/{challenges.length}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-purple-700 font-medium">Solve 5 math puzzles in a row!</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {!isComplete ? (
            <div className="space-y-6">
              <div className="flex justify-between">
                <Badge
                  variant="outline"
                  className={`px-3 py-1 ${
                    currentChallengeData.difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : currentChallengeData.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {currentChallengeData.difficulty.charAt(0).toUpperCase() + currentChallengeData.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 px-3 py-1">
                  {currentChallengeData.points} points
                </Badge>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-inner">
                <h3 className="mb-6 text-center text-xl font-bold text-purple-700">{currentChallengeData.question}</h3>

                {currentChallengeData.options ? (
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {currentChallengeData.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => setSelectedOption(index)}
                        className={`h-12 rounded-lg text-lg font-medium ${
                          selectedOption === index
                            ? "bg-purple-500 text-white hover:bg-purple-600"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6 flex justify-center">
                    <Input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="h-12 w-32 text-center text-xl font-bold"
                      placeholder="?"
                      autoFocus
                    />
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={checkAnswer}
                    className="rounded-full bg-purple-500 px-8 py-2 text-white hover:bg-purple-600"
                    disabled={currentChallengeData.options ? selectedOption === null : !userAnswer}
                  >
                    Check Answer
                  </Button>

                  {currentChallengeData.hint && (
                    <Button onClick={() => setShowHint(!showHint)} variant="outline" className="rounded-full">
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                  )}
                </div>

                {showHint && currentChallengeData.hint && (
                  <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-yellow-700">
                    <p className="flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      <span>{currentChallengeData.hint}</span>
                    </p>
                  </div>
                )}

                {isCorrect !== null && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${
                      isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? (
                      <span>Correct! +{currentChallengeData.points} points!</span>
                    ) : (
                      <span>Not quite. Try again!</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Challenge {currentChallenge + 1} of {challenges.length}
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <span>Streak:</span>
                  <span className="font-bold text-purple-600">{streakCount}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(completed / challenges.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-purple-100 p-6 shadow-md">
                  <Trophy className="h-16 w-16 text-purple-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-700">Challenge Complete!</h2>

              <div className="rounded-lg bg-purple-50 p-6 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-700">Final Score</h3>
                    <p className="text-4xl font-bold text-purple-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-700">Challenges Completed</h3>
                    <p className="text-4xl font-bold text-purple-600">
                      {completed}/{challenges.length}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-700">Best Streak</h3>
                    <p className="text-4xl font-bold text-purple-600">{maxStreak}</p>
                  </div>
                </div>

                {score >= 50 && (
                  <div className="mt-4 bg-yellow-100 rounded-lg p-3 inline-block">
                    <p className="text-yellow-700 font-bold flex items-center gap-2">
                      <Star className="h-5 w-5" /> You earned 5 stars!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetChallenges}
                  className="rounded-full bg-purple-500 px-6 py-2 text-white hover:bg-purple-600"
                >
                  Try Again
                </Button>

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
