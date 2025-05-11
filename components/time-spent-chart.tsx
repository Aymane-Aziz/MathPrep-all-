"use client"

import { useEffect, useRef } from "react"

export function TimeSpentChart() {
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

    // Data for the donut chart
    const data = [
      { label: "Addition", value: 25, color: "#3b82f6" }, // Blue
      { label: "Subtraction", value: 15, color: "#ef4444" }, // Red
      { label: "Multiplication", value: 20, color: "#22c55e" }, // Green
      { label: "Shapes", value: 30, color: "#a855f7" }, // Purple
      { label: "Games", value: 10, color: "#f97316" }, // Orange
    ]

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw donut chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const outerRadius = Math.min(centerX, centerY) - 40
    const innerRadius = outerRadius * 0.6

    let startAngle = 0
    data.forEach((item) => {
      // Calculate the angle
      const sliceAngle = (2 * Math.PI * item.value) / total

      // Draw the slice
      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()
      ctx.fill()

      // Draw slice border
      ctx.beginPath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.stroke()

      // Calculate label position
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = (outerRadius + innerRadius) / 2
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      // Draw percentage label if slice is big enough
      if (item.value / total > 0.05) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY)
      }

      // Update the starting angle for the next slice
      startAngle += sliceAngle
    })

    // Draw center text
    ctx.fillStyle = "#1e293b" // Slate-800
    ctx.font = "bold 16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Time Spent", centerX, centerY - 10)
    ctx.font = "14px sans-serif"
    ctx.fillText("12.5 hours total", centerX, centerY + 15)

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
      ctx.fillText(`${item.label} (${item.value}%)`, legendX + 25, legendY + 7.5)

      legendY += 25
    })
  }, [])

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
