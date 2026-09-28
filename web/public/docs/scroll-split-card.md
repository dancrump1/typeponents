# Scroll Split Card

Tall scroll section where a single wide photo is secretly three panels that pull apart and flip over into content cards.

**Interaction.** Scrolling fades out a scroll-down hint, slides the outer panels apart and shrinks all three slightly, then flips them over into coloured cards with an icon, title and text; they fan out and drift upward as a closing line fades in beneath them.

- Categories: Scroll
- Tags: featured, scroll-driven
- Import: `@/components/ui/scroll-split-card`
- Inspiration: Componentry (adaptation) — https://www.componentry.fun/docs/components/scroll-split-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scroll-split-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `imageSrc` *(required)* | `string` | — | — |
| `cards` *(required)* | `ScrollSplitCardItem[]` | — | — |
| `className` | `string` | — | — |
| `containerRef` | `RefObject<HTMLElement | null>` | — | — |

## Usage

```tsx
import { useRef, type RefObject } from "react"
import { ScrollSplitCard } from "./component"

export default function Example({
    containerRef: externalContainerRef,
}: {
    containerRef?: RefObject<HTMLDivElement | null>;
}) {
    const internalContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = externalContainerRef ?? internalContainerRef
    const ownsScrollRoot = !externalContainerRef

    return (
        <div
            ref={ownsScrollRoot ? containerRef : undefined}
            className={ownsScrollRoot ? "h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" : "h-full w-full"}
        >
            <ScrollSplitCard
                containerRef={containerRef}
                imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                cards={[
                    {
                        title: "Going Zero to One",
                        description: "If you've navigating a new business... breaking into a new market.",
                        bgColor: "#e2e2e2",
                        textColor: "#111111"
                    },
                    {
                        title: "Scaling from One to N",
                        description: "If you've achieved Product/Market Fit...",
                        bgColor: "#1a5bcf",
                        textColor: "#ffffff"
                    },
                    {
                        title: "Need Quick Solutions",
                        description: "If you know exactly what you want and need...",
                        bgColor: "#1c1c1c",
                        textColor: "#ffffff"
                    }
                ]}
            />
        </div>
    )
}
```

## Source

### `components/ui/scroll-split-card.tsx`

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { useRef, useState, useEffect } from "react";

// Credit:
// https://www.componentry.fun/docs/components/scroll-split-card

interface ScrollSplitCardItem {
    title: string;
    description: string;
    bgColor: string;
    textColor: string;
    icon?: React.ReactNode;
}

interface ScrollSplitCardProps {
    className?: string;
    imageSrc: string;
    cards: ScrollSplitCardItem[];
    containerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollSplitCard({
    className,
    imageSrc,
    cards,
    containerRef: externalContainerRef,
}: ScrollSplitCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement | null> | undefined>();

    useEffect(() => {
        if (externalContainerRef?.current) {
            setScrollContainer(externalContainerRef);
        }
    }, [externalContainerRef]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        ...(scrollContainer ? { container: scrollContainer } : {}),
        offset: ["start start", "end end"],
    });

    // Stage 1 to 2: Separation (0 to 0.4), then Stage 2 to 3: Overlap closer (0.4 to 0.8)
    const leftX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, -48, -24]);
    const rightX = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 48, 24]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

    // Stage 2 to 3: Flip (0.4 to 0.8)
    const rotateY = useTransform(scrollYProgress, [0.4, 0.8], [0, 180]);
    // Due to 180deg Y flip, positive Z becomes visual counter-clockwise, negative Z becomes visual clockwise
    const rotateZLeft = useTransform(scrollYProgress, [0.4, 0.8], [0, 6]);
    const rotateZRight = useTransform(scrollYProgress, [0.4, 0.8], [0, -6]);

    // Dynamic borders/radii so it looks like ONE flat image initially
    const borderRadiusLeft = useTransform(scrollYProgress, [0, 0.2], ["16px 0px 0px 16px", "16px 16px 16px 16px"]);
    const borderRadiusMiddle = useTransform(scrollYProgress, [0, 0.2], ["0px 0px 0px 0px", "16px 16px 16px 16px"]);
    const borderRadiusRight = useTransform(scrollYProgress, [0, 0.2], ["0px 16px 16px 0px", "16px 16px 16px 16px"]);
    const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
    const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
    const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;

    // Cards move up in the last viewport
    const cardsY = useTransform(scrollYProgress, [0.8, 1], [0, -200]);

    // Text appearance at the end in the sticky viewport
    const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.8, 1], [40, 0]);

    // Indicator text appearance at the start
    const startTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const startTextY = useTransform(scrollYProgress, [0, 0.1], [0, 20]);

    return (
        <div
            ref={containerRef}
            className={cn("relative h-[500vh] w-full", className)}
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px]">
                {/* Starting Text indicator */}
                <motion.div
                    className="absolute top-[20%] left-0 right-0 text-center"
                    style={{
                        opacity: startTextOpacity,
                        y: startTextY,
                    }}
                >
                    <p className="text-sm font-medium tracking-widest text-foreground/50 uppercase">
                        Scroll down
                    </p>
                </motion.div>

                <motion.div
                    style={{ scale, y: cardsY, transformStyle: "preserve-3d" }}
                    className="flex h-[400px] w-full max-w-4xl px-4 relative"
                >
                    {cards.slice(0, 3).map((card, i) => (
                        <motion.div
                            key={i}
                            className="relative h-full flex-1"
                            style={{
                                x: i === 0 ? leftX : i === 2 ? rightX : 0,
                                rotateY,
                                rotateZ: i === 0 ? rotateZLeft : i === 2 ? rotateZRight : 0,
                                zIndex: i, // Ensures Left is under Middle, and Right is above Middle
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* Front Side: Original Image Split */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                                style={{
                                    zIndex: 2, // Ensure front stays above initially
                                    borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                                    boxShadow,
                                }}
                            >
                                <div
                                    className="absolute inset-0 h-full w-[300%]"
                                    style={{
                                        left: `${-100 * i}%`,
                                        backgroundImage: `url(${imageSrc})`,
                                        backgroundSize: "100% 100%",
                                        backgroundPosition: "center",
                                    }}
                                />
                            </motion.div>

                            {/* Back Side: New Content Card */}
                            <motion.div
                                className={cn(
                                    "absolute inset-0 overflow-hidden flex flex-col justify-end p-8 [backface-visibility:hidden] will-change-transform",
                                    "border border-white/5 bg-gradient-to-br from-white/10 to-transparent",
                                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-24px_48px_rgba(0,0,0,0.2)]"
                                )}
                                style={{
                                    backgroundColor: card.bgColor,
                                    color: card.textColor,
                                    transform: "rotateY(180deg)",
                                    zIndex: 1, // Ensure back is behind before flip
                                    borderRadius: i === 0 ? borderRadiusLeft : i === 2 ? borderRadiusRight : borderRadiusMiddle,
                                    boxShadow,
                                }}
                            >
                                {/* Grainy Noise Overlay */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                                    style={{
                                        backgroundImage: `url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256")`,
                                        backgroundRepeat: "repeat",
                                    }}
                                />

                                <div className="relative z-10 mb-auto">{card.icon}</div>
                                <h3 className="relative z-10 mb-4 text-2xl font-medium leading-tight">
                                    {card.title}
                                </h3>
                                <p className="relative z-10 text-sm opacity-80">{card.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Ending Text fixed in the sticky viewport */}
                <motion.div
                    className="absolute bottom-[20%] left-0 right-0 text-center"
                    style={{
                        opacity: textOpacity,
                        y: textY,
                    }}
                >
                    <p className="text-3xl font-medium tracking-tight text-foreground/80 font-serif italic">
                        So cool, right?
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
```

## Attribution

Source: Componentry · Original: https://www.componentry.fun/docs/components/scroll-split-card

Adapted from the original. Credit the original author when you ship this.
