import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProgressBar } from "@/components/progress-bar"

export default function Dashboard() {
  return (
    <div className="container mx-auto space-y-8 py-6">
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-blue-600">Welcome back, Math Explorer! 👋</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-md">
            <CardHeader className="bg-blue-100 pb-2">
              <CardTitle className="text-xl text-blue-700">Continue Learning</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="text-3xl">➕</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Addition</h3>
                  <p className="text-sm text-slate-600">Adding numbers up to 20</p>
                  <ProgressBar value={65} color="bg-blue-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <Link href="/topics/addition">Continue</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-md">
            <CardHeader className="bg-purple-100 pb-2">
              <CardTitle className="text-xl text-purple-700">Daily Challenge</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <span className="text-3xl">🏆</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Number Ninja</h3>
                  <p className="text-sm text-slate-600">Solve 5 math puzzles in a row!</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full rounded-full bg-purple-500 text-white hover:bg-purple-600">
                <Link href="/challenges/daily">Start Challenge</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Popular Topics</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Counting Fun",
              description: "Learn to count from 1 to 100",
              emoji: "🔢",
              color: "pink",
              href: "/topics/counting",
            },
            {
              title: "Addition Adventure",
              description: "Adding numbers together",
              emoji: "➕",
              color: "blue",
              href: "/topics/addition",
            },
            {
              title: "Subtraction Safari",
              description: "Taking away numbers",
              emoji: "➖",
              color: "purple",
              href: "/topics/subtraction",
            },
            {
              title: "Shape Explorers",
              description: "Discover different shapes",
              emoji: "⭐",
              color: "green",
              href: "/topics/shapes",
            },
            {
              title: "Multiplication Magic",
              description: "Multiply numbers together",
              emoji: "✖️",
              color: "orange",
              href: "/topics/multiplication",
            },
            {
              title: "Fraction Friends",
              description: "Understanding parts of a whole",
              emoji: "🍕",
              color: "yellow",
              href: "/topics/fractions",
            },
          ].map((topic) => (
            <Link key={topic.title} href={topic.href} className="group">
              <Card
                className={`h-full overflow-hidden border-2 border-${topic.color}-200 bg-gradient-to-br from-${topic.color}-50 to-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <CardHeader className={`bg-${topic.color}-100 pb-2`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{topic.emoji}</span>
                    <CardTitle className={`text-lg text-${topic.color}-700`}>{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>{topic.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 shadow-md">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="text-4xl">🎮</div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-blue-700">Math Games Carnival</h2>
            <p className="text-slate-700">
              Play fun games and earn stars! Challenge yourself with our collection of math games.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 text-white hover:from-blue-600 hover:to-purple-600"
          >
            <Link href="/games">Play Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
