# Dot Background

Full-width canvas grid of purple and pink dots joined by faint lines, like a soft particle mesh.

**Interaction.** The mesh fades in on load, then dots scatter away from the pointer as it passes and drift back to their grid positions once it moves on.

- Categories: Backgrounds
- Tags: canvas, cursor-tracking, autoplay
- Import: `@/components/ui/dot-background`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dot-background.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `lucide-react`

## Usage

```tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { GradientGridHero } from "./component";

const GradientHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-block">
                        <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-xs border border-white/20 mb-4 mt-4">
                            <span className="relative z-10">
                                Software Engineer & Creative Developer
                            </span>
                            <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span className="block">Hi, I&apos;m</span>
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600">
                            Afsar Mahmud
                        </span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-[600px]">
                        I craft exceptional digital experiences with code, creativity, and a
                        passion for innovation.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="relative overflow-hidden group bg-linear-to-r from-purple-500 to-pink-500 border-0">
                            <span className="relative z-10 flex items-center">
                                View Projects{" "}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </Button>
                        <Button
                            variant="outline"
                            className="border-zinc-700 text-pink-500 hover:text-pink-700 hover:border-zinc-500"
                        >
                            Contact Me
                        </Button>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Link
                            href="https://github.com/afsar-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/md-afsar-mahmud"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </Link>
                        <Link href="mailto:mdafsar.dev@gmail.com">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                            >
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    <GradientGridHero />
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default GradientHero;
```

## Source

### `components/ui/dot-background.tsx`

```tsx
"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function GradientGridHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let devicePixelRatio: number

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            devicePixelRatio = window.devicePixelRatio || 1
            const rect = canvas.getBoundingClientRect()

            canvas.width = rect.width * devicePixelRatio
            canvas.height = rect.height * devicePixelRatio

            ctx.scale(devicePixelRatio, devicePixelRatio)
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Mouse position
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        window.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect()
            targetX = e.clientX - rect.left
            targetY = e.clientY - rect.top
        })

        // Particle class
        class Particle {
            x: number
            y: number
            size: number
            baseX: number
            baseY: number
            density: number
            color: string
            distance: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.baseX = x
                this.baseY = y
                this.size = Math.random() * 5 + 2
                this.density = Math.random() * 30 + 1
                this.distance = 0

                // Create a gradient from purple to pink
                const hue = Math.random() * 60 + 270 // 270-330 range for purples and pinks
                this.color = `hsl(${hue}, 70%, 60%)`
            }

            update() {
                // Calculate distance between mouse and particle
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                this.distance = Math.sqrt(dx * dx + dy * dy)

                const forceDirectionX = dx / this.distance
                const forceDirectionY = dy / this.distance

                const maxDistance = 100
                const force = (maxDistance - this.distance) / maxDistance

                if (this.distance < maxDistance) {
                    const directionX = forceDirectionX * force * this.density
                    const directionY = forceDirectionY * force * this.density

                    this.x -= directionX
                    this.y -= directionY
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX
                        this.x -= dx / 10
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY
                        this.y -= dy / 10
                    }
                }
            }

            draw(ctx: CanvasRenderingContext2D | null) {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.closePath()
                ctx.fill()
            }
        }

        // Create particle grid
        const particlesArray: Particle[] = []
        const gridSize = 30

        function init() {
            particlesArray.length = 0

            if (!canvas) return;

            const canvasWidth = canvas.width / devicePixelRatio
            const canvasHeight = canvas.height / devicePixelRatio

            const numX = Math.floor(canvasWidth / gridSize)
            const numY = Math.floor(canvasHeight / gridSize)

            for (let y = 0; y < numY; y++) {
                for (let x = 0; x < numX; x++) {
                    const posX = x * gridSize + gridSize / 2
                    const posY = y * gridSize + gridSize / 2
                    particlesArray.push(new Particle(posX, posY))
                }
            }
        }

        init()

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Smooth mouse following
            mouseX += (targetX - mouseX) * 0.1
            mouseY += (targetY - mouseY) * 0.1

            // Draw connections
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update()
                particlesArray[i].draw(ctx)

                // Draw connections
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x
                    const dy = particlesArray[i].y - particlesArray[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 30) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(180, 120, 255, ${0.2 - distance / 150})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                        ctx.stroke()
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        animate()

        // Handle window resize
        window.addEventListener("resize", init)

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
            window.removeEventListener("resize", init)
        }
    }, [])

    return (
        <motion.div
            className="w-full h-[400px] md:h-[500px] relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
        </motion.div>
    )
}
```
