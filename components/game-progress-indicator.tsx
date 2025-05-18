import { Progress } from "@/components/ui/progress"

interface GameProgressIndicatorProps {
  level: number
  maxLevel: number
  completionPercentage: number
  className?: string
}

export function GameProgressIndicator({
  level,
  maxLevel,
  completionPercentage,
  className = "",
}: GameProgressIndicatorProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span>Level {level}</span>
        <span>{Math.round(completionPercentage)}% Complete</span>
      </div>
      <Progress value={completionPercentage} className="h-2" />
      <div className="text-xs text-muted-foreground text-right">
        {level} of {maxLevel} levels
      </div>
    </div>
  )
}
