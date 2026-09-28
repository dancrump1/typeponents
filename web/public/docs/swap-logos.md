# Swap Logos

- Categories: Images
- Import: `@/components/ui/swap-logos`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/swap-logos.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `top` *(required)* | `React.ReactNode` | — | — |
| `bottom` *(required)* | `React.ReactNode` | — | — |

## Usage

```tsx
import { Spinner } from "./component";
import {
    // SiCss3,
    SiFramer,
    SiHtml5,
    SiJavascript,
    SiReact,
    SiTailwindcss,
} from "react-icons/si";

const Logos = () => {
    return (
        <section>
            <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-neutral-700 border border-neutral-700">
                <Spinner
                    top={<SiTailwindcss className="text-[#0DA5E9]" />}
                    bottom={<SiHtml5 className="text-[#DD4A25]" />}
                />
                <Spinner
                    top={<SiFramer className="text-[#0095FF]" />}
                    // bottom={<SiCss3 className="text-[#254BDD]" />}
                    bottom={<SiFramer className="text-[#254BDD]" />}
                />

                <Spinner
                    top={<SiReact className="text-[#58C4DC]" />}
                    bottom={<SiJavascript className="text-[#EFD81D]" />}
                />
            </div>
        </section>
    );
};


export const SwapLogos = () => {
    return (
        <div className="bg-neutral-900 py-8">
            <Logos />
        </div>
    );
};

export default SwapLogos;
```

## Source

### `components/ui/swap-logos.tsx`

```tsx
import React from "react";

import { motion } from "motion/react";


const TRANSITION = {
    ease: "easeInOut",
    duration: 10,
    repeat: Infinity,
    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
};

export const Spinner = ({
    top,
    bottom,
}: {
    top: React.ReactNode;
    bottom: React.ReactNode;
}) => {
    return (
        <div className="relative h-12 w-full overflow-hidden bg-neutral-900 text-2xl">
            {/* TOP SPINNER */}
            <motion.div
                style={{
                    y: "-50%",
                    x: "-50%",
                }}
                animate={{
                    rotate: ["0deg", "0deg", "180deg", "180deg", "360deg", "360deg"],
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
                }}
                className="absolute left-1/2 z-10 h-12 w-[50px] overflow-hidden rounded-full bg-neutral-900 ring-[1px] ring-neutral-700"
            >
                <div
                    style={{
                        bottom: 0,
                        transform: "translateY(50%) translateX(-50%)",
                    }}
                    className="absolute left-1/2"
                >
                    {top}
                </div>
                <div
                    style={{
                        top: 0,
                        transform: "translateY(-50%) translateX(-50%) rotate(180deg)",
                    }}
                    className="absolute left-1/2"
                >
                    {bottom}
                </div>
            </motion.div>

            {/* BOTTOM SPINNER */}
            <motion.div
                style={{
                    y: "50%",
                    x: "-50%",
                }}
                animate={{
                    rotate: ["0deg", "0deg", "180deg", "180deg", "360deg", "360deg"],
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 10,
                    repeat: Infinity,
                    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
                }}
                className="absolute left-1/2 z-10 h-12 w-[50px] overflow-hidden rounded-full bg-neutral-900 ring-[1px] ring-neutral-700"
            >
                <div
                    style={{
                        bottom: 0,
                        transform: "translateY(50%) translateX(-50%) rotate(180deg)",
                    }}
                    className="absolute left-1/2"
                >
                    {bottom}
                </div>
                <div
                    style={{
                        top: 0,
                        transform: "translateY(-50%) translateX(-50%)",
                    }}
                    className="absolute left-1/2"
                >
                    {top}
                </div>
            </motion.div>
        </div>
    );
};
```
