# Bubble Text

Oversized thin heading whose letters thicken and brighten under the pointer.

**Interaction.** Hovering a letter swells it to its heaviest weight and lightens its colour, with the two letters either side thickening partway, so a soft bulge follows the pointer along the word.

- Categories: Text
- Import: `@/components/ui/bubble-text`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/bubble-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import BubbleText from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="grid h-screen place-content-center bg-background">
				<BubbleText text="bubble text" />
			</div>
		</div>
	);
}
```

## Source

### `components/ui/bubble-text.tsx`

```tsx
import React, { useEffect } from "react";

// www.hover.dev/components/text#bubble-text

// DONT FORGET THE CSS

const BubbleText = ({ text }: { text: string }) => {
	useEffect(() => {
		const spans = document.querySelectorAll(
			".hover-text span"
		) as NodeListOf<HTMLSpanElement>;

		spans.forEach((span) => {
			span.addEventListener("mouseenter", function (this: typeof span) {
				this.style.fontWeight = "900";
				this.style.color = "rgb(238, 242, 255)";

				const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
				const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

				if (leftNeighbor) {
					leftNeighbor.style.fontWeight = "500";
					leftNeighbor.style.color = "rgb(199, 210, 254)";
				}
				if (rightNeighbor) {
					rightNeighbor.style.fontWeight = "500";
					rightNeighbor.style.color = "rgb(199, 210, 254)";
				}
			});

			span.addEventListener("mouseleave", function (this: typeof span) {
				this.style.fontWeight = "100";
				this.style.color = "rgb(165, 180, 252)";

				const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
				const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

				if (leftNeighbor) {
					leftNeighbor.style.fontWeight = "100";
					leftNeighbor.style.color = "rgb(165, 180, 252)";
				}

				if (rightNeighbor) {
					rightNeighbor.style.fontWeight = "100";
					rightNeighbor.style.color = "rgb(165, 180, 252)";
				}
			});
		});
	}, []);

	return (
		<h2 className="hover-text text-center text-5xl font-thin text-indigo-300">
			<Text>{text}</Text>
		</h2>
	);
};

const Text = ({ children }: { children: string }) => {
	return (
		<>
			{children.split("").map((child, idx) => (
				<span
					style={{
						transition: "0.35s font-weight, 0.35s color",
					}}
					key={idx + "bubble-text"}
				>
					{child}
				</span>
			))}
		</>
	);
};

export default BubbleText;
```
