import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/contexts/progress-context"
import { Star, Trophy } from "lucide-react"

type GameProgressProps = {
  gameId: string
  className?: string
}

export function GameProgress({ gameId, className = "" }: GameProgressProps) {
  const { getGameProgress } = useProgress()
  const gameProgress = getGameProgress(gameId)

  if (!gameProgress) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
        <Star className="mr-1 h-3 w-3" /> {gameProgress.starsEarned}
      </Badge>
      <Badge variant="outline" className="bg-blue-50 text-blue-700">
        <Trophy className="mr-1 h-3 w-3" /> {gameProgress.highScore}
      </Badge>
    </div>
  )
}
