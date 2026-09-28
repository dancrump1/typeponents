# Blur Vignette

Image frame with a blurred border that fades inward, softening the edges instead of cropping them.

**Interaction.** Static — the blurred border is applied on load and does not respond to input.

- Categories: Backgrounds
- Import: `@/components/ui/blur-vignette`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/blur-vignette

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/blur-vignette.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import Image from "next/image";

import {
	BlurVignette,
	BlurVignetteArticle,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<BlurVignette
				radius="24px"
				inset="10px"
				transitionLength="80px"
				blur="15px"
			>
				<Image
					src="/itjustworks.jpg"
					alt="grid"
					width={600}
					className="mx-auto w-full relative h-full object-cover"
					height={600}
				/>
				<BlurVignetteArticle />
			</BlurVignette>
			<BlurVignette
				radius="24px"
				inset="10px"
				transitionLength="80px"
				blur="15px"
			>
				<Image
					src="/itjustworks.jpg"
					alt="grid"
					width={600}
					className="mx-auto w-full relative h-full object-cover"
					height={600}
				/>
				<BlurVignetteArticle />
			</BlurVignette>
		</div>
	);
}
```

## Source

### `components/ui/blur-vignette.tsx`

```tsx
import React, { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

// Credit:
// https://www.ui-layouts.com/components/blur-vignette

// ADD TO MAIN.SCSS:
// @layer utilities {
//  .blur-vignette {
//     position: absolute;
//     inset: 0;
//     border-radius: var(--radius);
//     -webkit-backdrop-filter: blur(var(--blur));
//     backdrop-filter: blur(var(--blur));
//     --r: max(var(--transition-length), calc(var(--radius) - var(--inset)));
//     --corner-size: calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset));
//     --corner-gradient: transparent 0px,
//       transparent calc(var(--r) - var(--transition-length)), black var(--r);
//     --fill-gradient: black, black var(--inset),
//       transparent calc(var(--inset) + var(--transition-length)),
//       transparent calc(100% - var(--transition-length) - var(--inset)),
//       black calc(100% - var(--inset));
//     --fill-narrow-size: calc(100% - (var(--inset) + var(--r)) * 2);
//     --fill-farther-position: calc(var(--inset) + var(--r));
//     -webkit-mask-image: linear-gradient(to right, var(--fill-gradient)),
//       linear-gradient(to bottom, var(--fill-gradient)),
//       radial-gradient(at bottom right, var(--corner-gradient)),
//       radial-gradient(at bottom left, var(--corner-gradient)),
//       radial-gradient(at top left, var(--corner-gradient)),
//       radial-gradient(at top right, var(--corner-gradient));
//     -webkit-mask-size:
//       100% var(--fill-narrow-size),
//       var(--fill-narrow-size) 100%,
//       var(--corner-size),
//       var(--corner-size),
//       var(--corner-size),
//       var(--corner-size);
//     -webkit-mask-position:
//       0 var(--fill-farther-position),
//       var(--fill-farther-position) 0,
//       0 0,
//       100% 0,
//       100% 100%,
//       0 100%;
//     -webkit-mask-repeat: no-repeat;
//   }
// }

interface BlurVignetteContextProps {
	radius?: string;
	inset?: string;
	transitionLength?: string;
	blur?: string;
}

const BlurVignetteContext = createContext<BlurVignetteContextProps>({
	radius: "24px",
	inset: "20px",
	transitionLength: "44px",
	blur: "6px",
});

export const useBlurVignetteContext = () => useContext(BlurVignetteContext);

interface BlurVignetteProps {
	classname?: string;
	children: React.ReactNode;
	radius?: string;
	inset?: string;
	transitionLength?: string;
	blur?: string;
	blurclassname?: string;
}

export const BlurVignette: React.FC<BlurVignetteProps> = ({
	classname,
	children,
	radius = "24px",
	inset = "20px",
	transitionLength = "44px",
	blur = "6px",
}) => {
	return (
		<BlurVignetteContext.Provider
			value={{ radius, inset, transitionLength, blur }}
		>
			<div
				className={cn("relative aspect-square overflow-hidden", classname)}
				style={{ borderRadius: radius }}
			>
				{children}
			</div>
		</BlurVignetteContext.Provider>
	);
};
interface BlurVignetteArticleProps {
	children?: React.ReactNode;
	classname?: string;
}

export const BlurVignetteArticle: React.FC<BlurVignetteArticleProps> = ({
	children,
	classname,
}) => {
	const { radius, inset, transitionLength, blur } = useBlurVignetteContext();

	return (
		<div
			className={cn(
				"blur-vignette bottom-0 left-0 w-full h-full z-1",
				classname
			)}
			style={
				{
					"--radius": radius,
					"--inset": inset,
					"--transition-length": transitionLength,
					"--blur": blur,
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
};
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/blur-vignette

Adapted from the original. Credit the original author when you ship this.
