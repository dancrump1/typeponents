# Scratch Card

Scratch-off card that reveals content underneath.

**Interaction.** Drag across the surface to erase the overlay and uncover the prize.

- Categories: Cards
- Tags: canvas, drag, cursor-tracking, keyboard, autoplay, responsive
- Import: `@/components/ui/scratch-card`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scratch-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `lucide-react`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `onReveal` | `(() => void)` | — | Fires once when the cleared area passes revealThreshold |
| `onProgress` | `((progress: number) => void)` | — | Fires with the cleared ratio (0–1) while scratching |
| `revealThreshold` | `number` | `0.5` | Cleared ratio (0–1) that triggers the full reveal. Default 0.5 |
| `brushSize` | `number` | `28` | Scratch brush diameter in pixels. Default 28 |
| `overlayLabel` | `string` | `"Scratch to reveal"` | Text printed on the foil surface |
| `overlayColor` | `string` | `"#171717"` | Foil surface color |
| `overlayLabelColor` | `string` | `"#737373"` | Foil label color |
| `particleColor` | `string` | `"#a3a3a3"` | Dust particle color |
| `ariaLabel` | `string` | `"Scratch surface. Press Enter to reve…` | Accessible label for the scratch surface |
| `revealAnnouncement` | `string` | `"Hidden content revealed"` | Announced to screen readers when the content is revealed |
| `className` | `string` | — | — |

## Usage

```tsx
"use client"

import React, { useCallback, useState } from "react"
import ScratchCard from "./component"
import { Check, Copy, RotateCcw, Ticket } from "lucide-react"

export default function ScratchCardDemo() {
    const [resetKey, setResetKey] = useState(0)
    const [isRevealed, setIsRevealed] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText("SPECTRUM20").then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }, [])

    const handleReset = useCallback(() => {
        setResetKey((key) => key + 1)
        setIsRevealed(false)
        setIsCopied(false)
    }, [])

    return (
        <div className="flex w-full flex-col items-center gap-4 py-8">
            <ScratchCard
                key={resetKey}
                className="w-full max-w-[320px]"
                ariaLabel="Scratch to reveal your coupon code. Press Enter to reveal."
                revealAnnouncement="Coupon revealed: SPECTRUM20 for 20% off"
                onReveal={() => setIsRevealed(true)}
            >
                <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                        <Ticket
                            className="h-5 w-5 text-neutral-600 dark:text-neutral-300"
                            aria-hidden="true"
                        />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
                        Coupon unlocked
                    </span>
                    <span className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        20% off
                    </span>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="mt-1 flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-2 font-mono text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300"
                    >
                        SPECTRUM20
                        {isCopied ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                            {isCopied ? "Copied to clipboard" : "Copy coupon code"}
                        </span>
                    </button>
                </div>
            </ScratchCard>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Drag across the card to scratch off the foil
            </p>

            {isRevealed && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:focus-visible:ring-neutral-300"
                >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Scratch again
                </button>
            )}
        </div>
    )
}
```

## Source

### `components/ui/scratch-card.tsx`

```tsx
/**
 * Spectrum UI — ScratchCard
 *
 * A scratch-to-reveal card. An HTML5 canvas foil covers the content and is
 * erased on pointer drag, emitting dust particles while scratching. Once the
 * cleared area passes the reveal threshold, the remaining foil fades out and
 * onReveal fires exactly once.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <ScratchCard onReveal={() => {}} ariaLabel="Scratch to reveal your coupon">
 *   <CouponContent />
 * </ScratchCard>
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ScratchCardProps {
    /** Content hidden underneath the scratch foil */
    children: ReactNode
    /** Fires once when the cleared area passes revealThreshold */
    onReveal?: () => void
    /** Fires with the cleared ratio (0–1) while scratching */
    onProgress?: (progress: number) => void
    /** Cleared ratio (0–1) that triggers the full reveal. Default 0.5 */
    revealThreshold?: number
    /** Scratch brush diameter in pixels. Default 28 */
    brushSize?: number
    /** Text printed on the foil surface */
    overlayLabel?: string
    /** Foil surface color */
    overlayColor?: string
    /** Foil label color */
    overlayLabelColor?: string
    /** Dust particle color */
    particleColor?: string
    /** Accessible label for the scratch surface */
    ariaLabel?: string
    /** Announced to screen readers when the content is revealed */
    revealAnnouncement?: string
    className?: string
}

interface DustParticle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    life: number
    maxLife: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PROGRESS_SAMPLE_STRIDE = 32
const PROGRESS_CHECK_EVERY_N_MOVES = 10
const MAX_PARTICLES = 120
const PARTICLE_GRAVITY = 0.18

// ─── Component ───────────────────────────────────────────────────────────────

export default function ScratchCard({
    children,
    onReveal,
    onProgress,
    revealThreshold = 0.5,
    brushSize = 28,
    overlayLabel = "Scratch to reveal",
    overlayColor = "#171717",
    overlayLabelColor = "#737373",
    particleColor = "#a3a3a3",
    ariaLabel = "Scratch surface. Press Enter to reveal the hidden content.",
    revealAnnouncement = "Hidden content revealed",
    className,
}: ScratchCardProps) {
    const shouldReduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const scratchCanvasRef = useRef<HTMLCanvasElement>(null)
    const particleCanvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<DustParticle[]>([])
    const particleRafRef = useRef<number>(0)
    const lastPointRef = useRef<{ x: number; y: number } | null>(null)
    const isScratchingRef = useRef(false)
    const moveCountRef = useRef(0)
    const revealedRef = useRef(false)
    const [isRevealed, setIsRevealed] = useState(false)

    // Keep hidden content out of the tab order and accessibility tree until revealed
    useEffect(() => {
        const node = contentRef.current
        if (!node) return
        if (isRevealed) node.removeAttribute("inert")
        else node.setAttribute("inert", "")
    }, [isRevealed])

    const paintOverlay = useCallback(
        (canvas: HTMLCanvasElement, width: number, height: number) => {
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            const dpr = window.devicePixelRatio || 1
            canvas.width = Math.max(1, Math.round(width * dpr))
            canvas.height = Math.max(1, Math.round(height * dpr))
            ctx.scale(dpr, dpr)

            // Foil base
            ctx.fillStyle = overlayColor
            ctx.fillRect(0, 0, width, height)

            // Subtle diagonal brushed texture
            ctx.strokeStyle = "rgba(255, 255, 255, 0.04)"
            ctx.lineWidth = 1
            for (let x = -height; x < width; x += 8) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x + height, height)
                ctx.stroke()
            }

            // Centered label
            if (overlayLabel) {
                const extendedCtx = ctx as CanvasRenderingContext2D & {
                    letterSpacing?: string
                }
                if ("letterSpacing" in extendedCtx) extendedCtx.letterSpacing = "3px"
                ctx.fillStyle = overlayLabelColor
                ctx.font =
                    "500 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillText(overlayLabel.toUpperCase(), width / 2, height / 2)
            }
        },
        [overlayColor, overlayLabel, overlayLabelColor],
    )

    // Size both canvases to the container and paint the foil
    useEffect(() => {
        const container = containerRef.current
        const scratchCanvas = scratchCanvasRef.current
        const particleCanvas = particleCanvasRef.current
        if (!container || !scratchCanvas || !particleCanvas) return

        let lastWidth = 0
        let lastHeight = 0

        const resize = () => {
            const { width, height } = container.getBoundingClientRect()
            if (width === lastWidth && height === lastHeight) return
            lastWidth = width
            lastHeight = height
            if (revealedRef.current) return
            const dpr = window.devicePixelRatio || 1
            paintOverlay(scratchCanvas, width, height)
            particleCanvas.width = Math.max(1, Math.round(width * dpr))
            particleCanvas.height = Math.max(1, Math.round(height * dpr))
            const particleCtx = particleCanvas.getContext("2d")
            particleCtx?.scale(dpr, dpr)
        }

        const observer = new ResizeObserver(resize)
        observer.observe(container)
        resize()

        return () => observer.disconnect()
    }, [paintOverlay])

    useEffect(() => {
        return () => cancelAnimationFrame(particleRafRef.current)
    }, [])

    const reveal = useCallback(() => {
        if (revealedRef.current) return
        revealedRef.current = true
        setIsRevealed(true)
        onReveal?.()
    }, [onReveal])

    const checkProgress = useCallback(() => {
        const canvas = scratchCanvasRef.current
        if (!canvas || revealedRef.current) return
        const ctx = canvas.getContext("2d")
        if (!ctx || canvas.width === 0 || canvas.height === 0) return

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let cleared = 0
        let sampled = 0
        for (let i = 3; i < data.length; i += 4 * PROGRESS_SAMPLE_STRIDE) {
            if (data[i] < 128) cleared++
            sampled++
        }
        if (sampled === 0) return

        const progress = cleared / sampled
        onProgress?.(progress)
        if (progress >= revealThreshold) reveal()
    }, [onProgress, revealThreshold, reveal])

    const runParticleLoop = useCallback(() => {
        const canvas = particleCanvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        cancelAnimationFrame(particleRafRef.current)

        const tick = () => {
            const { width, height } = canvas.getBoundingClientRect()
            ctx.clearRect(0, 0, width, height)

            const alive: DustParticle[] = []
            for (const particle of particlesRef.current) {
                particle.vy += PARTICLE_GRAVITY
                particle.x += particle.vx
                particle.y += particle.vy
                particle.life -= 1
                if (particle.life <= 0) continue
                ctx.globalAlpha = particle.life / particle.maxLife
                ctx.fillStyle = particleColor
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
                alive.push(particle)
            }
            ctx.globalAlpha = 1
            particlesRef.current = alive

            if (alive.length > 0) {
                particleRafRef.current = requestAnimationFrame(tick)
            } else {
                ctx.clearRect(0, 0, width, height)
            }
        }

        particleRafRef.current = requestAnimationFrame(tick)
    }, [particleColor])

    const spawnParticles = useCallback(
        (x: number, y: number) => {
            if (shouldReduceMotion) return
            if (particlesRef.current.length >= MAX_PARTICLES) return
            for (let i = 0; i < 2; i++) {
                const maxLife = 24 + Math.random() * 20
                particlesRef.current.push({
                    x: x + (Math.random() - 0.5) * brushSize * 0.6,
                    y: y + (Math.random() - 0.5) * brushSize * 0.6,
                    vx: (Math.random() - 0.5) * 1.6,
                    vy: -Math.random() * 1.4,
                    size: 1.5 + Math.random() * 2,
                    life: maxLife,
                    maxLife,
                })
            }
            runParticleLoop()
        },
        [shouldReduceMotion, brushSize, runParticleLoop],
    )

    const getPoint = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }, [])

    const scratchLine = useCallback(
        (from: { x: number; y: number }, to: { x: number; y: number }) => {
            const canvas = scratchCanvasRef.current
            const ctx = canvas?.getContext("2d")
            if (!ctx) return
            ctx.globalCompositeOperation = "destination-out"
            ctx.lineWidth = brushSize
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.beginPath()
            ctx.moveTo(from.x, from.y)
            ctx.lineTo(to.x, to.y)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(to.x, to.y, brushSize / 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalCompositeOperation = "source-over"
        },
        [brushSize],
    )

    const handlePointerDown = useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            isScratchingRef.current = true
            const point = getPoint(event)
            scratchLine(point, point)
            spawnParticles(point.x, point.y)
            lastPointRef.current = point
        },
        [getPoint, scratchLine, spawnParticles],
    )

    const handlePointerMove = useCallback(
        (event: React.PointerEvent<HTMLCanvasElement>) => {
            if (!isScratchingRef.current) return
            const point = getPoint(event)
            scratchLine(lastPointRef.current ?? point, point)
            lastPointRef.current = point

            moveCountRef.current += 1
            if (moveCountRef.current % 2 === 0) spawnParticles(point.x, point.y)
            if (moveCountRef.current % PROGRESS_CHECK_EVERY_N_MOVES === 0) {
                checkProgress()
            }
        },
        [getPoint, scratchLine, spawnParticles, checkProgress],
    )

    const handlePointerUp = useCallback(() => {
        isScratchingRef.current = false
        lastPointRef.current = null
        checkProgress()
    }, [checkProgress])

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                reveal()
            }
        },
        [reveal],
    )

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full select-none overflow-hidden rounded-2xl",
                "border border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-900",
                className,
            )}
        >
            <div ref={contentRef}>{children}</div>

            <AnimatePresence>
                {!isRevealed && (
                    <motion.div
                        key="scratch-foil"
                        className="absolute inset-0 z-10"
                        initial={false}
                        exit={{ opacity: 0 }}
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.4, ease: "easeOut" }
                        }
                    >
                        <canvas
                            ref={scratchCanvasRef}
                            role="button"
                            tabIndex={0}
                            aria-label={ariaLabel}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onKeyDown={handleKeyDown}
                            className={cn(
                                "block h-full w-full cursor-crosshair touch-none",
                                "focus-visible:outline-none focus-visible:ring-1",
                                "focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
                            )}
                        />
                        <canvas
                            ref={particleCanvasRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <span className="sr-only" aria-live="polite">
                {isRevealed ? revealAnnouncement : ""}
            </span>
        </div>
    )
}
```
