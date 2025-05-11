interface ProgressBarProps {
  value: number
  color?: string
}

export function ProgressBar({ value, color = "bg-blue-500" }: ProgressBarProps) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className={`absolute left-0 top-0 h-full ${color} transition-all duration-500 ease-in-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
