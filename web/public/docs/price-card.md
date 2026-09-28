# Price Card

Single pricing card showing plan name, monthly price and a feature list with circled check marks.

**Interaction.** On load the card rises and fades in while the feature rows slide in from the left one after another, each check badge popping to size; the order button dips in scale when pressed.

- Categories: Cards
- Tags: spring, hover
- Import: `@/components/ui/price-card`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/price-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Registry dependencies

- `https://components.drivedev.net/r/scaling-button.json`
- `scaling-button`

## Usage

```tsx
"use client";

import React from "react";

import PricingCard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<PricingCard />
		</div>
	);
}
```

## Source

### `components/ui/price-card.tsx`

```tsx
"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import { ScalingButton } from "@/components/ui/scaling-button";

export default function PricingCard() {
	const features = [
		"2 Senior Developers",
		"Landing Page Development",
		"15-20 Days Service (One time)",
		"Private Discord Channel",
		"One Request at a time",
	];

	return (
		<div className="flex items-center justify-center">
			<motion.div
				className="w-full max-w-md rounded-3xl bg-linear-to-b from-background to-background p-6 text-foreground shadow-xl"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h2 className="mb-2 text-2xl font-bold">Extend MVP</h2>
				<div className="mb-4 flex items-baseline">
					<span className="text-5xl font-extrabold">$3000</span>
					<span className="ml-2 text-xl">/month</span>
				</div>
				<p className="mb-6 text-foreground">Product Development</p>
				<ul className="mb-6 space-y-3">
					{features.map((feature, index) => (
						<motion.li
							key={index + "price-card"}
							className="flex items-center space-x-3"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<motion.span
								className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-priceAccent"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 500,
									delay: index * 0.1 + 0.2,
								}}
							>
								<Check className="h-3 w-3 text-foreground" />
							</motion.span>
							<span>{feature}</span>
						</motion.li>
					))}
				</ul>
				<ScalingButton className="w-full bg-background text-foreground hover:bg-background/90">
					Order Now
				</ScalingButton>
			</motion.div>
		</div>
	);
}
```
