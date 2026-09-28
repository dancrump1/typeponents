# Three Dot Loader

- Categories: Loaders
- Import: `@/components/ui/three-dot-loader`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/three-dot-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import ThreeDotLoaderGrowing from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<ThreeDotLoaderGrowing />
		</div>
	);
}
```

## Source

### `components/ui/three-dot-loader.tsx`

```tsx
export default function ThreeDotLoaderGrowing() {
	const animationDuration = 1;

	return (
		<>
			<style>
				{`
          @keyframes three-dot-loader-growing {
            0% {
              transform: scale(1) ;
            }
            20% {
              transform: scale(1.3);
            }
            90% {
              transform: scale(1);
            }
          }
        `}
			</style>
			<div className="flex gap-2">
				{[...new Array(3)].map((_, index) => (
					<div
						className="size-5 origin-center rounded-xl bg-background dark:invert"
						key={index.toString() + "three-dot"}
						style={{
							animationName: "three-dot-loader-growing",
							animationDuration: `${animationDuration}s`,
							animationIterationCount: "infinite",
							animationDirection: "normal",
							animationTimingFunction: "ease-in-out",
							animationDelay: `${(animationDuration / 3) * index}s`,
						}}
					/>
				))}
			</div>
		</>
	);
}
```
