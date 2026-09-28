# Brick Breaker

Canvas brick breaker game with a paddle, a bouncing ball, lives, combo scoring and multiple levels.

**Interaction.** Steer the paddle with the mouse, a finger or the arrow keys and press space to launch the ball; it ricochets off the walls and knocks out bricks one hit at a time while the score and combo climb, and the board refills when a level is cleared.

- Categories: 3D & Canvas
- Import: `@/components/ui/brick-breaker/component`
- Inspiration: hub.joyco.studio (adaptation) — https://hub.joyco.studio/components/brick-breaker

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/brick-breaker.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | `DeepPartial<BrickBreakerConfig>` | — | Partial config overrides |
| `levels` | `Level[]` | — | Custom levels (overrides built-in levels) |
| `startLevel` | `number` | `1` | Starting level (1-indexed) |
| `onGameEnd` | `((result: GameEndResult) => void)` | — | Called when game ends |
| `onScoreChange` | `((score: number, combo: number) => void)` | — | Called when score updates |
| `onStateChange` | `((state: GameState) => void)` | — | Called when game state changes |
| `onLevelChange` | `((level: number) => void)` | — | Called when level changes |
| `className` | `string` | — | Additional container className |
| `autoFocus` | `boolean` | `true` | Auto-focus canvas on mount |
| `showFocusRing` | `boolean` | `true` | Show focus ring when canvas is focused (default: true) |

## Usage

```tsx
"use client";

import { BrickBreaker } from "./component";

export default function Usage() {
	return (
		<div className="flex items-center justify-center p-4">
			<BrickBreaker className="rounded-xl border" />
		</div>
	);
}
```

## Source

### `components/ui/brick-breaker/brick-breaker.tsx`

```tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type {
    BrickBreakerProps,
    BrickBreakerConfig,
    CanvasDimensions,
    GameSnapshot,
    Brick,
    BrickType,
} from './types'
import {
    DEFAULT_CONFIG,
    GAME_CONSTANTS,
    KEY_BINDINGS,
    BRICK_VISUALS,
} from './config'
import { DEFAULT_LEVELS } from './levels'
import { useBrickBreaker } from './use-brick-breaker'
import { mergeConfig, resolveCssColor } from './utils'
import {
    BrickBreakerUIProvider,
    BrickBreakerDefaultUI,
    BrickBreakerCanvas,
} from './ui'

/**
 * Draw rounded rectangle
 */
function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
): void {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()
}

/**
 * Draw brick with type-specific patterns
 */
function drawBrick(
    ctx: CanvasRenderingContext2D,
    brick: Brick,
    baseColor: string,
    borderRadius: number
): void {
    const { x, y, width, height } = brick.bounds
    const visual = BRICK_VISUALS[brick.type]

    ctx.globalAlpha = visual.opacity

    // Health-based opacity for damaged bricks
    if (brick.maxHealth > 1 && brick.health < brick.maxHealth) {
        const healthRatio = brick.health / brick.maxHealth
        ctx.globalAlpha *= 0.5 + healthRatio * 0.5
    }

    ctx.fillStyle = baseColor
    drawRoundedRect(ctx, x, y, width, height, borderRadius)

    // Draw pattern overlay for special bricks
    if (visual.pattern && brick.type !== 'normal') {
        ctx.globalAlpha = 0.15

        if (visual.pattern === 'diagonal') {
            // Strong brick: diagonal lines
            ctx.strokeStyle = baseColor
            ctx.lineWidth = 1
            const step = 6
            for (let i = -height; i < width + height; i += step) {
                ctx.beginPath()
                ctx.moveTo(x + i, y)
                ctx.lineTo(x + i + height, y + height)
                ctx.stroke()
            }
        } else if (visual.pattern === 'cross') {
            // Metal brick: cross pattern
            ctx.strokeStyle = baseColor
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(x + width * 0.2, y + height * 0.5)
            ctx.lineTo(x + width * 0.8, y + height * 0.5)
            ctx.moveTo(x + width * 0.5, y + height * 0.2)
            ctx.lineTo(x + width * 0.5, y + height * 0.8)
            ctx.stroke()
        }
    }

    ctx.globalAlpha = 1
}

/**
 * Render game to canvas
 */
function renderGame(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    snapshot: GameSnapshot,
    config: BrickBreakerConfig,
    dimensions: CanvasDimensions
): void {
    const { width, height, dpr } = dimensions

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    // Resolve colors
    const bgColor = resolveCssColor(config.colors.background, canvas)
    const paddleColor = resolveCssColor(config.colors.paddle, canvas)
    const ballColor = resolveCssColor(config.colors.ball, canvas)
    const trailColor = resolveCssColor(config.colors.ballTrail, canvas)
    const textColor = resolveCssColor(config.colors.text, canvas)
    const textMutedColor = resolveCssColor(config.colors.textMuted, canvas)

    const brickColors: Record<BrickType, string> = {
        normal: resolveCssColor(config.colors.bricks.normal, canvas),
        strong: resolveCssColor(config.colors.bricks.strong, canvas),
        metal: resolveCssColor(config.colors.bricks.metal, canvas),
        indestructible: resolveCssColor(
            config.colors.bricks.indestructible,
            canvas
        ),
    }

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Draw bricks
    const now = Date.now()
    for (const brick of snapshot.bricks) {
        if (brick.destroyed) {
            // Fade out animation
            if (brick.destroyedAt) {
                const elapsed = now - brick.destroyedAt
                const progress = elapsed / config.effects.destroyAnimationDuration
                if (progress < 1) {
                    ctx.globalAlpha = 1 - progress
                    drawBrick(
                        ctx,
                        brick,
                        brickColors[brick.type],
                        config.layout.brickBorderRadius
                    )
                    ctx.globalAlpha = 1
                }
            }
            continue
        }

        drawBrick(
            ctx,
            brick,
            brickColors[brick.type],
            config.layout.brickBorderRadius
        )
    }

    // Helper to draw ball based on style
    const drawBall = (
        x: number,
        y: number,
        radius: number,
        color: string,
        alpha = 1
    ) => {
        ctx.globalAlpha = alpha
        ctx.fillStyle = color

        if (config.layout.ballStyle === 'custom' && config.layout.renderBall) {
            config.layout.renderBall(ctx, x, y, radius, color)
        } else if (config.layout.ballStyle === 'square') {
            const size = radius * 2
            ctx.fillRect(x - radius, y - radius, size, size)
        } else {
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
        }

        ctx.globalAlpha = 1
    }

    // Draw ball trail
    if (config.effects.showTrail && snapshot.ball.trail.length > 0) {
        for (let i = 0; i < snapshot.ball.trail.length; i++) {
            const pos = snapshot.ball.trail[i]
            const progress = (i + 1) / snapshot.ball.trail.length
            const opacity = progress * config.effects.trailOpacity
            const trailRadius = snapshot.ball.radius * (0.3 + 0.7 * progress)

            drawBall(pos.x, pos.y, trailRadius, trailColor, opacity)
        }
    }

    // Draw ball
    drawBall(
        snapshot.ball.position.x,
        snapshot.ball.position.y,
        snapshot.ball.radius,
        ballColor
    )

    // Draw paddle
    ctx.fillStyle = paddleColor
    const paddleRadius =
        config.layout.paddleBorderRadius === 'auto'
            ? snapshot.paddle.bounds.height / 2
            : config.layout.paddleBorderRadius
    drawRoundedRect(
        ctx,
        snapshot.paddle.bounds.x,
        snapshot.paddle.bounds.y,
        snapshot.paddle.bounds.width,
        snapshot.paddle.bounds.height,
        paddleRadius
    )

    // Note: HUD and overlays are now rendered as React components via children
}

/**
 * Brick Breaker Game Component
 */
/** Input mode - once locked, other input types are ignored for movement */
type InputMode = 'none' | 'keyboard' | 'pointer'

export function BrickBreaker({
    config: configOverrides,
    levels: customLevels,
    startLevel = 1,
    onGameEnd,
    onScoreChange,
    onStateChange,
    onLevelChange,
    className,
    autoFocus = true,
    showFocusRing = true,
    children,
}: BrickBreakerProps & { children?: React.ReactNode }) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const canvasWrapperRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [dimensions, setDimensions] = React.useState<CanvasDimensions>({
        width: 400,
        height: 300,
        dpr: 1,
    })
    const [theme, setTheme] = React.useState('')

    // Input mode locking - prevents keyboard/mouse conflicts
    const inputModeRef = React.useRef<InputMode>('none')

    const config = React.useMemo<BrickBreakerConfig>(
        () => mergeConfig(DEFAULT_CONFIG, configOverrides),
        [configOverrides]
    )

    const levels = customLevels || DEFAULT_LEVELS

    const {
        snapshot,
        startGame,
        pauseGame,
        resumeGame,
        resetGame,
        nextLevel,
        movePaddle,
        setPaddlePosition,
        launchBall,
    } = useBrickBreaker({
        config,
        levels,
        startLevel,
        canvasDimensions: dimensions,
        onGameEnd,
        onScoreChange,
        onStateChange,
        onLevelChange,
    })

    // Reset input mode when game is not playing
    React.useEffect(() => {
        if (snapshot.state !== 'playing') {
            inputModeRef.current = 'none'
        }
    }, [snapshot.state])

    // Responsive sizing - follows container width, maintains aspect ratio
    React.useEffect(() => {
        const wrapper = canvasWrapperRef.current
        if (!wrapper) return

        const updateSize = () => {
            const rect = wrapper.getBoundingClientRect()
            const wrapperWidth = Math.max(rect.width, 1)
            const wrapperHeight = Math.max(rect.height, 1)
            const dpr = window.devicePixelRatio || 1

            // Calculate dimensions that fit within wrapper while maintaining aspect ratio
            const heightFromWidth = wrapperWidth / GAME_CONSTANTS.ASPECT_RATIO
            const widthFromHeight = wrapperHeight * GAME_CONSTANTS.ASPECT_RATIO

            let width: number
            let height: number

            if (heightFromWidth <= wrapperHeight) {
                // Width is the constraint - use full width
                width = wrapperWidth
                height = heightFromWidth
            } else {
                // Height is the constraint - use full height
                width = widthFromHeight
                height = wrapperHeight
            }

            setDimensions({ width, height, dpr })
        }

        updateSize()
        const resizeObserver = new ResizeObserver(updateSize)
        resizeObserver.observe(wrapper)

        return () => resizeObserver.disconnect()
    }, [])

    // Theme changes
    React.useEffect(() => {
        const html = document.documentElement
        setTheme(html.className)

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    setTheme(html.className)
                }
            }
        })

        observer.observe(html, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    // Render
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = dimensions.width * dimensions.dpr
        canvas.height = dimensions.height * dimensions.dpr

        renderGame(ctx, canvas, snapshot, config, dimensions)
    }, [snapshot, config, dimensions, theme])

    // Keyboard controls
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // only if is focusing on the canvas
            if (
                !document.activeElement?.closest('[data-slot="brick-breaker-canvas"]')
            )
                return

            const code = e.code

            // Movement keys - switch to keyboard mode (allows taking over from pointer)
            if (
                KEY_BINDINGS.LEFT.includes(code) ||
                KEY_BINDINGS.RIGHT.includes(code)
            ) {
                // Switch to keyboard mode - keyboard can always take over
                inputModeRef.current = 'keyboard'
                e.preventDefault()

                if (KEY_BINDINGS.LEFT.includes(code)) {
                    movePaddle('left')
                } else {
                    movePaddle('right')
                }
                return
            }

            // Action keys (always allowed regardless of input mode)
            if (KEY_BINDINGS.START.includes(code)) {
                e.preventDefault()
                if (snapshot.state === 'idle') {
                    startGame()
                } else if (snapshot.state === 'paused') {
                    resumeGame()
                } else if (snapshot.state === 'playing') {
                    if (!snapshot.ball.isLaunched) {
                        launchBall()
                    } else {
                        pauseGame()
                    }
                } else if (snapshot.state === 'levelComplete') {
                    nextLevel()
                }
            }

            if (KEY_BINDINGS.PAUSE.includes(code)) {
                e.preventDefault()
                if (snapshot.state === 'playing') {
                    pauseGame()
                } else if (snapshot.state === 'paused') {
                    resumeGame()
                }
            }

            if (KEY_BINDINGS.RESTART.includes(code)) {
                if (snapshot.state === 'won' || snapshot.state === 'lost') {
                    resetGame()
                    setTimeout(startGame, 100)
                }
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const code = e.code
            if (
                KEY_BINDINGS.LEFT.includes(code) ||
                KEY_BINDINGS.RIGHT.includes(code)
            ) {
                // Only respond if in keyboard mode
                if (inputModeRef.current === 'keyboard') {
                    movePaddle('none')
                    // Reset so pointer can take over
                    inputModeRef.current = 'none'
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [
        snapshot.state,
        snapshot.ball.isLaunched,
        startGame,
        pauseGame,
        resumeGame,
        resetGame,
        nextLevel,
        movePaddle,
        launchBall,
    ])

    // Mouse controls
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleMouseMove = (e: MouseEvent) => {
            if (snapshot.state !== 'playing') return

            // Mouse can take over from null or pointer mode, but not keyboard
            if (inputModeRef.current === 'keyboard') return

            inputModeRef.current = 'pointer'

            const rect = canvas.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * dimensions.width
            setPaddlePosition(x)
        }

        const handleClick = () => {
            // Click actions are always allowed (start, launch, resume, etc.)
            if (snapshot.state === 'idle') {
                startGame()
            } else if (snapshot.state === 'paused') {
                resumeGame()
            } else if (snapshot.state === 'playing' && !snapshot.ball.isLaunched) {
                launchBall()
            } else if (snapshot.state === 'levelComplete') {
                nextLevel()
            } else if (snapshot.state === 'won' || snapshot.state === 'lost') {
                resetGame()
                setTimeout(startGame, 100)
            }
        }

        const handleMouseLeave = () => {
            // Reset pointer mode when mouse leaves canvas
            if (inputModeRef.current === 'pointer') {
                inputModeRef.current = 'none'
            }
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('click', handleClick)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('click', handleClick)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [
        snapshot.state,
        snapshot.ball.isLaunched,
        dimensions,
        startGame,
        resumeGame,
        resetGame,
        nextLevel,
        setPaddlePosition,
        launchBall,
    ])

    // Touch controls
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault()

            // Touch always takes over input mode
            inputModeRef.current = 'pointer'

            // Position paddle immediately on touch
            if (snapshot.state === 'playing' && e.touches[0]) {
                const touch = e.touches[0]
                const rect = canvas.getBoundingClientRect()
                const x = ((touch.clientX - rect.left) / rect.width) * dimensions.width
                setPaddlePosition(x)
            }

            // Touch actions (start, launch, etc.)
            if (snapshot.state === 'idle') {
                startGame()
            } else if (snapshot.state === 'paused') {
                resumeGame()
            } else if (snapshot.state === 'playing' && !snapshot.ball.isLaunched) {
                launchBall()
            } else if (snapshot.state === 'levelComplete') {
                nextLevel()
            } else if (snapshot.state === 'won' || snapshot.state === 'lost') {
                resetGame()
                setTimeout(startGame, 100)
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault()
            if (snapshot.state !== 'playing') return
            if (!e.touches[0]) return

            const touch = e.touches[0]
            const rect = canvas.getBoundingClientRect()
            const x = ((touch.clientX - rect.left) / rect.width) * dimensions.width
            setPaddlePosition(x)
        }

        const handleTouchEnd = () => {
            // Reset input mode when touch ends so keyboard can take over
            if (inputModeRef.current === 'pointer') {
                inputModeRef.current = 'none'
            }
        }

        canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchend', handleTouchEnd)
        canvas.addEventListener('touchcancel', handleTouchEnd)

        return () => {
            canvas.removeEventListener('touchstart', handleTouchStart)
            canvas.removeEventListener('touchmove', handleTouchMove)
            canvas.removeEventListener('touchend', handleTouchEnd)
            canvas.removeEventListener('touchcancel', handleTouchEnd)
        }
    }, [
        snapshot.state,
        snapshot.ball.isLaunched,
        dimensions,
        startGame,
        resumeGame,
        resetGame,
        nextLevel,
        setPaddlePosition,
        launchBall,
    ])

    // Auto-focus
    React.useEffect(() => {
        if (autoFocus) {
            canvasRef.current?.focus()
        }
    }, [autoFocus])

    // Context value for UI components
    const uiContextValue = React.useMemo(
        () => ({
            snapshot,
            startGame,
            pauseGame,
            resumeGame,
            resetGame,
            nextLevel,
        }),
        [snapshot, startGame, pauseGame, resumeGame, resetGame, nextLevel]
    )

    // Canvas element to render
    const canvasElement = (
        <canvas
            ref={canvasRef}
            data-slot="brick-breaker-canvas"
            className={cn(
                'block outline-hidden',
                showFocusRing && 'focus-visible:ring-ring/50 focus-visible:ring-[3px]'
            )}
            style={{
                width: dimensions.width,
                height: dimensions.height,
                imageRendering: 'crisp-edges',
            }}
            tabIndex={0}
            role="img"
            aria-label={`Brick Breaker - Level ${snapshot.level}, Score: ${snapshot.score}, Lives: ${snapshot.lives}`}
        />
    )

    // Check if children contain a BrickBreakerCanvas slot
    const childArray = React.Children.toArray(children)
    const hasCanvasSlot = childArray.some(
        (child) =>
            React.isValidElement(child) &&
            (child.type as React.ComponentType)?.displayName === 'BrickBreakerCanvas'
    )

    // Find overlay components
    const overlays = childArray.filter(
        (child) =>
            React.isValidElement(child) &&
            (child.type as React.ComponentType)?.displayName === 'BrickBreakerOverlay'
    )

    // Process children - replace canvas slot with actual canvas
    const processedChildren = hasCanvasSlot
        ? childArray.map((child) => {
            if (
                React.isValidElement(child) &&
                (child.type as React.ComponentType)?.displayName ===
                'BrickBreakerCanvas'
            ) {
                // Replace slot with canvas wrapper that takes flex-1
                return (
                    <div
                        key="canvas-wrapper"
                        ref={canvasWrapperRef}
                        className={cn(
                            'relative flex min-h-0 flex-1 items-center justify-center',
                            (child.props as { className?: string }).className
                        )}
                    >
                        {canvasElement}
                        {/* Overlay goes inside canvas wrapper for proper positioning */}
                        {overlays}
                    </div>
                )
            }
            // Filter out overlays since they're rendered inside canvas wrapper
            if (
                React.isValidElement(child) &&
                (child.type as React.ComponentType)?.displayName ===
                'BrickBreakerOverlay'
            ) {
                return null
            }
            return child
        })
        : null

    return (
        <BrickBreakerUIProvider value={uiContextValue}>
            <div
                ref={containerRef}
                data-slot="brick-breaker"
                data-state={snapshot.state}
                className={cn('relative flex flex-col', className)}
            >
                {hasCanvasSlot ? (
                    // User specified layout with canvas slot
                    processedChildren
                ) : children ? (
                    // User provided children but no canvas slot - canvas first, then children overlay
                    <>
                        <div
                            ref={canvasWrapperRef}
                            className="relative flex min-h-0 flex-1 items-center justify-center"
                        >
                            {canvasElement}
                            {children}
                        </div>
                    </>
                ) : (
                    // No children - use default UI
                    <>
                        <div
                            ref={canvasWrapperRef}
                            className="relative flex min-h-0 flex-1 items-center justify-center"
                        >
                            {canvasElement}
                            <BrickBreakerDefaultUI />
                        </div>
                    </>
                )}

                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    {snapshot.state === 'won' &&
                        `You won! Final score: ${snapshot.score}`}
                    {snapshot.state === 'lost' && `Game over. Score: ${snapshot.score}`}
                    {snapshot.state === 'levelComplete' &&
                        `Level ${snapshot.level} complete! Score: ${snapshot.score}`}
                </div>
            </div>
        </BrickBreakerUIProvider>
    )
}
```

### `components/ui/brick-breaker/component.tsx`

```tsx
// Credit:
// https://hub.joyco.studio/components/brick-breaker

// Component
export { BrickBreaker } from './brick-breaker'

// Hook (for advanced usage)
export { useBrickBreaker } from './use-brick-breaker'

// UI Components (for custom layouts)
export {
    useBrickBreakerUI,
    BrickBreakerUIProvider,
    BrickBreakerCanvas,
    BrickBreakerScore,
    BrickBreakerHighScore,
    BrickBreakerLevel,
    BrickBreakerLives,
    BrickBreakerHUD,
    BrickBreakerOverlay,
    BrickBreakerTitle,
    BrickBreakerMessage,
    BrickBreakerHint,
    BrickBreakerScoreDisplay,
    BrickBreakerActionButton,
    BrickBreakerDefaultUI,
} from './ui'

// Types
export type {
    // Core game types
    GameState,
    GameSnapshot,
    GameEndResult,

    // Geometry
    Vector2D,
    Bounds,
    CollisionSide,
    CollisionResult,

    // Game objects
    Brick,
    BrickType,
    BrickDefinition,
    Ball,
    Paddle,

    // Levels
    Level,

    // Configuration
    BrickBreakerConfig,
    BrickBreakerProps,
    BrickBreakerColors,
    BrickBreakerLayout,
    BrickBreakerSizing,
    BrickBreakerPhysics,
    BrickBreakerScoring,
    BrickBreakerGameplay,
    BrickBreakerEffects,
    BrickBreakerStorage,

    // Utilities
    DeepPartial,
    CanvasDimensions,
} from './types'

// Config presets
export {
    DEFAULT_CONFIG,
    DEFAULT_COLORS,
    GAME_CONSTANTS,
    KEY_BINDINGS,
    BRICK_VISUALS,
} from './config'

// Level utilities
export {
    DEFAULT_LEVELS,
    createLevelFromPattern,
    generateRandomLevel,
    getBrickHealth,
    isLevelCompletable,
    countDestructibleBricks,
} from './levels'

// Utility functions
export {
    mergeConfig,
    detectCollision,
    resolveBallBrickCollision,
    resolveBallPaddleCollision,
    resolveCssColor,
    formatScore,
    normalize,
    magnitude,
    scale,
    add,
    subtract,
    dot,
    reflect,
    clamp,
    lerp,
    storage,
} from './utils'
```

### `components/ui/brick-breaker/config.ts`

```tsx
import type { BrickBreakerConfig, BrickBreakerColors } from './types'

/** Theme-aware default colors using CSS variables */
export const DEFAULT_COLORS: BrickBreakerColors = {
    background: 'var(--background)',
    paddle: 'var(--foreground)',
    ball: 'var(--foreground)',
    ballTrail: 'var(--muted-foreground)',
    text: 'var(--foreground)',
    textMuted: 'var(--muted-foreground)',
    bricks: {
        normal: 'var(--foreground)',
        strong: 'var(--foreground)',
        metal: 'var(--foreground)',
        indestructible: 'var(--muted-foreground)',
    },
}

/** Complete default configuration */
export const DEFAULT_CONFIG: BrickBreakerConfig = {
    colors: DEFAULT_COLORS,
    layout: {
        cols: 8,
        rows: 5,
        brickGap: 4,
        topPadding: 0.14,
        sidePadding: 0.04,
        brickBorderRadius: 2,
        paddleBorderRadius: 'auto', // 'auto' = height/2 for pill shape
        ballStyle: 'round',
    },
    sizing: {
        paddleWidth: 0.18,
        paddleHeight: 0.025,
        ballRadius: 0.012,
        paddleOffset: 0.08,
    },
    physics: {
        baseSpeed: 5,
        speedPerLevel: 0.3,
        maxSpeed: 12,
        paddleSpeed: 10,
        maxBounceAngle: Math.PI / 3, // 60 degrees
        minYVelocity: 2,
    },
    scoring: {
        pointsByType: {
            normal: 10,
            strong: 25,
            metal: 50,
            indestructible: 0,
        },
        comboMultiplier: 0.25,
        comboTimeout: 2000,
        maxCombo: 10,
        levelBonus: 500,
    },
    gameplay: {
        startingLives: 3,
        maxLives: 5,
    },
    effects: {
        showTrail: true,
        trailLength: 6,
        trailOpacity: 0.4,
        destroyAnimationDuration: 100, // Quick fade out (100ms)
        screenShake: false,
    },
    storage: {
        persistHighScore: true,
        persistProgress: false,
        storageKey: 'brick-breaker',
    },
}

/** Game constants */
export const GAME_CONSTANTS = {
    TARGET_FPS: 60,
    FRAME_TIME: 1000 / 60,
    ASPECT_RATIO: 4 / 3,
    FONT_FAMILY: 'system-ui, -apple-system, sans-serif',
    /** Grace period after losing a life (ms) */
    RESPAWN_DELAY: 1000,
    /** Time before ball auto-launches (ms) */
    AUTO_LAUNCH_DELAY: 3000,
} as const

/** Keyboard bindings */
export const KEY_BINDINGS = {
    LEFT: ['ArrowLeft', 'KeyA'] as readonly string[],
    RIGHT: ['ArrowRight', 'KeyD'] as readonly string[],
    START: ['Space'] as readonly string[],
    PAUSE: ['Escape', 'KeyP'] as readonly string[],
    RESTART: ['KeyR'] as readonly string[],
} as const

/** Brick visual properties by type */
export const BRICK_VISUALS = {
    normal: {
        opacity: 1,
        pattern: null,
    },
    strong: {
        opacity: 0.85,
        pattern: 'diagonal',
    },
    metal: {
        opacity: 0.7,
        pattern: 'cross',
    },
    indestructible: {
        opacity: 0.4,
        pattern: 'solid',
    },
} as const
```

### `components/ui/brick-breaker/levels.ts`

```tsx
import type { Level, BrickDefinition } from './types'

/** Shorthand brick definitions for level design */
const N: BrickDefinition = { type: 'normal' }
const S: BrickDefinition = { type: 'strong' }
const M: BrickDefinition = { type: 'metal' }
const X: BrickDefinition = { type: 'indestructible' }
const _: null = null // Empty space

/**
 * Built-in levels for the brick breaker game.
 * Each level is a 2D array where:
 * - N = normal brick (1 hit)
 * - S = strong brick (2 hits)
 * - M = metal brick (3 hits)
 * - X = indestructible brick
 * - _ = empty space
 */
export const DEFAULT_LEVELS: Level[] = [
    // Level 1: Introduction - Simple rows
    {
        id: 1,
        name: 'First Steps',
        speedMultiplier: 1.0,
        bricks: [
            [N, N, N, N, N, N, N, N],
            [N, N, N, N, N, N, N, N],
            [N, N, N, N, N, N, N, N],
            [_, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _],
        ],
    },

    // Level 2: Checkerboard
    {
        id: 2,
        name: 'Checkerboard',
        speedMultiplier: 1.0,
        bricks: [
            [N, _, N, _, N, _, N, _],
            [_, N, _, N, _, N, _, N],
            [N, _, N, _, N, _, N, _],
            [_, N, _, N, _, N, _, N],
            [N, _, N, _, N, _, N, _],
        ],
    },

    // Level 3: Pyramid
    {
        id: 3,
        name: 'Pyramid',
        speedMultiplier: 1.05,
        bricks: [
            [_, _, _, N, N, _, _, _],
            [_, _, N, N, N, N, _, _],
            [_, N, N, N, N, N, N, _],
            [N, N, N, N, N, N, N, N],
            [_, _, _, _, _, _, _, _],
        ],
    },

    // Level 4: Introducing Strong Bricks
    {
        id: 4,
        name: 'Getting Stronger',
        speedMultiplier: 1.05,
        bricks: [
            [N, N, N, N, N, N, N, N],
            [N, S, S, S, S, S, S, N],
            [N, S, N, N, N, N, S, N],
            [N, S, S, S, S, S, S, N],
            [N, N, N, N, N, N, N, N],
        ],
    },

    // Level 5: Diamond
    {
        id: 5,
        name: 'Diamond',
        speedMultiplier: 1.1,
        bricks: [
            [_, _, _, S, S, _, _, _],
            [_, _, S, N, N, S, _, _],
            [_, S, N, N, N, N, S, _],
            [_, _, S, N, N, S, _, _],
            [_, _, _, S, S, _, _, _],
        ],
    },

    // Level 6: Walls
    {
        id: 6,
        name: 'The Walls',
        speedMultiplier: 1.1,
        bricks: [
            [S, _, N, N, N, N, _, S],
            [S, _, N, N, N, N, _, S],
            [S, _, N, N, N, N, _, S],
            [S, _, N, N, N, N, _, S],
            [S, _, N, N, N, N, _, S],
        ],
    },

    // Level 7: Introducing Metal
    {
        id: 7,
        name: 'Metal Core',
        speedMultiplier: 1.15,
        bricks: [
            [N, N, N, N, N, N, N, N],
            [N, S, S, S, S, S, S, N],
            [N, S, M, M, M, M, S, N],
            [N, S, S, S, S, S, S, N],
            [N, N, N, N, N, N, N, N],
        ],
    },

    // Level 8: Stripes
    {
        id: 8,
        name: 'Stripes',
        speedMultiplier: 1.15,
        bricks: [
            [M, S, N, S, M, S, N, S],
            [S, N, S, M, S, N, S, M],
            [N, S, M, S, N, S, M, S],
            [S, M, S, N, S, M, S, N],
            [M, S, N, S, M, S, N, S],
        ],
    },

    // Level 9: Fortress with Indestructible
    {
        id: 9,
        name: 'Fortress',
        speedMultiplier: 1.2,
        bricks: [
            [X, N, N, N, N, N, N, X],
            [N, S, S, S, S, S, S, N],
            [N, S, M, M, M, M, S, N],
            [N, S, S, S, S, S, S, N],
            [X, N, N, N, N, N, N, X],
        ],
    },

    // Level 10: Final Challenge
    {
        id: 10,
        name: 'The Gauntlet',
        speedMultiplier: 1.25,
        bricks: [
            [X, M, S, N, N, S, M, X],
            [M, S, N, N, N, N, S, M],
            [S, N, N, M, M, N, N, S],
            [M, S, N, N, N, N, S, M],
            [X, M, S, N, N, S, M, X],
        ],
    },
]

/**
 * Create a custom level from a pattern string.
 * Use this for quick level prototyping.
 *
 * @example
 * ```ts
 * const level = createLevelFromPattern(1, 'My Level', `
 *   N N N N N N N N
 *   . S S S S S S .
 *   . S M M M M S .
 *   . S S S S S S .
 *   N N N N N N N N
 * `)
 * ```
 */
export function createLevelFromPattern(
    id: number,
    name: string,
    pattern: string,
    speedMultiplier: number = 1.0
): Level {
    const lines = pattern
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

    const bricks: (BrickDefinition | null)[][] = lines.map((line) => {
        const cells = line.split(/\s+/)
        return cells.map((cell) => {
            switch (cell.toUpperCase()) {
                case 'N':
                    return { type: 'normal' as const }
                case 'S':
                    return { type: 'strong' as const }
                case 'M':
                    return { type: 'metal' as const }
                case 'X':
                    return { type: 'indestructible' as const }
                case '.':
                case '_':
                case '0':
                    return null
                default:
                    return null
            }
        })
    })

    return { id, name, bricks, speedMultiplier }
}

/**
 * Generate a random level with given parameters.
 */
export function generateRandomLevel(
    id: number,
    cols: number = 8,
    rows: number = 5,
    difficulty: number = 0.5
): Level {
    const bricks: (BrickDefinition | null)[][] = []

    for (let row = 0; row < rows; row++) {
        const rowBricks: (BrickDefinition | null)[] = []
        for (let col = 0; col < cols; col++) {
            // Higher rows have stronger bricks
            const rowDifficulty = (rows - row) / rows
            const rand = Math.random()

            if (rand < 0.1) {
                // 10% empty
                rowBricks.push(null)
            } else if (rand < 0.1 + 0.5 * (1 - difficulty * rowDifficulty)) {
                // Normal bricks
                rowBricks.push({ type: 'normal' })
            } else if (rand < 0.8) {
                // Strong bricks
                rowBricks.push({ type: 'strong' })
            } else if (rand < 0.95) {
                // Metal bricks
                rowBricks.push({ type: 'metal' })
            } else {
                // Rare indestructible
                rowBricks.push({ type: 'indestructible' })
            }
        }
        bricks.push(rowBricks)
    }

    return {
        id,
        name: `Random Level ${id}`,
        bricks,
        speedMultiplier: 1 + difficulty * 0.3,
    }
}

/**
 * Get brick health by type
 */
export function getBrickHealth(type: BrickDefinition['type']): number {
    switch (type) {
        case 'normal':
            return 1
        case 'strong':
            return 2
        case 'metal':
            return 3
        case 'indestructible':
            return Infinity
    }
}

/**
 * Check if a level is completable (has at least one destructible brick)
 */
export function isLevelCompletable(level: Level): boolean {
    return level.bricks.some((row) =>
        row.some((brick) => brick !== null && brick.type !== 'indestructible')
    )
}

/**
 * Count total destructible bricks in a level
 */
export function countDestructibleBricks(level: Level): number {
    let count = 0
    for (const row of level.bricks) {
        for (const brick of row) {
            if (brick !== null && brick.type !== 'indestructible') {
                count++
            }
        }
    }
    return count
}
```

### `components/ui/brick-breaker/types.ts`

```tsx
/** Game state machine states */
export type GameState = 'idle' | 'playing' | 'paused' | 'won' | 'lost' | 'levelComplete'

/** Brick types with different behaviors */
export type BrickType =
    | 'normal'      // Standard brick, 1 hit
    | 'strong'      // 2 hits to destroy
    | 'metal'       // 3 hits to destroy
    | 'indestructible' // Cannot be destroyed

/** 2D Vector for positions and velocities */
export interface Vector2D {
    x: number
    y: number
}

/** Rectangle bounds for collision detection */
export interface Bounds {
    x: number
    y: number
    width: number
    height: number
}

/** Collision side for proper bounce direction */
export type CollisionSide = 'top' | 'bottom' | 'left' | 'right' | 'corner'

/** Individual brick state */
export interface Brick {
    id: string
    row: number
    col: number
    bounds: Bounds
    type: BrickType
    health: number
    maxHealth: number
    destroyed: boolean
    destroyedAt?: number
    points: number
}

/** Brick definition in level data (simplified for level design) */
export interface BrickDefinition {
    /** Brick type - determines health and behavior */
    type: BrickType
    /** Optional custom points override */
    points?: number
}

/** Level definition */
export interface Level {
    /** Level number (1-indexed for display) */
    id: number
    /** Level name */
    name: string
    /** Grid of brick definitions. Use null for empty cells. */
    bricks: (BrickDefinition | null)[][]
    /** Ball speed multiplier for this level */
    speedMultiplier?: number
    /** Background color override */
    backgroundColor?: string
}

/** Paddle state */
export interface Paddle {
    bounds: Bounds
    targetX: number | null
    speed: number
}

/** Ball state */
export interface Ball {
    position: Vector2D
    velocity: Vector2D
    radius: number
    speed: number
    trail: Vector2D[]
    isLaunched: boolean
}

/** Complete game state (mutable, stored in refs) */
export interface GameEngine {
    state: GameState
    level: number
    score: number
    lives: number
    bricks: Brick[]
    paddle: Paddle
    ball: Ball
    combo: number
    lastHitTime: number
}

/** Immutable snapshot for React rendering */
export interface GameSnapshot {
    state: GameState
    level: number
    levelName: string
    score: number
    highScore: number
    lives: number
    bricks: Brick[]
    paddle: Paddle
    ball: Ball
    combo: number
    totalLevels: number
}

/** Color configuration using CSS custom properties */
export interface BrickBreakerColors {
    background: string
    paddle: string
    ball: string
    ballTrail: string
    text: string
    textMuted: string
    /** Colors by brick type */
    bricks: {
        normal: string
        strong: string
        metal: string
        indestructible: string
    }
}

/** Layout configuration */
export interface BrickBreakerLayout {
    /** Number of brick columns */
    cols: number
    /** Number of brick rows */
    rows: number
    /** Gap between bricks in pixels */
    brickGap: number
    /** Top padding for score area (ratio of height) */
    topPadding: number
    /** Side padding (ratio of width) */
    sidePadding: number
    /** Brick border radius in pixels */
    brickBorderRadius: number
    /** Paddle border radius in pixels (0 for sharp corners) */
    paddleBorderRadius: number | 'auto'
    /** Ball style: 'round', 'square', or 'custom' (requires renderBall) */
    ballStyle: 'round' | 'square' | 'custom'
    /** Custom ball renderer (used when ballStyle is 'custom') */
    renderBall?: (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        color: string
    ) => void
}

/** Size ratios relative to canvas dimensions */
export interface BrickBreakerSizing {
    paddleWidth: number
    paddleHeight: number
    ballRadius: number
    paddleOffset: number
}

/** Physics configuration */
export interface BrickBreakerPhysics {
    /** Base ball speed (pixels per frame at 60fps) */
    baseSpeed: number
    /** Speed increase per level */
    speedPerLevel: number
    /** Maximum ball speed cap */
    maxSpeed: number
    /** Paddle movement speed */
    paddleSpeed: number
    /** Max bounce angle from paddle edges (radians) */
    maxBounceAngle: number
    /** Minimum Y velocity to prevent horizontal loops */
    minYVelocity: number
}

/** Scoring configuration */
export interface BrickBreakerScoring {
    /** Points by brick type */
    pointsByType: {
        normal: number
        strong: number
        metal: number
        indestructible: number
    }
    /** Combo multiplier increment */
    comboMultiplier: number
    /** Combo timeout in ms */
    comboTimeout: number
    /** Max combo multiplier */
    maxCombo: number
    /** Points for completing a level */
    levelBonus: number
}

/** Gameplay configuration */
export interface BrickBreakerGameplay {
    /** Starting lives */
    startingLives: number
    /** Max lives */
    maxLives: number
}

/** Visual effects configuration */
export interface BrickBreakerEffects {
    showTrail: boolean
    trailLength: number
    trailOpacity: number
    destroyAnimationDuration: number
    /** Screen shake on brick hit */
    screenShake: boolean
}

/** Storage configuration */
export interface BrickBreakerStorage {
    persistHighScore: boolean
    persistProgress: boolean
    storageKey: string
}

/** Complete configuration object */
export interface BrickBreakerConfig {
    colors: BrickBreakerColors
    layout: BrickBreakerLayout
    sizing: BrickBreakerSizing
    physics: BrickBreakerPhysics
    scoring: BrickBreakerScoring
    gameplay: BrickBreakerGameplay
    effects: BrickBreakerEffects
    storage: BrickBreakerStorage
}

/** Props for the BrickBreaker component */
export interface BrickBreakerProps {
    /** Partial config overrides */
    config?: DeepPartial<BrickBreakerConfig>
    /** Custom levels (overrides built-in levels) */
    levels?: Level[]
    /** Starting level (1-indexed) */
    startLevel?: number
    /** Called when game ends */
    onGameEnd?: (result: GameEndResult) => void
    /** Called when score updates */
    onScoreChange?: (score: number, combo: number) => void
    /** Called when game state changes */
    onStateChange?: (state: GameState) => void
    /** Called when level changes */
    onLevelChange?: (level: number) => void
    /** Additional container className */
    className?: string
    /** Auto-focus canvas on mount */
    autoFocus?: boolean
    /** Show focus ring when canvas is focused (default: true) */
    showFocusRing?: boolean
}

/** Game end result */
export interface GameEndResult {
    won: boolean
    score: number
    highScore: number
    level: number
    totalLevels: number
    bricksDestroyed: number
    totalBricks: number
}

/** Collision detection result */
export interface CollisionResult {
    collided: boolean
    side?: CollisionSide
    normal?: Vector2D
    penetration?: number
    contactPoint?: Vector2D
}

/** Canvas dimensions */
export interface CanvasDimensions {
    width: number
    height: number
    dpr: number
}

/** Deep partial utility type */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```

### `components/ui/brick-breaker/ui.tsx`

```tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { GameSnapshot, GameState } from './types'
import { formatScore } from './utils'

// ============================================================================
// Context
// ============================================================================

interface BrickBreakerUIContextValue {
    snapshot: GameSnapshot
    startGame: () => void
    pauseGame: () => void
    resumeGame: () => void
    resetGame: () => void
    nextLevel: () => void
}

const BrickBreakerUIContext =
    React.createContext<BrickBreakerUIContextValue | null>(null)

export function useBrickBreakerUI() {
    const context = React.useContext(BrickBreakerUIContext)
    if (!context) {
        throw new Error(
            'BrickBreaker UI components must be used within BrickBreakerRoot'
        )
    }
    return context
}

export const BrickBreakerUIProvider = BrickBreakerUIContext.Provider

// ============================================================================
// HUD Components
// ============================================================================

interface ScoreProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Show combo multiplier */
    showCombo?: boolean
}

export function BrickBreakerScore({
    showCombo = true,
    className,
    ...props
}: ScoreProps) {
    const { snapshot } = useBrickBreakerUI()

    return (
        <div
            data-slot="brick-breaker-score"
            className={cn('flex flex-col', className)}
            {...props}
        >
            <span className="text-foreground font-semibold tabular-nums">
                {formatScore(snapshot.score)}
            </span>
            {showCombo && snapshot.combo > 0 && snapshot.state === 'playing' && (
                <span className="text-muted-foreground text-xs tabular-nums">
                    ×{snapshot.combo + 1}
                </span>
            )}
        </div>
    )
}

interface HighScoreProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Label prefix */
    label?: string
}

export function BrickBreakerHighScore({
    label = 'HI',
    className,
    ...props
}: HighScoreProps) {
    const { snapshot } = useBrickBreakerUI()

    return (
        <div
            data-slot="brick-breaker-highscore"
            className={cn('text-muted-foreground tabular-nums', className)}
            {...props}
        >
            {label} {formatScore(snapshot.highScore)}
        </div>
    )
}

interface LevelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Show total levels */
    showTotal?: boolean
    /** Label prefix */
    label?: string
}

export function BrickBreakerLevel({
    showTotal = true,
    label = 'LVL',
    className,
    ...props
}: LevelProps) {
    const { snapshot } = useBrickBreakerUI()

    return (
        <div
            data-slot="brick-breaker-level"
            className={cn('text-muted-foreground tabular-nums', className)}
            {...props}
        >
            {label} {snapshot.level}
            {showTotal && `/${snapshot.totalLevels}`}
        </div>
    )
}

interface LivesProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Render function for each life indicator */
    renderLife?: (index: number, isActive: boolean) => React.ReactNode
}

export function BrickBreakerLives({
    renderLife,
    className,
    ...props
}: LivesProps) {
    const { snapshot } = useBrickBreakerUI()

    const defaultRenderLife = (index: number) => (
        <span key={index} className="bg-foreground/80 size-2 rounded-sm" />
    )

    return (
        <div
            data-slot="brick-breaker-lives"
            className={cn('flex items-center gap-1', className)}
            {...props}
        >
            {Array.from({ length: snapshot.lives }, (_, i) =>
                renderLife ? renderLife(i, true) : defaultRenderLife(i)
            )}
        </div>
    )
}

// ============================================================================
// Canvas Slot - marks where the canvas should render
// ============================================================================

export interface BrickBreakerCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional class names for the canvas wrapper */
    className?: string
}

/**
 * Slot component that marks where the game canvas should be rendered.
 * Use this to control canvas placement within your layout.
 * Props are passed to the canvas wrapper div.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BrickBreakerCanvas(props: BrickBreakerCanvasProps) {
    // This is a marker component - actual canvas is rendered by BrickBreaker
    // The props are read by BrickBreaker and applied to the canvas wrapper
    return null
}

// Internal marker to identify canvas slot
BrickBreakerCanvas.displayName = 'BrickBreakerCanvas'

// ============================================================================
// HUD Container
// ============================================================================

interface HUDProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function BrickBreakerHUD({ children, className, ...props }: HUDProps) {
    return (
        <div
            data-slot="brick-breaker-hud"
            className={cn(
                'flex shrink-0 items-center justify-between p-4 text-sm',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

// ============================================================================
// Overlay Components
// ============================================================================

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function BrickBreakerOverlay({
    children,
    className,
    ...props
}: OverlayProps) {
    const { snapshot } = useBrickBreakerUI()

    if (snapshot.state === 'playing') return null

    return (
        <div
            data-slot="brick-breaker-overlay"
            data-state={snapshot.state}
            className={cn(
                'bg-background/90 pointer-events-none absolute inset-0 flex flex-col items-center justify-center',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

BrickBreakerOverlay.displayName = 'BrickBreakerOverlay'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode
}

export function BrickBreakerTitle({
    children,
    className,
    ...props
}: TitleProps) {
    const { snapshot } = useBrickBreakerUI()

    const defaultTitles: Record<GameState, string> = {
        idle: 'BRICK BREAKER',
        playing: '',
        paused: 'PAUSED',
        won: 'YOU WIN!',
        lost: 'GAME OVER',
        levelComplete: 'LEVEL COMPLETE!',
    }

    return (
        <h2
            data-slot="brick-breaker-title"
            className={cn(
                'text-foreground text-2xl font-bold tracking-tight',
                className
            )}
            {...props}
        >
            {children ?? defaultTitles[snapshot.state]}
        </h2>
    )
}

interface MessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode
}

export function BrickBreakerMessage({
    children,
    className,
    ...props
}: MessageProps) {
    const { snapshot } = useBrickBreakerUI()

    const defaultMessages: Partial<Record<GameState, string>> = {
        idle: 'Click or press Space to start',
        paused: 'Press Space to resume',
        won: snapshot.score >= snapshot.highScore ? 'NEW HIGH SCORE!' : undefined,
        lost: `Score: ${formatScore(snapshot.score)}`,
        levelComplete: `Score: ${formatScore(snapshot.score)}`,
    }

    const message = children ?? defaultMessages[snapshot.state]
    if (!message) return null

    return (
        <p
            data-slot="brick-breaker-message"
            className={cn('text-muted-foreground mt-2', className)}
            {...props}
        >
            {message}
        </p>
    )
}

interface HintProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode
}

export function BrickBreakerHint({ children, className, ...props }: HintProps) {
    const { snapshot } = useBrickBreakerUI()

    const defaultHints: Partial<Record<GameState, string>> = {
        won: 'Press R to play again',
        lost: 'Press R to try again',
        levelComplete: 'Click to continue',
    }

    const hint = children ?? defaultHints[snapshot.state]
    if (!hint) return null

    return (
        <p
            data-slot="brick-breaker-hint"
            className={cn('text-muted-foreground mt-4 text-sm', className)}
            {...props}
        >
            {hint}
        </p>
    )
}

interface ScoreDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function BrickBreakerScoreDisplay({
    children,
    className,
    ...props
}: ScoreDisplayProps) {
    const { snapshot } = useBrickBreakerUI()

    if (snapshot.state === 'idle' || snapshot.state === 'playing') return null

    return (
        <div
            data-slot="brick-breaker-score-display"
            className={cn('text-foreground mt-4 text-lg font-medium', className)}
            {...props}
        >
            {children ?? `Score: ${formatScore(snapshot.score)}`}
        </div>
    )
}

// ============================================================================
// Action Button
// ============================================================================

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export function BrickBreakerActionButton({
    children,
    className,
    onClick,
    ...props
}: ActionButtonProps) {
    const { snapshot, startGame, resumeGame, resetGame, nextLevel } =
        useBrickBreakerUI()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)

        switch (snapshot.state) {
            case 'idle':
                startGame()
                break
            case 'paused':
                resumeGame()
                break
            case 'won':
            case 'lost':
                resetGame()
                setTimeout(startGame, 100)
                break
            case 'levelComplete':
                nextLevel()
                break
        }
    }

    const defaultLabels: Partial<Record<GameState, string>> = {
        idle: 'Start Game',
        paused: 'Resume',
        won: 'Play Again',
        lost: 'Try Again',
        levelComplete: 'Next Level',
    }

    if (snapshot.state === 'playing') return null

    return (
        <button
            type="button"
            data-slot="brick-breaker-action"
            className={cn(
                'bg-foreground text-background hover:bg-foreground/90 mt-6 rounded-md px-6 py-2 text-sm font-medium transition-colors',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children ?? defaultLabels[snapshot.state]}
        </button>
    )
}

// ============================================================================
// Default UI Preset
// ============================================================================

export function BrickBreakerDefaultUI() {
    return (
        <>
            <BrickBreakerHUD>
                <BrickBreakerScore />
                <BrickBreakerLevel />
                <BrickBreakerHighScore />
            </BrickBreakerHUD>

            <BrickBreakerLives className="absolute bottom-4 left-4" />

            <BrickBreakerOverlay>
                <BrickBreakerTitle />
                <BrickBreakerMessage />
                <BrickBreakerHint />
            </BrickBreakerOverlay>
        </>
    )
}
```

### `components/ui/brick-breaker/use-brick-breaker.ts`

```tsx
'use client'

import * as React from 'react'
import type {
    GameState,
    GameSnapshot,
    GameEndResult,
    BrickBreakerConfig,
    Brick,
    Ball,
    Paddle,
    Level,
    CanvasDimensions,
    BrickType,
} from './types'
import { DEFAULT_CONFIG, GAME_CONSTANTS } from './config'
import { DEFAULT_LEVELS, getBrickHealth } from './levels'
import {
    detectCollision,
    resolveBallBrickCollision,
    resolveBallPaddleCollision,
    generateId,
    clamp,
    normalize,
    scale,
    magnitude,
    storage,
} from './utils'

interface UseBrickBreakerOptions {
    config: BrickBreakerConfig
    levels: Level[]
    startLevel: number
    canvasDimensions: CanvasDimensions
    onGameEnd?: (result: GameEndResult) => void
    onScoreChange?: (score: number, combo: number) => void
    onStateChange?: (state: GameState) => void
    onLevelChange?: (level: number) => void
}

interface UseBrickBreakerReturn {
    snapshot: GameSnapshot
    startGame: () => void
    pauseGame: () => void
    resumeGame: () => void
    resetGame: () => void
    nextLevel: () => void
    movePaddle: (direction: 'left' | 'right' | 'none') => void
    setPaddlePosition: (x: number) => void
    launchBall: () => void
}

/**
 * Create bricks from level definition
 */
function createBricksFromLevel(
    level: Level,
    config: BrickBreakerConfig,
    dimensions: CanvasDimensions
): Brick[] {
    const { brickGap, topPadding, sidePadding } = config.layout
    const { width, height } = dimensions

    const rows = level.bricks.length
    const cols = level.bricks[0]?.length || config.layout.cols

    const playAreaX = width * sidePadding
    const playAreaY = height * topPadding
    const playAreaWidth = width * (1 - 2 * sidePadding)
    const playAreaHeight = height * 0.35

    const brickWidth = (playAreaWidth - (cols - 1) * brickGap) / cols
    const brickHeight = (playAreaHeight - (rows - 1) * brickGap) / rows

    const bricks: Brick[] = []

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const def = level.bricks[row]?.[col]
            if (!def) continue

            const health = getBrickHealth(def.type)
            const points = def.points ?? config.scoring.pointsByType[def.type]

            bricks.push({
                id: generateId(),
                row,
                col,
                bounds: {
                    x: playAreaX + col * (brickWidth + brickGap),
                    y: playAreaY + row * (brickHeight + brickGap),
                    width: brickWidth,
                    height: brickHeight,
                },
                type: def.type,
                health,
                maxHealth: health,
                destroyed: false,
                points,
            })
        }
    }

    return bricks
}

/**
 * Create paddle
 */
function createPaddle(
    config: BrickBreakerConfig,
    dimensions: CanvasDimensions
): Paddle {
    const { paddleWidth, paddleHeight, paddleOffset } = config.sizing
    const { width, height } = dimensions

    const w = width * paddleWidth
    const h = height * paddleHeight

    return {
        bounds: {
            x: (width - w) / 2,
            y: height * (1 - paddleOffset) - h,
            width: w,
            height: h,
        },
        targetX: null,
        speed: config.physics.paddleSpeed,
    }
}

/**
 * Create ball attached to paddle
 */
function createBall(
    config: BrickBreakerConfig,
    dimensions: CanvasDimensions,
    paddle: Paddle,
    levelIndex: number
): Ball {
    const { ballRadius } = config.sizing
    const { width } = dimensions
    const { baseSpeed, speedPerLevel, maxSpeed } = config.physics

    const radius = width * ballRadius
    const speed = Math.min(baseSpeed + levelIndex * speedPerLevel, maxSpeed)

    return {
        position: {
            x: paddle.bounds.x + paddle.bounds.width / 2,
            y: paddle.bounds.y - radius - 2,
        },
        velocity: { x: 0, y: 0 },
        radius,
        speed,
        trail: [],
        isLaunched: false,
    }
}

/**
 * Launch ball from paddle with random angle
 */
function launchBallFromPaddle(ball: Ball): Ball {
    // Random angle between -45 and -135 degrees (upward arc)
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 2)

    return {
        ...ball,
        velocity: {
            x: Math.cos(angle) * ball.speed,
            y: Math.sin(angle) * ball.speed,
        },
        isLaunched: true,
    }
}

/**
 * Main game hook with proper refs-based physics engine
 */
export function useBrickBreaker(
    options: UseBrickBreakerOptions
): UseBrickBreakerReturn {
    const {
        config,
        levels,
        startLevel,
        canvasDimensions,
        onGameEnd,
        onScoreChange,
        onStateChange,
        onLevelChange,
    } = options

    // React state for rendering (updated each frame)
    const [, forceRender] = React.useReducer((x) => x + 1, 0)

    // Game state stored in refs for mutation during game loop
    const gameStateRef = React.useRef<GameState>('idle')
    const levelIndexRef = React.useRef(startLevel - 1)
    const scoreRef = React.useRef(0)
    const highScoreRef = React.useRef(0)
    const livesRef = React.useRef(config.gameplay.startingLives)
    const comboRef = React.useRef(0)
    const lastHitTimeRef = React.useRef(0)

    const bricksRef = React.useRef<Brick[]>([])
    const paddleRef = React.useRef<Paddle>(createPaddle(config, canvasDimensions))
    const ballRef = React.useRef<Ball>(
        createBall(config, canvasDimensions, paddleRef.current, levelIndexRef.current)
    )

    const animationFrameRef = React.useRef<number>(0)
    const lastFrameTimeRef = React.useRef<number>(0)
    const paddleDirectionRef = React.useRef<'left' | 'right' | 'none'>('none')
    const totalBricksRef = React.useRef(0)
    const destroyedBricksRef = React.useRef(0)

    // Load high score
    React.useEffect(() => {
        if (config.storage.persistHighScore) {
            highScoreRef.current = storage.get(`${config.storage.storageKey}-highscore`, 0)
        }
    }, [config.storage])

    // Initialize level
    const initLevel = React.useCallback(
        (levelIndex: number) => {
            const level = levels[levelIndex] || levels[0]
            if (!level) return

            const newBricks = createBricksFromLevel(level, config, canvasDimensions)
            const newPaddle = createPaddle(config, canvasDimensions)
            const newBall = createBall(config, canvasDimensions, newPaddle, levelIndex)

            // Apply level speed multiplier
            if (level.speedMultiplier) {
                newBall.speed *= level.speedMultiplier
            }

            bricksRef.current = newBricks
            paddleRef.current = newPaddle
            ballRef.current = newBall
            comboRef.current = 0

            totalBricksRef.current = newBricks.filter(
                (b) => b.type !== 'indestructible'
            ).length
            destroyedBricksRef.current = 0

            forceRender()
        },
        [config, canvasDimensions, levels]
    )

    // Initialize on mount
    React.useEffect(() => {
        initLevel(levelIndexRef.current)
    }, [initLevel])

    // Reinitialize on dimension change
    React.useEffect(() => {
        if (gameStateRef.current === 'idle') {
            initLevel(levelIndexRef.current)
        }
    }, [canvasDimensions, initLevel])

    // Game loop
    const gameLoop = React.useCallback(
        (timestamp: number) => {
            if (gameStateRef.current !== 'playing') return

            const deltaTime = timestamp - lastFrameTimeRef.current
            lastFrameTimeRef.current = timestamp

            // Cap delta time to prevent physics issues
            const dt = Math.min(deltaTime, 50) / GAME_CONSTANTS.FRAME_TIME

            const paddle = paddleRef.current
            const ball = ballRef.current
            const bricks = bricksRef.current

            // ========== UPDATE PADDLE ==========
            let newPaddleX = paddle.bounds.x

            // Keyboard control
            if (paddleDirectionRef.current === 'left') {
                newPaddleX -= paddle.speed * dt
            } else if (paddleDirectionRef.current === 'right') {
                newPaddleX += paddle.speed * dt
            }

            // Mouse/touch control (smooth follow)
            if (paddle.targetX !== null) {
                const targetX = paddle.targetX - paddle.bounds.width / 2
                const diff = targetX - newPaddleX
                newPaddleX += diff * 0.2 * dt
            }

            // Clamp to bounds
            newPaddleX = clamp(newPaddleX, 0, canvasDimensions.width - paddle.bounds.width)
            paddle.bounds.x = newPaddleX

            // ========== UPDATE BALL ==========
            if (!ball.isLaunched) {
                // Ball follows paddle
                ball.position.x = paddle.bounds.x + paddle.bounds.width / 2
                ball.position.y = paddle.bounds.y - ball.radius - 2
            } else {
                // Update trail
                if (config.effects.showTrail) {
                    ball.trail.push({ ...ball.position })
                    if (ball.trail.length > config.effects.trailLength) {
                        ball.trail.shift()
                    }
                }

                // Move ball
                let newX = ball.position.x + ball.velocity.x * dt
                let newY = ball.position.y + ball.velocity.y * dt
                let newVelX = ball.velocity.x
                let newVelY = ball.velocity.y

                // Wall collisions
                if (newX - ball.radius < 0) {
                    newX = ball.radius
                    newVelX = Math.abs(newVelX)
                } else if (newX + ball.radius > canvasDimensions.width) {
                    newX = canvasDimensions.width - ball.radius
                    newVelX = -Math.abs(newVelX)
                }

                if (newY - ball.radius < 0) {
                    newY = ball.radius
                    newVelY = Math.abs(newVelY)
                }

                ball.position.x = newX
                ball.position.y = newY
                ball.velocity.x = newVelX
                ball.velocity.y = newVelY

                // Check if ball fell below screen
                if (newY - ball.radius > canvasDimensions.height) {
                    livesRef.current--

                    if (livesRef.current <= 0) {
                        // Game over
                        gameStateRef.current = 'lost'
                        onStateChange?.('lost')
                        onGameEnd?.({
                            won: false,
                            score: scoreRef.current,
                            highScore: Math.max(scoreRef.current, highScoreRef.current),
                            level: levelIndexRef.current + 1,
                            totalLevels: levels.length,
                            bricksDestroyed: destroyedBricksRef.current,
                            totalBricks: totalBricksRef.current,
                        })
                    } else {
                        // Reset ball
                        const newBall = createBall(
                            config,
                            canvasDimensions,
                            paddle,
                            levelIndexRef.current
                        )
                        if (levels[levelIndexRef.current]?.speedMultiplier) {
                            newBall.speed *= levels[levelIndexRef.current].speedMultiplier!
                        }
                        ballRef.current = newBall
                        comboRef.current = 0
                    }

                    forceRender()
                    animationFrameRef.current = requestAnimationFrame(gameLoop)
                    return
                }

                // ========== PADDLE COLLISION ==========
                const paddleCollision = detectCollision(
                    ball.position,
                    ball.radius,
                    ball.velocity,
                    paddle.bounds
                )

                if (paddleCollision.collided && ball.velocity.y > 0) {
                    const resolved = resolveBallPaddleCollision(
                        ball,
                        paddle,
                        paddleCollision,
                        config
                    )
                    ball.position = resolved.position
                    ball.velocity = resolved.velocity
                    comboRef.current = 0 // Reset combo on paddle hit
                }

                // ========== BRICK COLLISIONS ==========
                let hitBrick = false

                for (const brick of bricks) {
                    if (brick.destroyed || hitBrick) continue

                    const collision = detectCollision(
                        ball.position,
                        ball.radius,
                        ball.velocity,
                        brick.bounds
                    )

                    if (collision.collided) {
                        hitBrick = true

                        // Resolve collision
                        const resolved = resolveBallBrickCollision(ball, brick, collision, config)
                        ball.position = resolved.position
                        ball.velocity = resolved.velocity

                        // Damage brick
                        if (brick.type !== 'indestructible') {
                            brick.health--

                            if (brick.health <= 0) {
                                brick.destroyed = true
                                brick.destroyedAt = Date.now()
                                destroyedBricksRef.current++

                                // Update combo
                                const now = Date.now()
                                if (now - lastHitTimeRef.current < config.scoring.comboTimeout) {
                                    comboRef.current = Math.min(
                                        comboRef.current + 1,
                                        config.scoring.maxCombo
                                    )
                                } else {
                                    comboRef.current = 1
                                }
                                lastHitTimeRef.current = now

                                // Calculate score with combo
                                const multiplier = 1 + comboRef.current * config.scoring.comboMultiplier
                                const points = Math.floor(brick.points * multiplier)
                                scoreRef.current += points

                                // Update high score
                                if (scoreRef.current > highScoreRef.current) {
                                    highScoreRef.current = scoreRef.current
                                    if (config.storage.persistHighScore) {
                                        storage.set(
                                            `${config.storage.storageKey}-highscore`,
                                            highScoreRef.current
                                        )
                                    }
                                }

                                onScoreChange?.(scoreRef.current, comboRef.current)
                            }
                        }

                        break // Only handle one collision per frame
                    }
                }

                // ========== CHECK WIN CONDITION ==========
                const remainingBricks = bricks.filter(
                    (b) => !b.destroyed && b.type !== 'indestructible'
                )

                if (remainingBricks.length === 0) {
                    // Level complete!
                    scoreRef.current += config.scoring.levelBonus
                    onScoreChange?.(scoreRef.current, comboRef.current)

                    if (levelIndexRef.current >= levels.length - 1) {
                        // Game won!
                        gameStateRef.current = 'won'
                        onStateChange?.('won')
                        onGameEnd?.({
                            won: true,
                            score: scoreRef.current,
                            highScore: Math.max(scoreRef.current, highScoreRef.current),
                            level: levelIndexRef.current + 1,
                            totalLevels: levels.length,
                            bricksDestroyed: destroyedBricksRef.current,
                            totalBricks: totalBricksRef.current,
                        })
                    } else {
                        // Next level
                        gameStateRef.current = 'levelComplete'
                        onStateChange?.('levelComplete')
                    }

                    forceRender()
                    return
                }
            }

            forceRender()
            animationFrameRef.current = requestAnimationFrame(gameLoop)
        },
        [config, canvasDimensions, levels, onGameEnd, onScoreChange, onStateChange]
    )

    // Start/stop loop based on state
    React.useEffect(() => {
        if (gameStateRef.current === 'playing') {
            lastFrameTimeRef.current = performance.now()
            animationFrameRef.current = requestAnimationFrame(gameLoop)
        }

        return () => {
            cancelAnimationFrame(animationFrameRef.current)
        }
    }, [gameLoop])

    // ========== PUBLIC ACTIONS ==========

    const startGame = React.useCallback(() => {
        if (gameStateRef.current === 'idle' || gameStateRef.current === 'lost') {
            levelIndexRef.current = startLevel - 1
            scoreRef.current = 0
            livesRef.current = config.gameplay.startingLives
            destroyedBricksRef.current = 0
            initLevel(levelIndexRef.current)
        }

        if (!ballRef.current.isLaunched) {
            ballRef.current = launchBallFromPaddle(ballRef.current)
        }

        gameStateRef.current = 'playing'
        onStateChange?.('playing')
        lastFrameTimeRef.current = performance.now()
        animationFrameRef.current = requestAnimationFrame(gameLoop)
        forceRender()
    }, [config.gameplay.startingLives, startLevel, initLevel, onStateChange, gameLoop])

    const pauseGame = React.useCallback(() => {
        if (gameStateRef.current === 'playing') {
            gameStateRef.current = 'paused'
            onStateChange?.('paused')
            cancelAnimationFrame(animationFrameRef.current)
            forceRender()
        }
    }, [onStateChange])

    const resumeGame = React.useCallback(() => {
        if (gameStateRef.current === 'paused') {
            gameStateRef.current = 'playing'
            onStateChange?.('playing')
            lastFrameTimeRef.current = performance.now()
            animationFrameRef.current = requestAnimationFrame(gameLoop)
            forceRender()
        }
    }, [onStateChange, gameLoop])

    const resetGame = React.useCallback(() => {
        cancelAnimationFrame(animationFrameRef.current)
        levelIndexRef.current = startLevel - 1
        scoreRef.current = 0
        livesRef.current = config.gameplay.startingLives
        destroyedBricksRef.current = 0
        gameStateRef.current = 'idle'
        initLevel(levelIndexRef.current)
        onStateChange?.('idle')
        forceRender()
    }, [config.gameplay.startingLives, startLevel, initLevel, onStateChange])

    const nextLevel = React.useCallback(() => {
        if (
            gameStateRef.current === 'levelComplete' &&
            levelIndexRef.current < levels.length - 1
        ) {
            levelIndexRef.current++
            initLevel(levelIndexRef.current)
            onLevelChange?.(levelIndexRef.current + 1)

            // Auto-launch after brief pause
            gameStateRef.current = 'playing'
            onStateChange?.('playing')
            lastFrameTimeRef.current = performance.now()
            animationFrameRef.current = requestAnimationFrame(gameLoop)
            forceRender()
        }
    }, [levels.length, initLevel, onLevelChange, onStateChange, gameLoop])

    const movePaddle = React.useCallback((direction: 'left' | 'right' | 'none') => {
        paddleDirectionRef.current = direction
        paddleRef.current.targetX = null
    }, [])

    const setPaddlePosition = React.useCallback((x: number) => {
        paddleRef.current.targetX = x
        paddleDirectionRef.current = 'none'
    }, [])

    const launchBallAction = React.useCallback(() => {
        if (!ballRef.current.isLaunched && gameStateRef.current === 'playing') {
            ballRef.current = launchBallFromPaddle(ballRef.current)
            forceRender()
        }
    }, [])

    // Create snapshot for rendering
    const currentLevel = levels[levelIndexRef.current] || levels[0]
    const snapshot: GameSnapshot = {
        state: gameStateRef.current,
        level: levelIndexRef.current + 1,
        levelName: currentLevel?.name || `Level ${levelIndexRef.current + 1}`,
        score: scoreRef.current,
        highScore: highScoreRef.current,
        lives: livesRef.current,
        bricks: bricksRef.current,
        paddle: paddleRef.current,
        ball: ballRef.current,
        combo: comboRef.current,
        totalLevels: levels.length,
    }

    return {
        snapshot,
        startGame,
        pauseGame,
        resumeGame,
        resetGame,
        nextLevel,
        movePaddle,
        setPaddlePosition,
        launchBall: launchBallAction,
    }
}
```

### `components/ui/brick-breaker/utils.ts`

```tsx
import type {
    Vector2D,
    Bounds,
    CollisionResult,
    CollisionSide,
    BrickBreakerConfig,
    DeepPartial,
    Ball,
    Brick,
    Paddle,
} from './types'

// ============================================================================
// Configuration Utilities
// ============================================================================

/**
 * Deep merge configuration objects
 */
export function mergeConfig(
    base: BrickBreakerConfig,
    overrides?: DeepPartial<BrickBreakerConfig>
): BrickBreakerConfig {
    if (!overrides) return base

    return {
        colors: {
            ...base.colors,
            ...overrides.colors,
            bricks: { ...base.colors.bricks, ...overrides.colors?.bricks },
        },
        layout: { ...base.layout, ...overrides.layout },
        sizing: { ...base.sizing, ...overrides.sizing },
        physics: { ...base.physics, ...overrides.physics },
        scoring: {
            ...base.scoring,
            ...overrides.scoring,
            pointsByType: {
                ...base.scoring.pointsByType,
                ...overrides.scoring?.pointsByType,
            },
        },
        gameplay: { ...base.gameplay, ...overrides.gameplay },
        effects: { ...base.effects, ...overrides.effects },
        storage: { ...base.storage, ...overrides.storage },
    }
}

// ============================================================================
// Vector Math
// ============================================================================

/** Normalize vector to unit length */
export function normalize(v: Vector2D): Vector2D {
    const len = Math.sqrt(v.x * v.x + v.y * v.y)
    if (len === 0) return { x: 0, y: -1 }
    return { x: v.x / len, y: v.y / len }
}

/** Calculate vector magnitude */
export function magnitude(v: Vector2D): number {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

/** Scale vector by scalar */
export function scale(v: Vector2D, s: number): Vector2D {
    return { x: v.x * s, y: v.y * s }
}

/** Add two vectors */
export function add(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x + b.x, y: a.y + b.y }
}

/** Subtract vectors (a - b) */
export function subtract(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x - b.x, y: a.y - b.y }
}

/** Dot product of two vectors */
export function dot(a: Vector2D, b: Vector2D): number {
    return a.x * b.x + a.y * b.y
}

/** Reflect velocity off a surface normal */
export function reflect(velocity: Vector2D, normal: Vector2D): Vector2D {
    const d = dot(velocity, normal)
    return {
        x: velocity.x - 2 * d * normal.x,
        y: velocity.y - 2 * d * normal.y,
    }
}

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

// ============================================================================
// Collision Detection - AABB vs Circle with Proper Side Detection
// ============================================================================

/**
 * Detect collision between a circle (ball) and axis-aligned rectangle (brick/paddle).
 * Returns collision info including which side was hit for proper bounce direction.
 */
export function detectCollision(
    ballPos: Vector2D,
    ballRadius: number,
    ballVel: Vector2D,
    rect: Bounds
): CollisionResult {
    // Find the closest point on the rectangle to the ball center
    const closestX = clamp(ballPos.x, rect.x, rect.x + rect.width)
    const closestY = clamp(ballPos.y, rect.y, rect.y + rect.height)

    // Calculate distance from ball center to closest point
    const dx = ballPos.x - closestX
    const dy = ballPos.y - closestY
    const distSq = dx * dx + dy * dy
    const radiusSq = ballRadius * ballRadius

    // No collision if distance > radius
    if (distSq > radiusSq) {
        return { collided: false }
    }

    const dist = Math.sqrt(distSq)
    const penetration = ballRadius - dist

    // Determine collision side based on approach direction and position
    let side: CollisionSide
    let normal: Vector2D

    if (dist < 0.001) {
        // Ball center is inside rect - use velocity to determine exit direction
        const rectCenterX = rect.x + rect.width / 2
        const rectCenterY = rect.y + rect.height / 2
        const toBallX = ballPos.x - rectCenterX
        const toBallY = ballPos.y - rectCenterY

        // Determine which edge is closest
        const halfW = rect.width / 2
        const halfH = rect.height / 2
        const overlapX = halfW - Math.abs(toBallX)
        const overlapY = halfH - Math.abs(toBallY)

        if (overlapX < overlapY) {
            // Exit through left or right
            if (toBallX > 0) {
                side = 'right'
                normal = { x: 1, y: 0 }
            } else {
                side = 'left'
                normal = { x: -1, y: 0 }
            }
        } else {
            // Exit through top or bottom
            if (toBallY > 0) {
                side = 'bottom'
                normal = { x: 0, y: 1 }
            } else {
                side = 'top'
                normal = { x: 0, y: -1 }
            }
        }
    } else {
        // Normal case - calculate normal from closest point
        normal = { x: dx / dist, y: dy / dist }

        // Determine side based on where closest point is
        const isOnLeft = closestX <= rect.x + 0.01
        const isOnRight = closestX >= rect.x + rect.width - 0.01
        const isOnTop = closestY <= rect.y + 0.01
        const isOnBottom = closestY >= rect.y + rect.height - 0.01

        if (isOnTop && !isOnLeft && !isOnRight) {
            side = 'top'
            normal = { x: 0, y: -1 }
        } else if (isOnBottom && !isOnLeft && !isOnRight) {
            side = 'bottom'
            normal = { x: 0, y: 1 }
        } else if (isOnLeft && !isOnTop && !isOnBottom) {
            side = 'left'
            normal = { x: -1, y: 0 }
        } else if (isOnRight && !isOnTop && !isOnBottom) {
            side = 'right'
            normal = { x: 1, y: 0 }
        } else {
            // Corner collision
            side = 'corner'
            // Keep the calculated normal for corners
        }
    }

    return {
        collided: true,
        side,
        normal,
        penetration,
        contactPoint: { x: closestX, y: closestY },
    }
}

/**
 * Resolve ball collision - move ball out of collision and reflect velocity.
 * Returns the new ball state.
 */
export function resolveBallBrickCollision(
    ball: Ball,
    brick: Brick,
    collision: CollisionResult,
    config: BrickBreakerConfig
): Ball {
    if (!collision.collided || !collision.normal || collision.penetration === undefined) {
        return ball
    }

    // Move ball out of collision
    const newPos = {
        x: ball.position.x + collision.normal.x * (collision.penetration + 0.5),
        y: ball.position.y + collision.normal.y * (collision.penetration + 0.5),
    }

    // Reflect velocity
    let newVel = reflect(ball.velocity, collision.normal)

    // Ensure minimum Y velocity to prevent horizontal loops
    if (Math.abs(newVel.y) < config.physics.minYVelocity) {
        newVel.y = newVel.y >= 0 ? config.physics.minYVelocity : -config.physics.minYVelocity
        // Renormalize to maintain speed
        const speed = ball.speed
        newVel = scale(normalize(newVel), speed)
    }

    return {
        ...ball,
        position: newPos,
        velocity: newVel,
    }
}

/**
 * Handle ball-paddle collision with angle adjustment based on hit position.
 */
export function resolveBallPaddleCollision(
    ball: Ball,
    paddle: Paddle,
    collision: CollisionResult,
    config: BrickBreakerConfig
): Ball {
    if (!collision.collided || !collision.normal || collision.penetration === undefined) {
        return ball
    }

    // Only bounce if ball is moving downward
    if (ball.velocity.y <= 0) {
        return ball
    }

    // Calculate hit position relative to paddle center (-1 to 1)
    const paddleCenterX = paddle.bounds.x + paddle.bounds.width / 2
    const hitPos = (ball.position.x - paddleCenterX) / (paddle.bounds.width / 2)
    const clampedHitPos = clamp(hitPos, -1, 1)

    // Calculate bounce angle based on hit position
    // Center = straight up, edges = angled
    const bounceAngle = clampedHitPos * config.physics.maxBounceAngle

    // Create new velocity from angle
    const speed = ball.speed
    const newVel: Vector2D = {
        x: Math.sin(bounceAngle) * speed,
        y: -Math.cos(bounceAngle) * speed,
    }

    // Move ball above paddle
    const newY = paddle.bounds.y - ball.radius - 1

    return {
        ...ball,
        position: { x: ball.position.x, y: newY },
        velocity: newVel,
    }
}

// ============================================================================
// Utility Functions
// ============================================================================

/** Generate unique ID */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

/** Resolve CSS variable to actual color value */
export function resolveCssColor(color: string, element: HTMLElement): string {
    if (!color.includes('var(')) return color

    const computed = getComputedStyle(element)
    const varMatch = color.match(/var\((--[^)]+)\)/)

    if (varMatch) {
        const varName = varMatch[1]
        const resolved = computed.getPropertyValue(varName).trim()
        return resolved || color
    }

    return color
}

/** Format score with thousands separator */
export function formatScore(score: number): string {
    return score.toLocaleString()
}

/** Storage utilities */
export const storage = {
    get(key: string, defaultValue: number = 0): number {
        if (typeof window === 'undefined') return defaultValue
        try {
            const value = localStorage.getItem(key)
            return value ? parseInt(value, 10) : defaultValue
        } catch {
            return defaultValue
        }
    },

    set(key: string, value: number): void {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(key, value.toString())
        } catch {
            // Silently fail
        }
    },

    getJSON<T>(key: string, defaultValue: T): T {
        if (typeof window === 'undefined') return defaultValue
        try {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue
        } catch {
            return defaultValue
        }
    },

    setJSON<T>(key: string, value: T): void {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Silently fail
        }
    },
}

/** Degrees to radians */
export function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180
}

/** Create velocity vector from angle and speed */
export function velocityFromAngle(angle: number, speed: number): Vector2D {
    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
    }
}

/**
 * Check if ball is moving toward a rectangle (for early collision skip)
 */
export function isBallMovingToward(ball: Ball, rect: Bounds): boolean {
    const rectCenterX = rect.x + rect.width / 2
    const rectCenterY = rect.y + rect.height / 2

    const toRect = {
        x: rectCenterX - ball.position.x,
        y: rectCenterY - ball.position.y,
    }

    return dot(ball.velocity, toRect) > 0
}
```

## Attribution

Source: hub.joyco.studio · Original: https://hub.joyco.studio/components/brick-breaker

Adapted from the original. Credit the original author when you ship this.
