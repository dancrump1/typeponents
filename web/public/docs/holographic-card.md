# Holographic Card

Card with a holographic sheen that tracks the pointer.

**Interaction.** Tilting the pointer across the surface shifts the iridescent highlight.

- Categories: Cards
- Tags: spring, cursor-tracking, responsive
- Import: `@/components/ui/holographic-card`
- Inspiration: Spark UI (adaptation) — https://www.sparkui.site/components/holographic-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/holographic-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Usage

```tsx
"use client";
import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { HolographicCard } from "./component";

const CARDS = [
    {
        rarity: "Legendary",
        name: "Spark Core",
        stat: "∞ / 100",
        gradient: "from-fuchsia-600/40 via-purple-800/20 to-transparent",
        ring: "text-fuchsia-400",
    },
    {
        rarity: "Epic",
        name: "Motion Rune",
        stat: "94 / 100",
        gradient: "from-cyan-500/40 via-blue-800/20 to-transparent",
        ring: "text-cyan-400",
    },
    {
        rarity: "Rare",
        name: "Glass Shard",
        stat: "87 / 100",
        gradient: "from-amber-500/40 via-orange-800/20 to-transparent",
        ring: "text-amber-400",
    },
];

export default function HolographicCardDemo() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-black p-8">
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
                {CARDS.map((card) => (
                    <HolographicCard key={card.name} className="aspect-[3/4]">
                        <div className="relative flex h-full flex-col justify-between p-5">
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                            />
                            <div className="relative flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                                    {card.rarity}
                                </span>
                                <ShieldCheck className={`h-4 w-4 ${card.ring}`} />
                            </div>
                            <div className="relative flex flex-1 items-center justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
                                    <Sparkles className={`h-8 w-8 ${card.ring}`} />
                                </div>
                            </div>
                            <div className="relative">
                                <h3 className="text-lg font-semibold text-white">{card.name}</h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-[11px] text-zinc-400">Power</span>
                                    <span className="font-mono text-xs tabular-nums text-white/70">
                                        {card.stat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HolographicCard>
                ))}
            </div>
        </div>
    );
}
```

## Source

### `components/ui/holographic-card.tsx`

```tsx
"use client";
import * as React from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

// Credit:
//  https://www.sparkui.site/components/holographic-card
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export function HolographicCard({
    children,
    className,
    intensity = 12,
    foilOpacity = 0.5,
}) {
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const [hovering, setHovering] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);

    React.useEffect(() => {
        setEnabled(!window.matchMedia("(pointer: coarse)").matches);
    }, []);

    const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), SPRING);
    const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), SPRING);

    const glareX = useSpring(useTransform(px, [0, 1], [0, 100]), SPRING);
    const glareY = useSpring(useTransform(py, [0, 1], [0, 100]), SPRING);
    const foilShift = useSpring(
        useTransform([px, py], (v) => {
            const [x, y] = v;
            return (x + y) * 50;
        }),
        SPRING
    );

    const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45), transparent 45%)`;
    const foilPosition = useMotionTemplate`${foilShift}% 50%`;

    const handlePointerMove = (e) => {
        if (!enabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    };

    const handlePointerEnter = () => {
        if (enabled) setHovering(true);
    };

    const handlePointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
        setHovering(false);
    };

    return (
        <div style={{ perspective: 1000 }}>
            <motion.div
                onPointerMove={handlePointerMove}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className={cn(
                    "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900",
                    className
                )}
            >
                {children}

                <motion.div
                    aria-hidden
                    animate={{ opacity: hovering ? foilOpacity : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundImage:
                            "linear-gradient(115deg, transparent 20%, rgba(255,0,132,0.7) 36%, rgba(255,214,0,0.7) 43%, rgba(0,255,163,0.7) 50%, rgba(0,178,255,0.7) 57%, rgba(172,0,255,0.7) 64%, transparent 80%)",
                        backgroundSize: "300% 300%",
                        backgroundPosition: foilPosition,
                        mixBlendMode: "color-dodge",
                    }}
                    className="pointer-events-none absolute inset-0"
                />

                <motion.div
                    aria-hidden
                    animate={{ opacity: hovering ? 0.25 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)",
                        mixBlendMode: "overlay",
                    }}
                    className="pointer-events-none absolute inset-0"
                />

                <motion.div
                    aria-hidden
                    animate={{ opacity: hovering ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ backgroundImage: glare, mixBlendMode: "overlay" }}
                    className="pointer-events-none absolute inset-0"
                />
            </motion.div>
        </div>
    );
}
```

## Attribution

Source: Spark UI · Original: https://www.sparkui.site/components/holographic-card

Adapted from the original. Credit the original author when you ship this.
