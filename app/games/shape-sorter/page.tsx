"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Star, HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Types for our game
type GameLevel = {
  id: number
  name: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  icon: string
  unlocked: boolean
}

type Question = {
  id: number
  type: "multiple-choice" | "true-false" | "match" | "drag-drop"
  question: string
  options: string[]
  correctAnswer: string | number
  explanation: string
  image?: string
  hint?: string
}

export default function ShapeSorterGame() {
  // Game state
  const [currentLevel, setCurrentLevel] = useState<number>(1)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [stars, setStars] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const [gameMode, setGameMode] = useState<"level-select" | "playing" | "results">("level-select")
  const [timeLeft, setTimeLeft] = useState<number>(60)
  const [timerActive, setTimerActive] = useState<boolean>(false)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [streak, setStreak] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(0)

  // Game levels
  const levels: GameLevel[] = [
    {
      id: 1,
      name: "Basic Shapes",
      description: "Identify basic 2D shapes and their properties",
      difficulty: "easy",
      icon: "🔷",
      unlocked: true,
    },
    {
      id: 2,
      name: "Angles & Corners",
      description: "Identify right angles and count corners in shapes",
      difficulty: "easy",
      icon: "📐",
      unlocked: true,
    },
    {
      id: 3,
      name: "Perimeter",
      description: "Calculate the perimeter of different shapes",
      difficulty: "medium",
      icon: "📏",
      unlocked: true,
    },
    {
      id: 4,
      name: "Area",
      description: "Calculate the area of different shapes",
      difficulty: "medium",
      icon: "📊",
      unlocked: true,
    },
    {
      id: 5,
      name: "3D Shapes",
      description: "Identify 3D shapes and their properties",
      difficulty: "hard",
      icon: "🧊",
      unlocked: true,
    },
  ]

  // Questions for each level
  const questions: Record<number, Question[]> = {
    1: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which shape has 3 sides?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Triangle",
        explanation: "A triangle has exactly 3 sides and 3 corners.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which shape has no corners?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Circle",
        explanation: "A circle is round and has no corners or straight edges.",
      },
      {
        id: 3,
        type: "true-false",
        question: "A square has 4 equal sides.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "A square has 4 sides of equal length and 4 right angles.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "How many sides does a hexagon have?",
        options: ["4", "5", "6", "8"],
        correctAnswer: "6",
        explanation: "A hexagon has 6 sides and 6 corners.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which shape has 4 sides but not all sides are equal?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Rectangle",
        explanation: "A rectangle has 4 sides, with opposite sides being equal in length.",
      },
    ],
    2: [
      {
        id: 1,
        type: "multiple-choice",
        question: "How many right angles (90°) does a square have?",
        options: ["0", "2", "3", "4"],
        correctAnswer: "4",
        explanation: "A square has 4 right angles, one at each corner.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A triangle can have a right angle (90°).",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "A right triangle has one 90° angle.",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which shape always has at least one angle greater than 90°?",
        options: ["Square", "Rectangle", "Rhombus", "Obtuse triangle"],
        correctAnswer: "Obtuse triangle",
        explanation: "An obtuse triangle always has one angle greater than 90°.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "How many corners does a pentagon have?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "5",
        explanation: "A pentagon has 5 sides and 5 corners (vertices).",
      },
      {
        id: 5,
        type: "true-false",
        question: "All angles in a rectangle are 90°.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "A rectangle has 4 right angles, each measuring 90°.",
      },
    ],
    3: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the formula for the perimeter of a rectangle?",
        options: ["P = 2(l + w)", "P = l × w", "P = 4s", "P = πr"],
        correctAnswer: "P = 2(l + w)",
        explanation: "The perimeter of a rectangle is P = 2(length + width).",
        hint: "Think about adding all sides together.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "What is the perimeter of a square with sides of 5 cm?",
        options: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correctAnswer: "20 cm",
        explanation: "The perimeter of a square is 4 × side length. So 4 × 5 cm = 20 cm.",
        hint: "Multiply the side length by the number of sides.",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "If a rectangle has length 8 cm and width 3 cm, what is its perimeter?",
        options: ["11 cm", "16 cm", "22 cm", "24 cm"],
        correctAnswer: "22 cm",
        explanation: "Perimeter = 2(length + width) = 2(8 + 3) = 2(11) = 22 cm",
        hint: "Use the formula P = 2(l + w)",
      },
      {
        id: 4,
        type: "true-false",
        question: "The perimeter of a shape is the distance around it.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "The perimeter is the total length of the outline or boundary of a shape.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the perimeter of an equilateral triangle with sides of 6 cm?",
        options: ["12 cm", "18 cm", "24 cm", "36 cm"],
        correctAnswer: "18 cm",
        explanation: "The perimeter of an equilateral triangle is 3 × side length. So 3 × 6 cm = 18 cm.",
        hint: "Multiply the side length by the number of sides.",
      },
    ],
    4: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the formula for the area of a rectangle?",
        options: ["A = l + w", "A = l × w", "A = 2(l + w)", "A = s²"],
        correctAnswer: "A = l × w",
        explanation: "The area of a rectangle is length × width.",
        hint: "Think about how many unit squares fit inside.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "What is the area of a square with sides of 4 cm?",
        options: ["8 cm²", "12 cm²", "16 cm²", "20 cm²"],
        correctAnswer: "16 cm²",
        explanation: "The area of a square is side length squared. So 4² = 16 cm².",
        hint: "Multiply the side length by itself.",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is the formula for the area of a triangle?",
        options: ["A = b × h", "A = ½ × b × h", "A = s²", "A = π × r²"],
        correctAnswer: "A = ½ × b × h",
        explanation: "The area of a triangle is half the base times the height.",
        hint: "It's half the area of a rectangle with the same base and height.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "If a rectangle has length 7 cm and width 5 cm, what is its area?",
        options: ["12 cm²", "24 cm²", "35 cm²", "70 cm²"],
        correctAnswer: "35 cm²",
        explanation: "Area = length × width = 7 cm × 5 cm = 35 cm²",
        hint: "Multiply the length by the width.",
      },
      {
        id: 5,
        type: "true-false",
        question: "The area of a shape is measured in square units.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Area is measured in square units like cm², m², etc.",
      },
    ],
    5: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which 3D shape has 6 square faces?",
        options: ["Sphere", "Cylinder", "Cube", "Cone"],
        correctAnswer: "Cube",
        explanation: "A cube has 6 square faces, 8 vertices, and 12 edges.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "How many faces does a triangular pyramid have?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        explanation: "A triangular pyramid has 4 faces: 3 triangular faces and 1 triangular base.",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is the formula for the volume of a rectangular prism?",
        options: ["V = l × w × h", "V = πr²h", "V = ⅓πr²h", "V = 4/3πr³"],
        correctAnswer: "V = l × w × h",
        explanation: "The volume of a rectangular prism is length × width × height.",
        hint: "Think about how many unit cubes fit inside.",
      },
      {
        id: 4,
        type: "true-false",
        question: "A sphere has flat faces.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "A sphere has no flat faces, edges, or vertices. It has one curved surface.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "How many edges does a cube have?",
        options: ["6", "8", "12", "24"],
        correctAnswer: "12",
        explanation: "A cube has 12 edges where the faces meet.",
        hint: "Count the lines where two faces meet.",
      },
    ],
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameMode === "playing") {
      endGame()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeLeft, gameMode])

  // Start a level
  const startLevel = (levelId: number) => {
    setCurrentLevel(levelId)
    setCurrentQuestion(0)
    setScore(0)
    setStreak(0)
    setTimeLeft(60)
    setTimerActive(true)
    setGameMode("playing")
    setSelectedAnswer(null)
    setIsCorrect(null)
    setShowExplanation(false)
  }

  // Check answer
  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === questions[currentLevel][currentQuestion].correctAnswer
    setIsCorrect(correct)

    if (correct) {
      const newStreak = streak + 1
      setStreak(newStreak)

      // Calculate points (base + streak bonus + time bonus)
      const basePoints = 10
      const streakBonus = Math.min(newStreak * 2, 10) // Cap streak bonus at 10
      const timeBonus = Math.floor(timeLeft / 10)
      const questionPoints = basePoints + streakBonus + timeBonus

      setScore((prev) => prev + questionPoints)

      // Award stars based on streak
      if (newStreak % 5 === 0) {
        setStars((prev) => prev + 1)
      }
    } else {
      setStreak(0)
    }

    setShowExplanation(true)
  }

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < questions[currentLevel].length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowExplanation(false)
      setShowHint(false)
    } else {
      endGame()
    }
  }

  // End the game
  const endGame = () => {
    setTimerActive(false)
    setGameMode("results")

    // Update high score if needed
    if (score > highScore) {
      setHighScore(score)
    }
  }

  // Reset to level selection
  const backToLevels = () => {
    setGameMode("level-select")
    setTimerActive(false)
  }

  // Calculate progress percentage
  const progressPercentage = (currentQuestion / questions[currentLevel].length) * 100

  // Get current question data
  const currentQuestionData = gameMode === "playing" ? questions[currentLevel][currentQuestion] : null

  // Render difficulty badge
  const renderDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-100 text-green-800">Easy</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "hard":
        return <Badge className="bg-red-100 text-red-800">Hard</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/games">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-green-600">Shape Sorter</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> {stars} Stars
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-700">
            <span className="mr-1 text-lg">🏆</span> High Score: {highScore}
          </Badge>
        </div>
      </div>

      {/* Level Selection */}
      {gameMode === "level-select" && (
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-100">
            <CardTitle className="text-center text-green-700">Choose a Level</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {levels.map((level) => (
                <Card
                  key={level.id}
                  className={`cursor-pointer border-2 transition-all hover:border-green-300 hover:shadow-md ${
                    level.unlocked ? "border-green-100" : "border-gray-200 opacity-60"
                  }`}
                  onClick={() => level.unlocked && startLevel(level.id)}
                >
                  <CardHeader className="bg-green-50 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{level.icon}</span>
                        <CardTitle className="text-lg text-green-700">{level.name}</CardTitle>
                      </div>
                      {renderDifficultyBadge(level.difficulty)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">{level.description}</p>
                  </CardContent>
                  <CardFooter className="bg-green-50 p-2">
                    <Button
                      className="w-full rounded-full bg-green-500 text-white hover:bg-green-600"
                      disabled={!level.unlocked}
                    >
                      {level.unlocked ? "Start Level" : "Locked"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Play */}
      {gameMode === "playing" && currentQuestionData && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                Level {currentLevel}: {levels[currentLevel - 1].name}
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                Question {currentQuestion + 1}/{questions[currentLevel].length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Score: {score}</Badge>
              <Badge
                className={`${
                  timeLeft > 30
                    ? "bg-green-100 text-green-800"
                    : timeLeft > 10
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                Time: {timeLeft}s
              </Badge>
              {streak > 1 && <Badge className="bg-orange-100 text-orange-800">Streak: {streak}🔥</Badge>}
            </div>
          </div>

          <Progress value={progressPercentage} className="h-2 w-full bg-gray-100" />

          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-700">{currentQuestionData.question}</CardTitle>
                {currentQuestionData.hint && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <HelpCircle className="h-4 w-4" />
                        <span>Hint</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hint</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>{currentQuestionData.hint}</DialogDescription>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Question content */}
              <div className="space-y-4">
                {currentQuestionData.image && (
                  <div className="flex justify-center">
                    <img
                      src={currentQuestionData.image || "/placeholder.svg"}
                      alt="Question illustration"
                      className="max-h-60 rounded-lg border-2 border-green-100 object-contain p-2"
                    />
                  </div>
                )}

                <div className="grid gap-3 md:grid-cols-2">
                  {currentQuestionData.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto min-h-12 justify-start p-4 text-left text-lg ${
                        selectedAnswer === option
                          ? isCorrect
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      } ${
                        showExplanation && option === currentQuestionData.correctAnswer && !isCorrect
                          ? "border-green-500 bg-green-50 text-green-700"
                          : ""
                      }`}
                      disabled={selectedAnswer !== null}
                      onClick={() => checkAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <div className={`mt-4 rounded-lg p-4 ${isCorrect ? "bg-green-100" : "bg-yellow-100"}`}>
                    <h3 className={`mb-2 font-bold ${isCorrect ? "text-green-700" : "text-yellow-700"}`}>
                      {isCorrect ? "Correct!" : "Not quite right"}
                    </h3>
                    <p>{currentQuestionData.explanation}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 p-4">
              <Button variant="outline" onClick={backToLevels}>
                Exit Level
              </Button>
              {showExplanation && (
                <Button
                  className="flex items-center gap-1 rounded-full bg-green-500 px-6 text-white hover:bg-green-600"
                  onClick={nextQuestion}
                >
                  <span>{currentQuestion < questions[currentLevel].length - 1 ? "Next Question" : "Finish"}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      )}

      {/* Results */}
      {gameMode === "results" && (
        <Card className="overflow-hidden border-2 border-green-200">
          <CardHeader className="bg-green-100">
            <CardTitle className="text-center text-green-700">Level Complete!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
              <Trophy className="h-12 w-12 text-yellow-600" />
            </div>

            <h2 className="mb-2 text-2xl font-bold">Your Score: {score}</h2>
            <p className="mb-4 text-slate-600">{score > highScore ? "New high score! 🎉" : "Well done!"}</p>

            <div className="mb-6 grid w-full max-w-md grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-slate-600">Stars Earned</p>
                <p className="text-xl font-bold text-blue-700">
                  <Star className="mr-1 inline-block h-5 w-5" />
                  {stars}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-slate-600">Highest Streak</p>
                <p className="text-xl font-bold text-green-700">{streak} 🔥</p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="flex-1" onClick={backToLevels}>
                Back to Levels
              </Button>
              <Button
                className="flex-1 rounded-full bg-green-500 text-white hover:bg-green-600"
                onClick={() => startLevel(currentLevel)}
              >
                Play Again
              </Button>
              {currentLevel < levels.length && (
                <Button
                  className="flex-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => startLevel(currentLevel + 1)}
                >
                  Next Level
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-blue-700">How to Play</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="instructions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            <TabsContent value="instructions" className="mt-4 space-y-2">
              <p>1. Choose a level to start playing</p>
              <p>2. Answer questions about shapes and their properties</p>
              <p>3. Try to answer correctly and quickly for more points</p>
              <p>4. Complete all questions before the timer runs out</p>
              <p>5. Earn stars and unlock new levels as you progress</p>
            </TabsContent>
            <TabsContent value="tips" className="mt-4 space-y-2">
              <p>• Look carefully at the properties of each shape</p>
              <p>• Remember the formulas for perimeter and area</p>
              <p>• Use the hint button if you're stuck</p>
              <p>• Build a streak by answering questions correctly in a row</p>
              <p>• Answer quickly to earn time bonus points</p>
            </TabsContent>
            <TabsContent value="rewards" className="mt-4 space-y-2">
              <p>• Earn points for each correct answer</p>
              <p>• Get streak bonuses for consecutive correct answers</p>
              <p>• Earn time bonuses for answering quickly</p>
              <p>• Collect stars for every 5 correct answers in a row</p>
              <p>• Set new high scores to challenge yourself</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
