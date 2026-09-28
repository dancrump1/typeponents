# Discover Button

Floating search bar paired with a pill of category tabs, where the search field takes over the whole row when opened.

**Interaction.** Clicking the search pill stretches it wide and slides the input into view while the tabs blur away into a single close button; clicking a tab moves a coloured bubble behind the active label.

- Categories: Buttons
- Tags: spring
- Import: `@/components/ui/discover-button`
- Inspiration: uselayouts.com (adaptation) — https://uselayouts.com/docs/components/discover-button

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/discover-button.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `https://components.drivedev.net/r/icons.json`
- `icons`

## Usage

```tsx
import DiscoverButton from "./component";

export default function DiscoverButtonUsage() {
    return (
        <div>
            <DiscoverButton />
        </div>
    );
}
```

## Source

### `components/ui/discover-button.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";


import { SearchIcon } from "@/components/ui/icons/component";
import { HeartIcon } from "@/components/ui/icons/component";
import { FlameIcon } from "@/components/ui/icons/component";
import { XIcon } from "@/components/ui/icons/component";

// Credit:
// https://uselayouts.com/docs/components/discover-button

// Change Here
const TABS = [
    {
        id: "popular",
        label: "Popular",
        Icon: FlameIcon,
        color: "text-red-500",
        fill: "fill-red-500",
        bg: "bg-red-50",
    },
    {
        id: "favorites",
        label: "Favorites",
        Icon: HeartIcon,
        color: "text-gray-900",
        fill: "fill-gray-900",
        bg: "bg-gray-100",
    },
] as const;

export default function DiscoverButton() {
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>(
        TABS[0].id
    );
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    return (
        <div className="flex items-center gap-3 p-2 h-full ">
            {/* Search Button / Input */}
            <motion.div
                layout
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 230,
                    mass: 1.2,
                }}
                onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
                className={`flex items-center bg-white rounded-[3rem] shadow-lg cursor-pointer h-[60px] overflow-hidden relative px-[1.125rem]     ${isSearchExpanded ? "flex-1" : ""
                    }`}
            >
                <div className="shrink-0">
                    <SearchIcon />
                </div>

                <motion.div
                    initial={false}
                    animate={{
                        width: isSearchExpanded ? "auto" : "0px",
                        opacity: isSearchExpanded ? 1 : 0,
                        filter: isSearchExpanded ? "blur(0px)" : "blur(4px)",
                        marginLeft: isSearchExpanded ? "12px" : "0px",
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 230,
                        mass: 1.2,
                    }}
                    className="overflow-hidden -mb-0.5 flex items-center"
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-0 outline-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                        onClick={(e) => e.stopPropagation()}
                    />
                </motion.div>
            </motion.div>

            {/* Tab Container / Close Button */}
            <motion.div
                layout
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 230,
                    mass: 1.2,
                }}
                className={`flex items-center bg-white rounded-[3rem] shadow-lg h-[60px] overflow-hidden relative `}
            >
                {/* Wrapper to control clipping - clips from right side */}
                <motion.div
                    initial={false}
                    animate={{
                        width: isSearchExpanded ? "60px" : "auto",
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 230,
                        mass: 1.2,
                    }}
                    className="overflow-hidden relative h-full flex items-center"
                >
                    {/* Tabs Group - stays in place, gets clipped */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isSearchExpanded ? 0 : 1,
                            filter: isSearchExpanded ? "blur(4px)" : "blur(0px)",
                            width: "auto",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className={`flex items-center  whitespace-nowrap `}
                    >
                        <div className="flex items-center gap-2 px-[6px]">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-[3rem] transition-colors relative ${activeTab === tab.id ? tab.color : "text-gray-700"
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.span
                                            layoutId="bubble"
                                            className={`absolute inset-0 z-0 ${tab.bg}`}
                                            style={{ borderRadius: 9999 }}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.19,
                                                duration: 0.4,
                                            }}
                                        />
                                    )}
                                    <tab.Icon />
                                    <span className="font-semibold font-mono uppercase relative z-10">
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Close Button - positioned absolutely on top */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isSearchExpanded ? 1 : 0,
                            filter: isSearchExpanded ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ pointerEvents: isSearchExpanded ? "auto" : "none" }}
                    >
                        <button
                            onClick={() => setIsSearchExpanded(false)}
                            className="shrink-0 cursor-pointer"
                        >
                            <XIcon />
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
```

## Attribution

Source: uselayouts.com · Original: https://uselayouts.com/docs/components/discover-button

Adapted from the original. Credit the original author when you ship this.
