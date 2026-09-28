# Nine Dot Loader

Loading indicator made of a three-by-three grid of rounded dots that pulse out of step with each other.

**Interaction.** Runs on its own with no input — every dot swells and shrinks on a one-second loop, each starting at a random moment so the grid twinkles rather than beating in unison.

- Categories: Loaders
- Import: `@/components/ui/nine-dot-loader`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/nine-dot-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import NineDotGridRandom from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<NineDotGridRandom />
		</div>
	);
}
```

## Source

### `components/ui/nine-dot-loader.tsx`

```tsx
export default function NineDotGridRandom() {
	const animationDuration = 1;

	return (
		<>
			<style>
				{`
          @keyframes three-dot-loader-growing {
            0% {
              transform: scale(1) ;
            }
            30% {
              transform: scale(1.5);
            }
            60% {
              transform: scale(1);
            }
          }
        `}
			</style>

			<div className="grid grid-cols-3 gap-3">
				{[...new Array(9)].map((_, index) => (
					<div
						className="size-5 origin-center rounded-xl bg-background dark:invert"
						key={index.toString() + "nine-dot"}
						style={{
							animationName: "three-dot-loader-growing",
							animationDuration: `${animationDuration}s`,
							animationIterationCount: "infinite",
							animationDirection: "both",
							animationTimingFunction: "ease-in",
							animationDelay: `${Math.random() * (animationDuration / 2)}s`,
						}}
					/>
				))}
			</div>
		</>
	);
}
```
