# Text Split2

Splits a string into letters or words so each piece can be animated independently.

**Interaction.** Renders each letter or word in its own mask, ready for staggered enter/hover animations.

- Categories: Text Animations
- Import: `@/components/ui/text-split2`
- Inspiration: Atelier UI (adaptation) — https://www.atelier-ui.com/en/docs/components/text/text-bounce

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-split2.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `splitBy` | `SplitBy` | `"letters"` | — |
| `showMask` | `boolean` | `true` | — |
| `renderItems` | `((char: string, index: number) => ReactNode)` | — | — |
| `render` | `RenderProp` | — | — |

## Usage

```tsx
"use client";

import { TextSplit } from "./component";

export default function Usage() {
	return (
		<div className="flex h-full min-h-[16rem] items-center justify-center p-8 text-3xl font-semibold">
			<TextSplit splitBy="letters">Split into letters</TextSplit>
		</div>
	);
}
```

## Source

### `components/ui/text-split2.tsx`

```tsx
"use client"

import { Fragment, type ReactNode } from "react"
import { type RenderProp, useRender } from "@/hooks/use-render"

// Credit:
// https://www.atelier-ui.com/en/docs/components/text/text-bounce

type SplitBy = "letters" | "words"

const NON_BREAKING_SPACE = " "

export type TextSplitProps = {
    children: string
    splitBy?: SplitBy
    showMask?: boolean
    renderItems?: (char: string, index: number) => ReactNode
    render?: RenderProp
}

function Mask({ children, showMask }: { children: ReactNode; showMask: boolean }) {
    if (!showMask) return children
    return <span className="overflow-clip">{children}</span>
}

export function TextSplit({
    children,
    splitBy = "letters",
    showMask = true,
    renderItems,
    render,
}: TextSplitProps) {
    const words = children.split(" ")
    let cursor = 0

    const content = words.map((word, wordIndex) => {
        const isLast = wordIndex === words.length - 1

        if (splitBy === "words") {
            return (
                <Mask showMask={showMask} key={wordIndex}>
                    {renderItems ? renderItems(word, wordIndex) : word}
                    {!isLast && " "}
                </Mask>
            )
        }

        const letters = Array.from(word).map((char) => {
            const index = cursor++
            return (
                <Mask showMask={showMask} key={index}>
                    {renderItems ? renderItems(char, index) : char}
                </Mask>
            )
        })

        let spacer: ReactNode = null
        if (!isLast) {
            const index = cursor++
            spacer = (
                <Mask showMask={showMask} key={index}>
                    {renderItems ? renderItems(" ", index) : NON_BREAKING_SPACE}
                </Mask>
            )
        }

        return (
            <Fragment key={wordIndex}>
                <span className="inline-block">
                    {letters}
                    {spacer}
                </span>
                {!isLast && <wbr />}
            </Fragment>
        )
    })

    return useRender({
        render,
        defaultElement: <span />,
        props: { children: content },
    })
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
