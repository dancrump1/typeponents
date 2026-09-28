# Text Bounce

Heading whose individual letters shy away from the pointer and spring back.

**Interaction.** Moving the pointer across the text pushes each letter it touches away from the cursor with a slight tilt; the letter then springs back to its place with a soft overshoot.

- Categories: Text Animations, Cursor & Pointer Effects
- Tags: spring, cursor-tracking
- Import: `@/components/ui/text-bounce`
- Inspiration: Atelier UI (adaptation) — https://www.atelier-ui.com/en/docs/components/text/text-bounce

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-bounce.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `https://components.drivedev.net/r/text-split2.json`
- `text-split2`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `pause` | `number` | `0` | — |
| `outDuration` | `number` | `0.35` | — |
| `inDuration` | `number` | `0.8` | — |
| `bounce` | `number` | `0.5` | — |
| `distance` | `number` | `35` | — |
| `rotation` | `number` | `25` | — |
| `render` | `RenderProp` | — | — |

## Usage

```tsx
import { TextBounce, type TextBounceProps } from "./component"

export default function TextBounceDemo(controls: Partial<TextBounceProps>) {
    return (
        <div className="w-screen h-screen max-w-[47rem] px-5 flex items-center justify-center cursor-default">
            <div>
                <TextBounce
                    render={<p className="text-4xl font-medium tracking-tight" />}
                    {...controls}
                >
                    The eye can travel over the surface in a way parallel to the way it moves over
                    nature. It should feel caressed and soothed, experience frictions and ruptures,
                    glide and drift.
                </TextBounce>
            </div>
        </div>
    )
}
```

## Source

### `components/ui/text-bounce.tsx`

```tsx
"use client"

import { useAnimate } from "motion/react"
import type React from "react"
import type { RenderProp } from "@/hooks/use-render"
import { TextSplit } from "@/components/ui/text-split2"

// Credit:
// https://www.atelier-ui.com/en/docs/components/text/text-bounce

export type TextBounceProps = {
    children: string
    pause?: number
    outDuration?: number
    inDuration?: number
    bounce?: number
    distance?: number
    rotation?: number
    render?: RenderProp
}

type LetterProps = { char: string } & Required<
    Pick<
        TextBounceProps,
        "pause" | "outDuration" | "inDuration" | "bounce" | "distance" | "rotation"
    >
>

function Letter({ char, pause, outDuration, inDuration, bounce, distance, rotation }: LetterProps) {
    const [scope, animate] = useAnimate<HTMLSpanElement>()

    const handlePointerEnter = async (event: React.PointerEvent<HTMLSpanElement>) => {
        const el = scope.current
        if (!el) return

        const rect = el.getBoundingClientRect()

        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - event.clientX
        const dy = cy - event.clientY
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const nx = dx / dist
        const ny = dy / dist

        await animate([
            [
                el,
                { x: nx * distance, y: ny * distance, rotate: nx * rotation },
                { duration: outDuration, ease: "circOut" },
            ],
            [
                el,
                { x: 0, y: 0, rotate: 0 },
                { type: "spring", duration: inDuration, bounce, delay: pause },
            ],
        ])
    }

    return (
        <span
            ref={scope}
            className="inline-block will-change-transform whitespace-pre"
            onPointerEnter={handlePointerEnter}
        >
            {char}
        </span>
    )
}

export function TextBounce({
    children,
    pause = 0,
    outDuration = 0.35,
    inDuration = 0.8,
    bounce = 0.5,
    distance = 35,
    rotation = 25,
    render,
}: TextBounceProps) {
    return (
        <TextSplit
            render={render}
            showMask={false}
            splitBy="letters"
            renderItems={(char, index) => {
                return (
                    <Letter
                        key={index}
                        char={char}
                        pause={pause}
                        outDuration={outDuration}
                        inDuration={inDuration}
                        bounce={bounce}
                        distance={distance}
                        rotation={rotation}
                    />
                )
            }}
        >
            {children}
        </TextSplit>
    )
}
```

### `hooks/use-render.ts`

```tsx
// biome-ignore-all lint/suspicious/noExplicitAny: prop merging is inherently dynamic
/**
 * Inspired by Base UI's `useRender` + `mergeProps`, intentionally simplified for this
 * library's scope at the moment.
 *
 * Chosen over polymorphic prop: cleaner TypeScript, integrates better with other
 * component (Next/Image, design systems, third-party UI libraries)
 *
 * @see https://base-ui.com/react/utils/use-render
 * @see https://base-ui.com/react/utils/merge-props
 */
import { cloneElement, isValidElement, type ReactElement, type Ref } from "react"

// Credit:
// https://www.atelier-ui.com/en/docs/components/text/text-bounce

type AnyProps = Record<string, any>

type RenderFunction<S> = (props: AnyProps, state: S) => ReactElement

export type RenderProp<S = void> = ReactElement | RenderFunction<S>

type UseRenderOptions<S> = {
    render: RenderProp<S> | undefined
    props: AnyProps
    state?: S
    defaultElement: ReactElement
}

export function useRender<S = void>(options: UseRenderOptions<S>): ReactElement<AnyProps> {
    const { render, props, state, defaultElement } = options
    const target = render ?? defaultElement

    // Function form: consumer wires props themselves, no merging needed.
    if (typeof target === "function") {
        return target(props, state as S) as ReactElement<AnyProps>
    }

    // Element form: clone and merge our internal props with whatever the consumer set on the element.
    const targetProps = (isValidElement(target) ? target.props : {}) as AnyProps
    return cloneElement(target, mergeProps(props, targetProps)) as ReactElement<AnyProps>
}

function mergeProps(internal: AnyProps, external: AnyProps): AnyProps {
    const merged: AnyProps = { ...internal }

    for (const key in external) {
        const internalValue = internal[key]
        const externalValue = external[key]

        if (key === "className" && typeof externalValue === "string") {
            merged[key] = [internalValue, externalValue].filter(Boolean).join(" ")
        } else if (key === "style" && externalValue && typeof externalValue === "object") {
            merged[key] = { ...internalValue, ...externalValue }
        } else if (key === "ref") {
            merged[key] = composeRefs(internalValue, externalValue)
        } else if (
            key.startsWith("on") &&
            typeof internalValue === "function" &&
            typeof externalValue === "function"
        ) {
            // External handler runs first so consumers can stopPropagation before our logic fires.
            merged[key] = chainFunctions(externalValue, internalValue)
        } else {
            merged[key] = externalValue
        }
    }

    return merged
}

function chainFunctions(...fns: Array<(...args: any[]) => void>) {
    return (...args: any[]) => {
        for (const fn of fns) fn(...args)
    }
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
    return (node: T) => {
        for (const ref of refs) {
            if (typeof ref === "function") ref(node)
            else if (ref != null) (ref as { current: T | null }).current = node
        }
    }
}
```

## Attribution

Source: Atelier UI · Original: https://www.atelier-ui.com/en/docs/components/text/text-bounce

Adapted from the original. Credit the original author when you ship this.
