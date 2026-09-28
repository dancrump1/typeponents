# Three Bounce Loader

- Categories: Loaders
- Import: `@/components/ui/three-bounce-loader`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/three-bounce-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import ThreeDotSimpleLoader from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<ThreeDotSimpleLoader />
		</div>
	);
}
```

## Source

### `components/ui/three-bounce-loader.tsx`

```tsx
const ThreeDotSimpleLoader = () => {
	return (
		<div className="flex items-center justify-center space-x-2 dark:invert">
			<span className="sr-only">Loading...</span>
			<div className="size-7 animate-bounce rounded-full bg-background [animation-delay:-0.3s]" />
			<div className="size-7 animate-bounce rounded-full bg-background [animation-delay:-0.15s]" />
			<div className="size-7 animate-bounce rounded-full bg-background" />
		</div>
	);
};

export default ThreeDotSimpleLoader;
```
