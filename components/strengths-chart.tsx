"use client"

import { useEffect, useRef } from "react"

export function StrengthsChart() {
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

    // Data for the radar chart
    const data = [
      { axis: "Addition", value: 0.85 },
      { axis: "Subtraction", value: 0.65 },
      { axis: "Multiplication", value: 0.75 },
      { axis: "Division", value: 0.45 },
      { axis: "Shapes", value: 0.7 },
      { axis: "Counting", value: 0.9 },
    ]

    // Chart configuration
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const angleSlice = (Math.PI * 2) / data.length

    // Draw radar grid
    const levels = 5
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius * level) / levels

      // Draw level circle
      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0" // Slate-200
      ctx.lineWidth = 1
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw axis lines
    data.forEach((_, i) => {
      const angle = i * angleSlice
      const axisX = centerX + radius * Math.cos(angle - Math.PI / 2)
      const axisY = centerY + radius * Math.sin(angle - Math.PI / 2)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0" // Slate-200
      ctx.lineWidth = 1
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(axisX, axisY)
      ctx.stroke()

      // Draw axis label
      ctx.fillStyle = "#64748b" // Slate-500
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelX = centerX + (radius + 20) * Math.cos(angle - Math.PI / 2)
      const labelY = centerY + (radius + 20) * Math.sin(angle - Math.PI / 2)
      ctx.fillText(data[i].axis, labelX, labelY)
    })

    // Draw data
    ctx.beginPath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)" // Blue-500 with opacity
    ctx.strokeStyle = "#3b82f6" // Blue-500
    ctx.lineWidth = 2

    data.forEach((d, i) => {
      const angle = i * angleSlice
      const pointRadius = radius * d.value
      const pointX = centerX + pointRadius * Math.cos(angle - Math.PI / 2)
      const pointY = centerY + pointRadius * Math.sin(angle - Math.PI / 2)

      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    })

    // Close the path
    ctx.lineTo(
      centerX + radius * data[0].value * Math.cos(0 - Math.PI / 2),
      centerY + radius * data[0].value * Math.sin(0 - Math.PI / 2),
    )
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    data.forEach((d, i) => {
      const angle = i * angleSlice
      const pointRadius = radius * d.value
      const pointX = centerX + pointRadius * Math.cos(angle - Math.PI / 2)
      const pointY = centerY + pointRadius * Math.sin(angle - Math.PI / 2)

      ctx.beginPath()
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#3b82f6" // Blue-500
      ctx.lineWidth = 2
      ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })
  }, [])

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
