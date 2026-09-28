# Circular Bars Loader

- Categories: Loaders
- Import: `@/components/ui/circular-bars-loader`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/circular-bars-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import CircularBarsSpinnerLoader from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<CircularBarsSpinnerLoader />
		</div>
	);
}
```

## Source

### `components/ui/circular-bars-loader.tsx`

```tsx
const CircularBarsSpinnerLoader = ({
	numberOfBars = 12,
	width = 3,
	height = 16,
}) => {
	const animationDuration = 1.5;
	const delay = animationDuration / numberOfBars;
	return (
		<>
			<style>
				{`
          @keyframes circular-bars {
            0% {
              opacity: 1;
              rotate: 0deg;
              scale: 1;
            }
            70% {
              opacity: 0;
              rotate: -40deg;
              scale: 0.9;
            }
            100% {
              opacity: 1;
              rotate: 0deg;
              scale: 1;
            }
          }
        `}
			</style>
			<div
				aria-hidden="true"
				className="relative flex size-12 items-center justify-center"
			>
				{[...new Array(numberOfBars)].map((_, index) => (
					<div
						className="absolute rounded-[1px] bg-background dark:invert"
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={`circular-bars-spinner-loader-bar-${index}`}
						style={{
							width: `${width}px`,
							height: `${height}px`,
							transform: `rotate(${
								index * (360 / numberOfBars)
							}deg) translateX(6px) translateY(-16px)`,
							animation: `circular-bars ${animationDuration}s ease-in-out infinite`,
							animationDelay: `-${index * delay}s`,
						}}
					/>
				))}
				<span className="sr-only">Loading...</span>
			</div>
		</>
	);
};

export default CircularBarsSpinnerLoader;
```
