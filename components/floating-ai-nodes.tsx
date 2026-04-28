'use client'

import { useEffect, useRef } from 'react'

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  glowSize: number
}

export function FloatingAINodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize nodes
    const nodes: Node[] = []
    const nodeCount = 12
    const padding = 100

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * (canvas.width - 2 * padding) + padding,
        y: Math.random() * (canvas.height - 2 * padding) + padding,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        glowSize: Math.random() * 40 + 60,
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = 'transparent'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x - node.radius < 0 || node.x + node.radius > canvas.width) {
          node.vx *= -1
          node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x))
        }
        if (node.y - node.radius < 0 || node.y + node.radius > canvas.height) {
          node.vy *= -1
          node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y))
        }

        // Slightly slow down movement
        node.vx *= 0.9995
        node.vy *= 0.9995

        // Add small random jitter to keep motion alive
        node.vx += (Math.random() - 0.5) * 0.05
        node.vy += (Math.random() - 0.5) * 0.05

        // Cap velocity
        const speed = Math.sqrt(node.vx ** 2 + node.vy ** 2)
        if (speed > 1) {
          node.vx = (node.vx / speed) * 1
          node.vy = (node.vy / speed) * 1
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.glowSize)
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)')
        gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.glowSize, node.y - node.glowSize, node.glowSize * 2, node.glowSize * 2)

        // Draw node core
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius)
        nodeGradient.addColorStop(0, 'rgba(150, 220, 255, 1)')
        nodeGradient.addColorStop(1, 'rgba(100, 180, 255, 0.8)')
        ctx.fillStyle = nodeGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 250

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            ctx.strokeStyle = `rgba(100, 180, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'transparent',
        opacity: 0.6,
      }}
    />
  )
}
