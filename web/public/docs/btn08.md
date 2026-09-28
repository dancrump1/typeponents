# Btn08

Share button that trades itself for a row of social icons in the same footprint.

**Interaction.** Hovering the button fades it out while Twitter, Facebook, LinkedIn and copy-link icons slide in from the left one after another; moving the pointer away reverses it.

- Categories: Buttons
- Tags: hover
- Import: `@/components/ui/btn08`
- Inspiration: Kokonut UI (adaptation) — https://kokonutui.com/docs/components/button#button---share

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/btn08.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`

## Registry dependencies

- `button`

## Usage

```tsx
"use client";

import React from "react";

import { Btn08 } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Btn08 />
		</div>
	);
}
```

## Source

### `components/ui/btn08.tsx`

```tsx
// Credit:
// https://kokonutui.com/docs/components/button#button---share

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Facebook, Link, Linkedin, Twitter } from "lucide-react";

export function Btn08({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const [isHovered, setIsHovered] = useState(false);
	const shareButtons = [
		{ icon: Twitter },
		{ icon: Facebook },
		{ icon: Linkedin },
		{ icon: Link },
	];

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Button
				className={cn(
					"min-w-40 relative",
					"bg-background dark:bg-background",
					"hover:bg-background dark:hover:bg-background",
					"text-foreground dark:text-foreground",
					"border border-black/10 dark:border-white/10",
					"transition-[background-color] duration-300",
					isHovered ? "opacity-0" : "opacity-100",
					className
				)}
				{...props}
			>
				<span className="flex items-center gap-2">
					<Link className="w-4 h-4" />
					Share
				</span>
			</Button>

			<div className="absolute top-0 left-0 flex h-10">
				{shareButtons.map((button, index) => (
					<button
						type="button"
						key={index + "button8"}
						className={cn(
							"h-10",
							"w-10",
							"flex items-center justify-center",
							"bg-background dark:bg-background",
							"text-foreground dark:text-foreground",
							"transition-[background-color,transform,opacity] duration-300",
							index === 0 && "rounded-l-md",
							index === 3 && "rounded-r-md",
							"border-r border-white/10 dark:border-black/10 last:border-r-0",
							"hover:bg-background dark:hover:bg-background",
							"transform",
							isHovered
								? "translate-x-[0%] opacity-100"
								: "-translate-x-full opacity-0",
							index === 0 && "duration-200",
							index === 1 && "duration-200 delay-50",
							index === 2 && "duration-200 delay-100",
							index === 3 && "duration-200 delay-150"
						)}
					>
						<button.icon className="w-4 h-4" />
					</button>
				))}
			</div>
		</div>
	);
}
```

## Attribution

Source: Kokonut UI · Original: https://kokonutui.com/docs/components/button#button---share

Adapted from the original. Credit the original author when you ship this.
