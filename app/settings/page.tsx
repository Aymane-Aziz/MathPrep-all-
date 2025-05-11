"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Moon, Sun, Volume2, VolumeX, Eye, EyeOff, Laptop } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [sounds, setSounds] = useState(true)
  const [theme, setTheme] = useState("system")
  const [fontSize, setFontSize] = useState([16])
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold text-blue-600">Settings</h1>

      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-blue-700">Application Settings</CardTitle>
          <CardDescription>Customize your Math World experience</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound Effects</h3>
                    <p className="text-sm text-gray-500">Enable sound effects during games and activities</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {sounds ? (
                      <Volume2 className="h-4 w-4 text-blue-500" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-gray-500" />
                    )}
                    <Switch checked={sounds} onCheckedChange={setSounds} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Save Progress</h3>
                    <p className="text-sm text-gray-500">Automatically save your progress in games and lessons</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Hints</h3>
                    <p className="text-sm text-gray-500">Display hints when you're stuck on a problem</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Difficulty Level</h3>
                  <p className="text-sm text-gray-500">Set the default difficulty for new games and activities</p>
                  <RadioGroup defaultValue="medium" className="mt-2 flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easy" />
                      <Label htmlFor="easy">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hard" />
                      <Label htmlFor="hard">Hard</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-gray-500">Choose your preferred theme</p>
                  <div className="mt-2 flex space-x-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className={theme === "light" ? "bg-blue-500 hover:bg-blue-600" : ""}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className={theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : ""}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className={theme === "system" ? "bg-blue-500 hover:bg-blue-600" : ""}
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Font Size</h3>
                    <span className="text-sm text-gray-500">{fontSize[0]}px</span>
                  </div>
                  <Slider value={fontSize} min={12} max={24} step={1} onValueChange={setFontSize} className="py-4" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Color Scheme</h3>
                  <p className="text-sm text-gray-500">Choose your preferred color scheme</p>
                  <RadioGroup defaultValue="blue" className="mt-2 grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blue" id="blue" />
                      <Label htmlFor="blue" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                        Blue
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="purple" id="purple" />
                      <Label htmlFor="purple" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-purple-500"></div>
                        Purple
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="green" id="green" />
                      <Label htmlFor="green" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                        Green
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="orange" id="orange" />
                      <Label htmlFor="orange" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-orange-500"></div>
                        Orange
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pink" id="pink" />
                      <Label htmlFor="pink" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-pink-500"></div>
                        Pink
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teal" id="teal" />
                      <Label htmlFor="teal" className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-teal-500"></div>
                        Teal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications about your progress and achievements</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className={`h-4 w-4 ${notifications ? "text-blue-500" : "text-gray-500"}`} />
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Notification Types</h3>
                  <p className="text-sm text-gray-500">Choose which notifications you want to receive</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="achievements" checked={true} />
                      <Label htmlFor="achievements">Achievement Unlocked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="daily-challenges" checked={true} />
                      <Label htmlFor="daily-challenges">Daily Challenge Reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="progress-updates" checked={true} />
                      <Label htmlFor="progress-updates">Weekly Progress Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="new-content" checked={true} />
                      <Label htmlFor="new-content">New Content Available</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Notification Frequency</h3>
                  <p className="text-sm text-gray-500">How often would you like to receive notifications?</p>
                  <RadioGroup defaultValue="balanced" className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minimal" id="minimal" />
                      <Label htmlFor="minimal">Minimal - Important notifications only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <Label htmlFor="balanced">Balanced - Regular updates without overwhelming</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All - Receive all possible notifications</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">High Contrast Mode</h3>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {highContrast ? (
                      <Eye className="h-4 w-4 text-blue-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    )}
                    <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Reduced Motion</h3>
                    <p className="text-sm text-gray-500">Minimize animations throughout the application</p>
                  </div>
                  <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Screen Reader Support</h3>
                    <p className="text-sm text-gray-500">Optimize for screen readers and assistive technology</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Text-to-Speech</h3>
                  <p className="text-sm text-gray-500">Read problem text aloud</p>
                  <RadioGroup defaultValue="manual" className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="off" id="tts-off" />
                      <Label htmlFor="tts-off">Off</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="tts-manual" />
                      <Label htmlFor="tts-manual">Manual (click to read)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="tts-auto" />
                      <Label htmlFor="tts-auto">Automatic (read all problems)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Animation Speed</h3>
                    <span className="text-sm text-gray-500">Normal</span>
                  </div>
                  <Slider defaultValue={[50]} min={0} max={100} step={10} className="py-4" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">Save Changes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
