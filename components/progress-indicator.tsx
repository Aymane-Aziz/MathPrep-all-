import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/contexts/progress-context"

type ProgressIndicatorProps = {
  topicId: string
  showLabel?: boolean
  className?: string
}

export function ProgressIndicator({ topicId, showLabel = true, className = "" }: ProgressIndicatorProps) {
  const { getTopicProgress } = useProgress()
  const topicProgress = getTopicProgress(topicId)

  // Calculate percentage
  const percentage = topicProgress
    ? Math.round((topicProgress.completed / Math.max(1, topicProgress.totalLessons)) * 100)
    : 0

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium">Progress</span>
          <span className="text-xs font-medium">{percentage}%</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
