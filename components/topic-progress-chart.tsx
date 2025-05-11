"use client"

import { useEffect, useRef } from "react"

export function TopicProgressChart() {
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

    // Data for the pie chart
    const data = [
      { label: "Addition", value: 85, color: "#3b82f6" }, // Blue
      { label: "Subtraction", value: 60, color: "#ef4444" }, // Red
      { label: "Multiplication", value: 75, color: "#22c55e" }, // Green
      { label: "Shapes", value: 40, color: "#a855f7" }, // Purple
      { label: "Counting", value: 100, color: "#f97316" }, // Orange
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    data.forEach((item) => {
      // Calculate the angle
      const sliceAngle = (2 * Math.PI * item.value) / total

      // Draw the slice
      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw slice border
      ctx.beginPath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.stroke()

      // Calculate label position
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      // Draw percentage label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.value}%`, labelX, labelY)

      // Update the starting angle for the next slice
      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = 10
    let legendY = rect.height - data.length * 25 - 10

    data.forEach((item) => {
      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Draw label
      ctx.fillStyle = "#64748b" // Slate-500
      ctx.font = "14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(item.label, legendX + 25, legendY + 7.5)

      legendY += 25
    })
  }, [])

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
