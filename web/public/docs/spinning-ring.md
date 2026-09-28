# Spinning Ring

- Categories: 3D & Canvas
- Import: `@/components/ui/spinning-ring`
- Inspiration: animitives.com (adaptation) — https://www.animitives.com/components/perspective

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/spinning-ring.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `'Animated Ring Text '` | — |
| `radius` | `number` | `80` | — |

## Usage

```tsx
import { SpinningRingText } from "./component";

export default function SpinningRingUsage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <SpinningRingText text="hello" />
        </div>
    );
}
```

## Source

### `components/ui/spinning-ring.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'

// Credit:
// https://www.animitives.com/components/perspective

interface AnimatedRingTextProps {
    text?: string
    radius?: number
}

export const SpinningRingText: React.FC<AnimatedRingTextProps> = ({
    text = 'Animated Ring Text ',
    radius = 80,
}) => {
    const letters = text.split('')

    return (
        <div className="flex h-96 w-full items-center justify-center">
            <motion.div
                className="relative flex items-center justify-center"
                initial={{
                    rotateX: -110,
                }}
                animate={{
                    rotateZ: 360,
                }}
                transition={{
                    duration: 8,
                    ease: 'linear',
                    repeat: Infinity,
                }}
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                }}
            >
                {letters.map((letter, index) => {
                    const angle = (index / letters.length) * 360
                    const transform = `rotate(${angle}deg) translateY(-${radius}px) rotateX(90deg)`

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{
                                transform,
                            }}
                        >
                            <span className="text-3xl font-bold uppercase text-black dark:text-white">
                                {letter}
                            </span>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}
```

## Attribution

Source: animitives.com · Original: https://www.animitives.com/components/perspective

Adapted from the original. Credit the original author when you ship this.
