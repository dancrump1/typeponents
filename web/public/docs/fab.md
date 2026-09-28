# Fab

- Categories: Buttons
- Tags: spring, hover
- Import: `@/components/ui/fab`
- Inspiration: ui.chetanverma.com (adaptation) — https://ui.chetanverma.com/components/floating-action-menu

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/fab.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Registry dependencies

- `button`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options` *(required)* | `{ label: string; onClick: () => void; Icon?: React.ReactN…` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
import FloatingActionMenu from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <FloatingActionMenu options={[
                {
                    label: "Home",
                    onClick: () => {
                        console.log("Home");
                    },
                },
            ]} />
        </div>
    );
}
```

## Source

### `components/ui/fab.tsx`

```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Credit:
// https://ui.chetanverma.com/components/floating-action-menu

type FloatingActionMenuProps = {
    options: {
        label: string;
        onClick: () => void;
        Icon?: React.ReactNode;
    }[];
    className?: string;
};

const FloatingActionMenu = ({
    options,
    className,
}: FloatingActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cn("fixed bottom-8 right-8", className)}>
            <Button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] "
            >
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                    <Plus className="w-6 h-6" />
                </motion.div>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.1,
                        }}
                        className="absolute bottom-10 right-0 mb-2"
                    >
                        <div className="flex flex-col items-end gap-2">
                            {options.map((option, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                >
                                    <Button
                                        onClick={option.onClick}
                                        size="sm"
                                        className="flex items-center gap-2 bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm"
                                    >
                                        {option.Icon}
                                        <span>{option.label}</span>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionMenu;
```

## Attribution

Source: ui.chetanverma.com · Original: https://ui.chetanverma.com/components/floating-action-menu

Adapted from the original. Credit the original author when you ship this.
