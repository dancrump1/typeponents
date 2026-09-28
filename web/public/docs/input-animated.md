# Input Animated

- Categories: Forms & Inputs
- Tags: spring
- Import: `@/components/ui/input-animated`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/input-animated.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` *(required)* | `string` | — | — |
| `value` *(required)* | `string` | — | — |
| `className` | `string` | `""` | — |

## Usage

```tsx
"use client";

import { useState } from "react";

import { InputAnimated } from "./component";

const InputPreview = () => {
	const [value, setValue] = useState("");

	return (
		<InputAnimated
			label="Email Address"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default InputPreview;
```

## Source

### `components/ui/input-animated.tsx`

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value: string;
	className?: string;
}

const containerVariants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const letterVariants = {
	initial: {
		y: 0,
		color: "inherit",
	},
	animate: {
		y: "-120%",
		color: "var(--color-zinc-500)",
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
		},
	},
};

export const InputAnimated = ({
	label,
	className = "",
	value,
	...props
}: InputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const showLabel = isFocused || value.length > 0;

	return (
		<div className={cn("relative", className)}>
			<motion.div
				className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-foreground dark:text-foreground"
				variants={containerVariants}
				initial="initial"
				animate={showLabel ? "animate" : "initial"}
			>
				{label.split("").map((char, index) => (
					<motion.span
						key={index + "input-animated"}
						className="inline-block text-sm"
						variants={letterVariants}
						style={{ willChange: "transform" }}
					>
						{char === " " ? "\u00A0" : char}
					</motion.span>
				))}
			</motion.div>

			<input
				type="text"
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...props}
				className="outline-hidden border-b-2 border-zinc-900 dark:border-zinc-50 py-2 w-full text-base font-medium text-foreground dark:text-foreground bg-transparent placeholder-transparent"
			/>
		</div>
	);
};
```
