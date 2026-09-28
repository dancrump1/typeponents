# Gif Text

Heavy headline text with an animated GIF playing inside the letterforms instead of a flat colour.

**Interaction.** Runs on its own — the GIF loops inside the letters. The text starts in a solid fallback colour and fades over to the moving fill once the image has loaded.

- Categories: Text
- Import: `@/components/ui/gif-text`
- Inspiration: Cult UI (adaptation) — https://www.cult-ui.com/docs/components/text-gif

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/gif-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `class-variance-authority`

## Usage

```tsx
"use client";

import { GifText } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<GifText gifUrl="/itjustworks.jpg" text="Animated GIF Text" />
		</div>
	);
}
```

## Source

### `components/ui/gif-text.tsx`

```tsx
"use client";

import React, { useEffect, useMemo, useState, type CSSProperties } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Credit:
// https://www.cult-ui.com/docs/components/text-gif

// Define text style variants
const textBaseVariants = cva("", {
	variants: {
		size: {
			default: "text-2xl sm:text-3xl lg:text-4xl",
			xxs: "text-base sm:text-lg lg:text-lg",
			xs: "text-lg sm:text-xl lg:text-2xl",
			sm: "text-xl sm:text-2xl lg:text-3xl",
			md: "text-2xl sm:text-3xl lg:text-4xl",
			lg: "text-3xl sm:text-4xl lg:text-5xl",
			xl: "text-4xl sm:text-5xl lg:text-6xl",
			xxl: "text-[2.5rem] sm:text-6xl lg:text-[6rem]",
			xll: "text-5xl sm:text-6xl lg:text-[7rem]",
			xxxl: "text-[6rem] leading-5 lg:leading-8 sm:text-6xl lg:text-[8rem]",
		},
		weight: {
			default: "font-bold",
			thin: "font-thin",
			base: "font-base",
			semi: "font-semibold",
			bold: "font-bold",
			black: "font-black",
		},
		font: {
			default: "font-sansTight",
			serif: "font-serif",
			mono: "font-mono",
		},
	},
	defaultVariants: {
		size: "default",
		weight: "bold",
		font: "default",
	},
});

interface GifTextProps extends VariantProps<typeof textBaseVariants> {
	gifUrl: string;
	text: string;
	className?: string;
	fallbackColor?: string;
	transitionDuration?: number;
}

const GifText = React.memo(function GifTextComponent({
	gifUrl,
	text,
	size,
	weight,
	font,
	className,
	fallbackColor = "black",
	transitionDuration = 300,
}: GifTextProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	// Reset states when gifUrl changes
	useEffect(() => {
		setLoaded(false);
		setError(false);
	}, [gifUrl]);

	// Memoize className for performance
	const textClassName = useMemo(
		() =>
			cn(
				textBaseVariants({ size, weight, font }),
				loaded && !error ? "text-transparent bg-clip-text" : "",
				className,
				"pb-1.5 md:pb-4"
			),
		[size, weight, font, className, loaded, error]
	);

	// Memoize style for performance
	const textStyle = useMemo(() => {
		const style: CSSProperties = {
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			WebkitBackgroundClip: "text",
			lineHeight: 1,
			textAlign: "center",
			color: fallbackColor, // Always set the fallback color initially
			WebkitTextFillColor: fallbackColor, // Safari fix
			transition: `background-image ${transitionDuration}ms ease-in-out, color ${transitionDuration}ms ease-in-out`,
		};

		if (loaded && !error) {
			style.backgroundImage = `url(${gifUrl})`;
			style.color = "transparent";
			style.WebkitTextFillColor = "transparent"; // Safari fix
		}

		return style;
	}, [loaded, error, gifUrl, transitionDuration, fallbackColor]);

	return (
		<div className="relative inline-block">
			{/* Hidden image for preloading */}
			{gifUrl && (
				<Image
					src={gifUrl || "/itjustworks.jpg"}
					alt=""
					width={1}
					height={1}
					className="absolute opacity-0 pointer-events-none"
					onLoad={() => {
						setLoaded(true);
						setError(false);
					}}
					onError={() => {
						setError(true);
						setLoaded(false);
					}}
					priority
					unoptimized
				/>
			)}
			<span className={textClassName} style={textStyle}>
				{text}
			</span>
		</div>
	);
});

// Export common GIF URLs
const gifUrls = [
	"https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif",
	"https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif",
	"https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif",
	"https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif",
];

// Optional: Preloader component
function PreloadGifs() {
	return (
		<div className="hidden">
			{gifUrls.map((url) => (
				<Image
					key={url}
					src={url}
					alt=""
					width={1}
					height={1}
					priority
					unoptimized
				/>
			))}
		</div>
	);
}

export { GifText };
```

## Attribution

Source: Cult UI · Original: https://www.cult-ui.com/docs/components/text-gif

Adapted from the original. Credit the original author when you ship this.
