"use client"

import { useEffect, useRef } from "react"

type ProgressChartProps = {
  timeRange: string
}

export function ProgressChart({ timeRange }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    // Generate data based on timeRange
    const data = generateProgressData(timeRange)
    const maxValue = Math.max(...data.values) * 1.1 // Add 10% padding

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // Slate-200
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, rect.height - padding)
    ctx.lineTo(rect.width - padding, rect.height - padding)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, rect.height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // Slate-200
    ctx.setLineDash([5, 5])

    for (let i = 1; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      ctx.moveTo(padding, rect.height - y)
      ctx.lineTo(rect.width - padding, rect.height - y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw data points and line
    if (data.values.length > 0) {
      const xStep = chartWidth / (data.values.length - 1)

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = "#3b82f6" // Blue-500
      ctx.lineWidth = 3
      ctx.lineJoin = "round"

      data.values.forEach((value, index) => {
        const x = padding + index * xStep
        const y = rect.height - padding - (value / maxValue) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw points
      data.values.forEach((value, index) => {
        const x = padding + index * xStep
        const y = rect.height - padding - (value / maxValue) * chartHeight

        ctx.beginPath()
        ctx.fillStyle = "#ffffff"
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      })

      // Draw area under the line
      ctx.beginPath()
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)" // Blue-500 with opacity

      // Start from bottom left
      ctx.moveTo(padding, rect.height - padding)

      // Draw line to first point
      ctx.lineTo(padding, rect.height - padding - (data.values[0] / maxValue) * chartHeight)

      // Draw line through all points
      data.values.forEach((value, index) => {
        const x = padding + index * xStep
        const y = rect.height - padding - (value / maxValue) * chartHeight
        ctx.lineTo(x, y)
      })

      // Draw line to bottom right and close path
      ctx.lineTo(padding + chartWidth, rect.height - padding)
      ctx.closePath()
      ctx.fill()
    }

    // Draw X-axis labels
    ctx.fillStyle = "#64748b" // Slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    data.labels.forEach((label, index) => {
      const x = padding + index * (chartWidth / (data.labels.length - 1))
      const y = rect.height - padding + 20
      ctx.fillText(label, x, y)
    })

    // Draw Y-axis labels
    ctx.textAlign = "right"

    for (let i = 0; i <= gridLines; i++) {
      const value = Math.round((maxValue / gridLines) * i)
      const y = rect.height - padding - (chartHeight / gridLines) * i
      ctx.fillText(value.toString(), padding - 10, y + 5)
    }
  }, [timeRange])

  // Generate mock data based on time range
  const generateProgressData = (range: string) => {
    let labels: string[] = []
    let values: number[] = []

    switch (range) {
      case "week":
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        values = [10, 25, 15, 30, 45, 35, 50]
        break
      case "month":
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
        values = [80, 120, 180, 250]
        break
      case "quarter":
        labels = ["Jan", "Feb", "Mar"]
        values = [250, 380, 520]
        break
      case "year":
        labels = ["Q1", "Q2", "Q3", "Q4"]
        values = [520, 780, 950, 1200]
        break
      case "all":
        labels = ["2022", "2023", "2024"]
        values = [800, 1500, 2200]
        break
      default:
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        values = [10, 25, 15, 30, 45, 35, 50]
    }

    return { labels, values }
  }

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
