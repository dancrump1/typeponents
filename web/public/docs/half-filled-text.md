# Half Filled Text

- Categories: Text
- Import: `@/components/ui/half-filled-text`
- Inspiration: Namer UI (adaptation) — https://namer-ui.netlify.app/components

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/half-filled-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `inscription` *(required)* | `string` | — | — |
| `fontSize` *(required)* | `string` | — | — |
| `fillColor` *(required)* | `string` | — | — |
| `outlineColor` *(required)* | `string` | — | — |
| `outlineWidth` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import HalfFilledText from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<HalfFilledText />
		</div>
	);
}
```

## Source

### `components/ui/half-filled-text.tsx`

```tsx
"use client";

import React from "react";

// Credit:
// https://namer-ui.netlify.app/components

interface HalfFilledTextProps {
	inscription: string;
	fontSize: string;
	fillColor: string;
	outlineColor: string;
	outlineWidth: string;
}

const HalfFilledText: React.FC<HalfFilledTextProps> = ({
	inscription,
	fontSize,
	fillColor,
	outlineColor,
	outlineWidth,
}) => {
	return (
		<section style={sectionStyle}>
			<div style={contentStyle}>
				<h2
					style={{
						...h2Style,
						fontSize,
						color: "transparent",
						WebkitTextStroke: `${outlineWidth} ${outlineColor}`,
					}}
				>
					{inscription}
				</h2>
				<h2
					style={{
						...h2Style,
						fontSize,
						color: fillColor,
						animation: "animate 4s ease-in-out infinite",
					}}
				>
					{inscription}
				</h2>
			</div>
			<style jsx>{`
				@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

				@keyframes animate {
					0%,
					100% {
						clip-path: polygon(
							0% 45%,
							16% 44%,
							33% 50%,
							54% 60%,
							70% 61%,
							84% 59%,
							100% 52%,
							100% 100%,
							0% 100%
						);
					}
					50% {
						clip-path: polygon(
							0% 60%,
							15% 65%,
							34% 66%,
							51% 62%,
							67% 50%,
							84% 45%,
							100% 46%,
							100% 100%,
							0% 100%
						);
					}
				}
			`}</style>
		</section>
	);
};

const sectionStyle: React.CSSProperties = {
	display: "flex",
	background: "#000",
	alignItems: "center",
	justifyContent: "center",
};

const contentStyle: React.CSSProperties = {
	position: "relative",
};

const h2Style: React.CSSProperties = {
	position: "absolute",
	transform: "translate(-50%, -50%)",
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
	fontFamily: '"Poppins", sans-serif',
};

export default HalfFilledText;
```

## Attribution

Source: Namer UI · Original: https://namer-ui.netlify.app/components

Adapted from the original. Credit the original author when you ship this.
