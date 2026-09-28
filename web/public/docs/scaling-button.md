# Scaling Button

- Categories: Buttons
- Tags: spring, hover
- Import: `@/components/ui/scaling-button`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scaling-button.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `button`

## Usage

```tsx
"use client";

import React from "react";

import { ScalingButton } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ScalingButton>test test 123</ScalingButton>
		</div>
	);
}
```

## Source

### `components/ui/scaling-button.tsx`

```tsx
import * as React from "react";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

type ScalingButtonProps = {
	springTransition?: {
		type: string;
		stiffness: number;
		damping: number;
	};
};

const springTransitionDefault = {
	type: "spring",
	stiffness: 400,
	damping: 12,
};

export const ScalingButton = React.forwardRef<
	HTMLButtonElement,
	ScalingButtonProps
>(({ children, springTransition = springTransitionDefault, ...props }, ref) => {
	return (
		<motion.div
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={springTransition}
		>
			<Button ref={ref} {...props}>
				{children}
			</Button>
		</motion.div>
	);
});

ScalingButton.displayName = "ScalingButton";
```
