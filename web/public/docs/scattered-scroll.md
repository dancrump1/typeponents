# Scattered Scroll

- Categories: Scroll
- Tags: scroll-driven
- Import: `@/components/ui/scattered-scroll`
- Inspiration: Atelier UI (adaptation) — https://www.atelier-ui.com/en/docs/components/scroll/scattered-scroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scattered-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollDistance` | `number` | `200` | — |
| `overlap` | `number` | `0` | — |

## Usage

```tsx
import ScatteredScroll, {
    type ScatteredScrollProps,
} from "./component"

const IMAGE_URLS = [
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
]

export default function ScatteredScrollDemo(controls: Partial<ScatteredScrollProps>) {
    return (
        <>
            <div className="h-screen text-2xl tracking-tight font-medium flex items-center justify-center">
                Scroll to
                <span className="text-accent-2">&nbsp;to slide the images.</span>
            </div>

            <ScatteredScroll overlap={320} scrollDistance={350} {...controls}>
                {IMAGE_URLS.map((imageUrl, index) => (
                    <img
                        key={imageUrl}
                        className="w-[30vw] aspect-[5/7] object-cover rounded-md"
                        src={imageUrl}
                        alt={`Gallery item ${index + 1}`}
                        width={100}
                        height={100}
                    />
                ))}
            </ScatteredScroll>

            <div className="h-screen"></div>
        </>
    )
}
```

## Source

### `components/ui/scattered-scroll.tsx`

```tsx
"use client"

import { type MotionValue, motion, useScroll, useTransform } from "motion/react"
import {
    Children,
    type ComponentRef,
    isValidElement,
    type ReactNode,
    type RefObject,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react"

// Credit:
// https://www.atelier-ui.com/en/docs/components/scroll/scattered-scroll

export type ScatteredScrollProps = {
    children: ReactNode
    scrollDistance?: number
    overlap?: number
}

// (used instead of Math.random) Avoid hydration error on next.js
function seededRandom(seed: number): number {
    const x = Math.sin(seed + 1) * 10000
    return x - Math.floor(x)
}
const Item = ({
    children,
    progress,
    xValue,
    index,
    itemRef,
}: {
    children: ReactNode
    progress: MotionValue<number>
    xValue: number
    index: number
    itemRef?: RefObject<HTMLDivElement | null>
}) => {
    /**
     * Tweak options:
     * xPercent: horizontal offset between x and x (30 and 40 default).
     * rotation: random rotation between x and x (10 and 20 default).
     * yOffset: vertical offset in px (90 default).
     */
    const { xPercent, rotation, yOffset } = useMemo(
        () => ({
            xPercent: (seededRandom(index * 2) * 10 + 30) * (index % 2 === 0 ? 1 : -1),
            rotation: (seededRandom(index * 2 + 1) * 10 + 10) * (index % 2 === 0 ? 1 : -1),
            yOffset: (index % 2 === 0 ? 1 : -1) * 90,
        }),
        [index],
    )

    const yTranslate = useTransform(progress, [0, 0.5, 1], [yOffset, 0, -yOffset])
    const xTranslate = useTransform(progress, [0, 1], [xValue, -xValue])
    const rotate = useTransform(progress, [0, 1], [rotation, -rotation])
    const xPercentValue = useTransform(progress, [0, 1], [xPercent, -xPercent])

    const scatteredX = useTransform(
        [xTranslate, xPercentValue],
        ([px, percent]) => `calc(${px}px + ${percent}%)`,
    )

    return (
        <motion.div
            className="will-change-transform"
            ref={itemRef}
            style={{
                x: scatteredX,
                rotate: rotate,
                y: yTranslate,
            }}
        >
            {children}
        </motion.div>
    )
}

export default function ScatteredScroll({
    children,
    scrollDistance = 200,
    overlap = 0,
}: ScatteredScrollProps) {
    const childrenArray = Children.toArray(children).filter(isValidElement)
    const firstItemRef = useRef<ComponentRef<"div">>(null)
    const ownTargetRef = useRef<ComponentRef<"section">>(null)
    const [xValue, setXValue] = useState(0)

    useLayoutEffect(() => {
        if (typeof window === "undefined") return

        const update = () => {
            const containerWidth = window.innerWidth * 0.5
            const itemWidth = firstItemRef.current?.getBoundingClientRect().width ?? 0
            setXValue(containerWidth + itemWidth * 0.5 * childrenArray.length)
        }

        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [childrenArray.length])

    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"],
        target: ownTargetRef,
    })

    const items = childrenArray.map((child, index) => (
        <Item
            xValue={xValue}
            progress={scrollYProgress}
            index={index}
            key={index}
            itemRef={index === 0 ? firstItemRef : undefined}
        >
            {child}
        </Item>
    ))

    return (
        <section
            ref={ownTargetRef}
            className="relative overflow-x-clip"
            style={{ height: `${scrollDistance + 100}vh`, margin: `${-overlap / 2}vh 0` }}
        >
            <div className="sticky top-0 flex h-screen items-center justify-center gap-2">
                {items}
            </div>
        </section>
    )
}
```

## Attribution

Source: Atelier UI · Original: https://www.atelier-ui.com/en/docs/components/scroll/scattered-scroll

Adapted from the original. Credit the original author when you ship this.
