# Tag Cloud Dynamic

- Categories: Special Effects & FX
- Tags: spring, hover
- Import: `@/components/ui/tag-cloud-dynamic`
- Inspiration: ui.tripled.work (adaptation) — https://ui.tripled.work/components/dynamic-tag-cloud

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tag-cloud-dynamic.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tags` | `Tag[]` | `[ { id: "1", label: "React" }, { id: …` | — |

## Usage

```tsx
import { DynamicTagCloud } from "./component";

export default function TagCloudDynamicUsage() {
    return (
        <div>
            <DynamicTagCloud />
        </div>
    )
}
```

## Source

### `components/ui/tag-cloud-dynamic.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Credit:
// https://ui.tripled.work/components/dynamic-tag-cloud

type Tag = {
    id: string;
    label: string;
};

type DynamicTagCloudProps = {
    tags?: Tag[];
};

export function DynamicTagCloud({
    tags = [
        { id: "1", label: "React" },
        { id: "2", label: "TypeScript" },
        { id: "3", label: "Framer Motion" },
        { id: "4", label: "TailwindCSS" },
        { id: "5", label: "Next.js" },
        { id: "6", label: "Design" },
    ],
}: DynamicTagCloudProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const generateRandomOffset = () => ({
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
    });

    return (
        <div className="">
            <div className="flex flex-wrap items-center justify-center gap-3">
                {tags.map((tag, index) => {
                    const offset = generateRandomOffset();
                    const isHovered = hoveredId === tag.id;

                    return (
                        <motion.button
                            key={tag.id}
                            initial={{
                                x: offset.x,
                                y: offset.y,
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                x: isHovered ? offset.x * 1.5 : offset.x,
                                y: isHovered ? offset.y * 1.5 : offset.y,
                                opacity: 1,
                                scale: isHovered ? 1.1 : 1,
                            }}
                            whileHover={{
                                scale: 1.15,
                                zIndex: 10,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: index * 0.05,
                            }}
                            onHoverStart={() => setHoveredId(tag.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                            {tag.label}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
```

## Attribution

Source: ui.tripled.work · Original: https://ui.tripled.work/components/dynamic-tag-cloud

Adapted from the original. Credit the original author when you ship this.
