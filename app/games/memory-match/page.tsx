"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Trophy, Timer, Star, RotateCcw } from "lucide-react"
import { useProgress } from "@/contexts/progress-context"

// Define card types
type CardType = {
  id: number
  symbol: string
  matched: boolean
  flipped: boolean
}

// Define game difficulty levels
type Difficulty = {
  name: string
  pairs: number
  timeLimit: number
}

const difficulties: Difficulty[] = [
  { name: "Easy", pairs: 6, timeLimit: 60 },
  { name: "Medium", pairs: 8, timeLimit: 90 },
  { name: "Hard", pairs: 12, timeLimit: 120 },
]

// Symbols for cards
const symbols = [
  "🍎",
  "🍌",
  "🍊",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
  "🥝",
  "🍅",
  "🥑",
  "🥦",
  "🥕",
  "🌽",
  "🧀",
  "🍦",
  "🍩",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
]

export default function MemoryMatchPage() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [difficulty, setDifficulty] = useState<Difficulty>(difficulties[0])
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const { updateGameProgress } = useProgress()

  // Initialize cards based on difficulty
  const initializeCards = useCallback((diff: Difficulty) => {
    // Select symbols based on the number of pairs
    const gameSymbols = [...symbols].slice(0, diff.pairs)

    // Create pairs of cards
    let cardPairs: CardType[] = []
    gameSymbols.forEach((symbol, index) => {
      // Create two cards with the same symbol
      cardPairs.push({
        id: index * 2,
        symbol,
        matched: false,
        flipped: false,
      })
      cardPairs.push({
        id: index * 2 + 1,
        symbol,
        matched: false,
        flipped: false,
      })
    })

    // Shuffle cards
    cardPairs = cardPairs.sort(() => Math.random() - 0.5)

    return cardPairs
  }, [])

  // Start the game
  const startGame = (diff: Difficulty) => {
    setDifficulty(diff)
    setCards(initializeCards(diff))
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setScore(0)
    setTimeLeft(diff.timeLimit)
    setGameState("playing")
  }

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if already two cards are flipped or this card is already flipped/matched
    const card = cards.find((c) => c.id === id)
    if (flippedCards.length >= 2 || card?.flipped || card?.matched) return

    // Flip the card
    const newCards = cards.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    setCards(newCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const firstCard = cards.find((c) => c.id === newFlippedCards[0])
      const secondCard = cards.find((c) => c.id === newFlippedCards[1])

      if (firstCard?.symbol === secondCard?.symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = cards.map((card) =>
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1]
              ? { ...card, matched: true, flipped: true }
              : card,
          )
          setCards(matchedCards)
          setFlippedCards([])
          setMatchedPairs(matchedPairs + 1)

          // Calculate score bonus based on time left and difficulty
          const timeBonus = Math.floor(timeLeft / 5)
          const difficultyMultiplier = difficulties.findIndex((d) => d.name === difficulty.name) + 1
          const matchScore = 10 * difficultyMultiplier + timeBonus
          setScore(score + matchScore)

          // Check if all pairs are matched
          if (matchedPairs + 1 === difficulty.pairs) {
            // Game completed
            setGameState("finished")
            if (score + matchScore > bestScore) {
              setBestScore(score + matchScore)
              localStorage.setItem("memoryMatchBestScore", (score + matchScore).toString())
            }

            // Update progress with actual score
            if (score + matchScore > 0) {
              updateGameProgress("4", score + matchScore) // Memory Match is game4
            }
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = cards.map((card) =>
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1]
              ? { ...card, flipped: false }
              : card,
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
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

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem("memoryMatchBestScore")
    if (savedBestScore) {
      setBestScore(Number.parseInt(savedBestScore))
    }
  }, [])

  // Calculate grid columns based on difficulty
  const getGridColumns = () => {
    if (difficulty.pairs <= 6) return "grid-cols-3"
    if (difficulty.pairs <= 8) return "grid-cols-4"
    return "grid-cols-4 md:grid-cols-6"
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/games">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-blue-600">Memory Match</h1>
      </div>

      <Card className="mx-auto max-w-4xl overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg">
        <CardHeader className="bg-blue-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <span className="text-2xl">🧠</span> Memory Match Challenge
            </CardTitle>
            {gameState === "playing" && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-white text-blue-700 px-3 py-1 flex items-center gap-1">
                  <Timer className="h-4 w-4" /> {timeLeft}s
                </Badge>
                <Badge variant="outline" className="bg-white text-blue-700 px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4" /> {score}
                </Badge>
              </div>
            )}
          </div>
          <CardDescription className="text-blue-700 font-medium">
            {gameState === "ready"
              ? "Match pairs of cards to test your memory!"
              : gameState === "playing"
                ? `Found ${matchedPairs} of ${difficulty.pairs} pairs in ${moves} moves`
                : "Game Over!"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {gameState === "ready" && (
            <div className="space-y-8 text-center">
              <div className="rounded-lg bg-blue-50 p-6 shadow-inner">
                <h2 className="mb-4 text-xl font-bold text-blue-700">How to Play:</h2>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-bold">
                      1
                    </span>
                    <span>Flip cards to find matching pairs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-bold">
                      2
                    </span>
                    <span>Match all pairs before time runs out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-bold">
                      3
                    </span>
                    <span>Earn points for matches and speed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-bold">
                      4
                    </span>
                    <span>Wrong matches cost you points!</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-700 mb-4">Select Difficulty:</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {difficulties.map((diff) => (
                    <Button
                      key={diff.name}
                      onClick={() => startGame(diff)}
                      className={`rounded-lg px-6 py-8 text-lg font-bold text-white shadow-md transition-all hover:scale-105
                        ${
                          diff.name === "Easy"
                            ? "bg-green-500 hover:bg-green-600"
                            : diff.name === "Medium"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {diff.name}
                      <div className="text-sm font-normal mt-1">
                        {diff.pairs} pairs • {diff.timeLimit}s
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {bestScore > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4 inline-block mx-auto">
                  <p className="text-yellow-700 font-bold flex items-center gap-2">
                    <Trophy className="h-5 w-5" /> Best Score: {bestScore}
                  </p>
                </div>
              )}
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="bg-blue-100 text-blue-700 px-3 py-1">
                  Pairs: {matchedPairs}/{difficulty.pairs}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => startGame(difficulty)}
                >
                  <RotateCcw className="h-4 w-4" /> Restart
                </Button>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 px-3 py-1">
                  Moves: {moves}
                </Badge>
              </div>

              <div className={`grid ${getGridColumns()} gap-3 justify-center`}>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative cursor-pointer h-24 w-20 sm:h-28 sm:w-24 rounded-lg transition-all duration-500 ${
                      card.flipped || card.matched ? "transform-style-preserve-3d" : ""
                    }`}
                    onClick={() => handleCardClick(card.id)}
                    style={{
                      perspective: "1000px",
                      transform: card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Card back */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500 border-2 border-blue-300 shadow-md
                        ${card.flipped || card.matched ? "opacity-0" : "opacity-100"}`}
                      style={{ backfaceVisibility: "hidden", transition: "opacity 0.5s" }}
                    >
                      <div className="text-white text-2xl font-bold">?</div>
                    </div>

                    {/* Card front */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-lg bg-white border-2 
                        ${card.matched ? "border-green-500 bg-green-50" : "border-blue-300"}
                        ${card.flipped || card.matched ? "opacity-100" : "opacity-0"}`}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", transition: "opacity 0.5s" }}
                    >
                      <div className="text-4xl">{card.symbol}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / difficulty.timeLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {gameState === "finished" && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-100 p-6 shadow-md">
                  <Trophy className="h-16 w-16 text-blue-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-700">
                {matchedPairs === difficulty.pairs ? "Congratulations!" : "Time's Up!"}
              </h2>

              <div className="rounded-lg bg-blue-50 p-6 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-blue-700">Final Score</h3>
                    <p className="text-4xl font-bold text-blue-600">{score}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-blue-700">Pairs Found</h3>
                    <p className="text-4xl font-bold text-blue-600">
                      {matchedPairs}/{difficulty.pairs}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-blue-700">Moves Made</h3>
                    <p className="text-4xl font-bold text-blue-600">{moves}</p>
                  </div>
                </div>

                {score > bestScore && (
                  <div className="mt-4 bg-yellow-100 rounded-lg p-3 inline-block">
                    <p className="text-yellow-700 font-bold flex items-center gap-2">
                      <Star className="h-5 w-5" /> New Best Score!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => startGame(difficulty)}
                  className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 shadow-md"
                >
                  Play Again
                </Button>

                <Button
                  onClick={() => setGameState("ready")}
                  className="rounded-full bg-green-500 px-6 py-2 text-white hover:bg-green-600 shadow-md"
                >
                  Change Difficulty
                </Button>

                <Button asChild variant="outline" className="rounded-full shadow-sm">
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
