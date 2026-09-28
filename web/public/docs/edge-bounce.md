# Edge Bounce

Wrapper that makes whatever sits inside it flinch away from the cursor the moment the pointer touches it.

**Interaction.** When the pointer crosses into the element it darts away from the entry point and tilts in the direction you were moving, further the faster you approached, then springs back to its resting place.

- Categories: Cursor & Pointer Effects
- Tags: spring, cursor-tracking
- Import: `@/components/ui/edge-bounce`
- Inspiration: Atelier UI (adaptation) — https://www.atelier-ui.com/en/docs/components/cursor/edge-bounce

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/edge-bounce.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | — | — |
| `pause` | `number` | `0` | — |
| `outDuration` | `number` | `0.35` | — |
| `inDuration` | `number` | `1` | — |
| `bounce` | `number` | `0.3` | — |
| `distance` | `number` | `35` | — |
| `rotation` | `number` | `25` | — |

## Usage

```tsx
import { EdgeBounce, type EdgeBounceProps } from "./component"

const IMAGE_URLS = [
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
]

export default function EdgeBounceDemo(controls: Partial<EdgeBounceProps>) {
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="grid grid-cols-2 justify-items-center gap-2">
                {IMAGE_URLS.map((url) => (
                    <EdgeBounce key={url} className="w-[25vw]" {...controls}>
                        <img
                            src={url}
                            alt="Image"
                            width={100}
                            height={100}
                            draggable={false}
                            className="aspect-[2/2] w-full rounded-md object-cover select-none pointer-events-none"
                        />
                    </EdgeBounce>
                ))}
            </div>
        </div>
    )
}
```

## Source

### `components/ui/edge-bounce.tsx`

```tsx
"use client"

import { useAnimate, useMotionValue, useVelocity } from "motion/react"
import type React from "react"
import { type ComponentRef, type ReactNode, useEffect, useRef } from "react"

// Credit:
// https://www.atelier-ui.com/en/docs/components/cursor/edge-bounce

const MAX_BOUNCE_SPEED = 1500

export type EdgeBounceProps = {
    children: ReactNode
    className?: string
    pause?: number
    outDuration?: number
    inDuration?: number
    bounce?: number
    distance?: number
    rotation?: number
}

export function EdgeBounce({
    children,
    className,
    pause = 0,
    outDuration = 0.35,
    inDuration = 1,
    bounce = 0.3,
    distance = 35,
    rotation = 25,
}: EdgeBounceProps) {
    const [scope, animate] = useAnimate<ComponentRef<"div">>()
    const isBouncing = useRef(false)
    const touchInside = useRef(false)
    const pointerX = useMotionValue(0)
    const pointerY = useMotionValue(0)
    const velocityX = useVelocity(pointerX)
    const velocityY = useVelocity(pointerY)

    const bounceFrom = async (fromX: number, fromY: number) => {
        const element = scope.current
        if (!element || isBouncing.current) return

        const velX = velocityX.get()
        const velY = velocityY.get()
        const speed = Math.hypot(velX, velY)
        const speedRatio = Math.min(speed / MAX_BOUNCE_SPEED, 1)

        const rect = element.getBoundingClientRect()
        const deltaX = rect.left + rect.width / 2 - fromX
        const deltaY = rect.top + rect.height / 2 - fromY
        const distanceFromCenter = Math.hypot(deltaX, deltaY)

        if (distanceFromCenter === 0 || speed === 0) return

        const tilt = (deltaY * velX - deltaX * velY) / (distanceFromCenter * speed)

        isBouncing.current = true
        await animate(
            element,
            {
                x: (deltaX / distanceFromCenter) * distance * speedRatio,
                y: (deltaY / distanceFromCenter) * distance * speedRatio,
                rotate: tilt * rotation * speedRatio,
            },
            { duration: outDuration, ease: "circOut" },
        )
        isBouncing.current = false

        animate(
            element,
            { x: 0, y: 0, rotate: 0 },
            { type: "spring", duration: inDuration, bounce, delay: pause },
        )
    }

    useEffect(() => {
        const isOver = (event: PointerEvent) => {
            const rect = scope.current?.getBoundingClientRect()
            if (!rect) return false

            return (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            )
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (event.pointerType === "touch") touchInside.current = isOver(event)
        }

        const handlePointerMove = (event: PointerEvent) => {
            pointerX.set(event.clientX)
            pointerY.set(event.clientY)

            if (event.pointerType !== "touch") return

            const inside = isOver(event)
            if (inside && !touchInside.current) bounceFrom(event.clientX, event.clientY)
            touchInside.current = inside
        }

        window.addEventListener("pointerdown", handlePointerDown)
        window.addEventListener("pointermove", handlePointerMove)

        return () => {
            window.removeEventListener("pointerdown", handlePointerDown)
            window.removeEventListener("pointermove", handlePointerMove)
        }
    })

    const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "touch") bounceFrom(event.clientX, event.clientY)
    }

    return (
        <div
            ref={scope}
            className={`table will-change-transform ${className ?? ""}`}
            onPointerEnter={handlePointerEnter}
        >
            {children}
        </div>
    )
}
```

## Attribution

Source: Atelier UI · Original: https://www.atelier-ui.com/en/docs/components/cursor/edge-bounce

Adapted from the original. Credit the original author when you ship this.
