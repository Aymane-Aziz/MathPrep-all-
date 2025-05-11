import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GamesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Math Games</h1>
      <p className="mb-8 text-lg text-slate-600">Have fun while learning math with these interactive games!</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Addition Race Game */}
        <Card className="overflow-hidden border-2 border-green-200">
          <div className="aspect-video bg-green-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">🏎️</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-green-700">Addition Race</h2>
            <p className="mt-2 text-slate-600">Race to solve addition problems and reach the finish line first!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-green-500 hover:bg-green-600">
              <Link href="/games/addition-race">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Subtraction Submarine Game */}
        <Card className="overflow-hidden border-2 border-blue-200">
          <div className="aspect-video bg-blue-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">🚢</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-blue-700">Subtraction Submarine</h2>
            <p className="mt-2 text-slate-600">Dive deep and solve subtraction problems to navigate your submarine!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
              <Link href="/games/subtraction-submarine">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Multiplication Mountain Game */}
        <Card className="overflow-hidden border-2 border-purple-200">
          <div className="aspect-video bg-purple-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">⛰️</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-purple-700">Multiplication Mountain</h2>
            <p className="mt-2 text-slate-600">Climb the mountain by solving multiplication problems!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-purple-500 hover:bg-purple-600">
              <Link href="/games/multiplication-mountain">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Memory Match Game */}
        <Card className="overflow-hidden border-2 border-yellow-200">
          <div className="aspect-video bg-yellow-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">🧠</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-yellow-700">Memory Match</h2>
            <p className="mt-2 text-slate-600">Test your memory by matching pairs of cards!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600">
              <Link href="/games/memory-match">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Shape Sorter Game */}
        <Card className="overflow-hidden border-2 border-pink-200">
          <div className="aspect-video bg-pink-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">🔷</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-pink-700">Shape Sorter</h2>
            <p className="mt-2 text-slate-600">Sort shapes by their properties and learn geometry!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
              <Link href="/games/shape-sorter">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Number Ninja Game */}
        <Card className="overflow-hidden border-2 border-orange-200">
          <div className="aspect-video bg-orange-100 p-6">
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl">🥷</div>
            </div>
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-orange-700">Number Ninja</h2>
            <p className="mt-2 text-slate-600">Slice through numbers and practice your counting skills!</p>
          </CardContent>
          <CardFooter className="border-t bg-slate-50 p-4">
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
              <Link href="/games/number-ninja">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
