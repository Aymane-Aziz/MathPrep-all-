"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ThreeDShapesPage() {
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const shapes = [
    {
      name: "Cube",
      description: "A 3D shape with 6 square faces, 8 vertices, and 12 edges.",
      emoji: "🧊",
      properties: ["6 faces", "8 vertices", "12 edges", "All faces are squares"],
      examples: ["Dice", "Rubik's cube", "Sugar cube", "Ice cube"],
    },
    {
      name: "Sphere",
      description: "A perfectly round 3D shape where all points on the surface are the same distance from the center.",
      emoji: "⚽",
      properties: ["1 curved surface", "No edges", "No vertices", "Perfectly round"],
      examples: ["Ball", "Globe", "Marble", "Bubble"],
    },
    {
      name: "Cylinder",
      description: "A 3D shape with two circular faces connected by a curved surface.",
      emoji: "🥫",
      properties: ["2 circular faces", "1 curved surface", "No vertices", "2 circular edges"],
      examples: ["Can", "Toilet paper roll", "Pencil", "Drinking glass"],
    },
    {
      name: "Cone",
      description: "A 3D shape with a circular base connected to a point by a curved surface.",
      emoji: "🍦",
      properties: ["1 circular face", "1 curved surface", "1 vertex", "1 circular edge"],
      examples: ["Ice cream cone", "Traffic cone", "Party hat", "Funnel"],
    },
    {
      name: "Pyramid",
      description: "A 3D shape with a polygon base connected to a point by triangular faces.",
      emoji: "🔺",
      properties: ["1 square face (base)", "4 triangular faces", "5 vertices", "8 edges"],
      examples: ["Egyptian pyramids", "Tent", "Roof", "Chocolate pyramid"],
    },
  ]

  const checkAnswer = (shapeName: string) => {
    setSelectedShape(shapeName)
    setIsCorrect(shapeName === "Cube")
  }

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/topics/shapes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-600">3D Shapes</h1>
      </div>

      <Tabs defaultValue="learn" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="learn">Learn 3D Shapes</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <Card className="overflow-hidden border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">📚</span> 3D Shapes Around Us
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-lg">
                3D shapes have length, width, AND height! They take up space in the real world.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {shapes.map((shape) => (
                  <Card key={shape.name} className="overflow-hidden border-2 border-green-100">
                    <CardHeader className="bg-green-50 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{shape.emoji}</span>
                        <CardTitle className="text-lg text-green-700">{shape.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="mb-3 text-sm text-slate-600">{shape.description}</p>

                      <h4 className="mb-1 font-bold text-green-700">Properties:</h4>
                      <ul className="mb-3 list-inside list-disc text-sm text-slate-600">
                        {shape.properties.map((property, index) => (
                          <li key={index}>{property}</li>
                        ))}
                      </ul>

                      <h4 className="mb-1 font-bold text-green-700">Examples:</h4>
                      <div className="flex flex-wrap gap-1">
                        {shape.examples.map((example, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-yellow-50 p-4">
                <h3 className="mb-2 text-lg font-bold text-yellow-700">Remember:</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>2D shapes are flat, like a drawing on paper</li>
                  <li>3D shapes have volume and take up space</li>
                  <li>3D shapes have faces (flat surfaces), edges (where faces meet), and vertices (corners)</li>
                  <li>Some 3D shapes have curved surfaces instead of flat faces</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card className="overflow-hidden border-2 border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">🎮</span> Try It!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="rounded-lg bg-white p-6 shadow-inner">
                <h3 className="mb-4 text-center text-xl font-bold">Which 3D shape has 6 square faces?</h3>

                <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-5">
                  {shapes.map((shape) => (
                    <button
                      key={shape.name}
                      onClick={() => checkAnswer(shape.name)}
                      className={`flex flex-col items-center gap-2 rounded-lg p-4 transition-all ${
                        selectedShape === shape.name ? "bg-green-100 ring-2 ring-green-500" : "hover:bg-green-50"
                      }`}
                    >
                      <div className="text-5xl">{shape.emoji}</div>
                      <p className="text-center font-medium">{shape.name}</p>
                    </button>
                  ))}
                </div>

                {isCorrect !== null && (
                  <div
                    className={`mt-4 flex items-center justify-center rounded-lg p-3 ${
                      isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? (
                      <span>Correct! A cube has 6 square faces.</span>
                    ) : (
                      <span>Not quite. A cube has 6 square faces. Try again!</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-2 border-blue-200">
              <CardHeader className="bg-blue-100">
                <CardTitle className="text-blue-700">Fun Fact</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <div>
                    <p className="text-slate-600">
                      The Platonic solids are special 3D shapes where all faces are identical regular polygons. There
                      are only five of them: tetrahedron, cube, octahedron, dodecahedron, and icosahedron!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
