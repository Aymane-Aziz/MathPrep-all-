"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ShapesPage() {
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    if (selectedShape === "triangle") {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setAttempts(attempts + 1)
    }
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-600">Shapes</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <span className="mr-1 text-lg">⭐</span> 65 Stars
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Lesson Section */}
          <Card className="overflow-hidden border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">📚</span> Let's Learn About Shapes!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">Shapes are all around us! Let's learn about some basic shapes.</p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <div className="h-20 w-20 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-center font-medium">Circle</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-green-100">
                    <div className="h-20 w-20 bg-green-500"></div>
                  </div>
                  <p className="text-center font-medium">Square</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-green-100">
                    <div
                      className="h-0 w-0 border-b-[60px] border-l-[30px] border-r-[30px] border-b-green-500 border-l-transparent border-r-transparent"
                      style={{ transform: "translateY(-10px)" }}
                    ></div>
                  </div>
                  <p className="text-center font-medium">Triangle</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-green-100">
                    <div className="h-16 w-20 bg-green-500"></div>
                  </div>
                  <p className="text-center font-medium">Rectangle</p>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>A circle is round with no corners</li>
                  <li>A square has 4 equal sides and 4 corners</li>
                  <li>A triangle has 3 sides and 3 corners</li>
                  <li>A rectangle has 4 sides and 4 corners, with opposite sides equal</li>
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
                <h3 className="mb-4 text-center text-xl font-bold">Which shape has 3 sides?</h3>

                <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                  <button
                    onClick={() => setSelectedShape("circle")}
                    className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-all ${
                      selectedShape === "circle" ? "bg-green-100 ring-2 ring-green-500" : "hover:bg-green-50"
                    }`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <div className="h-16 w-16 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-center font-medium">Circle</p>
                  </button>

                  <button
                    onClick={() => setSelectedShape("square")}
                    className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-all ${
                      selectedShape === "square" ? "bg-green-100 ring-2 ring-green-500" : "hover:bg-green-50"
                    }`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-green-100">
                      <div className="h-16 w-16 bg-green-500"></div>
                    </div>
                    <p className="text-center font-medium">Square</p>
                  </button>

                  <button
                    onClick={() => setSelectedShape("triangle")}
                    className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-all ${
                      selectedShape === "triangle" ? "bg-green-100 ring-2 ring-green-500" : "hover:bg-green-50"
                    }`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-green-100">
                      <div
                        className="h-0 w-0 border-b-[48px] border-l-[24px] border-r-[24px] border-b-green-500 border-l-transparent border-r-transparent"
                        style={{ transform: "translateY(-8px)" }}
                      ></div>
                    </div>
                    <p className="text-center font-medium">Triangle</p>
                  </button>

                  <button
                    onClick={() => setSelectedShape("rectangle")}
                    className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-all ${
                      selectedShape === "rectangle" ? "bg-green-100 ring-2 ring-green-500" : "hover:bg-green-50"
                    }`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-green-100">
                      <div className="h-12 w-16 bg-green-500"></div>
                    </div>
                    <p className="text-center font-medium">Rectangle</p>
                  </button>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={checkAnswer}
                    className="rounded-full bg-green-500 px-8 py-2 text-white hover:bg-green-600"
                    disabled={!selectedShape}
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
                        <span>Correct! A triangle has 3 sides.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        <span>Not quite. Try again! Count the sides of each shape.</span>
                      </div>
                    )}
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
                    <span className="text-sm font-medium">Basic Shapes</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <ProgressBar value={80} color="bg-purple-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">2D Shapes</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <ProgressBar value={65} color="bg-green-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">3D Shapes</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <ProgressBar value={30} color="bg-blue-500" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">Shape Patterns</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <ProgressBar value={15} color="bg-orange-500" />
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge className="bg-yellow-100 text-yellow-700">
                  <span className="mr-1 text-lg">🏆</span> 25 Stars Earned
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Card */}
          <Card className="overflow-hidden border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-700">Challenge</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="text-3xl">⭐</span>
                </div>
                <div>
                  <h3 className="font-bold">Shape Sorter</h3>
                  <p className="text-sm text-slate-600">Identify and match different shapes!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-green-500 text-white hover:bg-green-600">
                <Link href="/games/shape-sorter">Start Challenge</Link>
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
                  <span className="text-3xl">🧊</span>
                </div>
                <div>
                  <h3 className="font-bold">3D Shapes</h3>
                  <p className="text-sm text-slate-600">Learn about cubes, spheres, and more!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/shapes/3d-shapes">Continue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
