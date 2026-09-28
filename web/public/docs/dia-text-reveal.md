# Dia Text Reveal

- Categories: Text
- Tags: scroll-driven
- Import: `@/components/ui/dia-text-reveal`
- Inspiration: Magic UI (adaptation) — https://magicui.design/docs/components/dia-text-reveal

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dia-text-reveal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string | string[]` | — | Text to reveal. Pass multiple strings to rotate when {@link DiaTextRevealProps.repeat} is `true`. |
| `colors` | `string[]` | `DEFAULT_COLORS` | Colors sampled across the moving gradient band. Defaults to a built-in palette. |
| `textColor` | `string` | `"var(--foreground)"` | CSS color for revealed text after the sweep and for leading/trailing regions during the animation. |
| `duration` | `number` | `1.5` | Duration of one sweep pass, in seconds. |
| `delay` | `number` | `0` | Delay before the sweep starts, in seconds. |
| `repeat` | `boolean` | `false` | When `text` is an array, replay the sweep and advance to the next string after each completion. |
| `repeatDelay` | `number` | `0.5` | Pause between cycles when {@link DiaTextRevealProps.repeat} is `true`, in seconds. |
| `startOnView` | `boolean` | `true` | If `true`, the animation starts only after the element enters the viewport. |
| `once` | `boolean` | `true` | Passed to `useInView`: if `true`, in-view detection fires at most once (no replay on scroll-back). |
| `className` | `string` | — | Additional class names for the animated `span` (e.g. typography utilities). |
| `fixedWidth` | `boolean` | `false` | When `text` has multiple entries, use the widest string’s width for layout instead of animating width per line. |

## Usage

```tsx
import { DiaTextReveal } from "./component"

export default function Usage() {
    return (
        <div className="flex min-h-56 items-center justify-center p-8">
            <DiaTextReveal
                className="text-4xl font-bold tracking-tight"
                colors={["#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"]}
                delay={0.35}
                duration={2.4}
                text="Made with care"
                textColor="black"
            />
            {/* <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
                Learn to{" "}
                <DiaTextReveal
                    repeat
                    repeatDelay={1.2}
                    text={["build faster", "ship smarter", "scale easier"]}
                />
            </h1>
            <DiaTextReveal
                className="text-4xl font-bold tracking-tight"
                colors={["#22d3ee", "#818cf8", "#f472b6", "#34d399"]}
                text="Design systems"
            /> */}
        </div>
    )
}
```

## Source

### `components/ui/dia-text-reveal.tsx`

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type HTMLMotionProps,
} from "motion/react"
import { cn } from "@/lib/utils"

// Credit:
// https://magicui.design/docs/components/dia-text-reveal

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) =>
    t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function buildGradient(pos: number, colors: string[], textColor: string) {
    const bandStart = pos - BAND_HALF
    const bandEnd = pos + BAND_HALF

    if (bandStart >= 100) {
        return `linear-gradient(90deg, ${textColor}, ${textColor})`
    }
    const n = colors.length
    const parts: string[] = []

    if (bandStart > 0)
        parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)

    colors.forEach((c, i) => {
        const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
        parts.push(`${c} ${pct.toFixed(2)}%`)
    })

    if (bandEnd < 100)
        parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`)

    return `linear-gradient(90deg, ${parts.join(", ")})`
}

function measureWidths(el: HTMLElement, texts: string[]) {
    const ghost = el.cloneNode() as HTMLElement
    Object.assign(ghost.style, {
        position: "absolute",
        visibility: "hidden",
        pointerEvents: "none",
        width: "auto",
        whiteSpace: "nowrap",
    })
    el.parentElement!.appendChild(ghost)
    const widths = texts.map((t) => {
        ghost.textContent = t
        return ghost.getBoundingClientRect().width
    })
    ghost.remove()
    return widths
}

/**
 * Props for {@link DiaTextReveal}.
 */
export interface DiaTextRevealProps extends Omit<
    HTMLMotionProps<"span">,
    "ref" | "children" | "style" | "animate" | "transition" | "color"
> {
    /**
     * Text to reveal. Pass multiple strings to rotate when {@link DiaTextRevealProps.repeat} is `true`.
     */
    text: string | string[]
    /**
     * Colors sampled across the moving gradient band. Defaults to a built-in palette.
     */
    colors?: string[]
    /**
     * CSS color for revealed text after the sweep and for leading/trailing regions during the animation.
     * @defaultValue `"var(--foreground)"`
     */
    textColor?: string
    /**
     * Duration of one sweep pass, in seconds.
     * @defaultValue `1.5`
     */
    duration?: number
    /**
     * Delay before the sweep starts, in seconds.
     * @defaultValue `0`
     */
    delay?: number
    /**
     * When `text` is an array, replay the sweep and advance to the next string after each completion.
     * @defaultValue `false`
     */
    repeat?: boolean
    /**
     * Pause between cycles when {@link DiaTextRevealProps.repeat} is `true`, in seconds.
     * @defaultValue `0.5`
     */
    repeatDelay?: number
    /**
     * If `true`, the animation starts only after the element enters the viewport.
     * @defaultValue `true`
     */
    startOnView?: boolean
    /**
     * Passed to `useInView`: if `true`, in-view detection fires at most once (no replay on scroll-back).
     * @defaultValue `true`
     */
    once?: boolean
    /**
     * Additional class names for the animated `span` (e.g. typography utilities).
     */
    className?: string
    /**
     * When `text` has multiple entries, use the widest string’s width for layout instead of animating width per line.
     * @defaultValue `false`
     */
    fixedWidth?: boolean
}

export function DiaTextReveal({
    text,
    colors = DEFAULT_COLORS,
    textColor = "var(--foreground)",
    duration = 1.5,
    delay = 0,
    repeat = false,
    repeatDelay = 0.5,
    startOnView = true,
    once = true,
    className,
    fixedWidth = false,
    ...props
}: DiaTextRevealProps) {
    const texts = Array.isArray(text) ? text : [text]
    const isMulti = texts.length > 1
    const prefersReducedMotion = useReducedMotion()

    const spanRef = useRef<HTMLSpanElement>(null)
    const optsRef = useRef({
        colors,
        textColor,
        duration,
        delay,
        repeat,
        repeatDelay,
        texts,
    })
    optsRef.current = {
        colors,
        textColor,
        duration,
        delay,
        repeat,
        repeatDelay,
        texts,
    }

    const indexRef = useRef(0)
    const hasPlayedRef = useRef(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
    const playRef = useRef<() => void>(null!)
    const stopRef = useRef<(() => void) | null>(null)

    const [activeIndex, setActiveIndex] = useState(0)
    const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

    const sweepPos = useMotionValue(SWEEP_START)

    const backgroundImage = useTransform(sweepPos, (pos) =>
        buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
    )

    const isInView = useInView(spanRef, { once, amount: 0.1 })

    useEffect(() => {
        const el = spanRef.current
        if (!el || !isMulti) return
        setMeasuredWidths(measureWidths(el, texts))
    }, [Array.isArray(text) ? text.join("\0") : text])

    playRef.current = () => {
        const { duration, delay, repeat, repeatDelay, texts } = optsRef.current

        sweepPos.set(SWEEP_START)

        const controls = animate(sweepPos, SWEEP_END, {
            duration,
            delay,
            ease: sweepEase,
            onComplete() {
                if (!repeat) return
                timerRef.current = setTimeout(() => {
                    const next = (indexRef.current + 1) % texts.length
                    indexRef.current = next
                    setActiveIndex(next)
                    playRef.current()
                }, repeatDelay * 1000)
            },
        })

        stopRef.current = () => controls.stop()
    }

    useEffect(() => {
        if (prefersReducedMotion) {
            sweepPos.set(SWEEP_END)
            return
        }
        if (startOnView && !isInView) return
        if (once && hasPlayedRef.current) return
        hasPlayedRef.current = true
        playRef.current()

        return () => {
            stopRef.current?.()
            clearTimeout(timerRef.current)
        }
    }, [isInView, startOnView, once, prefersReducedMotion, sweepPos])

    const fixedW =
        isMulti && fixedWidth && measuredWidths.length > 0
            ? Math.max(...measuredWidths)
            : undefined

    const animatedW =
        isMulti && !fixedWidth && measuredWidths[activeIndex] != null
            ? measuredWidths[activeIndex]
            : undefined

    return (
        <motion.span
            ref={spanRef}
            className={cn("align-bottom leading-[100%] text-inherit", className)}
            style={{
                transform: "translateY(-2px)",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundSize: "100% 100%",
                backgroundImage,
                ...(isMulti && {
                    display: "inline-block",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    verticalAlign: "text-center",
                    ...(fixedW != null && { width: fixedW }),
                }),
            }}
            animate={animatedW != null ? { width: animatedW } : undefined}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            {...props}
        >
            {texts[activeIndex]}
        </motion.span>
    )
}
```

## Attribution

Source: Magic UI · Original: https://magicui.design/docs/components/dia-text-reveal

Adapted from the original. Credit the original author when you ship this.
