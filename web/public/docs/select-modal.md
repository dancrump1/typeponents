# Select Modal

- Categories: Forms & Inputs
- Tags: spring, hover
- Import: `@/components/ui/select-modal`
- Inspiration: Star UI (adaptation) — https://starui.link/docs/components/select-model

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/select-modal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `select`

## Usage

```tsx
"use client";

import React from "react";

import { SelectModel } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<SelectModel />
		</div>
	);
}
```

## Source

### `components/ui/select-modal.tsx`

```tsx
"use client";

import type React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// Credit:
// https://starui.link/docs/components/select-model

const exampleData = [
	"ChatGPT 4o",
	"ChatGPT 4o-mini",
	"ChatGPT 4-turbo",
	"ChatGPT o1",
	"ChatGPT o1-mini",
];

function generateLetters(value: string) {
	const letterCount = new Map<string, number>();
	return value.split("").map((letter) => {
		const count = letterCount.get(letter) || 0;
		const key = `${letter}-${count}`;
		letterCount.set(letter, count + 1);
		return { letter, key };
	});
}

function SelectModel() {
	return (
		<Select defaultValue={exampleData[0]} alignItemToTrigger={false}>
			<SelectTrigger className="relative flex h-10 items-center justify-between gap-3 text-sm rounded-md pr-3 pl-3.5 select-none hover:bg-background focus-visible:outline-hidden focus-visible:-outline-offset-1 active:bg-background data-popup-open:bg-background">
				<SelectValue placeholder="Select Model">
					{/* {(value) => {
						return (
							<>
								<span className="sr-only">{value}</span>
								{generateLetters(value).map(({ letter, key }) => (
									<motion.span
										aria-hidden
										key={key}
										layoutId={key}
										className="inline-block"
										transition={{ type: "spring", bounce: 0.35 }}
									>
										{letter.trim() || "\u00A0"}
									</motion.span>
								))}
							</>
						);
					}} */}
				</SelectValue>
				=
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className="group origin-(--transform-origin) rounded-md bg-background py-1 shadow-lg outline-solid outline-neutral-200 transition-[transform,scale,opacity] data-ending-style:scale-100 data-ending-style:opacity-100 data-ending-style:transition-none data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none">
					{exampleData.map((item) => (
						<SelectItemTest value={item} key={item + "select-modal"}>
							{item}
						</SelectItemTest>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

function SelectItemTest({
	className,
	children,
	...props
}: React.ComponentPropsWithRef<any>) {
	return (
		<SelectItem
			className={cn(
				"grid min-w-(--anchor-width) cursor-default grid-cols-[1fr_0.75rem] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-hidden select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:text-foreground data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-background",
				className
			)}
			{...props}
		>
			{children}
		</SelectItem>
	);
}

export { SelectModel };
```

## Attribution

Source: Star UI · Original: https://starui.link/docs/components/select-model

Adapted from the original. Credit the original author when you ship this.
