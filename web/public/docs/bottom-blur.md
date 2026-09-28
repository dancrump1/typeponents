# Bottom Blur

Strip pinned across the bottom of the viewport that blurs whatever passes behind it, in steps from clear to heavy.

**Interaction.** Static — the strip sits over the bottom of the screen at all times, so content softens and disappears into it as you scroll rather than cutting off at an edge.

- Categories: Special Effects & FX
- Import: `@/components/ui/bottom-blur`
- Inspiration: cuicui.day (adaptation) — https://cuicui.day/other/creative-effects

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/bottom-blur.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import { BottomBlurOut } from "./component";

export default function BottomBlurOutUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="relative w-52 dark:text-secondary">
				{Array.from({ length: 20 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index + "bottom-blur"}>
						Sunt id fugiat dolor nostrud aute eiusmod ea sint. Ea laborum
						do irure et. Ea elit incididunt velit veniam anim ullamco elit
						sunt. Ea veniam nisi elit nostrud eu sit ut non Lorem
						adipisicing non ut excepteur. Sint elit cupidatat
						reprehenderit nulla ipsum enim Lorem cillum velit veniam. Esse
						elit sit irure Lorem. Esse aliqua incididunt amet est
						voluptate esse adipisicing culpa commodo est.
						<img
							src="https://plus.unsplash.com/premium_photo-1727558768347-eefa5276de9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
							alt="random"
							width="auto"
							height={100}
						/>
					</div>
				))}
				<BottomBlurOut />
			</div>
			;
		</div>
	);
}
```

## Source

### `components/ui/bottom-blur.tsx`

```tsx
// credit:
// https://cuicui.day/other/creative-effects

export const BottomBlurOut = () => {
  return (
    <div className="gradient-blur fixed z-10 pointer-events-none before:absolute before:inset-0 after:absolute after:inset-0 before:z-1 h-[7%] bottom-0 inset-x-0 before:backdrop-blur-[0.5px] after:backdrop-blur-[32px]">
      <style>{gradientBlurCss}</style>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={`${index}-bottom-blur-out`}
          className="absolute inset-0"
          style={{
            zIndex: index + 2,
            backdropFilter: `blur(${2 ** index}px)`,
            WebkitBackdropFilter: `blur(${2 ** index}px)`,
          }}
        />
      ))}
    </div>
  );
};

const gradientBlurCss = `
.gradient-blur:before {
    -webkit-mask: linear-gradient(180deg, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
    mask: linear-gradient(180deg, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
}

.gradient-blur > div:nth-of-type(1) {
    -webkit-mask: linear-gradient(180deg, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
    mask: linear-gradient(180deg, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
}

.gradient-blur > div:nth-of-type(2) {
    -webkit-mask: linear-gradient(180deg, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
    mask: linear-gradient(180deg, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
}

.gradient-blur > div:nth-of-type(3) {
    -webkit-mask: linear-gradient(180deg, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
    mask: linear-gradient(180deg, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
}

.gradient-blur > div:nth-of-type(4) {
    -webkit-mask: linear-gradient(180deg, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
    mask: linear-gradient(180deg, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
}

.gradient-blur > div:nth-of-type(5) {
    -webkit-mask: linear-gradient(180deg, transparent 62.5%, #000 75%, #000 87.5%, transparent);
    mask: linear-gradient(180deg, transparent 62.5%, #000 75%, #000 87.5%, transparent);
}

.gradient-blur:after {
    -webkit-mask: linear-gradient(180deg, transparent 75%, #000 87.5%, #000);
    mask: linear-gradient(180deg, transparent 75%, #000 87.5%, #000);
}
`;
```

## Attribution

Source: cuicui.day · Original: https://cuicui.day/other/creative-effects

Adapted from the original. Credit the original author when you ship this.
