"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PreferencesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">Learning Preferences</h1>

      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-blue-700">Customize Your Learning Experience</CardTitle>
          <CardDescription>Set your preferences for how you want to learn and play</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="learning">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="learning">Learning Preferences</TabsTrigger>
              <TabsTrigger value="games">Game Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="learning" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Learning Style</h3>
                  <p className="text-sm text-gray-500">Choose how you prefer to learn new concepts</p>
                  <RadioGroup defaultValue="visual" className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visual" id="visual" />
                      <Label htmlFor="visual">Visual - Learn with pictures and diagrams</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auditory" id="auditory" />
                      <Label htmlFor="auditory">Auditory - Learn by listening to explanations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reading" id="reading" />
                      <Label htmlFor="reading">Reading/Writing - Learn by reading and taking notes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                      <Label htmlFor="kinesthetic">Kinesthetic - Learn by doing and practicing</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Lesson Pace</h3>
                  <p className="text-sm text-gray-500">How quickly do you want to progress through lessons?</p>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pace" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow - Take your time with extra practice</SelectItem>
                      <SelectItem value="medium">Medium - Balanced pace with regular practice</SelectItem>
                      <SelectItem value="fast">Fast - Quick progression for advanced learners</SelectItem>
                      <SelectItem value="adaptive">Adaptive - Adjusts based on your performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Practice Frequency</h3>
                  <p className="text-sm text-gray-500">
                    How often do you want to practice previously learned concepts?
                  </p>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Focus more on new concepts</SelectItem>
                      <SelectItem value="medium">Medium - Balanced between new and review</SelectItem>
                      <SelectItem value="high">High - Frequent review of previous concepts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Explanations</h3>
                    <p className="text-sm text-gray-500">Display detailed explanations for correct answers</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Hints</h3>
                    <p className="text-sm text-gray-500">Provide hints when you're stuck on a problem</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-World Examples</h3>
                    <p className="text-sm text-gray-500">Include practical, real-world examples in lessons</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Preferences</Button>
              </div>
            </TabsContent>

            <TabsContent value="games" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Game Difficulty</h3>
                  <p className="text-sm text-gray-500">Set your preferred difficulty level for games</p>
                  <RadioGroup defaultValue="adaptive" className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="game-easy" />
                      <Label htmlFor="game-easy">Easy - More time, simpler problems</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="game-medium" />
                      <Label htmlFor="game-medium">Medium - Standard difficulty</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="game-hard" />
                      <Label htmlFor="game-hard">Hard - Less time, more complex problems</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adaptive" id="game-adaptive" />
                      <Label htmlFor="game-adaptive">Adaptive - Adjusts based on your performance</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Game Speed</h3>
                  <p className="text-sm text-gray-500">How fast should games run?</p>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select game speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow - Take your time</SelectItem>
                      <SelectItem value="normal">Normal - Standard speed</SelectItem>
                      <SelectItem value="fast">Fast - For quick thinkers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Background Music</h3>
                    <p className="text-sm text-gray-500">Play background music during games</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound Effects</h3>
                    <p className="text-sm text-gray-500">Play sound effects for actions and achievements</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Timer</h3>
                    <p className="text-sm text-gray-500">Display countdown timer during timed games</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Competitive Mode</h3>
                    <p className="text-sm text-gray-500">Enable leaderboards and competition features</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
