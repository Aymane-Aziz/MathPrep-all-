import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧮</span>
            <h1 className="text-2xl font-bold text-blue-600">Math World</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full border-blue-200 px-6 hover:bg-blue-50">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="rounded-full bg-blue-500 px-6 hover:bg-blue-600">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-blue-700">
            Make Learning Math <span className="text-purple-600">Fun and Exciting!</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Join Math World and embark on an adventure where numbers come to life through interactive games and
            challenges designed for young explorers.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-500 px-8 py-6 text-lg hover:bg-blue-600">
              <Link href="/register">Start Your Adventure</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-blue-700">Discover the Magic of Math</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "🎮",
              title: "Fun Games",
              description:
                "Learn through play with our collection of engaging math games designed for different skill levels.",
              color: "blue",
            },
            {
              icon: "🏆",
              title: "Earn Achievements",
              description: "Collect stars and unlock special badges as you master new math concepts and skills.",
              color: "purple",
            },
            {
              icon: "📊",
              title: "Track Progress",
              description: "Watch your skills grow with personalized progress tracking and detailed analytics.",
              color: "pink",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg`}
            >
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${feature.color}-100 text-3xl`}
              >
                {feature.icon}
              </div>
              <h3 className={`mb-2 text-xl font-bold text-${feature.color}-600`}>{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Game Showcase */}
      <section className="container mx-auto py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-blue-700">Explore Our Math Games</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Addition Race",
              description: "Race against time to solve addition problems!",
              icon: "🏎️",
              color: "blue",
            },
            {
              title: "Number Ninja",
              description: "Slice through number challenges with precision!",
              icon: "⚔️",
              color: "green",
            },
            {
              title: "Subtraction Submarine",
              description: "Dive deep into the world of subtraction!",
              icon: "🚢",
              color: "purple",
            },
            {
              title: "Multiplication Mountain",
              description: "Climb to the peak by mastering multiplication!",
              icon: "⛰️",
              color: "orange",
            },
            {
              title: "Shape Sorter",
              description: "Learn about different shapes through fun sorting games!",
              icon: "⭐",
              color: "pink",
            },
            {
              title: "Memory Match",
              description: "Test your memory while learning math facts!",
              icon: "🧠",
              color: "yellow",
            },
          ].map((game, index) => (
            <div
              key={index}
              className={`rounded-xl border-2 border-${game.color}-200 bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-${game.color}-100 text-2xl`}
                >
                  {game.icon}
                </div>
                <h3 className={`text-xl font-bold text-${game.color}-600`}>{game.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">{game.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-blue-700">What Parents & Teachers Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "My daughter used to struggle with math, but now she asks to play Math World every day! It's transformed her relationship with numbers.",
                author: "Sarah P., Parent",
              },
              {
                quote:
                  "As a teacher, I've seen remarkable improvement in my students' math skills since incorporating Math World into our classroom activities.",
                author: "Mr. Johnson, 3rd Grade Teacher",
              },
              {
                quote:
                  "The progress tracking helps me understand exactly where my son needs more practice. It's like having a personal math tutor!",
                author: "David M., Parent",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-yellow-500">{"★".repeat(5)}</div>
                <p className="mb-4 italic text-gray-600">"{testimonial.quote}"</p>
                <p className="font-semibold text-blue-600">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-10 text-white shadow-lg">
          <h2 className="mb-6 text-3xl font-bold">Ready to Start Your Math Adventure?</h2>
          <p className="mb-8 text-xl">
            Join thousands of young mathematicians who are discovering the joy of learning through play.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white px-8 py-6 text-lg font-bold text-blue-600 hover:bg-blue-50"
          >
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              <h2 className="text-xl font-bold text-blue-600">Math World</h2>
            </div>
            <div className="flex gap-8 text-gray-600">
              <Link href="#" className="hover:text-blue-600">
                About Us
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Contact
              </Link>
            </div>
            <div className="text-sm text-gray-500">© 2023 Math World. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
