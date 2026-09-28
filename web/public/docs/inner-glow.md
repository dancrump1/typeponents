# Inner Glow

- Categories: Special Effects & FX
- Import: `@/components/ui/inner-glow`
- Inspiration: Star UI (adaptation) — https://starui.link/docs/components/inner-glow

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/inner-glow.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import { InnerGlow } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="grid relative mx-auto w-[300px] h-[300px] overflow-hidden bg-background rounded-md p-6 aspect-square place-items-center text-3xl font-medium">
				<InnerGlow />
				<p>Inner Glow</p>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/inner-glow.tsx`

```tsx
import { cn } from "@/lib/utils";

// Credit:
// https://starui.link/docs/components/inner-glow

// add to scss file
// @property --hue-rotation {
//   syntax: "<angle>";
//   initial-value: 0turn;
//   inherits: false;
// }

// @theme {
//   --animate-inner-glow: inner-glow 4s linear infinite;
//   @keyframes inner-glow {
//     from {
//       --hue-rotation: 0turn;
//     }
//     to {
//       --hue-rotation: 1turn;
//     }
//   }
// }
interface InnerGlowProps extends React.HTMLAttributes<HTMLDivElement> {}

function InnerGlow({ className, ...props }: InnerGlowProps) {
	return (
		<div
			className={cn(
				"absolute -inset-3 border-10 pointer-events-none blur-md [border-image:conic-gradient(from_var(--hue-rotation)_in_hsl_longer_hue,red-600,red-600)_1] animate-inner-glow",
				className
			)}
			{...props}
		/>
	);
}

export { InnerGlow };
```

## Attribution

Source: Star UI · Original: https://starui.link/docs/components/inner-glow

Adapted from the original. Credit the original author when you ship this.
