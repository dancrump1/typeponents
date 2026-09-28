# Position Aware Button

Solid pill button that fills with a dark circle growing from wherever the pointer touched it.

**Interaction.** Hovering grows a black circle out of the exact spot the pointer entered until it covers the button; moving away shrinks it back toward the point where you left.

- Categories: Buttons
- Tags: cursor-tracking
- Import: `@/components/ui/position-aware-button`
- Inspiration: Namer UI (adaptation) — https://namer-ui.netlify.app/components

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/position-aware-button.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `buttonText` *(required)* | `string` | — | — |
| `buttonWidth` | `string` | `"auto"` | — |
| `borderRadius` | `string` | `"2em"` | — |
| `buttonColor` | `string` | `"#ff4500"` | — |
| `onClick` | `((event: React.MouseEvent<HTMLButtonElement>) => void)` | — | — |

## Usage

```tsx
"use client";

import PositionAwareButton from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<PositionAwareButton />
		</div>
	);
}
```

## Source

### `components/ui/position-aware-button.tsx`

```tsx
import React, { useEffect, useRef } from "react";

// Credit:
// https://namer-ui.netlify.app/components

interface PositionAwareButtonProps {
	buttonText: string;
	buttonWidth?: string;
	borderRadius?: string;
	buttonColor?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PositionAwareButton: React.FC<PositionAwareButtonProps> = ({
	buttonText,
	buttonWidth = "auto",
	borderRadius = "2em",
	buttonColor = "#ff4500",
	onClick,
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const updatePosition = (e: MouseEvent) => {
			const button = buttonRef.current;
			if (button) {
				const rect = button.getBoundingClientRect();
				button.style.setProperty("--x", `${e.clientX - rect.left}px`);
				button.style.setProperty("--y", `${e.clientY - rect.top}px`);
			}
		};

		const button = buttonRef.current;
		if (button) {
			button.addEventListener("mousemove", updatePosition);
			button.addEventListener("mouseenter", updatePosition);
			button.addEventListener("mouseleave", updatePosition);
		}

		return () => {
			if (button) {
				button.removeEventListener("mousemove", updatePosition);
				button.removeEventListener("mouseenter", updatePosition);
				button.removeEventListener("mouseleave", updatePosition);
			}
		};
	}, []);

	return (
		<button
			ref={buttonRef}
			onClick={onClick}
			style={
				{
					width: buttonWidth,
					borderRadius: borderRadius,
					"--button-color": buttonColor,
				} as React.CSSProperties
			}
		>
			{buttonText}
			<style jsx>{`
				@property --r {
					syntax: "<length-percentage>";
					initial-value: 0px;
					inherits: false;
				}

				button {
					place-self: center;
					border: solid 2px #0001;
					padding: 0 1em;
					box-shadow: inset 1px 3px 1px #fff4;
					background: radial-gradient(
							circle at var(--x, 0%) var(--y, 0%),
							black calc(var(--r) - 1px),
							var(--button-color) var(--r)
						)
						border-box;
					color: white;
					font:
						1.5em/2.25 ubuntu,
						sans-serif;
					transition: --r 0.35s;
				}

				button:hover {
					--r: 100%;
				}
			`}</style>
		</button>
	);
};

export default PositionAwareButton;
```

## Attribution

Source: Namer UI · Original: https://namer-ui.netlify.app/components

Adapted from the original. Credit the original author when you ship this.
