# Button Text Slide

Solid or outlined link button whose label swaps for a second line of text on hover.

**Interaction.** The button slides in from the right and fades up on load; hovering it pushes the current label up out of view while the replacement text rises into its place from below.

- Categories: Buttons
- Tags: hover
- Import: `@/components/ui/button-text-slide`
- Inspiration: Kokonut UI (adaptation) — https://kokonutui.com

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/button-text-slide.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Browse Components"` | — |
| `hoverText` | `string` | — | — |
| `href` | `string` | `"/docs/components/liquid-glass-card"` | — |
| `className` | `string` | — | — |
| `variant` | `"default" | "ghost"` | `"default"` | — |

## Usage

```tsx
"use client";

import React from "react";

import SlideTextButton from "./component";

export default function Usage() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <SlideTextButton />
        </div>
    );
}
```

## Source

### `components/ui/button-text-slide.tsx`

```tsx
"use client";

/**
 * @author: @kokonut-labs
 * @description: Slide Text Button with animated vertical text transition
 * @version: 1.0.0
 * @date: 2025-11-02
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 * https://kokonutui.com/docs/components/slide-text-button
 */


import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    text?: string;
    hoverText?: string;
    href?: string;
    className?: string;
    variant?: "default" | "ghost";
}

export default function SlideTextButton({
    text = "Browse Components",
    hoverText,
    href = "/docs/components/liquid-glass-card",
    className,
    variant = "default",
    ...props
}: SlideTextButtonProps) {
    const slideText = hoverText ?? text;
    const variantStyles =
        variant === "ghost"
            ? "border border-black/10 text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
            : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";

    return (
        <motion.div
            animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
            className="relative"
            initial={{ x: 200, opacity: 0 }}
        >
            <Link
                className={cn(
                    "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-md tracking-tighter transition-all duration-300 md:min-w-56",
                    variantStyles,
                    className
                )}
                href={href}
                {...props}
            >
                <span className="group-hover:-translate-y-full relative inline-block transition-transform duration-300 ease-in-out">
                    <span className="flex items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                        <span className="font-medium">{text}</span>
                    </span>
                    <span className="absolute top-full left-0 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="font-medium">{slideText}</span>
                    </span>
                </span>
            </Link>
        </motion.div>
    );
}
```

## Attribution

Source: Kokonut UI · Original: https://kokonutui.com

Adapted from the original. Credit the original author when you ship this.
