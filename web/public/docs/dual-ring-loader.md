# Dual Ring Loader

Loading spinner built from two concentric rings, each with a gap in its outline, the smaller one nested inside the larger.

**Interaction.** Runs on its own — the two rings turn in opposite directions at different speeds and dip slightly smaller at the start of each turn, so their gaps keep drifting out of alignment.

- Categories: Loaders
- Import: `@/components/ui/dual-ring-loader`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dual-ring-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import DualRingSpinnerLoader from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<DualRingSpinnerLoader />
		</div>
	);
}
```

## Source

### `components/ui/dual-ring-loader.tsx`

```tsx
const DualRingSpinnerLoader = () => {
	return (
		<>
			<style>
				{`
          @keyframes spin {
            0% {
              rotate: 0deg;
              scale: 1;
            }
            30% {
              rotate: 20deg;
              scale: 0.9;
            }
            100% {
              rotate: -360deg;
              scale: 1;
            }
          }
        `}
			</style>
			<div className="relative flex items-center justify-center">
				<div
					className="repeat-infinite size-12 rounded-full border-4 border-neutral-700 border-t-transparent ease-in-out dark:invert"
					style={{
						animationName: "spin",
						animationDuration: "1.5s",
					}}
				/>
				<div
					className="repeat-infinite direction-reverse absolute size-9 rounded-full border-4 border-neutral-700 border-b-transparent ease-in-out dark:invert"
					style={{
						animationName: "spin",
						animationDuration: "2s",
					}}
				/>
				<span className="sr-only">Loading...</span>
			</div>
		</>
	);
};

export default DualRingSpinnerLoader;
```
