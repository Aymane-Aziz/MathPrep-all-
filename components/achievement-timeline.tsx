export function AchievementTimeline() {
  // Mock achievement data
  const achievements = [
    {
      id: 1,
      title: "Math Explorer",
      description: "Visited all topic areas",
      date: "3 days ago",
      icon: "🏆",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      reward: 30,
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Got 100% on Addition quiz",
      date: "1 week ago",
      icon: "⭐",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      reward: 20,
    },
    {
      id: 3,
      title: "Game Master",
      description: "Completed all levels in Shape Sorter",
      date: "2 weeks ago",
      icon: "🎮",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      reward: 40,
    },
    {
      id: 4,
      title: "Topic Master",
      description: "Completed all lessons in Counting topic",
      date: "3 weeks ago",
      icon: "📚",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      reward: 50,
    },
    {
      id: 5,
      title: "Quick Learner",
      description: "Completed 5 lessons in one day",
      date: "1 month ago",
      icon: "⚡",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      reward: 25,
    },
  ]

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:left-9 before:ml-px before:h-full before:w-0.5 before:bg-gray-200">
      {achievements.map((achievement, index) => (
        <div key={achievement.id} className="relative flex items-start">
          <div className="absolute left-0 flex h-9 w-9 items-center justify-center">
            <div
              className={`h-9 w-9 rounded-full ${achievement.iconBg} ${achievement.iconColor} flex items-center justify-center`}
            >
              <span className="text-lg">{achievement.icon}</span>
            </div>
          </div>
          <div className="ml-14 flex-1">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-gray-500">{achievement.description}</div>
              </div>
              <div className="ml-2 mt-1 flex items-center whitespace-nowrap text-xs font-medium text-gray-500">
                <span>{achievement.date}</span>
                <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-700">
                  +{achievement.reward} points
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
