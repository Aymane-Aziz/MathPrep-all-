export function ActivityFeed() {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "lesson",
      title: "Completed Addition with Three Numbers",
      topic: "Addition",
      date: "Today",
      time: "10:25 AM",
      score: 90,
      stars: 3,
      icon: "📚",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "game",
      title: "Played Shape Sorter",
      topic: "Shapes",
      date: "Today",
      time: "9:15 AM",
      score: 720,
      stars: 2,
      icon: "🎮",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      type: "achievement",
      title: "Unlocked Math Explorer Achievement",
      topic: "General",
      date: "Yesterday",
      time: "3:45 PM",
      reward: 30,
      icon: "🏆",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 4,
      type: "lesson",
      title: "Completed Multiplication Tables",
      topic: "Multiplication",
      date: "Yesterday",
      time: "2:30 PM",
      score: 85,
      stars: 2,
      icon: "📚",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 5,
      type: "game",
      title: "Played Multiplication Mountain",
      topic: "Multiplication",
      date: "Yesterday",
      time: "11:20 AM",
      score: 540,
      stars: 3,
      icon: "🎮",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 6,
      type: "challenge",
      title: "Completed Daily Challenge",
      topic: "Mixed",
      date: "2 days ago",
      time: "4:15 PM",
      score: 95,
      stars: 3,
      icon: "🌟",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 7,
      type: "lesson",
      title: "Completed 3D Shapes",
      topic: "Shapes",
      date: "3 days ago",
      time: "1:45 PM",
      score: 80,
      stars: 2,
      icon: "📚",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className={`mt-1 rounded-full p-2 ${activity.iconBg} ${activity.iconColor}`}>
            <span className="text-lg">{activity.icon}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.title}</h4>
              <span className="text-sm text-gray-500">
                {activity.date}, {activity.time}
              </span>
            </div>
            <p className="text-sm text-gray-500">Topic: {activity.topic}</p>
            <div className="mt-1 flex items-center space-x-3">
              {activity.score && <span className="text-sm text-blue-600">Score: {activity.score}</span>}
              {activity.stars && <span className="text-sm text-yellow-600">Stars: {"⭐".repeat(activity.stars)}</span>}
              {activity.reward && <span className="text-sm text-green-600">Reward: +{activity.reward} points</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
